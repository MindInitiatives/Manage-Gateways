import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GatewayService } from 'src/app/services/gateway.service';

@Component({
  selector: 'app-gateway-detail',
  templateUrl: './gateway-detail.component.html',
  styleUrls: ['./gateway-detail.component.css']
})
export class GatewayDetailComponent implements OnInit, OnDestroy {
  id: any;
  private sub: any;
  gatewayData: any;
  constructor(private route: ActivatedRoute, private gatewayService: GatewayService) { }

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

}
