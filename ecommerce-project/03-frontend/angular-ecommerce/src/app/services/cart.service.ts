import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems:CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>;
  totalQuantity: Subject<number> = new Subject<number>;
  constructor() { }
  addToCart(theCartItem:CartItem){
    let alreadyExistsInCart:boolean= false;
    let exisitngCartItem:any = undefined;
    if(this.cartItems.length>0){

    exisitngCartItem = this.cartItems.find(tempCartItem => tempCartItem.id==theCartItem.id);

      alreadyExistsInCart = (exisitngCartItem != undefined);
    }
     
    if(alreadyExistsInCart){
      exisitngCartItem.quantity++;
    }else{
      this.cartItems.push(theCartItem);
    }
    this.computerCartTotals();
  }
  computerCartTotals() {
    let totalPriceValue : number = 0;
    let totoalQuantityValue:number = 0;
    for(let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity*currentCartItem.unitPrice;
      totoalQuantityValue += currentCartItem.quantity;
    }
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totoalQuantityValue);
    this.logCartData(totalPriceValue,totoalQuantityValue);
  }
  logCartData(totalPriceValue: number, totoalQuantityValue: number) {
    console.log('Contents of the cart');
    for(let tempCartItem of this.cartItems){
      const subTotalPrice = tempCartItem.quantity*tempCartItem.unitPrice;
      console.log(`name ${tempCartItem.name} , quantity=${tempCartItem.quantity},subtotalprice=${subTotalPrice}`)

    }
    console.log(`totalPrice:${totalPriceValue.toFixed(2)},totalQuantity:${totoalQuantityValue}`);
    console.log(`------`);
    
  }
}
