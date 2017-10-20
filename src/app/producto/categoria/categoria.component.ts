import { Component, OnInit,EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../entity/category';
import { AppService } from '../../service/app.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
  providers: [AppService]
})
export class CategoriaComponent implements OnInit {
  //#region "Variables"
  oCategoryListSelected:any[];
  oCategoryAllSelected:any[];
  oListCategory:Category[];
  @Output() ObtenerCategoryId = new EventEmitter();
  //#endregion

  //#region "Metodos"
  constructor(private oAppService:AppService) {
    this.oAppService.getCategory().subscribe(data=>{
      this.oListCategory = data.json();
      //console.log(this.oListCategory);
      this.oCategoryAllSelected = [];
      this.oCategoryListSelected = [];
    });
   }

  ngOnInit() {
  }

  obtenerCategoryId(id_category){
    /*if(this.oCategoryAllSelected.length > 1){
      for(let index in this.oCategoryAllSelected){
        console.log(this.oCategoryAllSelected[index],id_category);
        if(this.oCategoryAllSelected[index] !== id_category){
          //console.log(this.oCategoryAllSelected[index],id_category);
          //this.oCategoryListSelected.push({id_category:id_category});
        }else{
          this.oCategoryAllSelected.splice(parseInt(index),1)
        }
      }
      console.log(this.oCategoryAllSelected);
    }
    this.oCategoryAllSelected.push(id_category);*/
    this.ObtenerCategoryId.emit({id_category:id_category});
    //this.oCategoryListSelected = [];
  }

  //#endregion
}
