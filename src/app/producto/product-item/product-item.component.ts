import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProductItem } from '../../entity/product-item';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnChanges ,OnInit {

  vTabsNombre:any[];
  vTabControlBody:string = "tab-control-body_0";
  vTabVisible = true;
  vCantidadUnidades = 0;
  id_formulario_item:number = 0;
  @Input() oListProductItem:ProductItem[] = [];

  constructor() {}

  ngOnInit() {
    this.vTabsNombre = [
      {indexTab:1,text:"Unidad",default:true},
    ];
    this.vCantidadUnidades = this.vTabsNombre.length;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.vTabsNombre = [];
    let oListProductItemHere:ProductItem[] = <ProductItem[]>changes.oListProductItem.currentValue;
    let vNumberTabIndex = [];
    for(let _i in oListProductItemHere){
      vNumberTabIndex.push(_i);
      this.agregarTabControl(vNumberTabIndex);
    }
    this.asigarnarDataFormulario(oListProductItemHere);
  }

  onTabClick(indexView){
    var oControlPadre =  document.getElementById("tab-control-padre");
    var oHijos = oControlPadre.querySelectorAll(".control-form-body");
    for(let vHijoIndex in oHijos){
      if(oHijos.length > 1){
        if(oHijos[vHijoIndex].nodeType !== undefined)
          oHijos[vHijoIndex].setAttribute("style","display:none");
      }
    }
    if(indexView> 1)
      document.getElementById(this.vTabControlBody.split('_')[0]+"_"+indexView.toString()).style.display = "block";
    else
      document.getElementById(this.vTabControlBody).style.display = "block";

  }
  addTabClick(){
    let vNumberTabIndex = [];
    for(let index in this.vTabsNombre){
      vNumberTabIndex.push(this.vTabsNombre[index].indexTab);
    }
    this.agregarTabControl(vNumberTabIndex);
  }
  removeTabClick(oRemoveControl){
    var oTabControlBodyName = this.vTabControlBody.split('_')[0]+"_"+oRemoveControl.name;
    for(let indexTab in this.vTabsNombre){
      if(this.vTabsNombre[indexTab].indexTab == parseInt(oRemoveControl.name)){
        this.vTabsNombre.splice(parseInt(indexTab),1);
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
  agregarTabControl(pNumberTabIndex): any {
    let vNextTabIndex = this.getMaxOfArray(pNumberTabIndex)+1;
    this.vCantidadUnidades = vNextTabIndex;
    var vTabControlBodyNewName = this.vTabControlBody.split('_')[0]+"_"+vNextTabIndex.toString();
    this.vTabsNombre.push({indexTab:vNextTabIndex,text:"Unidad",default:false});

    var vTabControlBodyClone =  document.getElementById(this.vTabControlBody);
    vTabControlBodyClone.id = vTabControlBodyNewName
    var vTabControlBodyCloneNew = vTabControlBodyClone.cloneNode(true);
    vTabControlBodyClone.id = this.vTabControlBody;
    document.getElementById("tab-control-padre").appendChild(vTabControlBodyCloneNew);
    document.getElementById(vTabControlBodyNewName).style.display = "none";
  }

  asigarnarDataFormulario(oListProductItem: ProductItem[]) {
    let oFormName = this.vTabControlBody.split('_')[0]+"_";
    for(let _i in oListProductItem){
      let element = document.getElementById(oFormName+oListProductItem[_i].id_product_item);
      let oProductItemCaracteristica = oListProductItem[_i].ProductItemCaracteristica;
      for(let __i in oProductItemCaracteristica){
        console.log(oProductItemCaracteristica)
        let oso = element.getElementsByTagName(oProductItemCaracteristica[__i].campo);
        console.log(oso);
      }
    }
    /*for(let _i = 0;_i<oFormElements.length;_i++ ){
      let oFormDataElements = (<HTMLFormElement>oFormElements[_i]).elements;
      console.log(oFormDataElements);
      oFormDataElements["altura_cm_transporte"].value
    }*/
  }
}
