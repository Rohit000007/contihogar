export class ProductAttribute {
    public id_product_attribute?:number; 
    public id_product?:number; 
    public reference?:string;
    public supplier_reference?:string; 
    public location?:string; 
    public ean13?:string;
    public isbn?:string;
    public upc?:string;
    public wholesale_price?:number;
    public price?:number;
    public ecotax?:number;
    public quantity?:number;
    public weight?:number;
    public unit_price_impact?:number;
    public default_on?:number;
    public minimal_quantity?:number;
    public available_date?:Date;

    constructor(){
        this.wholesale_price = 0.000000;
        this.price = 0.000000;
        this.ecotax = 0.000000;
        this.quantity = 0;
        this.weight = 0.000000;
        this.unit_price_impact = 0.000000;
        this.default_on = 1;
        this.minimal_quantity = 1;
    }
}
