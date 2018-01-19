
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
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
  providers:[AppService]
})
export class ProductoComponent implements OnInit {
  //#region "Variables"
  private type_save_return = 1;
  private type_save_keep = 2;

  iIdProduct = 0;
  bProductCategoryEdit = false;
  sMessageTitle = '';
  oMessageError: string[] = [];
  isVisible = false;
  isEditProductItem = false;
  private oProductLang: ProductLang = new ProductLang();
  private oProducto: Product = new Product();
  private oProductEvent: ProductEvent = new ProductEvent();
  private oModel: Model = new Model();
  
  oListModels: Model[];
  oListProductModel: ModelProduct[] = [];
  oListCategoryProduct: CategoryProduct[] = [];
  lListProveedor: Supplier[] = [];
  lListManufacturer: Manufacturer[];
  oListCategory: Category[] = [];
  oListProductCrossCategory: ProductCrossCategory[] = [];

  //#endrregion 
  
  //#region "Metodos"
  constructor(private oAppService: AppService,
              private route: ActivatedRoute,
              private router: Router){
    this.oAppService.getSupplier().subscribe(data=>this.lListProveedor = data.json().oProduct);

    this.oAppService.getManufacturer().subscribe(data=>this.lListManufacturer = data.json());

    this.oAppService.getModelo().subscribe(data=>this.oListModels = data.json());

    this.oAppService.getCategory().subscribe(data=>this.oListCategory = data.json());
  }

  ngOnInit() {

    //console.log(window['CKEDITOR']);
    window['CKEDITOR']['replace']('description_short');
    window['CKEDITOR']['replace']('description');
    this.route.params.subscribe(params=>{
      this.oProducto.id_product = +params['id'];
      if(this.oProducto.id_product > 0)
        this.buscarProduct(this.oProducto.id_product);
      else
        this.newProduct();
    });
  }

  obtenerMarcas(oProveedor){
    let eSupplier = new Supplier();
  }

  // Controlar Tab Editor
  changeTabClick(indexViewEditor){
    if(indexViewEditor == 1){
      document.getElementById("content-editor-2").style.display = "none";
      document.getElementById("content-editor-1").style.display = "block";
    }else {
      document.getElementById("content-editor-2").style.display = "block";
      document.getElementById("content-editor-1").style.display = "none";
    }
  }

