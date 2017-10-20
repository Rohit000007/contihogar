export class Category {
    constructor(
        public id_category?:number,
        public id_parent?:number,
        public id_shop_default?:number,
        public level_depth?:number,
        public nleft?:number,
        public nright?:number,
        public active?:number,
        public date_add? :Date,
        public date_upd? :Date,
        public position?:number,
        public is_root_category?:number
    ){}
}
