
import { Component, OnInit,Pipe, PipeTransform  } from '@angular/core';
import { AppService} from '../service/app.service';

import{ Manufacturer } from '../entity/manufacturer';
import{ ManufacturerLang } from '../entity/manufacturer-lang';
import { Supplier } from '../entity/supplier';
import { Product } from '../entity/product';
import { ProductLang } from '../entity/product-lang';
import { CategoryProduct } from '../entity/category-product';
import { ProductEvent } from '../entity/product-event';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
  providers:[AppService]
})
export class ProductoComponent implements OnInit {

  //#region "Variables"
  oListCategory:CategoryProduct[];
  oProductLang:ProductLang;
  oProducto:Product;
  oProductEvent:ProductEvent;
  lListProveedor:Supplier[];
  lListManufacturer:Manufacturer[];
  //#endrregion 
  
  //#region "Metodos"
  constructor(private oAppService:AppService) {
    this.oProducto = {id_supplier:0,id_manufacturer:0,quantity:0};
    this.oProductLang = {name:"",meta_description:"",meta_keywords:"",meta_title:"",link_rewrite:""};
    this.oProductEvent = {id_product:3};
    this.oListCategory = [];

    this.oAppService.getSupplier().subscribe(data=>{
      this.lListProveedor = data.json().oProduct;
    });

    this.oAppService.getManufacturer().subscribe(data=>{
      this.lListManufacturer = data.json();
    });
  }

  ngOnInit() {
    window['CKEDITOR']['replace']('description_short');
    window['CKEDITOR']['replace']('description');
  }

  obtenerMarcas(oProveedor){
    let eSupplier = new Supplier(0,"Coca Cola",new Date(),null,0);
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
    /*window['CKEDITOR']['replace']('editor2', {
      removeButtons: 'Save,Print,Checkbox,Radio,TextField,Textarea,Select,Form,Button,ImageButton,HiddenField,CreatePlaceholder,Flash,About',
      /*font_defaultLabel : 'Arial',
      fontSize_defaultLabel : '9px'*/
    //});
    /*console.log("LlEGO");
    window['CKEDITOR'].instances.editor2.editorConfig =  function(config){
      console.log(config);
      config.toolbar = [
        {name:'clipboard',items:['Cut','Copy','Paste']},
      ];
    }*/

    //window['CKEDITOR'].instances.editor2.config.removeButtons = 'Save,Print,Checkbox,Radio,TextField,Textarea,Select,Form,Button,ImageButton,HiddenField,CreatePlaceholder,Flash,About';

    //console.log(window['CKEDITOR'].instances.editor2);

  }

  enviarProducto(){
  //Recoger le precio de producto
    this.oProductEvent = {
      cost_impact: parseInt((<HTMLInputElement>document.getElementById('cost_impact')).value),
      price_impact:parseInt((<HTMLInputElement>document.getElementById('price_impact')).value),
      price_start_date:new Date((<HTMLInputElement>document.getElementById('price_start_date')).value),
      price_end_date:new Date((<HTMLInputElement>document.getElementById('price_end_date')).value),
      tax_cost_impact:parseInt((<HTMLInputElement>document.getElementById('tax_cost_impact')).value),
      tax_price_impact:parseInt((<HTMLInputElement>document.getElementById('tax_price_impact')).value),
      cost_end_date:new Date((<HTMLInputElement>document.getElementById('cost_end_date')).value),
      cost_start_date:new Date((<HTMLInputElement>document.getElementById('cost_start_date')).value),
      event_cost:parseInt((<HTMLInputElement>document.getElementById('event_cost')).value),
      event_price:parseInt((<HTMLInputElement>document.getElementById('event_price')).value),
    }
    this.oProducto.ProductEvent = this.oProductEvent;
    this.oProducto.CategoryProduct = this.oListCategory;
    this.oProducto.ProductLang = {
      description:window["CKEDITOR"].instances.description.getData(),
      description_short:window["CKEDITOR"].instances.description_short.getData(),
      name:this.oProductLang.name,
      meta_description:this.oProductLang.meta_description,
      meta_keywords:this.oProductLang.meta_keywords,
      meta_title:this.oProductLang.meta_title,
      link_rewrite:this.oProductLang.link_rewrite
    };
    this.oAppService.saveProduct(this.oProducto).subscribe(data=>{
      console.log(data);
    });
    console.log(this.oProducto);
  }
  chekClickNow(item){
    console.log(item);
  }
   
  getGategoryId(category){
    this.oListCategory.push(category);
  }
  //#endregion
}
