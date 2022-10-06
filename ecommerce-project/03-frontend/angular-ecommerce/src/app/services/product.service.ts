import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, pipe } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient:HttpClient) {}
  getProductList(): Observable<Product[]>{
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.products)
    );
  }
}
interface GetResponse{
  _embedded:{
    products:Product[];
  }
}
