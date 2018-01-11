import { SupplierManufacturer } from "./supplier-manufacturer";
import { SupplierZoneDelivery } from "./supplier-zone-delivery";
import { SupplierContact } from "./supplier-contact";
import { Address } from "./address";
import { SupplierLang } from "./supplier-lang";
import { SupplierConfig } from "./supplier-config";

export class Supplier {
    public id_supplier?:number;
    public name?:string;
    public date_add?:Date;
    public date_upd?:Date;
    public active?:number;
    public invoice_type?:number;
    public shipping_type?:number;
    public bussines_model?:number;
    public payment_type?:number;
    public total_days?:number;
    public SupplierLang?:SupplierLang;
    public SupplierManufacturer?:SupplierManufacturer;
    public SupplierZoneDelevery?:SupplierZoneDelivery[];
    public SupplierContact?:SupplierContact[];
    public Address?:Address;
    public SupplierConfig?:SupplierConfig;
    constructor(){
        this.id_supplier = 0;
        this.invoice_type = 0;
        this.shipping_type = 0; 
        this.bussines_model = 0;
        this.payment_type = 0;
        this.active = 1;
        this.SupplierConfig = new SupplierConfig();
    }
}