
import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';

import{Manufacturer} from '../entity/manufacturer';
import{ManufacturerLang} from '../entity/manufacturer-lang';
import {Supplier} from '../entity/supplier';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
  providers:[ProductService]
})
export class ProductoComponent implements OnInit {
  lListProveedor:Supplier[];

  /*
  Instanciar el servicio de Http*/
  constructor(private vProductService:ProductService) {
   }
   //constructor(){}

  ngOnInit() {
    //CKEDITOR.replace('');
    window['CKEDITOR']['replace']('editor1');
    window['CKEDITOR']['replace']('editor2');

    var eManufacturer = new Manufacturer(0,'David Choque',null,null,0,new ManufacturerLang(0,2,"Hola Mundo","Hola Mundo Short","No se Nada",'KEY_WORD','Mi Mundo'));
    console.log(eManufacturer);

    /*this.vProductService.getPost().subscribe(posts=>{
      this.lListProveedor = posts.json();
    });*/
    this.vProductService.getSupplier().subscribe(data=>{
      //console.log(data.json());
      this.lListProveedor = data.json();
    });

  }

  obtenerMarcas(oProveedor){
    //console.log(oProveedor);
    let eSupplier = new Supplier(0,"Coca Cola",new Date(),null,0);
    console.log(eSupplier);
    this.vProductService.postSupplier(eSupplier).subscribe(data=>{
      console.log(data);
    });
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
