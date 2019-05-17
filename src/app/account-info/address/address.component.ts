import { Component, OnInit, Inject, Optional, Input  } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from './../account.service';
import { AddressModel } from './address.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RegModel } from './../registration/registration.model';



@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  addressHolder: AddressModel;
  regModel: RegModel;
  addressForm: FormGroup;
  userId;
  states = ['TN', 'UP', 'AP', 'KL', 'KA', 'MH', 'CH', 'JK', 'UK', 'FM', 'PONDI', 'GJ', 'JK'];
  display = 'none';
  constructor(private fb: FormBuilder, private accountService: AccountService,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AddressComponent>) { }

  ngOnInit() {
    this.addressDetails();
    this.userId = sessionStorage.getItem('userId');
  }

  addressDetails() {
    this.addressForm = this.fb.group({
      streetAddress: [''],
      building: [''],
      landmark: [''],
      city: [''],
      state: [''],
      pincode: [''],
      name: [''],
      mobileNumber: ['']

    });
  }


  onSubmit() {
    this.addressHolder = new AddressModel();
    this.addressHolder.streetAddress = this.addressForm.controls.streetAddress.value;
    this.addressHolder.building = this.addressForm.controls.building.value;
    this.addressHolder.landmark = this.addressForm.controls.landmark.value;
    this.addressHolder.city = this.addressForm.controls.city.value;
    this.addressHolder.state = this.addressForm.controls.state.value;
    this.addressHolder.pincode = this.addressForm.controls.pincode.value;
    this.addressHolder.name = this.addressForm.controls.name.value;
    this.addressHolder.mobileNumber = this.addressForm.controls.mobileNumber.value;
    this.accountService.getaddressDetails(this.addressHolder, this.userId).subscribe(data => {
      this.addressHolder = data;
      this.dialogRef.close(true);
    }, error => {
      this.dialogRef.close(false);
      console.log(error);
    }
    );
    /* console.log(this.regForm); */


  }
  updateAddress(address, name, mobileNumber, building, streetAddress, landmark, city, state, pincode ) {
    this.addressHolder = new AddressModel();
    this.addressHolder.streetAddress = streetAddress.value;
    this.addressHolder.building = building.value;
    this.addressHolder.landmark = landmark.value;
    this.addressHolder.city = city.value;
    this.addressHolder.state = state.value;
    this.addressHolder.pincode = pincode.value;
    this.addressHolder.name = name.value;
    this.addressHolder.mobileNumber = mobileNumber.value;
    this.accountService.customerAddressUpdate(this.userId, address._id, this.addressHolder).subscribe(data => {
    this.addressHolder = data.addressDetails;
    this.dialogRef.close(true);
    }, error => {
      this.dialogRef.close(false);
      console.log(error);
    });
  }

  getReset() {
    this.addressForm.reset();
  }



}
