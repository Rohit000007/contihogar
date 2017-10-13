import { Component, OnInit } from '@angular/core';
import { Supplier } from './Interfaces/supplier';
import { ProductService } from './services/product.service';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
  providers:[ProductService]
})
export class ProductoComponent implements OnInit {
  lListProveedor:any[];

  /*
  Instanciar el servicio de Http*/
  constructor(private vProductService:ProductService) {
    this.vProductService.getPost().subscribe(posts=>{
      //this.lListProveedor = posts.json();
    });
   }
   //constructor(){}

  ngOnInit() {
    this.lListProveedor = [
      {id_supplier:1,name:"Juan Carlos"},
      {id_supplier:2,name:"Juan Carlos 1"},
      {id_supplier:3,name:"Juan Carlos 2"},
      {id_supplier:4,name:"Juan Carlos 3"},
    ];
    //CKEDITOR.replace('');
    window['CKEDITOR']['replace']('editor1');
    window['CKEDITOR']['replace']('editor2');
  }

  obtenerMarcas(oProveedor){
    console.log(oProveedor);
  }

  //Controlar Tab Editor
  changeTabClick(indexViewEditor){
    if(indexViewEditor == 1){
      document.getElementById("content-editor-2").style.display = "none";
      document.getElementById("content-editor-1").style.display = "block";
    }else{
      document.getElementById("content-editor-2").style.display = "block";
      document.getElementById("content-editor-1").style.display = "none";
    }
  }

}
export interface IProveedor {
  
}
