export interface ProductEvent {
     id_product_event?:number,
     id_product?:number,
     price_start_date?:Date,
     price_end_date?:Date,
     price_impact?:number,
     cost_impact?:number,
     event_price?:number,
     event_cost?:number,
     cost_start_date?:Date,
     cost_end_date?:Date,
     tax_price_impact?:number,
     tax_cost_impact?:number
}
