import { Component, OnInit } from '@angular/core';
import { Product } from '../entity/product';
import { AppService } from '../service/app.service';

@Component({
  selector: 'app-merch',
  templateUrl: './merch.component.html',
  styleUrls: ['./merch.component.scss'],
  providers: [AppService]
})
export class MerchComponent implements OnInit {

  private oProduct:Product = {reference:""};
  private listProduct:any[] = [];

  private items:any[] = [];
  private itemCount = 0;
  private modelFile:string;

  constructor(private oAppService:AppService) { }

  ngOnInit() {}

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
      let elem = document.getElementsByClassName("data-table-wrapper");
      if(elem.length > 0)
        elem[0].setAttribute("style","width:3000px;");
    }
  }
  rowClick(event){

  }
  rowDoubleClick(dblClicEvent){

  }
}
