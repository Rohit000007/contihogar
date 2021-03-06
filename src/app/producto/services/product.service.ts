import { Injectable } from '@angular/core';
import { Http, Headers  } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ProductService {
  private sUrlSite:string = "http://127.0.0.1:8000/api";
  private headers = new Headers({'Content-Type': 'application/json','X-CSRF-TOKEN': window["scrf_token"]});

  constructor(private http:Http) { 
  }

  public getSupplier(){
    return this.http.get(this.sUrlSite+'/supplier');
  }
  public getManufacturer(){
    return this.http.get(this.sUrlSite+"/manufacturer");
  }

  public postSupplier(data){
    return this.http.post(this.sUrlSite+"/supplier/store",data,{headers: this.headers});
  }

  //Proveedor
  public obtnerMarca(idProveedor){
    let vProveedor = {"id_supplier":idProveedor};
    return this.http.post(this.sUrlSite,vProveedor).map(res=>{
      console.log(res);
    });
  }
}
