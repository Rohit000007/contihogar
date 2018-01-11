export class SupplierConfig {
    public id_supplier_config: number;
    public pay_before_delivery_product: boolean;
    public previous_day: number;
    public pay_after_delivery_product: boolean;
    public percentage_pay_before_delivery: boolean;
    public value_percentage_payout: number;
    public pay_before_send_purchase_order: boolean;
    constructor(){
        this.id_supplier_config = 0;
    }
}
