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
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
    console.log(this.oListManufacturer);
  }

  agregarMarcaProductoLista(oManufacturerNew,oManufacturer):void{
    const id_manufacturer = oManufacturer.split('|')[0];
    const name = oManufacturer.split('|')[1];
    let oSupplierManufacturer;
    console.log(oManufacturer);
    if(oManufacturer !== undefined){
      oSupplierManufacturer = new SupplierManufacturer();
      oSupplierManufacturer.id_manufacturer = +id_manufacturer;
      oSupplierManufacturer.Manufacturer = new Manufacturer();
      oSupplierManufacturer.Manufacturer.name = name;
      this.OlistSupplierManufacturer.push(oSupplierManufacturer);
    }

    if(oManufacturerNew !== undefined && oManufacturerNew.length > 0){
      oSupplierManufacturer = new SupplierManufacturer();
      oSupplierManufacturer.id_manufacturer = 0;
      oSupplierManufacturer.Manufacturer = new Manufacturer();
      oSupplierManufacturer.Manufacturer.name = oManufacturerNew;
      this.OlistSupplierManufacturer.push(oSupplierManufacturer);
    }
    console.log(this.OlistSupplierManufacturer);
  }
  grabarSupplier(): void {
    this.eSupplier.SupplierContact = this.oListSupplierContact;
    this.eSupplier.SupplierLang.meta_keywords = this.olistMetaKeyWords.join(',');
    this.eSupplier.SupplierManufacturer = this.OlistSupplierManufacturer;
    this.eSupplier.SupplierZoneDelevery = this.oListSupplierZoneDelivery;
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

  marcarDepartamento(id_departament): void {
    const existDepartament = this.oListSupplierZoneDelivery.filter(x => x.id_state === id_departament);
    if(Object.keys(existDepartament).length > 0 && existDepartament !== null)
      existDepartament.forEach(f => this.oListSupplierZoneDelivery.splice(this.oListSupplierZoneDelivery.findIndex(e => e.id_state === f.id_state),1));
    else
      this.oListSupplierZoneDelivery.push({id_state:id_departament,id_provincia:0,id_distrito:0,id_supplier:0}); 
  }

  marcarProvincia(id_departament,id_province):void{
    const existProvince = this.oListSupplierZoneDelivery.filter(x => x.id_provincia === id_province);
    if(Object.keys(existProvince).length > 0 && existProvince !== null)
      existProvince.forEach(f => this.oListSupplierZoneDelivery.splice(this.oListSupplierZoneDelivery.findIndex(e => e.id_provincia === f.id_provincia),1));
    else
      this.oListSupplierZoneDelivery.push({id_state:id_departament,id_provincia:id_province,id_distrito:0,id_supplier:0});
  }

  marcarDistrict(id_departament,id_province,id_district):void{
    const existDistrict = this.oListSupplierZoneDelivery.filter(x => x.id_distrito === id_district);
    if(Object.keys(existDistrict).length > 0 && existDistrict !== null)
      existDistrict.forEach(f => this.oListSupplierZoneDelivery.splice(this.oListSupplierZoneDelivery.findIndex(e => e.id_distrito === f.id_distrito),1));
    else
      this.oListSupplierZoneDelivery.push({id_state:id_departament,id_provincia:id_province,id_distrito:id_district,id_supplier:0});
  }

  buscarSupplier(): void {
    this.oAppService.getSupplierById(this.eSupplier).subscribe(data=>{
      console.log(data);
    });
  }


  eliminarMarca(indexMarca):void{
    this.OlistSupplierManufacturer.splice(indexMarca,1);
  }

}
