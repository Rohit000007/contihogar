import { Injectable } from '@angular/core';
import { Http  } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ProductService {
  private sUrlProveedor:string = "";
  private sUrlMarca:string = "";

  constructor(private http:Http) { }
  public getPost(){
    return this.http.get('https://jsonplaceholder.typicode.com/posts').map(data=>{
      data.json();
    });
  }

  //Proveedor
  public obtnerMarca(idProveedor){
    let vProveedor = {"id_supplier":idProveedor};
    return this.http.post(this.sUrlMarca,vProveedor).map(res=>{
      console.log(res);
    });
  }
}
