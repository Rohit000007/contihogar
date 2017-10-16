import { Injectable } from '@angular/core';
import { Http, Headers  } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ProductService {
  private sUrlSite:string = "http://127.0.0.1:8000";
  private headers = new Headers({'Content-Type': 'application/json','X-CSRF-TOKEN': ''});

  constructor(private http:Http) { 
  }
  public getPost(){
    return this.http.get('https://jsonplaceholder.typicode.com/posts').map(data=>{
      data.json();
    });
  }

  public getSupplier(){
    return this.http.get(this.sUrlSite+'/supplier');
  }

  public postSupplier(data){
    return this.http.post(this.sUrlSite+"/supplier/store",data,{headers: this.headers});
  }
  public getManufacturer(){
    return this.http.get(this.sUrlSite+'/product').map(data=>{
      console.log(data);
    });
  }

  //Proveedor
  public obtnerMarca(idProveedor){
    let vProveedor = {"id_supplier":idProveedor};
    return this.http.post(this.sUrlSite,vProveedor).map(res=>{
      console.log(res);
    });
  }
}
