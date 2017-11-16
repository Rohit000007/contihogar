import { CategoryLang } from "./category-lang";

export interface Category {
    id_category?:number,
    id_parent?:number,
    id_shop_default?:number,
    level_depth?:number,
    nleft?:number,
    nright?:number,
    active?:number = 1,
    date_add? :Date,
    date_upd? :Date,
    position?:number,
    is_root_category?:number,
    CategoryLang?:CategoryLang,

    isChecked?:boolean
}
