export class ProductEvent {
    public id_product_event?:number;
    public id_product?:number;
    public price_start_date?:Date;
    public price_end_date?:Date;
    public price_impact?:number;
    public cost_impact?:number;
    public event_price?:number;
    public event_cost?:number;
    public cost_start_date?:Date;
    public cost_end_date?:Date;
    public tax_price_impact?:number;
    public tax_cost_impact?:number;
    constructor(){
        this.id_product_event = 0;
        this.price_impact = 0;
        this.cost_impact = 0;
        this.event_price = 0;
        this.event_cost = 0;
        this.tax_price_impact = 0;
        this.tax_cost_impact = 0;
    }
}
