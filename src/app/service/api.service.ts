import { ProductComponent } from './../components/product/product.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  message!: string;

  httpOptionsGet = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  httpOptionsPost = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
  });

  displayUrl: string = 'https://127.0.0.1:8000/displayproduct';
  dropdownUrl: string = 'https://127.0.0.1:8000/dropdown';
  formUrl: string = 'https://127.0.0.1:8000/signin';
  constructor(private http: HttpClient) {}

  public displayProduct(
    categoryId: any,
    subCategoryId: any,
    pageId: any,
    orderBy: any,
    limitperpage: any
  ): Observable<any> {
    let cId = categoryId;
    let sId = subCategoryId;
    let pId = pageId ? pageId : 1;
    let oBy = orderBy;
    let sIpp = limitperpage ? limitperpage : 5;
    this.displayUrl =
      'https://127.0.0.1:8000/displayproduct?categoryid=' +
      cId +
      '&subcategoryid=' +
      sId +
      '&page=' +
      pId +
      '&orderby=' +
      oBy +
      '&limitperpage=' +
      sIpp;
    return this.http.get(this.displayUrl);
  }

  categories() {
    return this.http.get(this.dropdownUrl);
  }

  addUsers(userObj: any) {
    console.log(userObj);
    return this.http.post(this.formUrl, userObj);
  }
}
