export class CategoryLang {
    public id_category?: number;
    public id_shop?: number;
    public id_lang?: number;
    public name?: string;
    public description?: string;
    public link_rewrite?: string;
    public meta_title?: string;
    public meta_keywords?: string;
    public meta_description?: string;
    constructor(){
        this.id_category = 0;
        this.name = '';
        this.description = '';
        this.link_rewrite = '';
        this.meta_title = '';
        this.meta_keywords = '';
        this.meta_description = '';
    }
}
