
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
import { Model } from '../entity/model';
import { ModelProduct } from '../entity/model-product';
import { Category } from '../entity/category';
import { ProductCrossCategory } from '../entity/product-cross-category';
import { ProductItemShipping } from '../entity/product-item-shipping';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
  providers:[AppService]
})
export class ProductoComponent implements OnInit {


  //#region "Variables"
  bProductCategoryEdit:boolean = false;
  sMessageTitle:string = "";
  oMessageError:string[] = [];
  isVisible:boolean = false;
  isEditProductItem:boolean = false;
  oProductLang:ProductLang;
  oProducto:Product;
  oProductEvent:ProductEvent = {id_product:0};
  oModel:Model = {nombre:""};
  
  oListModels:Model[];
  oListProductModel:ModelProduct[] = [];
  oListCategoryProduct:CategoryProduct[] = [];
  lListProveedor:Supplier[] = [];
  lListManufacturer:Manufacturer[];
  oListCategory:Category[] = [];
  oListProductCrossCategory:ProductCrossCategory[] = [];

  //#endrregion 
  
  //#region "Metodos"
  constructor(private oAppService:AppService) {
    this.oProducto = {id_product:0,id_supplier:0,id_manufacturer:0,quantity:0,reference:"",condition:""};
    this.oProductLang = {name:"",meta_description:"",meta_keywords:"",meta_title:"",link_rewrite:"",inst_message:""};
    this.oProducto.ProductItem = [];
    
    this.oAppService.getSupplier().subscribe(data=>this.lListProveedor = data.json().oProduct);

    this.oAppService.getManufacturer().subscribe(data=>this.lListManufacturer = data.json());

    this.oAppService.getModelo().subscribe(data=>this.oListModels = data.json());

    this.oAppService.getCategory().subscribe(data=>this.oListCategory = data.json());
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
  }

