import { CategoryLang } from "./category-lang";

export class Category {
    public id_category?: number;
    public id_parent?: number;
    public id_shop_default?: number;
    public level_depth?: number;
    public nleft?: number;
    public nright?: number;
    public active?: number;
    public date_add?: Date;
    public date_upd?: Date;
    public position?: number;
    public is_root_category?: number;
    public CategoryLang?: CategoryLang;
    public isChecked?: boolean;
    public isUpdateAll?: boolean;
    public row_state: string;
    constructor(){
        this.row_state = 'create';
        this.date_add = new Date();
        this.date_upd = new Date();
    }

}
