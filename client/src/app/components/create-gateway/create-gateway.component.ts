import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GatewayService } from 'src/app/services/gateway.service';

@Component({
  selector: 'app-create-gateway',
  templateUrl: './create-gateway.component.html',
  styleUrls: ['./create-gateway.component.css'],
})
export class CreateGatewayComponent implements OnInit {
  loading: boolean = false;
  disabled: boolean = false;
  status!: string;
  deviceStatus: Array<String> = ['online', 'offline'];
  form: FormGroup;
  get peripheral_devices() {
    return this.form.get('peripheral_devices') as FormArray;
  }

  constructor(private fb: FormBuilder, private gatewayService: GatewayService, private _snackBar: MatSnackBar) {

    this.form = this.fb.group({
      gateway_name: ['', [Validators.required]],
      IPV4_address: ['', [Validators.required]],
      peripheral_devices: this.fb.array([]),
    });
  }

  ngOnInit(): void {}

  selectStatus(evt: any) {
    this.status = evt.target.value;
  }

  add() {
    this.peripheral_devices.push(this.fb.group({
      vendor: ['', [Validators.required]],
      status: ['', [Validators.required]]
    }));
  }

  remove(i: any) {
    this.peripheral_devices.removeAt(i);
  }

  clearFormArray (formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
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
      this.gatewayService.createGateway(f.value).subscribe(
      (res) => {
        console.log(res)
        if (res.statusCode == 200) {
          this.loading = false;
          this.openSnackBar(res.statusMessage, "close")
          f.reset();
          this.clearFormArray(this.peripheral_devices)
        }
      })
    }
    else {
      this.loading = false;
    }
  }
}
