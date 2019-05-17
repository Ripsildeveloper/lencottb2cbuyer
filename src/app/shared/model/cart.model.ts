import { Size } from './size.model';
export class Cart {
    userId: string;
    items: [{productId: string, pack: number, qty: number, ratioQty: number, moq: number, size: [Size]}];
}
