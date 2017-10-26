import { Injectable } from '@angular/core';
import { Http, Headers  } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {
  private sUrlSite:string = "http://127.0.0.1:8000/api";
  private headers = new Headers({'Content-Type': 'application/json','X-CSRF-TOKEN': window["scrf_token"]});

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

  public editProduct(id_product){
    return this.http.get(this.sUrlSite+"/product/"+id_product+"/edit");
  }

  public updateProduct(oProduct){
    return this.http.put(this.sUrlSite+"/product/"+oProduct.id_product,oProduct);
  }
  //#endregion
  //#endregion "Metodos"

}