  enviarProducto(){
    //Limpiar Variables antes de llenar
    this.oProducto.ProductItem = [];
    //Recoger los ProductsItem
    var oFormElements = document.getElementsByName("frmProductoItem");
    for(let i = 0;i<oFormElements.length;i++ ){
      let oFormDataElements = (<HTMLFormElement>oFormElements[i]).elements;
      let vProductItem:ProductItem = {
        id_product_item:oFormDataElements["id_product_item"].value,
        id_product:0,
        cantidad:oFormDataElements["unidades_producto_item"].value,
        nombre:oFormDataElements["nombre_producto_item"].value,
        descripcion:"",
        ProductItemShipping:[],
        ProductItemCaracteristica:[]
      };

      let oFormsItemShipping = document.getElementsByName(oFormElements[i].id);//Buscar su formulario de Product Shipping
      for(let __i = 0;__i<oFormsItemShipping.length;__i++){
        let oFormDataElementsShipping = (<HTMLFormElement>oFormsItemShipping[__i]).elements;
        let vProductItemShipping:ProductItemShipping = {
          alto:oFormDataElementsShipping["altura_cm_transporte"].value,
          ancho:oFormDataElementsShipping["ancho_cm_transporte"].value,
          peso:oFormDataElementsShipping["peso_kg_transporte"].value,
          profundidad:oFormDataElementsShipping["profundidad_cm_transporte"].value,
          id_product_item:0
        }
        vProductItem.ProductItemShipping.push(vProductItemShipping);
      }
      let oListProductItemCaracteristica = [
        {nombre:"Estilo",valor:oFormDataElements["estilo_producto_item"].value,campo:"estilo_producto_item"},
        {nombre:"Tipo de tapiz",valor:oFormDataElements["tipo_tapiz_producto_item"].value,campo:"tipo_tapiz_producto_item"},
        {nombre:"Color de tapiz",valor:oFormDataElements["color_tapiz_producto_item"].value,campo:"color_tapiz_producto_item"},
        {nombre:"Tipo de relleno",valor:oFormDataElements["tipo_relleno_producto_item"].value,campo:"tipo_relleno_producto_item"},
        {nombre:"Material de estructra",valor:oFormDataElements["material_estructura_producto_item"].value,campo:"material_estructura_producto_item"},
        {nombre:"Armado",valor:oFormDataElements["armado_producto_item"].value,campo:"armado_producto_item"},
        {nombre:"Garantia",valor:oFormDataElements["garantia_producto_item"].value,campo:"garantia_producto_item"},
        {nombre:"Entega (Dias)",valor:oFormDataElements["entrega_dias_producto_item"].value,campo:"entrega_dias_producto_item"},
        {nombre:"Altura (cm)",valor:oFormDataElements["altura_cm_producto"].value,campo:"altura_cm_producto"},
        {nombre:"Ancho (cm)",valor:oFormDataElements["ancho_cm_producto"].value,campo:"ancho_cm_producto"},
        {nombre:"Profundidad (cm)",valor:oFormDataElements["profundidad_cm_producto"].value,campo:"profundidad_cm_producto"},
        {nombre:"Peso (kg)",valor:oFormDataElements["peso_kg_producto"].value,campo:"peso_kg_producto"}
      ];


      vProductItem.ProductItemCaracteristica = oListProductItemCaracteristica;
      this.oProducto.ProductItem.push(vProductItem);
    }

  //Recoger le precio de producto
    this.oProductEvent = {
      id_product_event:parseInt((<HTMLInputElement>document.getElementById('id_product_event')).value),
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
    this.oProducto.CategoryProduct = this.oListCategoryProduct;
    this.oProducto.ModelProduct = this.oListProductModel;
    this.oProducto.ProductCrossCategory = this.oListProductCrossCategory;
    this.oProducto.ProductLang = {
      description:window["CKEDITOR"].instances.description.getData(),
      description_short:window["CKEDITOR"].instances.description_short.getData(),
      name:this.oProductLang.name,
      meta_description:this.oProductLang.meta_description,
      meta_keywords:this.oProductLang.meta_keywords,
      meta_title:this.oProductLang.meta_title,
      link_rewrite:this.oProductLang.link_rewrite,
      inst_message:this.oProductLang.inst_message
    };

    console.log(this.oProducto);
    console.log(this.oProducto.ProductItem);
    if(this.ValidarFormulario(this.oProducto)){
      console.log("Agrega");
      if(this.oProducto.id_product == 0){
        if(confirm("¿Está seguro de grabar?") == true){
        this.oAppService.saveProduct(this.oProducto).subscribe(data=>{
            console.log(data);
          });
        }
      }else{
        if(confirm("¿Está seguro de actualizar?") == true){
          this.oAppService.updateProduct(this.oProducto).subscribe(data=>{
              console.log(data);
            });
          }
      }
    }
  }
  agregarNuevoModelo(oModel:Model):void{
    if(oModel.nombre == ""){
      console.log("Mostrar Alerta")
    }else{
      let oModelProduct:ModelProduct = {id_model:0,id_product:0,model:oModel};
      this.oListProductModel.push(oModelProduct);
      this.oModel = {nombre:""};
    }
  }
  agregarModel(oModel):void{
    if(oModel == ""){
      console.log("Mostrar Alerta");
    }else{
      var sModelSplit = oModel.toString().split("|");
      let oModelProduct:ModelProduct = {id_model:sModelSplit[0],id_product:0,model:{nombre:sModelSplit[1]}};
      this.oListProductModel.push(oModelProduct);
    }
  }

  eliminarModelo(indexModelo):void{
    this.oListProductModel.splice(indexModelo,1);
  }
   
  getGategoryId(oListcCategoryProduct):void{
    console.log(oListcCategoryProduct);
    this.oListCategoryProduct = oListcCategoryProduct;
  }

  agregarCrossCategery(sCategory):void{
    let oCategory = sCategory.toString().split("|");
    let iProductCrossCategory:ProductCrossCategory = {
      id_categoria:parseInt(oCategory[0]),
      Category:{CategoryLang:{name:oCategory[1]}}
    };
    this.oListProductCrossCategory.push(iProductCrossCategory);
    console.log(this.oListProductCrossCategory);
  }
  eliminarCrossCategory(indexCrossCategory):void{
    this.oListProductCrossCategory.splice(indexCrossCategory,1);
  }
  //#endregion

  ValidarFormulario(oProduct:Product): boolean {
    this.oMessageError = [];
    let vRetorno = true;
    if(oProduct.id_supplier == 0){
      vRetorno = false;
      this.oMessageError.push("Selecciona campo proveedor");
    }
    if(oProduct.id_manufacturer == 0){
      vRetorno = false;
      this.oMessageError.push("Selecciona campo marca");
    }
    if(oProduct.ProductLang.name == ""){
      vRetorno = false;
      this.oMessageError.push("Ingrese nombre del producto");
    }
    if(oProduct.reference == ""){
      vRetorno = false;
      this.oMessageError.push("Ingrese SKU proveedor");
    }
    if(oProduct.quantity <= 0){
      vRetorno = false;
      this.oMessageError.push("Ingrese Unidades");
    }
    if(oProduct.CategoryProduct.length == 0){
      vRetorno = false;
      this.oMessageError.push("Seleccione categoria");
    }
    if(!vRetorno){
      this.isVisible = true;
      this.sMessageTitle = "Campos requeridos *";
    }
    console.log(this.oMessageError);
    return vRetorno;
  }
  MessageBoxClose(bMessageBoxClose):void{
    this.isVisible = bMessageBoxClose;
  }

  buscarProduct():void{
    this.oAppService.editProduct(this.oProducto.id_product).subscribe(data=>{
      this.bProductCategoryEdit = true;
      this.oProducto = data;
      this.oProductLang = this.oProducto.ProductLang;
      this.oListProductCrossCategory = [];
      for(let _i in this.oProducto.ProductCrossCategory){
        let iProductCrossCategory:ProductCrossCategory = {
          id_categoria:this.oProducto.ProductCrossCategory[_i].id_categoria,
          Category:{CategoryLang:this.oProducto.ProductCrossCategory[_i].Category["category_lang"]}
        };
        this.oListProductCrossCategory.push(iProductCrossCategory);
      }
      this.oListProductModel = [];
      for(let __i in this.oProducto.ModelProduct){
        let oModelProduct:ModelProduct = {
          id_model:this.oProducto.ModelProduct[__i].id_model,
          id_product:this.oProducto.ModelProduct[__i].id_product,
          model:this.oProducto.ModelProduct[__i].model
        };
        this.oListProductModel.push(oModelProduct);
      }
      this.isEditProductItem = true;
      console.log(this.oProducto.CategoryProduct);
      
      //this.oListProductModel = this.oProducto.ModelProduct;
      window["CKEDITOR"].instances["description_short"].setData(this.oProductLang.description_short);
      window["CKEDITOR"].instances["description"].setData(this.oProductLang.description);
    });
  }
  verificarEnter(eEvent):boolean{
    eEvent.preventDefault();
    console.log(event);
    return false;
  }
}
