
import { Component, OnInit,Pipe, PipeTransform  } from '@angular/core';
import { AppService} from '../service/app.service';

import{ Manufacturer } from '../entity/manufacturer';
import{ ManufacturerLang } from '../entity/manufacturer-lang';
import { Supplier } from '../entity/supplier';
import { Product } from '../entity/product';
import { ProductLang } from '../entity/product-lang';
import { CategoryProduct } from '../entity/category-product';
import { ProductEvent } from '../entity/product-event';
import { ProductItem } from '../entity/product-item';
import { ProductItemCaracteristica } from '../entity/product-item-caracteristica';
import { ProductItemLang } from '../entity/product-item-lang';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
  providers:[AppService]
})
export class ProductoComponent implements OnInit {

  //#region "Variables"
  oProductLang:ProductLang;
  oProducto:Product;
  oProductEvent:ProductEvent;
  oProductItem:ProductItem;
  oProductItemCaracteristica:ProductItemCaracteristica;
  oProductItemLang:ProductItemLang;

  lListProductItem:ProductItem[];
  lListProductItemCaracteristica:ProductItemCaracteristica[];
  lListProductItemLang:ProductItemLang[];
  oListCategory:CategoryProduct[];
  lListProveedor:Supplier[];
  lListManufacturer:Manufacturer[];
  //#endrregion 
  
  //#region "Metodos"
  constructor(private oAppService:AppService) {
    this.oProducto = {id_supplier:0,id_manufacturer:0,quantity:0};
    this.oProductLang = {name:"",meta_description:"",meta_keywords:"",meta_title:"",link_rewrite:""};
    this.oProductEvent = {id_product:3};
    this.oListCategory = [];
    this.lListProductItem = [];
    this.lListProductItemCaracteristica = [];
    this.lListProductItemLang = [];
    this.oProducto.ProductItemCaracteristica = [];

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
    //Recoger los ProductsItem
    var oFormElements = document.getElementsByName("frmProductoItem");
    for(let i = 0;i<oFormElements.length;i++ ){
      let oFormDataElements = (<HTMLFormElement>oFormElements[i]).elements;
      this.lListProductItem.push({
        alto:oFormDataElements["altura_cm_transporte"].value,
        ancho:oFormDataElements["ancho_cm_transporte"].value,
        cantidad:oFormDataElements["unidades_producto_item"].value,
        peso:oFormDataElements["peso_kg_transporte"].value,
        profundidad:oFormDataElements["profundidad_cm_transporte"].value
      });

      this.lListProductItemCaracteristica.push({nombre:"Estilo",valor:oFormDataElements["estilo_producto_item"].value});
      this.lListProductItemCaracteristica.push({nombre:"Tipo de tapiz",valor:oFormDataElements["tipo_tapiz_producto_item"].value});
      this.lListProductItemCaracteristica.push({nombre:"Color de tapiz",valor:oFormDataElements["color_tapiz_producto_item"].value});
      this.lListProductItemCaracteristica.push({nombre:"Tipo de relleno",valor:oFormDataElements["tipo_relleno_producto_item"].value});
      this.lListProductItemCaracteristica.push({nombre:"Material de estructra",valor:oFormDataElements["material_estructura_producto_item"].value});
      this.lListProductItemCaracteristica.push({nombre:"Armado",valor:oFormDataElements["armado_producto_item"].value});
      this.lListProductItemCaracteristica.push({nombre:"Garantia",valor:oFormDataElements["garantia_producto_item"].value});
      this.lListProductItemCaracteristica.push({nombre:"Entega (Dias)",valor:oFormDataElements["entrega_dias_producto_item"].value});
      this.lListProductItemCaracteristica.push({nombre:"Unidades",valor:oFormDataElements["unidades_producto_item"].value});
      this.lListProductItemCaracteristica.push({nombre:"Altura (cm)",valor:oFormDataElements["altura_cm_producto"].value});
      this.lListProductItemCaracteristica.push({nombre:"Ancho (cm)",valor:oFormDataElements["ancho_cm_producto"].value});
      this.lListProductItemCaracteristica.push({nombre:"Profundidad (cm)",valor:oFormDataElements["profundidad_cm_producto"].value});
      this.lListProductItemCaracteristica.push({nombre:"Peso (kg)",valor:oFormDataElements["peso_kg_producto"].value});

      this.lListProductItemLang.push({nombre:oFormDataElements["nombre_producto_item"].value});
      this.oProducto.ProductItemCaracteristica = this.lListProductItemCaracteristica; 
      this.lListProductItemCaracteristica = [];
    }
    this.oProducto.ProductItem = this.lListProductItem;
    this.oProducto.ProductItemLang = this.lListProductItemLang;

    console.log(this.oProducto);
  //Recoger le precio de producto
    /*this.oProductEvent = {
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
    });*/
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
