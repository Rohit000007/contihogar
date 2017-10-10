import { Component, OnInit } from '@angular/core';
import { Supplier } from './Interfaces/supplier';
import { ProductService } from './services/product.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
  providers:[ProductService]
})
export class ProductoComponent implements OnInit {
  lListProveedor:any[];

  /*
  Instanciar el servicio de Http
  constructor(private vProductService:ProductService) {
    this.vProductService.getPost().subscribe(posts=>{
      console.log(posts);
    });
   }*/
   constructor(){}

  ngOnInit() {
    this.lListProveedor = [
      {id_supplier:1,name:"Juan Carlos"},
      {id_supplier:2,name:"Juan Carlos 1"},
      {id_supplier:3,name:"Juan Carlos 2"},
      {id_supplier:4,name:"Juan Carlos 3"},
    ];
  }

  changeProveedor(oProveedor){
    console.log(oProveedor);
  }

}
export interface IProveedor {
  
}
