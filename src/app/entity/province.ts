import { District } from "./district";

export class Province {
    public id_provincia?:number;
    public nombre?:string;
    public id_departamento?:number;
    public is_checked?:boolean;
    public District?:District[]
    constructor(){}
}
