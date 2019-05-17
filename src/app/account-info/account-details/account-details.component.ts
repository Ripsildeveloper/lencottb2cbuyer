import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  profiledetails = [ {name: 'profile' , link: '/account/profile'},
  {name: 'Address' , link: '/account/listaddress'},
  {name: 'Card' , link: '/account/listcard'},
  {name: 'Order Details' , link: '/account/order'}
];
  constructor() { }

  ngOnInit() {
  }

}
