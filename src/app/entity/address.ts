export class Address {
    public id_address?:number;
    public id_country?:number;
    public id_state?:number;
    public id_distrito?:number;
    public id_provincia?:number;
    public id_customer?:number;
    public id_manufacturer?:number;
    public id_supplier?:number;
    public id_warehouse?:number;
    public alias?:string;
    public company?:string;
    public lastname?:string;
    public firstname?:string;
    public address1?:string;
    public address2?:string;
    public postcode?:string;
    public city?:string;
    public other?:string;
    public phone?:string;
    public phone_mobile?:string;
    public vat_number?:string;
    public dni?:string;
    public date_add?:Date;
    public date_upd?:Date;
    public active?:number;
    public deleted?:number
    constructor(){
        this.active = 1;
        this.deleted = 0;
        this.id_customer = 0,
        this.id_manufacturer = 0;
        this.id_supplier = 0;
        this.id_warehouse = 0;
        this.id_distrito = 0;
        this.id_provincia = 0;
        this.other = "";
        this.phone = "";
        this.phone_mobile = "";
        this.vat_number = "";
    }
}
