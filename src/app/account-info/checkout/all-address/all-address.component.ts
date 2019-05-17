import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AddressModel } from './../../address/address.model';
@Component({
  selector: 'app-all-address',
  templateUrl: './all-address.component.html',
  styleUrls: ['./all-address.component.css']
})
export class AllAddressComponent implements OnInit {
@Input() addressModel: AddressModel;
@Output() deleteAddress = new EventEmitter<AddressModel>();
@Output() addAddress = new EventEmitter<AddressModel>();
@Output() editAddress = new EventEmitter<AddressModel>();
@Output() selectAddress = new EventEmitter<AddressModel>();
selected = 0;
  constructor() { }

  ngOnInit() {

  }
  deleteAddressData(addressId)   {
    this.deleteAddress.emit(addressId);
  }

  openEditAddress(editData)   {
    console.log(editData);
    this.editAddress.emit(editData);
  }
  openAddAddress()   {
    this.addAddress.emit();
  }
  selectedAddress(e, address, i)   {
    if (e.target.checked) {
      this.selected = i;
      this.selectAddress.emit(address);
    }
  }
}
