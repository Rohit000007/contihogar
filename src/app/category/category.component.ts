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
  id_category: string = '1';
  oListCategory: Category[] = [];
  oListcategoryByParents: any[] = [];
  oCategory:any = {};
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

      this.AppService.getCategoryByParents(this.id_category).subscribe(response=> {
      this.oListcategoryByParents = response.json();
      console.log(this.oListcategoryByParents);
    });
  }


  grabarCategory(estado):void
  {
    this.eCategory.id_parent = this.oCategory.id_category;
    this.eCategory.level_depth = this.oCategory.level_depth + 1;
    this.eCategory.active = 1;
    this.AppService.postCategory(this.eCategory).subscribe(response=> {
      console.log(response);
    });
  }

  obtenerCategiry(oCategoryP):void{
    console.log(oCategoryP);
    this.oCategory = oCategoryP;
  }
}
