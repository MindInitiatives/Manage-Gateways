import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GatewayService } from 'src/app/services/gateway.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-gateway-detail',
  templateUrl: './gateway-detail.component.html',
  styleUrls: ['./gateway-detail.component.css']
})
export class GatewayDetailComponent implements OnInit, OnDestroy {
  id: any;
  private sub: any;
  gatewayData: any;
  constructor(private route: ActivatedRoute, private gatewayService: GatewayService, private location: Location, private _snackBar: MatSnackBar) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.route.queryParamMap.subscribe((params : any) => {
      console.log(params);
      this.id = params.params.id;
      this.getDetails(this.id)
    });
  }
  
  getDetails(id: any) {
    this.gatewayService.getGatewayById(id).subscribe((res) => {
      console.log(res)
      this.gatewayData = res
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1000 
      });
  }

  remove(device : any) {
    console.log(device)
    this.gatewayService.deleteGatewayDevice(this.id, device.uid).subscribe((res) => {
      console.log(res)
      if (res.statusCode == 200) {
        const index = this.gatewayData.peripheral_devices.indexOf(device.uid);
        console.log(index)
        console.log(this.gatewayData.peripheral_devices)
        this.gatewayData.peripheral_devices.splice(index, 1);
        this.openSnackBar(res.statusMessage, "close")
      }
    })
  }

  goBack() {
    this.location.back()
  }

}
