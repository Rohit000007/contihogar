import { Injectable } from '@angular/core';
import { Http, Headers  } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Product } from '../entity/product';
import { Category } from '../entity/category';
import { DataTableParams } from 'angular-4-data-table-bootstrap-4';
import { Filter } from '../general/general.component';

@Injectable()
export class AppService {
  private oProductObserver:Observable<Product>;
  private sUrlSite:string = "http://127.0.0.1:8000/api";////"http://laravapi.contihogar.com.pe/api";//
  private sUrlPrestahop:string = "http://hogaryspacios.com/apitest.php";//"http://localhost:8080/hogaryspacios/apitest.php" //
  private headers = new Headers({'Content-Type': 'application/json','X-CSRF-TOKEN': window["scrf_token"]});
  private headersMultiPart = new Headers({'Content-Type': 'multipart/form-data','X-CSRF-TOKEN': window["scrf_token"]});

  //#region "Metodos"
  constructor(private http:Http) { }
  public getCategory(){
    return this.http.get(this.sUrlSite+'/category');
  }

  public getCategoryById(IdCategory){
    return this.http.get(this.sUrlSite+"/category/"+IdCategory);
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

  public putCategory(eCategory){
    return this.http.put(this.sUrlSite+"/category/"+eCategory.id_category,eCategory);
  }

  public changeCategoryActive(eCategory:Category){
    return this.http.put(this.sUrlSite+"/category/"+eCategory.id_category,eCategory);
  }



  public getSupplier(){
    return this.http.get(this.sUrlSite+'/supplier');
  }
  public getManufacturer(){
    return this.http.get(this.sUrlSite+"/manufacturer");
  }

  public getSupplierById(eSupplier){
    return this.http.get(this.sUrlSite+"/supplier/"+eSupplier.id_supplier,eSupplier);
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
  public getListProduct(params: DataTableParams, filterData: Filter[]){
    return this.http.get(this.sUrlSite+"/product/getProductGrid?"+this.paramsToQueryString(params)+"&"+this.paramFilterProductGeneral(filterData));
  }

  public sendImagePrestaShop(oForData:FormData){
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.sUrlPrestahop,oForData);
  }

  public getImage(IdProduct){
    return this.http.get(this.sUrlSite+"/image/"+IdProduct);
  }

  public deleteImage(id_image){
    return this.http.delete(this.sUrlSite+"/image/"+id_image);
  }
  
  public getAttribute(IdProduct){
    return this.http.get(this.sUrlSite+"/product-attribute/"+IdProduct)
  }

  public getProductAtributeImage(IdProduct){
    return this.http.get(this.sUrlSite+"/productAttibute/"+IdProduct);
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

  public postAttribute(oAttribute,oProductAttribute){

    return this.http.post(this.sUrlSite+"/productAttibute/store",{Attribute:oAttribute,ProductAttribute:oProductAttribute});
  }

  public saveProductAttributeImage(oProductAttributeImage){
    return this.http.post(this.sUrlSite+"/productAttributeImage/store",oProductAttributeImage);
  }

  public deleteAttribute(id_attribute){
    return this.http.delete(this.sUrlSite+"/attribute/"+id_attribute);
  }

  public getOrderProductTop(){
    return this.http.get(this.sUrlSite+"/order/productTop");
  }

  public getOrderSupplierTop(){
    return this.http.get(this.sUrlSite+"/order/supplierTop");
  }

  public getOrderCategoryTop(){
    return this.http.get(this.sUrlSite+"/order/categoryTop");
  }

  public getOrderTotal(){
    return this.http.get(this.sUrlSite+"/order/total");
  }

  public postExcel(oData: FormData): any {
    return this.http.post(this.sUrlSite+"/product/listarMerge", oData);
  }
  public getProductById(id_product: number){
    return this.http.post(this.sUrlSite+"/product/getById",{"id_product":id_product});
  }


  public getCostShippingMerge(item){
    return this.http.post(this.sUrlSite+"/product/shippingCost",item);
  }
  public grabarProductEvent(listProduct: any[]): any {
    return this.http.post(this.sUrlSite+"/productEvent",{"product_event":listProduct});
  }
  //#endregion
  //#endregion "Metodos"

  public paramsToQueryString(params: DataTableParams) {
    let result = [];

    if (params.offset != null) {
        result.push(['_start', params.offset]);
    }
    if (params.limit != null) {
        result.push(['_limit', params.limit]);
    }
    if (params.sortBy != null) {
        result.push(['_sort', params.sortBy]);
    }
    if (params.sortAsc != null) {
        result.push(['_order', params.sortAsc ? 'ASC' : 'DESC']);
    }

    return result.map(param => param.join('=')).join('&');
  }
  public paramFilterProductGeneral(filterData: Filter[]){
    let result = [];
    for(let _i = 0;_i < filterData.length;_i++){
      result.push([filterData[_i].column,filterData[_i].value]);
    }
    return result.map(rest => rest.join('=')).join('&');
  }
}
