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

  private oProduct:Product = {reference:""};
  private listDepartament:Departament[] = [];
  private listProduct:any[] = [];

  private items:any[] = [];
  private itemCount = 0;
  private modelFile:string;

  constructor(private oAppService:AppService) { }

  ngOnInit() {
    let elem = document.getElementsByClassName("data-table-wrapper");
    if(elem.length > 0)
      elem[0].setAttribute("style","width:3000px;");

    this.oAppService.getDepartament().subscribe(rest=>{
      this.listDepartament = rest.json();
    });
  }

  searchProduct(reference:string):void{
    console.log(reference);
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
    let price = item.new_price;
    if(!isNaN(item.cupon))
    price = price - item.cupon;
    let margen = (price - item.new_cost / price);
    return isNaN(margen)?0:margen;
  }
  calculateMargenMoney(item){
    let price = item.new_price;
    if(!isNaN(item.cupon))
    price = price - item.cupon;
    let margen = (price - item.new_cost);
    return isNaN(margen)?0:margen;
  }
  calCostShipping(item){
    this.oAppService.getCostShippingMerge(item).subscribe(rest=>{
      item.cost_shipping_cost = rest.json().cost_shipping;
    });
  }
}