  enviarProducto(type_save: number){
    // Limpiar Variables antes de llenar
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
          cantidad:oFormDataElementsShipping["cantidad_item_transporte"].value,
          id_product_item:0
        }
        vProductItem.ProductItemShipping.push(vProductItemShipping);
      }
      let oListProductItemCaracteristica = [
        {nombre:"Estilo",valor:oFormDataElements["estilo_producto_item"].value,campo:"estilo_producto_item",orden:1},
        {nombre:"Tipo de tapiz",valor:oFormDataElements["tipo_tapiz_producto_item"].value,campo:"tipo_tapiz_producto_item",orden:2},
        {nombre:"Color de tapiz",valor:oFormDataElements["color_tapiz_producto_item"].value,campo:"color_tapiz_producto_item",orden:3},
        {nombre:"Tipo de relleno",valor:oFormDataElements["tipo_relleno_producto_item"].value,campo:"tipo_relleno_producto_item",orden:4},
        {nombre:"Material de estructra",valor:oFormDataElements["material_estructura_producto_item"].value,campo:"material_estructura_producto_item",orden:5},
        {nombre:"Armado",valor:oFormDataElements["armado_producto_item"].value,campo:"armado_producto_item",orden:6},
        {nombre:"Garantia",valor:oFormDataElements["garantia_producto_item"].value,campo:"garantia_producto_item",orden:7},
        {nombre:"Entrega (Dias)",valor:oFormDataElements["entrega_dias_producto_item"].value,campo:"entrega_dias_producto_item",orden:8},
        {nombre:"Altura (cm)",valor:oFormDataElements["altura_cm_producto"].value,campo:"altura_cm_producto",orden:9},
        {nombre:"Ancho (cm)",valor:oFormDataElements["ancho_cm_producto"].value,campo:"ancho_cm_producto",orden:10},
        {nombre:"Profundidad (cm)",valor:oFormDataElements["profundidad_cm_producto"].value,campo:"profundidad_cm_producto",orden:11},
        {nombre:"Peso (kg)",valor:oFormDataElements["peso_kg_producto"].value,campo:"peso_kg_producto",orden:12}
      ];


      vProductItem.ProductItemCaracteristica = oListProductItemCaracteristica;
      this.oProducto.ProductItem.push(vProductItem);
    }
    this.oProductLang.description = window["CKEDITOR"].instances.description.getData();
    this.oProductLang.description_short = window["CKEDITOR"].instances.description_short.getData(),
    this.oProductLang.link_rewrite = (<HTMLInputElement>document.getElementById("link_rewrite")).value;
    //console.log(this.oProductLang.link_rewrite);

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
    this.oProducto.ProductLang = this.oProductLang;

    // console.log(this.oProducto);
    // console.log(this.oProducto.ProductItem);
    this.sMessageTitle = "Mensaje";
    if(this.ValidarFormulario(this.oProducto)){
      if(this.oProducto.id_product == 0){
        if(confirm("¿Está seguro de grabar?") == true){
          this.oAppService.saveProduct(this.oProducto).subscribe(data=>{
            this.iIdProduct = data.json().id_product;
            this.isVisible = true;
            this.oMessageError = ["Grabación Exitosa Id Producto: "+this.iIdProduct];
          });
          //Verificar si es con returno o keep
          /*if(type_save === this.type_save_return)
            this.router.navigateByUrl("general");*/
        }
      }else{
        if(confirm("¿Está seguro de actualizar?") == true){
          this.oAppService.updateProduct(this.oProducto).subscribe(data=>{
              console.log(data);
              this.iIdProduct = data.json().id_product;
              this.isVisible = true;
              this.oMessageError = ["Actualización Exitosa Id Producto: "+this.iIdProduct];
            });
          }
          //Verificar si es con returno o keep
          /*if(type_save === this.type_save_return)
            this.router.navigateByUrl("general");*/
      }
    }
  }
  agregarNuevoModelo(oModel:Model):void{
    if(oModel.nombre == ""){
      console.log("Mostrar Alerta")
    }else{
      let oModelProduct:ModelProduct = {id_model:0,id_product:0,model:oModel};
      this.oListProductModel.push(oModelProduct);
      this.oModel = new Model();
    }
  }
  agregarModel(oModel):void{
    if(oModel === '') {
      console.log('Mostrar Alerta');
    }else {
      const sModelSplit = oModel.toString().split('|');

      const oModelProduct:ModelProduct = new ModelProduct();
      oModelProduct.id_model = +sModelSplit[0];
      oModelProduct.id_product = 0;
      oModelProduct.model = new Model();
      oModelProduct.model.nombre = sModelSplit[1];
      this.oListProductModel.push(oModelProduct);
    }
  }

  eliminarModelo(indexModelo): void {
    this.oListProductModel.splice(indexModelo,1);
  }
   
  getGategoryId(oListcCategoryProduct): void {
    this.oListCategoryProduct = oListcCategoryProduct;
  }

  agregarCrossCategery(sCategory): void {
    let oCategory = sCategory.toString().split("|");
    let iProductCrossCategory:ProductCrossCategory = {
      id_category:parseInt(oCategory[0]),
      Category:{CategoryLang:{name:oCategory[1]}}
    };
    this.oListProductCrossCategory.push(iProductCrossCategory);
    console.log(this.oListProductCrossCategory);
  }

  eliminarCrossCategory(indexCrossCategory):void{
    this.oListProductCrossCategory.splice(indexCrossCategory,1);
  }

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
    if(oProduct.ProductLang.inst_message == ""){
      vRetorno = false;
      this.oMessageError.push("Ingrese etiqueta cuando no hay stock");
    }
    if(oProduct.condition == ""){
      vRetorno = false;
      this.oMessageError.push("Selecciona condición de producto");
    }
    if(!vRetorno){
      this.isVisible = true;
      this.sMessageTitle = "Campos requeridos *";
    }
    return vRetorno;
  }

  MessageBoxClose(bMessageBoxClose):void{
    this.isVisible = bMessageBoxClose;
  }


  buscarProduct(id_product):void{
    this.oAppService.editProduct(id_product).subscribe(data=>{
      if(data == null){
        console.log("no hay datos");
      }else{
        this.iIdProduct = data.id_product;
        this.bProductCategoryEdit = true;
        this.oProducto = <Product>data;
        this.oProductLang = this.oProducto.ProductLang;
        this.oListProductCrossCategory = [];
        for(let _i in this.oProducto.ProductCrossCategory){
          let iProductCrossCategory:ProductCrossCategory = {
            id_category:this.oProducto.ProductCrossCategory[_i].id_category,
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
        
        //this.oListProductModel = this.oProducto.ModelProduct;
        window["CKEDITOR"].instances["description_short"].setData(this.oProductLang.description_short);
        window["CKEDITOR"].instances["description"].setData(this.oProductLang.description);
      }
    });
  }
  newProduct(): any {
    this.oProducto.ProductEvent = this.oProductEvent;
    this.oProducto.ProductItem = [];
  }

  changeActive(isChecked: boolean): any {
    if(this.oProducto.id_product > 0){
      this.oProducto.row_state = "change_state";
      this.oProducto.active = +isChecked;
      this.oAppService.updateProduct(this.oProducto).subscribe(rest=>{
        this.iIdProduct = rest.json().id_product;
      });
    }
  }
  getProductName(productName: string): string {
    const listProductName: string[] = productName.split(' ');
    return listProductName.join('-').toLocaleLowerCase();
  }
  //#endregion

}
