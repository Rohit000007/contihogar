import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProductItem } from '../../entity/product-item';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnChanges ,OnInit {

  oListTabControl:iTabControl[] = [{id:0,is_active:true,name:"Unidad",priority:true,state:1,display:"block"}];
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

  oListFormItem:iFormItem[] = [];
  vFormNamePrefix:string = "frm_item_";
  vCantidadUnidades = 0;
  @Input() isEdit:boolean = false;
  @Input() oListProductItem:ProductItem[] = [];

  constructor() {
  }

  ngOnInit() {
    this.crearFormulario(0,true);//Formulario de inicio param[id_inicio:0,esNuevo:true]
    this.vCantidadUnidades = this.oListTabControl.length;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.isEdit){
      this.oListTabControl = [];
      this.oListFormItem = [];
      let oListProductItemHere:ProductItem[] = <ProductItem[]>changes.oListProductItem.currentValue;
      let vNumberTabIndex = [];
      for(let _i in oListProductItemHere){
        vNumberTabIndex.push(_i);
        this.crearFormulario(this.agregarTabControl(vNumberTabIndex),false,oListProductItemHere[_i]);
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
    ;
    this.crearFormulario(this.agregarTabControl(vNumberTabIndex),true);
  }
  removeTabClick(oRemoveControl){
    console.log(this.oListTabControl);
    var oTabControlBodyName = this.vFormNamePrefix+oRemoveControl.name;

    for(let indexTab in this.oListTabControl){
      if(this.oListTabControl[indexTab].id == parseInt(oRemoveControl.name)){
        this.oListTabControl[indexTab].state =  0;
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
  agregarTabControl(pNumberTabId): number {
    let vNextTabId = this.getMaxOfArray(pNumberTabId)+1;
    this.oListTabControl.push({
      id:vNextTabId,
      is_active:false,
      name:"Unidad",
      priority:false,
      state:1,
      display:"none"
    });
    this.vCantidadUnidades = this.oListTabControl.length;
    return vNextTabId;
  }

  crearFormulario(idForm,isNew,itemData:ProductItem = null){
    if(isNew){
      this.oListFormItem.push(
        {id:this.vFormNamePrefix+idForm,class:"form-horizontal",name:"frmProductoItem",
        inputFeatures:this.oListFormItemInputFeatures,
        inputProperties:this.oListFormItemInputProperties}
      );
    }else{
      let oListFormItemInputFeaturesEdit:IFormItemInput[] = [];
      let oListFormItemInputPropertiesEdit:IFormItemInput[] = [];

      oListFormItemInputFeaturesEdit.push({class:"form-control",id:"nombre_producto_item"+"_"+itemData.id_product_item,name:"nombre_producto_item",type:"text",value:itemData.ProductItemLang.nombre});
      let vItemCaracteristica = itemData.ProductItemCaracteristica;
      for(let _i in vItemCaracteristica){
        if(vItemCaracteristica[_i].campo == "altura_cm_producto"){
          oListFormItemInputPropertiesEdit.push({class:"form-control",id:"altura_cm_producto_"+itemData.id_product_item,name:"altura_cm_producto",type:"number",value:vItemCaracteristica[_i].valor});
        }else if(vItemCaracteristica[_i].campo == "ancho_cm_producto"){
          oListFormItemInputPropertiesEdit.push({class:"form-control",id:"ancho_cm_producto_"+itemData.id_product_item,name:"ancho_cm_producto",type:"number",value:vItemCaracteristica[_i].valor});
        }else if(vItemCaracteristica[_i].campo == "profundidad_cm_producto"){
          oListFormItemInputPropertiesEdit.push({class:"form-control",id:"profundidad_cm_producto_"+itemData.id_product_item,name:"profundidad_cm_producto",type:"number",value:vItemCaracteristica[_i].valor});
        }else if(vItemCaracteristica[_i].campo == "peso_kg_producto"){
          oListFormItemInputPropertiesEdit.push({class:"form-control",id:"peso_kg_producto_"+itemData.id_product_item,name:"peso_kg_producto",type:"number",value:vItemCaracteristica[_i].valor});
        }else{
          oListFormItemInputFeaturesEdit.push({
            class:"form-control",
            id:vItemCaracteristica[_i].campo+"_"+itemData.id_product_item,
            name:vItemCaracteristica[_i].campo,
            type:(vItemCaracteristica[_i].campo == "unidades_producto_item")?"number":"text",
            value:vItemCaracteristica[_i].valor
          });
        }
      }
      this.oListFormItem.push(
        {id:this.vFormNamePrefix+itemData.id_product_item,class:"form-horizontal",name:"frmProductoItem",
        inputFeatures:oListFormItemInputFeaturesEdit,
        inputProperties:oListFormItemInputPropertiesEdit}
      )
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
  id:string,
  class:string,
  name:string,
  inputFeatures:IFormItemInput[],
  inputProperties:IFormItemInput[],
}

export interface IFormItemInput{
  id:string,
  name:string,
  value:string,
  type:string,
  class:string
}
