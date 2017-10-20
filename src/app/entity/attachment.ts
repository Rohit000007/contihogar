export class Attachment {
    constructor(
        public id_attachment?:number,
        public file?:string,
        public file_name?:string,
        public file_size?:number,
        public mime?:string
    ){}
}
