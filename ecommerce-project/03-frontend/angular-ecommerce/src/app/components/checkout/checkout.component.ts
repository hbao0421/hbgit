import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup:FormGroup = null!;

  totalPrice:number = 0;
  totalQuantity:number = 0;

  creditCardYears:number[] = [];
  creditCardMonths:number[] = [];

  constructor(private formBuilder:FormBuilder,
              private luv2ShopFormService:Luv2ShopFormService) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer:this.formBuilder.group({
        firstName:[''],
        lastName:[''],
        email:['']
      }),
      shippingAddress:this.formBuilder.group({
        firstName:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:['']
      }),
      billingAddress:this.formBuilder.group({
        firstName:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:['']
      }),
      creditCard:this.formBuilder.group({
        cardType:[''],
        nameOnCard:[''],
        cardNumber:[''],
        securityCode:[''],
        expirationMonth:[''],
        expirationYear:['']
      })
    });

    const startMonth:number = new Date().getMonth()+1;
    console.log(startMonth);
    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data =>{
        // console.log('Months'+JSON.stringify(data));
        this.creditCardMonths = data;
      }
    )
    this.luv2ShopFormService.getCreditCardYears().subscribe(
      data=>{
        // console.log('Years'+JSON.stringify(data));
        this.creditCardYears = data;
      }
    )
  }

  onSubmit(){
    console.log("Handling the submisson");
    console.log(this,this.checkoutFormGroup.get('customer')?.value);
    console.log(this,this.checkoutFormGroup.get('customer')?.value.email);
  }

  copyShippingAddressToBillingAddress(event:any) {

    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress']
            .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    }
    else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
    
  }
  handleMonthsAndYears(){
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear:number = new Date().getFullYear();
    const selectedYear:number = Number(creditCardFormGroup?.value.expirationYear);
    let startedMonth:number;
    if(currentYear===selectedYear){
      startedMonth = new Date().getMonth()+1;
    }else{
      startedMonth = 1;
    }
    this.luv2ShopFormService.getCreditCardMonths(startedMonth).subscribe(
      data =>{
        console.log("Reterieved months"+JSON.stringify(data));
        this.creditCardMonths = data;
      }
     )
  }

}
