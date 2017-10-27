import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProductItem } from '../../entity/product-item';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnChanges ,OnInit {

  oListTabControl:iTabControl[];
  vTabControlBody:string = "tab-control-body_";
  vCantidadUnidades = 0;
  @Input() oListProductItem:ProductItem[] = [];

  constructor() {}

  ngOnInit() {
    this.oListTabControl.push({
      id:0,
      is_active:true,
      name:"Unidad",
      priority:true,
      state:1,
      display:"block"
    });
    this.vCantidadUnidades = this.oListTabControl.length;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.oListTabControl = [];
    let oListProductItemHere:ProductItem[] = <ProductItem[]>changes.oListProductItem.currentValue;
    let vNumberTabIndex = [];
    for(let _i in oListProductItemHere){
      vNumberTabIndex.push(_i);
      this.agregarTabControl(vNumberTabIndex);
    }
    this.asignarDataFormulario(oListProductItemHere);
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
    document.getElementById(this.vTabControlBody+idTab.toString()).style.display = "block";
  }
  addTabClick(){
    let vNumberTabIndex = [];
    for(let index in this.oListTabControl){
      vNumberTabIndex.push(this.oListTabControl[index].id);
    }
    this.agregarTabControl(vNumberTabIndex);
  }
  removeTabClick(oRemoveControl){
    console.log(this.oListTabControl);
    var oTabControlBodyName = this.vTabControlBody.split('_')[0]+"_"+oRemoveControl.name;

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
  agregarTabControl(pNumberTabId): any {
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
  }

  asignarDataFormulario(oListProductItem: ProductItem[]) {
    console.log(oListProductItem);
    for(let _i in oListProductItem){
      let oProductItem = oListProductItem[_i];
      try{
        let control = (<HTMLInputElement>document.getElementById("nombre_producto_item_"+oProductItem.id_product_item));
        control.value = oProductItem.ProductItemLang.nombre;
        control.style.backgroundColor = "red";
        console.log(control);
      }catch(ex){
        console.log(ex);
      }
      //let elementForm = document.forms["frmProductoItem"+oListProductItem[_i].id_product_item].elements;
      
      /*elementForm["ancho_cm_transporte"].value = oProductItem.ancho;
      elementForm["profundidad_cm_transporte"].value = oProductItem.profundidad;
      elementForm["peso_kg_transporte"].value = oProductItem.peso;

      elementForm["nombre_producto_item"].value = oProductItem.ProductItemLang.nombre;*/
      /*let oProductItemCaracteristica = oListProductItem[_i].ProductItemCaracteristica;
      for(let __i in oProductItemCaracteristica){
        console.log(oProductItemCaracteristica)
        let oso = element.getElementsByTagName(oProductItemCaracteristica[__i].campo);
        console.log(oso);
      }*/
    }
    /*for(let _i = 0;_i<oFormElements.length;_i++ ){
      let oFormDataElements = (<HTMLFormElement>oFormElements[_i]).elements;
      console.log(oFormDataElements);
      oFormDataElements["altura_cm_transporte"].value
    }*/
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
