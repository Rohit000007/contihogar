export class ProductLang {
    public id_product: number;
    public id_shop: number;
    public id_lang: number;
    public description: string;
    public description_short: string;
    public link_rewrite: string;
    public meta_description: string;
    public meta_keywords: string;
    public meta_title: string;
    public name: string;
    public available_now: number;
    public available_later: number;
    public inst_message: string;
    constructor(){
        this.name = '';
        this.meta_description = '';
        this.meta_keywords = '';
        this.meta_title = '';
        this.link_rewrite = '';
        this.inst_message = '';
    }
}
