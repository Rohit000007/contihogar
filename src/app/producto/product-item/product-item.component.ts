import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProductItem } from '../../entity/product-item'; 
import { ProductItemShipping } from '../../entity/product-item-shipping';
import * as $ from 'jquery';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnChanges ,OnInit {
  oListTabControl:iTabControl[] = [];
  oListFormItemInputFeatures:IFormItemInput[] = [
    {class:"form-control",id:"nombre_producto_item_0",name:"nombre_producto_item",type:"text",value:"1234"},
    {class:"form-control",id:"estilo_producto_item_0",name:"estilo_producto_item",type:"text",value:"23456789"},
    {class:"form-control",id:"tipo_tapiz_producto_item_0",name:"tipo_tapiz_producto_item",type:"text",value:""},
    {class:"form-control",id:"color_tapiz_producto_item_0",name:"color_tapiz_producto_item",type:"text",value:""},
    {class:"form-control",id:"tipo_relleno_producto_item_0",name:"tipo_relleno_producto_item",type:"text",value:""},
    {class:"form-control",id:"material_estructura_producto_item_0",name:"material_estructura_producto_item",type:"text",value:""},
    {class:"form-control",id:"armado_producto_item_0",name:"armado_producto_item",type:"text",value:""},
    {class:"form-control",id:"garantia_producto_item_0",name:"garantia_producto_item",type:"text",value:""},
    {class:"form-control",id:"entrega_dias_producto_item_0",name:"entrega_dias_producto_item",type:"text",value:""},
    {class:"form-control",id:"unidades_producto_item_0",name:"unidades_producto_item",type:"number",value:"1234"}
  ];
  oListFormItemInputProperties:IFormItemInput[] = [
    {class:"form-control",id:"altura_cm_producto_0",name:"altura_cm_producto",type:"number",value:"1234"},
    {class:"form-control",id:"ancho_cm_producto_0",name:"ancho_cm_producto",type:"number",value:"1"},
    {class:"form-control",id:"profundidad_cm_producto_0",name:"profundidad_cm_producto",type:"number",value:"0"},
    {class:"form-control",id:"peso_kg_producto_0",name:"peso_kg_producto",type:"number",value:"0"},
  ];
  oListFormItemInputTransport:IFormItemInput[] = [
    {class:"form-control",id:"altura_cm_transporte_0",name:"altura_cm_transporte",type:"number",value:"1234"},
    {class:"form-control",id:"ancho_cm_transporte_0",name:"ancho_cm_transporte",type:"number",value:"1"},
    {class:"form-control",id:"profundidad_cm_transporte_0",name:"profundidad_cm_transporte",type:"number",value:"0"},
    {class:"form-control",id:"peso_kg_transporte_0",name:"peso_kg_transporte",type:"number",value:"0"},
  ];

  oListFormItem:iFormItem[] = [];
  vFormNamePrefix:string = "frm_item_";
  vFormItemShippingName:string = "frm_item_shipping_";
  vCantidadUnidades = 0;
  @Input() isEdit:boolean = false;
  @Input() oListProductItem:ProductItem[] = [];

  constructor() {
  }

  ngOnInit() {
    let oForItemNew = this.crearFormularioItem([],true);
    oForItemNew.oListFormItemShipping.push(this.agregarNuevoFormShipping(oForItemNew,true,null));
    this.oListFormItem.push(oForItemNew);//Formulario de inicio param[id_inicio:0,esNuevo:true]
    this.vCantidadUnidades = this.oListTabControl.length;
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(this.isEdit){
      this.oListTabControl = [];
      this.oListFormItem = [];
      let oListProductItemHere:ProductItem[] = <ProductItem[]>changes.oListProductItem.currentValue;
      let vNumberTabIndex = [];
      for(let _i in oListProductItemHere){
        vNumberTabIndex.push(oListProductItemHere[_i].id_product_item);
        let oFormItemNew = this.crearFormularioItem(vNumberTabIndex,false,oListProductItemHere[_i]);
        for(let __i in oListProductItemHere[_i].ProductItemShipping){
          oFormItemNew.oListFormItemShipping.push(this.agregarNuevoFormShipping(oFormItemNew,false,oListProductItemHere[_i].ProductItemShipping[__i]));
        }
        this.oListFormItem.push(oFormItemNew);
      }
    }
  }

  onTabClick(idTab){
    var oControlPadre =  document.getElementById("tab-control-padre");
    var oHijos = oControlPadre.querySelectorAll(".control-form-body");
    for(let vHijoIndex in oHijos){
      if(oHijos.length > 1){
        if(oHijos[vHijoIndex].nodeType !== undefined)
          oHijos[vHijoIndex].setAttribute("style","display:none");
      }
    }
    document.getElementById(this.vFormNamePrefix+idTab.toString()).style.display = "block";
  }

  addTabClick(){
    let vNumberTabIndex = [];
    for(let index in this.oListTabControl){
      vNumberTabIndex.push(this.oListTabControl[index].id);
    }
    this.oListFormItem.push(this.crearFormularioItem(vNumberTabIndex,true));
  }

  removeTabClick(oRemoveControl){
    console.log(this.oListTabControl);
    var oTabControlBodyName = this.vFormNamePrefix+oRemoveControl.name;

    for(let indexTab in this.oListTabControl){
      if(this.oListTabControl[indexTab].id == parseInt(oRemoveControl.name)){
        this.oListTabControl.splice(parseInt(indexTab),1);
        break;
      }
    }
    for(let __i in this.oListFormItem){
      if(this.oListFormItem[__i].id == this.vFormNamePrefix+oRemoveControl.name){
        this.oListFormItem.splice(parseInt(__i),1);
        break;
      }
    }
    this.vCantidadUnidades--;
    document.getElementById("tab_"+oRemoveControl.name).remove();
    document.getElementById(oTabControlBodyName).remove();
  }

  getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
  }

  agregarTabControlItem(pNumberTabId): number {
    let vNextTabId = (this.oListTabControl.length > 0)? this.getMaxOfArray(pNumberTabId)+1:0;
    this.oListTabControl.push({id:vNextTabId,is_active:true,name:"Unidad",priority:false,state:1,display:"block"});
    this.vCantidadUnidades = this.oListTabControl.length;
    return vNextTabId;
  }

  agregarNuevoShipping(idParentForm):void{
    for(let _i in this.oListFormItem){
      if(this.oListFormItem[_i].id == idParentForm){
        this.oListFormItem[_i].oListFormItemShipping.push(this.agregarNuevoFormShipping(this.oListFormItem[_i],true,null));
        break;
      }
    }
  }
  
  quitarFormItemShipping(idParentForm,idFormChipping):void{
    let sFormIdShipping:string = "";
    for(let _i in this.oListFormItem){
      if(this.oListFormItem[_i].id == idParentForm){
        for(let __i in this.oListFormItem[_i].oListFormItemShipping){
          if(this.oListFormItem[_i].oListFormItemShipping[__i].id == idFormChipping){
            this.oListFormItem[_i].oListFormItemShipping.splice(parseInt(__i),1);
            break;
          }
        }
        sFormIdShipping = this.oListFormItem[_i].oListFormItemShipping[0].id;
      }
    }
    console.log(sFormIdShipping);
    let divItemShipping = <HTMLDivElement>document.getElementById(sFormIdShipping);
    divItemShipping.className = "item active form-item-shipping";
  }
  agregarNuevoFormShipping(oFormItem:iFormItem,isNew:boolean,oProductItemShipping:ProductItemShipping = null):iFormItemShipping{
    let vNonceFormItemShipping = this.obtenerMaxNonceFormItemShipping(oFormItem.oListFormItemShipping);
    let oFormItemShipping:iFormItemShipping = {
      nonce:vNonceFormItemShipping,
      class:"form-horizontal",
      display:"block",
      id:this.vFormItemShippingName+vNonceFormItemShipping,
      name:oFormItem.id,
      isActive:(oFormItem.oListFormItemShipping.length == 0)?"active":"",
      inputTransport:this.getInputTransport(vNonceFormItemShipping,isNew,oProductItemShipping)
    }
    return oFormItemShipping;
  }

  obtenerMaxNonceFormItemShipping(oFormItemShipping: iFormItemShipping[]): number {
    let vNonceExistsForm = [];
    for(let _i in oFormItemShipping){
      vNonceExistsForm.push(oFormItemShipping[_i].nonce);
    }
    return (oFormItemShipping.length > 0)?this.getMaxOfArray(vNonceExistsForm)+1:0;
  }

  getInputTransport(idFormShipping: number, isNew: boolean, oProductItemShipping: ProductItemShipping): IFormItemInput[] {
    if(isNew){
      return [{class:"form-control",id:"altura_cm_transporte_"+idFormShipping,name:"altura_cm_transporte",type:"number",value:"0"},
              {class:"form-control",id:"ancho_cm_transporte_"+idFormShipping,name:"ancho_cm_transporte",type:"number",value:"0"},
              {class:"form-control",id:"profundidad_cm_transporte_"+idFormShipping,name:"profundidad_cm_transporte",type:"number",value:"0"},
              {class:"form-control",id:"peso_kg_transporte_"+idFormShipping,name:"peso_kg_transporte",type:"number",value:"0"}]
    }else{
      return [{class:"form-control",id:"altura_cm_transporte_"+idFormShipping,name:"altura_cm_transporte",type:"number",value:oProductItemShipping.alto.toString()},
              {class:"form-control",id:"ancho_cm_transporte_"+idFormShipping,name:"ancho_cm_transporte",type:"number",value:oProductItemShipping.ancho.toString()},
              {class:"form-control",id:"profundidad_cm_transporte_"+idFormShipping,name:"profundidad_cm_transporte",type:"number",value:oProductItemShipping.profundidad.toString()},
              {class:"form-control",id:"peso_kg_transporte_"+idFormShipping,name:"peso_kg_transporte",type:"number",value:oProductItemShipping.peso.toString()}]
    }
  }

  crearFormularioItem(vNumberTabIndex:number[],isNew,oProductItem:ProductItem = null):iFormItem{
    console.log(vNumberTabIndex);
    let idFormNew = this.agregarTabControlItem(vNumberTabIndex);
    let oFormItem:iFormItem;
    if(isNew){
      return oFormItem = 
        {DBId:0, id:this.vFormNamePrefix+idFormNew,class:"form-horizontal",name:"frmProductoItem",
        display:((this.oListFormItem.length == 0)?"block":"none"),
        inputFeatures:this.oListFormItemInputFeatures,
        inputProperties:this.oListFormItemInputProperties,
        oListFormItemShipping:[]}
    }else{
      let oListFormItemInputFeaturesEdit:IFormItemInput[] = [];
      let oListFormItemInputPropertiesEdit:IFormItemInput[] = [];

      oListFormItemInputFeaturesEdit.push({class:"form-control",id:"nombre_producto_item"+"_"+idFormNew,name:"nombre_producto_item",type:"text",value:oProductItem.nombre});
      let vItemCaracteristica = oProductItem.ProductItemCaracteristica;
      for(let _i in vItemCaracteristica){
        if(vItemCaracteristica[_i].campo == "altura_cm_producto"){
          oListFormItemInputPropertiesEdit.push({class:"form-control",id:"altura_cm_producto_"+idFormNew,name:"altura_cm_producto",type:"number",value:vItemCaracteristica[_i].valor});
        }else if(vItemCaracteristica[_i].campo == "ancho_cm_producto"){
          oListFormItemInputPropertiesEdit.push({class:"form-control",id:"ancho_cm_producto_"+idFormNew,name:"ancho_cm_producto",type:"number",value:vItemCaracteristica[_i].valor});
        }else if(vItemCaracteristica[_i].campo == "profundidad_cm_producto"){
          oListFormItemInputPropertiesEdit.push({class:"form-control",id:"profundidad_cm_producto_"+idFormNew,name:"profundidad_cm_producto",type:"number",value:vItemCaracteristica[_i].valor});
        }else if(vItemCaracteristica[_i].campo == "peso_kg_producto"){
          oListFormItemInputPropertiesEdit.push({class:"form-control",id:"peso_kg_producto_"+idFormNew,name:"peso_kg_producto",type:"number",value:vItemCaracteristica[_i].valor});
        }else{
          oListFormItemInputFeaturesEdit.push({
            class:"form-control",
            id:vItemCaracteristica[_i].campo+"_"+idFormNew,
            name:vItemCaracteristica[_i].campo,
            type:(vItemCaracteristica[_i].campo == "unidades_producto_item")?"number":"text",
            value:vItemCaracteristica[_i].valor
          });
        }
      }
      oListFormItemInputFeaturesEdit.push({class:"form-control",id:"unidades_producto_item"+"_"+idFormNew,name:"unidades_producto_item",type:"text",value:oProductItem.cantidad.toString()});
      return oFormItem =
        {DBId:oProductItem.id_product_item,id:this.vFormNamePrefix+idFormNew,class:"form-horizontal",
        name:"frmProductoItem",
        display:((this.oListFormItem.length == 0)?"block":"none"),
        inputFeatures:oListFormItemInputFeaturesEdit,
        inputProperties:oListFormItemInputPropertiesEdit,
        oListFormItemShipping:[]}
    }
  }
}

export interface iTabControl{
  id:number,
  name:string,
  is_active:boolean,
  priority:boolean,
  state:number,
  display:string
}

export interface iFormItem{
  DBId:number,
  id:string,
  class:string,
  name:string,
  display:string,
  inputFeatures:IFormItemInput[],
  inputProperties:IFormItemInput[],
  oListFormItemShipping:iFormItemShipping[]
}

export interface iFormItemShipping{
  nonce:number,
  id:string,
  class:string,
  name:string,
  display:string,
  isActive:string,
  inputTransport:IFormItemInput[]
}

export interface IFormItemInput{
  id:string,
  name:string,
  value:string,
  type:string,
  class:string
}