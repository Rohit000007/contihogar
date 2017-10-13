import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  vTabsNombre:any[];
  vTabControlBody = "tab-control-body_0";
  vTabVisible = true;

  constructor() { }

  ngOnInit() {
    this.vTabsNombre = [
      {indexTab:1,text:"Unidad",default:true},
    ];
  }

  onSubmit(){
    var oFormData = document.forms;
    var oFormDataJSON = [];
    for(let indexForm in oFormData){
      let oFormDataElements = oFormData[indexForm].elements;
      for(let indexInput in oFormDataElements){
        var value = oFormDataElements["nombre_producto"][0].value;
        console.log(value);
      }
    }
  }
  onTabClick(indexView){
    console.log(indexView);
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
    var vNumberTabIndex = [];
    for(let index in this.vTabsNombre){
      vNumberTabIndex.push(this.vTabsNombre[index].indexTab);
    }
    let vNextTabIndex = this.getMaxOfArray(vNumberTabIndex)+1;
    var vTabControlBodyNewName = this.vTabControlBody.split('_')[0]+"_"+vNextTabIndex.toString();
    this.vTabsNombre.push({indexTab:vNextTabIndex,text:"Unidad",default:false});

    var vTabControlBodyClone =  document.getElementById(this.vTabControlBody);
    vTabControlBodyClone.id = vTabControlBodyNewName
    var vTabControlBodyCloneNew = vTabControlBodyClone.cloneNode(true);
    vTabControlBodyClone.id = this.vTabControlBody;
    document.getElementById("tab-control-padre").appendChild(vTabControlBodyCloneNew);
    document.getElementById(vTabControlBodyNewName).style.display = "none";
    console.log(this.vTabsNombre);
  }
  removeTabClick(oRemoveControl){
    var oTabControlBodyName = this.vTabControlBody.split('_')[0]+"_"+oRemoveControl.name;
    for(let indexTab in this.vTabsNombre){
      if(this.vTabsNombre[indexTab].indexTab == parseInt(oRemoveControl.name)){
        this.vTabsNombre.splice(parseInt(indexTab),1);
        break;
      }
    }
    console.log(oRemoveControl.name);
    document.getElementById("tab_"+oRemoveControl.name).remove();
    document.getElementById(oTabControlBodyName).remove();
  }
  getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
  }
}
