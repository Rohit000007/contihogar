import { Province } from "./province";

export class Departament {
    public id_state?:number;
    public id_country?:number;
    public id_zone?:number;
    public name?:string;
    public iso_code?:string;
    public tax_behavior?:number;
    public active?:number;
    public Province?:Province[];
    constructor(){
        this.tax_behavior = 0;
        this.active = 0;
    }
}
