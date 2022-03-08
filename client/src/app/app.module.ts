import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { CreateGatewayComponent } from './components/create-gateway/create-gateway.component';
import { AllGatewaysComponent } from './components/all-gateways/all-gateways.component';
import { GatewayDetailComponent } from './components/gateway-detail/gateway-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateGatewayComponent,
    AllGatewaysComponent,
    GatewayDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
