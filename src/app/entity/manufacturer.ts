import {ManufacturerLang} from './manufacturer-lang';
export class Manufacturer {
    constructor(
        public id_manufacturer? :number,
        public name?:string,
        public date_add?:Date,
        public date_upd?:Date,
        public active?:number,
        public ManufacturerLang?:ManufacturerLang
    ){}
}
