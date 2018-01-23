import { Category } from "./category";

export class ProductCrossCategory {
    public id_product?:number;
    public id_category?:number;
    public Category?:Category
    constructor(){
        this.Category = new Category();
    }
}
