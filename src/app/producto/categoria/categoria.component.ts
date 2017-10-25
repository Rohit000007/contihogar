import { Component, OnInit,EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../entity/category';
import { AppService } from '../../service/app.service';
import { CategoryProduct } from '../../entity/category-product';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
  providers: [AppService]
})
export class CategoriaComponent implements OnInit {
  //#region "Variables"
  oListCategoryId:number[] = [];
  oListCategory:Category[] = [];
  oListCategoryProduct:CategoryProduct[] = [];
  @Output() ObtenerCategoryId = new EventEmitter();
  //#endregion

  //#region "Metodos"
  constructor(private oAppService:AppService) {
    this.oAppService.getCategory().subscribe(data=>{
      this.oListCategory = data.json();
    });
   }

  ngOnInit() {}

  obtenerCategoryId(id_category){
    this.oListCategoryProduct = [];
    if(!this.oListCategoryId.includes(id_category)){
      this.oListCategoryId.push(id_category);
    }else{
      this.oListCategoryId.splice(this.oListCategoryId.indexOf(id_category),1);
    }

    for(let indexToAdd in this.oListCategoryId){
      this.oListCategoryProduct.push({
        id_category:this.oListCategoryId[indexToAdd]
      });
    }
    this.ObtenerCategoryId.emit(this.oListCategoryProduct);
  }
  //#endregion
}
