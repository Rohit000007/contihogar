export class Customer {
    public id_customer: number;
    public id_gender: number;
    public id_lang: number;
    public company: string;
    public siret: string;
    public ape: string;
    public firstname: string;
    public lastname: string;
    public email: string;
    public passwd: string;
    public birthday: Date;
    public ip_registration_newsletter: string;
    public newsletter_date_add: Date;
    public website: string;
    public note: string;
    public date_add: Date;
    public date_upd: Date;
    public reset_password_token: string;
    public reset_password_validity: string;
    public DNI: number;
    constructor() {
        this.id_customer = 0;
        this.firstname = '';
        this.lastname = '';
    }
}
