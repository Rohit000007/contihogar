import { Component, OnInit, Input,OnChanges, SimpleChanges } from '@angular/core';
import { AppService } from '../../service/app.service';
import { Attribute } from '../../entity/attribute';
import { ProductAttribute } from '../../entity/product-attribute';
import { ProductAttributeImage } from '../../entity/product-attribute-image';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-image-manager',
  templateUrl: './image-manager.component.html',
  styleUrls: ['./image-manager.component.scss'],
  providers: [AppService]
})
export class ImageManagerComponent implements OnChanges,OnInit {
  @Input() IdProduct: number = 0;
  sNameImageList = 'list_img_';
  oListColorImages: iImageColorList[] = [];
  private sDefaultColor = '#2E2EFE';
  private oListAttribute: Attribute[] = [];
  private indexColor: number;
  constructor(private oAppService: AppService) { }

  ngOnInit() {
    this.crearImageListControl({
      nonce:0,
      color:this.sDefaultColor,
      id:"",
      image_list:[],
      image_list_html:[],
      id_attribute:0,
      id_product_attribute:0
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.IdProduct > 0){
      this.oAppService.getImage(changes.IdProduct.currentValue).subscribe(data=>{
        console.log(data);
      });
      this.getProductAtributeImage(changes.IdProduct.currentValue);
    }
  }

  subirImagen(oEventControl,oControlId,oImageAttribute):void{
    console.log(oControlId,oImageAttribute);
    let oListImages:iImage[] = [];
    let oFiles = oEventControl.target.files;
    for(let _i = 0;_i<oFiles.length;_i++){
      let oListDataForm = new FormData();
      console.log(this.IdProduct);
      oListDataForm.append("id_product",this.IdProduct.toString());
      oListDataForm.append("image",oFiles[_i]);
      this.oAppService.sendImagePrestaShop(oListDataForm).subscribe(res=>{
        let oImage = res.json();
        console.log(res.json(),oControlId,oImageAttribute);
        let oProductAttributeImage = new ProductAttributeImage();
        oProductAttributeImage.id_image = oImage.id_image;
        oProductAttributeImage.id_product_attribute = oImageAttribute.id_product_attribute;
        this.oAppService.saveProductAttributeImage(oProductAttributeImage).subscribe(data=>{
          console.log(data);
          this.getProductAtributeImage(this.IdProduct);
        });
      });
    }
  }

  agregarImageList():void{
    this.crearImageListControl({nonce:0,color:this.sDefaultColor,id:"",image_list:[],image_list_html:[],id_attribute:0,id_product_attribute:0});
  }

  crearImageListControl(oImagecolorList:iImageColorList):void{
    let vListNonce = [];
    for(let _i in this.oListColorImages){
      vListNonce.push(this.oListColorImages[_i].nonce);
    }
    let vNextNonce = this.getMaxOfArray(vListNonce)+1;
    vNextNonce = (vNextNonce == -Infinity)?0:vNextNonce;
    this.oListColorImages.push({nonce:vNextNonce,color:oImagecolorList.color,id:this.sNameImageList+vNextNonce,image_list:oImagecolorList.image_list,image_list_html:oImagecolorList.image_list_html,id_attribute:oImagecolorList.id_attribute,id_product_attribute:oImagecolorList.id_product_attribute});
  }

  eliminarImagen(oParentId,id_image):void{
    this.oAppService.deleteImage(id_image).subscribe(data=>{
      console.log(data);
      this.getProductAtributeImage(this.IdProduct);
    });
    /*for(let _i in this.oListColorImages){
      if(this.oListColorImages[_i].nonce == parseInt(oParentId)){
        let oListImages = this.oListColorImages[_i].image_list_html;
        for(let __i in oListImages){
          if(oListImages[__i].id == oItemId){
            oListImages.splice(parseInt(__i),1);
            break;
          }
        }
      }
    }*/
  }

  eliminarImageColor(oImgColorId,id_attribute):void{
    console.log(oImgColorId,id_attribute);
    this.oAppService.deleteAttribute(id_attribute).subscribe(data=>{
      console.log(data);
      this.getProductAtributeImage(this.IdProduct);
    });
    /*for(let _i in this.oListColorImages){
      if(this.oListColorImages[_i].nonce == parseInt(oImgColorId)){
        this.oListColorImages.splice(parseInt(_i),1);
        break;
      }}*/
  }

  getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
  }
  
  agregarColor(indexColor,pAttribute): void{
    const colorItem = this.oListColorImages[indexColor];
    const oAttribute = new Attribute();
    oAttribute.color = colorItem.color;
    oAttribute.id_attribute = pAttribute.id_attribute;
    const oProductAttribute = new ProductAttribute();
    oProductAttribute.id_product = this.IdProduct;
    this.oAppService.postAttribute(oAttribute,oProductAttribute).subscribe(data=>{
      console.log(data);
      this.getProductAtributeImage(this.IdProduct);
    });
  }

  getProductAtributeImage(IdProduct:number):void{
    this.oAppService.getProductAtributeImage(IdProduct).subscribe(data=>{
      console.log(data);
      this.oListColorImages = [];
      let oListImageColor = data.json();
      for(let _i = 0;_i<oListImageColor.length;_i++){
        this.crearImageListControl({
            color:oListImageColor[_i].color,
            id:"",image_list_html:[],
            image_list:oListImageColor[_i].Images,
            nonce:0,
            id_attribute:oListImageColor[_i].id_attribute,
            id_product_attribute:oListImageColor[_i].id_product_attribute
          });
      }
      console.log(this.oListColorImages);
    });
  }
  openColorPalette(indexColor: number): void{
    this.getAttribute();
    this.indexColor = indexColor;
    $("#modal-color").modal("show");
  }
  getAttribute(): void {
    this.oAppService.getAttributes().subscribe(data=>{
      console.log(data);
      this.oListAttribute = data.json();
    });
  }
  getAttributeColor(attribute: Attribute){
    console.log(attribute);
    this.agregarColor(this.indexColor, attribute);
  }
}

export interface iImage{
  id?:string,
  src?:string,
}

export interface iImageColorList{
  nonce:number,
  color:string,
  id:string,
  image_list:any[],
  image_list_html:iImage[],
  id_attribute:number,
  id_product_attribute:number,
}