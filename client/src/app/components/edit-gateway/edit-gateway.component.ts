import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { GatewayService } from 'src/app/services/gateway.service';

@Component({
  selector: 'app-edit-gateway',
  templateUrl: './edit-gateway.component.html',
  styleUrls: ['./edit-gateway.component.css']
})
export class EditGatewayComponent implements OnInit {
  loading: boolean = false;
  disabled: boolean = false;
  status!: string;
  deviceStatus: Array<String> = ['online', 'offline'];
  form: FormGroup;
  get peripheral_devices() {
    return this.form.get('peripheral_devices') as FormArray;
  }
  id: any;
  private sub: any;
  gatewayData: any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private gatewayService: GatewayService, private _snackBar: MatSnackBar) {

    this.form = this.fb.group({
      gateway_name: ['', [Validators.required]],
      IPV4_address: ['', [Validators.required]],
      peripheral_devices: this.fb.array([]),
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams['id']) {
    this.sub = this.route.queryParamMap.subscribe((params : any) => {
      console.log(params);
      this.id = params.params.id;
      this.getDetails(this.id)
    });
  }
  }

  getDetails(id: any) {
    this.gatewayService.getGatewayById(id).subscribe((res) => {
      console.log(res)
      this.gatewayData = res
      this.form.controls['gateway_name'].setValue(this.gatewayData.gateway_name);
      this.form.controls['IPV4_address'].setValue(this.gatewayData.IPV4_address);
      this.gatewayData.peripheral_devices.forEach((e: any) => {
        this.peripheral_devices.push(this.fb.group({
          vendor: [e.vendor, [Validators.required]],
          status: [e.status, [Validators.required]]
        }));
			});

    })
  }

  selectStatus(evt: any) {
    this.status = evt.target.value;
  }

  add() {
    this.peripheral_devices.push(this.fb.group({
      vendor: ['', [Validators.required]],
      status: ['', [Validators.required]]
    }));
  }

  remove(i: any, device: any) {
    console.log(device)
    this.gatewayService.deleteGatewayDevice(this.id, device.uid).subscribe((res) => {
      console.log(res)
      if (res.statusCode == 200) {
        const index = this.gatewayData.peripheral_devices.indexOf(device.uid);
        console.log(index)
        this.peripheral_devices.removeAt(i);
        this.openSnackBar(res.statusMessage, "close")
        console.log(this.gatewayData.peripheral_devices)
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1000 
      });
  }

  submitForm(f: any) {
    console.log(f)
    this.loading = true;
    if (f.valid) {
      this.gatewayService.updateGateway(f.value, this.id).subscribe(
      (res) => {
        console.log(res)
        if (res.statusCode == 200) {
          this.loading = false;
          this.openSnackBar(res.statusMessage, "close")
        }
      })
    }
    else {
      this.loading = false;
    }
  }
}
