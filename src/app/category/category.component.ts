import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

import {AppService} from "../service/app.service";
import {Category} from "../entity/category";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers:[AppService]
})
export class CategoryComponent implements OnInit {
  public oListMessageError:any[] = [];
  public isVisible:boolean = false;
  public sMessageTitle:string = "Mensaje";

  public sAcctionForm:string = "nuevo";
  public eCategory: Category;
  public id_category: string = '1';
  public oListcategory: any[] = [];
  public oCategory:any = {};

  public categoryName:SafeResourceUrl;

  constructor(private AppService: AppService,private sanitizer:DomSanitizer) {
    this.nuevaCategoria();
  }

  ngOnInit() {
    this.listarCategoria();
  }


  cambiarEstado(id_category,active):void{
    this.eCategory.active = active;
    this.eCategory.id_category = id_category;
    this.eCategory.isUpdateAll = false;
    this.AppService.changeCategoryActive(this.eCategory).subscribe(data=>{
      this.listarCategoria();
    });
  }
  grabarCategory(estado):void{
    this.oListMessageError = [];
    if(Object.entries(this.oCategory).length == 0){
      this.oListMessageError.push("Selecciona la categoria padre");
      this.isVisible = true;
      return;
    }
    if(this.eCategory.id_category == 0){
      this.eCategory.id_parent = this.oCategory.id_category;
      this.eCategory.level_depth = this.oCategory.level_depth + 1;
      this.eCategory.active = 1;
      this.AppService.postCategory(this.eCategory).subscribe(response=> {
        let oCategory = <Category>response.json();
        if(oCategory.id_category > 0){
          this.oListMessageError = ["Grabación exitosa id_categoria : "+oCategory.id_category];
          this.isVisible = true;
          this.listarCategoria();
        }
      });
    }else{
      this.eCategory.isUpdateAll = true;
      this.AppService.putCategory(this.eCategory).subscribe(data=>{
        if(data.json().res == true){
          this.oListMessageError = ["Actualización exitosa id_categoria : "+this.eCategory.id_category];
          this.isVisible = true;
          this.listarCategoria();
        }
      });
    }
  }

  obtenerCategory(oCategoryP,oControl):void{
    let ulElement = <HTMLCollectionOf<HTMLLIElement>>document.getElementsByClassName("li-lista-categoria");
    for(let _i=0;_i<ulElement.length;_i++){
      (<HTMLLIElement>ulElement[_i]).className = "li-lista-categoria";
    }
    (<HTMLLIElement>oControl).className = "li-lista-categoria active";
    this.oCategory = oCategoryP;
    this.AppService.getCategoryById(this.oCategory.id_category).subscribe(data=>{
      this.eCategory = <Category>data.json();
    });
    this.categoryName = this.sanitizer.bypassSecurityTrustResourceUrl("https://hogaryspacios.com/cat"+this.oCategory.id_category+"-"+this.oCategory.link_rewrite); 
    console.log(this.categoryName);
  }

  listarCategoria():void{
    this.AppService.getCategoryByParents(this.id_category).subscribe(response=> {
      this.oListcategory = response.json();
    });
  }

  MessageBoxClose(bMessageBoxClose):void{
    this.isVisible = bMessageBoxClose;
  }

  formAction(sActionForm):void{
    this.sAcctionForm = sActionForm;
    if(this.sAcctionForm == "nuevo"){
      this.nuevaCategoria();
    }
  }

  nuevaCategoria():void{
    this.eCategory = {
      id_category:0,
      CategoryLang : {
        description:'',
        name:'',
        meta_description:'',
        link_rewrite:'',
        meta_keywords:'',
        meta_title:''},
      active:0}
    this.oCategory = {};
  }
}
