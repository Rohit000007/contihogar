import { Model } from "./model";

export class ModelProduct {
    public id_model: number;
    public id_product: number;
    public model: Model;
    constructor() {
        this.id_model = 0;
        this.id_product = 0;
        this.model = new Model();
    }
}
