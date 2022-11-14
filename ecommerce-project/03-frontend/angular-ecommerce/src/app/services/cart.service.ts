import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems:CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

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
    this.computeCartTotals();
  }

  computeCartTotals() {
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

  decrementQuantity(theCartItem: CartItem) {
    let exisitngCartItem:any = undefined;
    theCartItem.quantity--;
    exisitngCartItem = this.cartItems.find(tempCarItem => tempCarItem.id===theCartItem.id);
    exisitngCartItem.quantity = theCartItem.quantity;
    if(theCartItem.quantity===0){
      this.remove(theCartItem);
    }else{
      this.computeCartTotals();
    }
  }

  remove(theCartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(tempCarItem => tempCarItem.id===theCartItem.id);
    if(itemIndex > -1){
      this.cartItems.splice(itemIndex,1);
      this.computeCartTotals();
    }
  }
}
