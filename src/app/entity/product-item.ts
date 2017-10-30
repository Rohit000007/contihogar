import { ProductItemCaracteristica } from "./product-item-caracteristica";
import { ProductItemShipping } from "./product-item-shipping";

export interface ProductItem {
    id_product_item:number,
    id_product:number,
    nombre:string,
    cantidad:number,
    descripcion: string,
    ProductItemCaracteristica?:ProductItemCaracteristica[],
    ProductItemShipping?:ProductItemShipping[]
}
