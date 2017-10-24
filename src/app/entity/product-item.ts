import { ProductItemCaracteristica } from "./product-item-caracteristica";
import { ProductItemLang } from "./product-item-lang";

export interface ProductItem {
    id_product_item?:number,
    id_product?:number,
    cantidad?:number,
    ancho?:number,
    alto?:number,
    profundidad?:number,
    peso?:string,
    ProductItemCaracteristica?:ProductItemCaracteristica[],
    ProductItemLang?:ProductItemLang
}
