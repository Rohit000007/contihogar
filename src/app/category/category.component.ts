import { Component, OnInit } from '@angular/core';
import {AppService} from "../service/app.service";
import {Category} from "../entity/category";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers:[AppService]
})
export class CategoryComponent implements OnInit {

  eCategory: Category;
  oListCategory: Category[] = [];
  oListcategoryByParents: any[] = [];
  constructor(private AppService: AppService) {
    this.eCategory={id_category:0,CategoryLang : {description:'',
    name:'',
    meta_description:'',
    link_rewrite:'',
    meta_keywords:'',
    meta_title:''}}
  }

  ngOnInit() {
    this.AppService.getCategoryByDepth().subscribe(response=> {
      this.oListCategory = response.json();
      console.log(this.oListCategory);
    });
  }

  categoryByParents(id_parent):void{
    this.AppService.getCategoryByParents(id_parent).subscribe(response=> {
      this.oListcategoryByParents = response.json();
      console.log(this.oListcategoryByParents);
    });
  }
  grabarCategory(estado):void
  {
    this.AppService.postCategory(this.eCategory).subscribe(response=> {
      console.log(response);
    });
  }
}
