import { Injectable } from '@angular/core';
import { Http, Headers  } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Product } from '../entity/product';

@Injectable()
export class AppService {
  oProductObserver:Observable<Product>;
  private sUrlSite:string = "http://127.0.0.1:8000/api";
  private sUrlPrestahop:string = "https://www.contihogar.com.pe/apitest.php";
  private headers = new Headers({'Content-Type': 'application/json','X-CSRF-TOKEN': window["scrf_token"]});
  private headersMultiPart = new Headers({'Content-Type': 'multipart/form-data','X-CSRF-TOKEN': window["scrf_token"]});

  //#region "Metodos"
  constructor(private http:Http) { }
  public getCategory(){
    return this.http.get(this.sUrlSite+'/category');
  }
  public getCategoryByDepth(){
    return this.http.get(this.sUrlSite+'/categoryByDepth');
  }
  public getCategoryByParents(id_parent){
    return this.http.get(this.sUrlSite+'/categoryByParents/'+ id_parent);
  }

  public postCategory(eCategory){
    return this.http.post(this.sUrlSite+"/category/store",eCategory);
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

  public sendImagePrestaShop(oForData:FormData){
    return this.http.post(this.sUrlPrestahop,oForData);
  }

  public getImage(IdProduct){
    return this.http.get(this.sUrlSite+"/image/"+IdProduct);
  }

  public getDepartament(){
    return this.http.get(this.sUrlSite+"/departament");
  }

  public getProvincia(id_departament){
    return this.http.get(this.sUrlSite+"/province/"+id_departament);
  }
  public getDistrict(id_province){
    return this.http.get(this.sUrlSite+"/district/"+id_province);
  }

  public getZoneDelivery(){
    return this.http.get(this.sUrlSite+"/zone/delivery");
  }
  public postSupplier(oSupplier){
    return this.http.post(this.sUrlSite+"/supplier/store",oSupplier);
  }

  public putAttribute(oAttribute,oProductAttribute){

    return this.http.post(this.sUrlSite+"/product/attribute",{Attribute:oAttribute,ProductAttribute:oProductAttribute});
  }
  //#endregion
  //#endregion "Metodos"

}
