import { Size } from './size.model';
export class Cart {
    userId: string;
    items: [{productId: string, skuCode: string, qty: number}];
}
