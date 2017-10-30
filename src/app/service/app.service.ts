import { Injectable } from '@angular/core';
import { Http, Headers  } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Product } from '../entity/product';

@Injectable()
export class AppService {
  oProductObserver:Observable<Product>;
  private sUrlSite:string = "http://127.0.0.1:8000/api";
  private headers = new Headers({'Content-Type': 'application/json','X-CSRF-TOKEN': window["scrf_token"]});
  private headersMultiPart = new Headers({'Content-Type': 'multipart/form-data','X-CSRF-TOKEN': window["scrf_token"]});

  //#region "Metodos"
  constructor(private http:Http) { }
  public getCategory(){
    return this.http.get(this.sUrlSite+'/category');
  }

  public getSupplier(){
    return this.http.get(this.sUrlSite+'/supplier');
  }
  public getManufacturer(){
    return this.http.get(this.sUrlSite+"/manufacturer");
  }

  public getModelo(){
    return this.http.get(this.sUrlSite+"/modelo");
  }

  //#region "Productos"
  public saveProduct(oProduct){
    return this.http.post(this.sUrlSite+"/product/store",{Product:oProduct},{headers: this.headers});
  }

  public editProduct(id_product):Observable<Product>{
    return this.oProductObserver = this.http.get(this.sUrlSite+"/product/"+id_product+"/edit").map(data=>{
      return data.json();
    });
  }

  public updateProduct(oProduct){
    return this.http.put(this.sUrlSite+"/product/"+oProduct.id_product,oProduct);
  }

  public postIamage(oForData:FormData){
    return this.http.post(this.sUrlSite+"/category/store",oForData);
  }
  //#endregion
  //#endregion "Metodos"

}
