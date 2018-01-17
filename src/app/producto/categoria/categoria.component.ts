import { Component, OnInit,EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Category } from '../../entity/category';
import { AppService } from '../../service/app.service';
import { CategoryProduct } from '../../entity/category-product';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
  providers: [AppService]
})
export class CategoriaComponent implements OnChanges,OnInit {
  //#region "Variables"
  private oListCategoryId: number[] = [];
  private oListCategory: Category[] = [];
  private oListCategoryProduct: CategoryProduct[] = [];

  @Output() ObtenerCategoryId = new EventEmitter();
  @Input() CategoryProduct: CategoryProduct[];
  @Input() ProductCategoryEdit = false;
  //#endregion

  //#region "Metodos"
  constructor(private oAppService:AppService) {
    this.oAppService.getCategory().subscribe(data=>{
      this.oListCategory = data.json();
    });
   }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.oListCategoryId = [];
    if(this.ProductCategoryEdit){
      let oListCategoryProduct = <CategoryProduct[]>changes.CategoryProduct.currentValue;
      for(let _i in oListCategoryProduct){
        this.oListCategoryId.push(oListCategoryProduct[_i].id_category);
        for(let __i in this.oListCategory){
          if(this.oListCategory[__i].id_category == oListCategoryProduct[_i].id_category)
            this.oListCategory[__i].isChecked = true;
        }
      }
      this.emitirResultadoPadre(this.oListCategoryId);
    }
  }
  
  obtenerCategoryId(id_category,isChecked){
    if(isChecked){
      this.oListCategoryId.push(id_category);
    }else{
      this.oListCategoryId.splice(this.oListCategoryId.indexOf(id_category),1);
    }
    this.emitirResultadoPadre(this.oListCategoryId);
  }
  emitirResultadoPadre(oListCategoryId){
    this.oListCategoryProduct = [];
    for(let indexToAdd in this.oListCategoryId){
      this.oListCategoryProduct.push({
        id_category:this.oListCategoryId[indexToAdd]
      });
    }
    this.ObtenerCategoryId.emit(this.oListCategoryProduct);
  }
  //#endregion
}
