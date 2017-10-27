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
  oNgChecked:boolean = false;
  oListCategoryId:number[] = [];
  oListCategory:Category[] = [];
  oListCategoryProduct:CategoryProduct[] = [];
  @Output() ObtenerCategoryId = new EventEmitter();
  @Input() CategoryProduct:CategoryProduct[]
  //#endregion

  //#region "Metodos"
  constructor(private oAppService:AppService) {
    this.oAppService.getCategory().subscribe(data=>{
      this.oListCategory = data.json();
      this.oListCategory.forEach(e=>e.isChecked = true);
    });
    setTimeout(function(){
      this.oNgChecked = true;
      console.log("aqui");
    },3000);
   }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.oNgChecked);
    console.log(changes.CategoryProduct);
  }
  
  obtenerCategoryId(id_category,isChecked){
    this.oListCategoryProduct = [];
    if(isChecked){
      this.oListCategoryId.push(id_category);
    }else{
      this.oListCategoryId.splice(this.oListCategoryId.indexOf(id_category),1);
    }

    for(let indexToAdd in this.oListCategoryId){
      this.oListCategoryProduct.push({
        id_category:this.oListCategoryId[indexToAdd]
      });
    }
    console.log(this.oListCategoryProduct);
    this.ObtenerCategoryId.emit(this.oListCategoryProduct);
  }
  //#endregion
}
