export class ProductEvent {
    constructor(
        public id_product_event:number,
        public id_product:number,
        public price_start_date:Date,
        public price_end_date:Date,
        public price_impact:number,
        public cost_impact:number,
        public event_price:number,
        public event_cost:number,
        public cost_start_date:number,
        public cost_end_date:number,
        public tax_price_impact:number,
        public tax_cost_impact:number
    ){}
}
