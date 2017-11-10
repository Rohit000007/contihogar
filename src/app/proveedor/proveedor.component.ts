import { Component, OnInit } from '@angular/core';
import { Supplier } from '../entity/supplier';
import { Manufacturer } from '../entity/manufacturer';
import { AppService } from '../service/app.service';
import { SupplierContact } from '../entity/supplier-contact';
import { SupplierZoneDelivery } from '../entity/supplier-zone-delivery';
import { SupplierManufacturer } from '../entity/supplier-manufacturer';
import { Address } from '../entity/address';
import { SupplierLang } from '../entity/supplier-lang';
import { Departament } from '../entity/departament';
import { Province } from '../entity/province';
import { District } from '../entity/district';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.scss'],
  providers:[AppService]
})
export class ProveedorComponent implements OnInit {
  eSupplier:Supplier;

  oListSupplier:Supplier[] = [];
  oListManufacturer:Manufacturer[] = [];
  oListSupplierContact:SupplierContact[] = [];
  oListSupplierZoneDelivery:SupplierZoneDelivery[] = [];
  OlistSupplierManufacturer:SupplierManufacturer[] = [];
  oListDepartament:Departament[] = [];
  oListZoneDelivery:Departament[] = [];
  oListProvince:Province[] = [];
  oListDistrict:District[] = [];
  olistMetaKeyWords:string[] = [];
  sStrMeta_keywords:string = "";
  id_district:string = "0";
  id_province:string = "0";
  id_state:string = "0";
  address1:string = "";

  sListAlmacen:string[] = [];

  
  constructor(private oAppService:AppService) {
    this.eSupplier = new Supplier();
    this.eSupplier.Address = new Address();
    this.eSupplier.SupplierLang = new SupplierLang();
   }

  ngOnInit() {
    this.oAppService.getSupplier().subscribe(data=>this.oListSupplier = data.json().oProduct);
    this.oAppService.getManufacturer().subscribe(data=>this.oListManufacturer = data.json());
    this.oAppService.getDepartament().subscribe(data=>{
      this.oListDepartament = <Departament[]>data.json();
    });
    this.oAppService.getZoneDelivery().subscribe(data=>{
      console.log(data);
      this.oListZoneDelivery = <Departament[]>data.json();
    });
    this.oListSupplierContact.push({cargo:"",correo:"",nombres:"",telefono:"",id_supplier:0});
  }

  agregarMarcaProductoLista(oManufacturer):void{
    let id_manufacturer = oManufacturer.split('|')[0];
    let name = oManufacturer.split('|')[0];
    let oSupplierManufacturer = new SupplierManufacturer();
    oSupplierManufacturer.id_manufacturer = parseInt(id_manufacturer);
    //oSupplierManufacturer.id_supplier = 
    oSupplierManufacturer.Manufacturer = new Manufacturer();
    oSupplierManufacturer.Manufacturer.name = name;
    this.OlistSupplierManufacturer.push(oSupplierManufacturer);
  }
  grabarSupplier():void{
    this.eSupplier.SupplierContact = this.oListSupplierContact;
    this.eSupplier.SupplierLang.meta_keywords = this.olistMetaKeyWords.join(',');
    console.log(this.eSupplier);
    if(this.eSupplier.id_supplier == 0){
      if(confirm("¿Está seguro de guardar?") == true){
        this.oAppService.postSupplier(this.eSupplier).subscribe(data=>{
          console.log(data);
        });
      }
    }else{
      if(confirm("¿Está seguro de actualizar?") == true){
        //actualizarServicioSupplier();
      }
    }
  }

  verficarKeyComa(oEvent,sStrMeta_keywords):void{
    if(oEvent.code == "Enter"){
      this.olistMetaKeyWords.push(sStrMeta_keywords);
      this.sStrMeta_keywords = "";
    }
  }

  listarProvincia(id_departamento):void{
    id_departamento = id_departamento.split('|')[0];
    this.oAppService.getProvincia(id_departamento).subscribe(data=>{
      this.oListProvince = data.json();
    });
  }

  listarDistrito(id_province):void{
    id_province = id_province.split('|')[0];
    this.oAppService.getDistrict(id_province).subscribe(data=>{
      this.oListDistrict = data.json();
    });
  }

  eliminarMetaKeyWords(indexMetaKeywords):void{
    this.olistMetaKeyWords.splice(parseInt(indexMetaKeywords),1);
  }

  agregarContacto():void{
    this.oListSupplierContact.push({cargo:"",id_supplier:0,nombres:"",telefono:"",correo:""});
    console.log(this.oListSupplierContact);
  }

  eliminarContacto(indexElement):void{
    this.oListSupplierContact.splice(parseInt(indexElement),1);
  }

  agregarDireccionAlmacen():void{
    let sAdress = this.address1+" - "+this.id_state.split('|')[1]+" "+ this.id_province.split('|')[1]+" "+this.id_district.split('|')[1];
    this.sListAlmacen.push(sAdress);
    this.address1 = "";
  }
  eliminarAlmacen(indexAdress):void{
    console.log(indexAdress);
    this.sListAlmacen.splice(parseInt(indexAdress),1);
  }

}
