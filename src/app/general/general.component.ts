import { Component, OnInit } from '@angular/core';
import { AppService } from '../service/app.service';
import { range } from 'rxjs/observable/range';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
  providers:[AppService]
})
export class GeneralComponent implements OnInit {
  private totalPages:number = 0;
  private currentPage:number = 1;
  private range:number[] = [];

  private listProduct:any[] = [];
  private listProductTop:any[] = [];
  constructor(private appService:AppService) { }

  ngOnInit() {
    this.getListProduct();
    this.getListProductTop();
  }

  getListProduct(pageNumber?):void{
    /*if(pageNumber === undefined){
      pageNumber = '1';
    }*/
    
    this.appService.getListProduct(pageNumber).subscribe(res=>{
      let products = res.json();

      this.listProduct = products;
      this.totalPages = products.last_page;
      this.currentPage = products.current_page;

      var pages = [];
      for(let _i = 1;_i <= products.last_page;_i++) {
        pages.push(_i);
      }
      this.range = pages;
    });
  }

  getListProductTop(){
    this.appService.getOrderProductTop().subscribe(rest=>{
      this.listProductTop = rest.json();
    });
  }
}