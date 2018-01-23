import { Component, OnInit } from '@angular/core';
import { AppService } from '../../service/app.service';
import { Product } from '../../entity/product';
import { Province } from '../../entity/province';
import { Departament } from '../../entity/departament';
import { District } from '../../entity/district';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss'],
  providers: [AppService]
})
export class PedidoComponent implements OnInit {
  private items: any[] = [];
  private itemCount = 0;

  private infoProduct: any = {};
  private listProductAttribute: any[] = [];

  private oListDepartament: Departament[] = [];
  private oListProvince: Province[] = [];
  private oListDistrict: District[] = [];

  constructor(private appService: AppService) { }

  ngOnInit() {
    let elem = document.getElementsByClassName("data-table-wrapper");
    if (elem.length > 0)
      elem[0].setAttribute("style", "width:2000px;");
  }

  reloadItems(params) {
    this.appService.getDataOperation(params).subscribe(res=>{
      this.items = res.json()["data"];
      this.itemCount = res.json()["total"];
    });
  }

  rowClick(rowEvent) {
    //console.log(rowEvent);
  }
  
  rowDoubleClick(rowEvent) {
    //console.log(rowEvent);
  }

  openProduct(data: any){
    this.infoProduct = data;
    //this.infoProduct.id_product_attribute = this.infoProduct.id_product_attribute+"|"+
    this.getAttributeByIdProduct(this.infoProduct.id_product);
    $("#modal-product").modal("show");
  }

  openCustomer(data: any){
    //this.getCustomerInfo(data.id_customer);
    /*this.appService.getCustomerInfo(data.id_customer).subscribe(data=>{
      console.log(data);
    });*/
    console.log(data);
    this.getDepartment();
    $("#modal-customer").modal("show");
  }
  getProductById(){
    this.appService.getProductById(this.infoProduct.id_product).subscribe(data=>{
      if(Object.keys(data).length > 0){
        this.infoProduct.product = data.json()[0].product;
        this.infoProduct.supplier = data.json()[0].supplier;
        console.log(this.infoProduct);
        this.getAttributeByIdProduct(this.infoProduct.id_product);
      }
    });
  }
  getAttributeByIdProduct(id_product: number){
    this.appService.getAttributeByIdProduct(id_product).subscribe(data=>{
      this.listProductAttribute = data.json();
    });
  }

  saveInfoProduct(infoProduct: any){
    const id_product_attribute = infoProduct.id_product_attribute.split('|');
    this.infoProduct.product += ' - Color : ' + id_product_attribute[1];
    this.infoProduct.id_product_attribute = +id_product_attribute[0];
    console.log(infoProduct);
    this.appService.changeProductToOrder(this.infoProduct).subscribe(data => {
      console.log(data);
      this.infoProduct.id_product_attribute = this.infoProduct.id_product_attribute + '|' + id_product_attribute[0];
    });
  }

  getDepartment(){
    this.appService.getDepartament().subscribe(data => {
      this.oListDepartament = <Departament[]>data.json();
    });
  }
  getProvincia(id_departamento): void {
    id_departamento = id_departamento.split('|')[0];
    this.appService.getProvincia(id_departamento).subscribe(data => {
      this.oListProvince = data.json();
    });
  }

  getDistrito(id_province): void {
    id_province = id_province.split('|')[0];
    this.appService.getDistrict(id_province).subscribe(data => {
      this.oListDistrict = data.json();
    });
  }
}
