export class Carrier {
    constructor(
        public id_carrier:number,
        public id_reference:number,
        public id_tax_rules_group:number,
        public name:string,
        public url:string,
        public active:number,
        public deleted:number,
        public shipping_handling:number,
        public range_behavior:number,
        public is_module:number,
        public is_free:number,
        public shipping_external:number,
        public need_range:number,
        public external_module_name:string,
        public shipping_method:number,
        public position:number,
        public max_width:number,
        public max_height:number,
        public max_depth:number,
        public max_weight:number,
        public grade:number
    ){}
}
