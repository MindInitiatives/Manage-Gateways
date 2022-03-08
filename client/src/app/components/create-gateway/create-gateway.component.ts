import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IGateway } from 'src/app/models/gatewayModel';

@Component({
  selector: 'app-create-gateway',
  templateUrl: './create-gateway.component.html',
  styleUrls: ['./create-gateway.component.css'],
})
export class CreateGatewayComponent implements OnInit {
  loading: any;
  disabled: boolean = false;
  status!: string;
  deviceStatus: Array<String> = ['online', 'offline'];
  form: FormGroup;
  get peripherals() {
    return this.form.get('peripherals') as FormArray;
  }

  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      gatewayName: ['', [Validators.required]],
      ipv4Address: ['', [Validators.required]],
      peripherals: this.fb.array([]),
    });
  }

  ngOnInit(): void {}

  selectStatus(evt: any) {
    this.status = evt.target.value;
  }

  add() {
    const peri = this.form.controls['peripherals'] as FormArray;
    peri.push(this.fb.group({
      vendor: ['',  {updateOn:'blur'}],
      status: ['']
    }));
  }

  remove(i: any) {
    this.peripherals.removeAt(i);
  }

  submitForm(data: any) {
    console.log(data)
  }
}
