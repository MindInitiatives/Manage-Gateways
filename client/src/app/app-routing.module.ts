import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllGatewaysComponent } from './components/all-gateways/all-gateways.component';
import { CreateGatewayComponent } from './components/create-gateway/create-gateway.component';
import { EditGatewayComponent } from './components/edit-gateway/edit-gateway.component';
import { GatewayDetailComponent } from './components/gateway-detail/gateway-detail.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'create-gateway', component: CreateGatewayComponent },
  { path: 'all-gateways', component: AllGatewaysComponent },
  { path: 'gateway-detail', component: GatewayDetailComponent },
  { path: 'edit-gateway', component: EditGatewayComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
