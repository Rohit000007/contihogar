import { Component, OnInit } from '@angular/core';
import { AppService } from '../service/app.service';
import { range } from 'rxjs/observable/range';
import { Router, ActivatedRoute } from '@angular/router';
import FilterData from '../data/product-filter-general';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
  providers:[AppService]
})
export class GeneralComponent implements OnInit {
  private filterData:any[] = FilterData;
  private items:any[] = [];
  private itemCount = 0;
  private sUrl:string;

  private listProductTop:any[] = [];
  private listSupplierTop:any[] = [];
  private listCategoryTop:any[] = [];
  private oOrderTotal:any = {};

  private eFilterList:Filter[] = [new Filter(),new Filter(),new Filter()];

  constructor(private appService:AppService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.getListProductTop();
    this.getOrderSupplierTop();
    this.getOrderCategoryTop();
    this.getOrderTotal();
  }

  reloadItems(params) {
    console.log(params);
    this.appService.getListProduct(params,this.eFilterList).subscribe(res=>{
      this.items = res.json()["data"];
      this.itemCount = res.json()["total"];
    });
  }

  rowClick(rowEvent) {

  }
  
  rowDoubleClick(rowEvent) {
    this.sUrl = "product/"+rowEvent.row.item.id_product;
    this.router.navigateByUrl(this.sUrl);
  }
  getListProductTop(){
    this.appService.getOrderProductTop().subscribe(rest=>{
      this.listProductTop = rest.json();
    });
  }
  getOrderSupplierTop(){
    this.appService.getOrderSupplierTop().subscribe(rest=>{
      this.listSupplierTop = rest.json();
    });
  }
  getOrderCategoryTop(){
    this.appService.getOrderCategoryTop().subscribe(rest=>{
      this.listCategoryTop = rest.json();
    });
  }
  getOrderTotal(){
    this.appService.getOrderTotal().subscribe(rest=>{
      this.oOrderTotal = rest.json();
    });
  }
}

export class Filter{
  public column:string;
  public value:string;
  constructor(){}
}
