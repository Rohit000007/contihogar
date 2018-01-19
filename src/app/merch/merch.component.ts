import { Component, OnInit } from '@angular/core';
import { Product } from '../entity/product';
import { AppService } from '../service/app.service';
import { Departament } from '../entity/departament';

@Component({
  selector: 'app-merch',
  templateUrl: './merch.component.html',
  styleUrls: ['./merch.component.scss'],
  providers: [AppService]
})
export class MerchComponent implements OnInit {

  private oProduct:Product = new Product();
  private listDepartament:Departament[] = [];
  private listProduct:any[] = [];

  private items:any[] = [];
  private itemCount = 0;
  private modelFile:string;
  private oOrderTotal:any = {};

  constructor(private oAppService:AppService) { }

  ngOnInit() {
    let elem = document.getElementsByClassName("data-table-wrapper");
    if(elem.length > 0)
      elem[0].setAttribute("style","width:3000px;");

    this.oAppService.getDepartament().subscribe(rest=>{
      this.listDepartament = rest.json();
    });
    this.getOrderTotal();
  }

  searchProduct(id_product:number):void{
    this.oAppService.getProductById(id_product).subscribe(rest=>{
      this.items = rest.json();
    });
  }
  uploadFile(oEventControl){
    let oFiles = oEventControl.target.files;
    if(oFiles.length > 0){
      let oDataForm = new FormData();
      oDataForm.append("excel",oFiles[0]);
      this.oAppService.postExcel(oDataForm).subscribe(rest=>{
        this.items = rest.json();
      });
      this.modelFile = "";
    }
  }
  rowClick(event){

  }
  rowDoubleClick(dblClicEvent){

  }
  VerficarCambio():void{
    console.log(this.items);
  }
  calculateMargen(item){
    let price = item.event_price;
    if(!isNaN(item.cupon))
    price = price - item.cupon;
    let margen = (price - item.event_cost / price);
    return isNaN(margen)?0:margen;
  }
  calculateMargenMoney(item){
    let price = item.event_price;
    if(!isNaN(item.cupon))
    price = price - item.cupon;
    let margen = (price - item.event_cost);
    return isNaN(margen)?0:margen;
  }
  calCostShipping(item){
    this.oAppService.getCostShippingMerge(item).subscribe(rest=>{
      item.cost_shipping = rest.json().cost_shipping;
      console.log(item.cost_shipping);
    });
  }
  grabar():void{
    this.oAppService.grabarProductEvent(this.items).subscribe(rest=>{
      console.log(rest);
    });
  }

  getOrderTotal(){
    this.oAppService.getOrderTotal().subscribe(rest=>{
      this.oOrderTotal = rest.json();
    });
  }

}
