import { Size } from './size.model';
export class Order {
   customerId: string;
   orderId: string;
   items: [{productId: number, pack: number, moq: number,
      ratioQty: number, size: [Size]}];
   total: number;
   addressDetails: [{
      name: string;
      mobileNumber: number;
      streetAddress: string;
      building: string;
      landmark: string;
      city: string;
      state: string;
      pincode: string;
   }];
   paymentStatus: string;
   orderStatus: string;
   orderDate: Date;
}
