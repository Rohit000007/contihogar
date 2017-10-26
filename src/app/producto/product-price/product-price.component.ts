import { Component, OnInit, Input } from '@angular/core';
import { ProductEvent } from '../../entity/product-event';

@Component({
  selector: 'app-product-price',
  templateUrl: './product-price.component.html',
  styleUrls: ['./product-price.component.scss']
})
export class ProductPriceComponent implements OnInit {

  @Input() oProductEvent:ProductEvent; 
  constructor() {
    
   }

  ngOnInit() {
    this.oProductEvent = {
      cost_end_date:new Date(),
      cost_impact:0,
      cost_start_date:new Date(),
      event_cost:0,
      event_price:0,
      id_product:0,
      id_product_event:0,
      price_end_date:new Date(),
      price_impact:0,
      price_start_date:new Date(),
      tax_cost_impact:0,
      tax_price_impact:0
    };
  }
  get cost_start_date(){
    this.oProductEvent.cost_start_date = new Date(this.oProductEvent.cost_start_date);
    return this.oProductEvent.cost_start_date.toISOString().substring(0, 10);
  }
  get cost_end_date(){
    this.oProductEvent.cost_end_date = new Date(this.oProductEvent.cost_end_date);
    return this.oProductEvent.cost_end_date.toISOString().substring(0, 10);
  }
  get price_end_date(){
    this.oProductEvent.price_end_date = new Date(this.oProductEvent.price_end_date);
    return this.oProductEvent.price_end_date.toISOString().substring(0, 10);
  }
  get price_start_date(){
    this.oProductEvent.price_start_date = new Date(this.oProductEvent.price_start_date);
    return this.oProductEvent.price_start_date.toISOString().substring(0, 10);
  }

}
