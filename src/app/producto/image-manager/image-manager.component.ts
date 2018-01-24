import { Component, OnInit, Input,OnChanges, SimpleChanges } from '@angular/core';
import { AppService } from '../../service/app.service';
import { Attribute } from '../../entity/attribute';
import { ProductAttribute } from '../../entity/product-attribute';
import { ProductAttributeImage } from '../../entity/product-attribute-image';
import { Product } from '../../entity/product';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-image-manager',
  templateUrl: './image-manager.component.html',
  styleUrls: ['./image-manager.component.scss'],
  providers: [AppService]
})
export class ImageManagerComponent implements OnChanges, OnInit {
  @Input() oProduct = new Product();
  sNameImageList = 'list_img_';
  oListColorImages: iImageColorList[] = [];
  private sDefaultColor = '#ffd015';
  private oListAttribute: Attribute[] = [];
  private indexColor: number;

  constructor(private oAppService: AppService) { }

  ngOnInit() {
    this.crearImageListControl({
      nonce:0,
      color:this.sDefaultColor,
      name: "default",
      id:"",
      image_list:[],
      image_list_html:[],
      id_attribute:0,
      id_product_attribute:0
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.oProduct.id_product > 0){
      /*this.oAppService.getImage(changes.oProduct.currentValue.id_product).subscribe(data=>{
        console.log(data);
      });*/
      this.getProductAtributeImage(changes.oProduct.currentValue.id_product);
    }
  }

  subirImagen(oEventControl,oControlId,oImageAttribute):void{
    console.log(oControlId,oImageAttribute);
    const oListImages: iImage[] = [];
    const oFiles = oEventControl.target.files;
    for(let _i = 0;_i<oFiles.length;_i++){
      const oListDataForm = new FormData();
      oListDataForm.append("id_product",this.oProduct.id_product.toString());
      oListDataForm.append("image",oFiles[_i]);
      this.oAppService.sendImagePrestaShop(oListDataForm).subscribe(res=>{
        const oImage = res.json();
        //console.log(res.json(),oControlId,oImageAttribute);
        const oProductAttributeImage = new ProductAttributeImage();
        oProductAttributeImage.id_image = oImage.id_image;
        oProductAttributeImage.id_product_attribute = oImageAttribute.id_product_attribute;

        this.oAppService.saveProductAttributeImage(oProductAttributeImage).subscribe(data=>{
          console.log(data);
          this.getProductAtributeImage(this.oProduct.id_product);
        });
      });
    }
  }

  agregarImageList():void{
    this.crearImageListControl({nonce:0,name: "default",color:this.sDefaultColor,id:"",image_list:[],image_list_html:[],id_attribute:0,id_product_attribute:0});
  }

  crearImageListControl(oImagecolorList: iImageColorList):void{
    const vListNonce = [];
    for(let _i in this.oListColorImages){
      vListNonce.push(this.oListColorImages[_i].nonce);
    }
    let vNextNonce = this.getMaxOfArray(vListNonce)+1;
    vNextNonce = (vNextNonce == -Infinity)?0:vNextNonce;
    this.oListColorImages.push({ nonce: vNextNonce, name: oImagecolorList.name, color:oImagecolorList.color,id:this.sNameImageList+vNextNonce,image_list:oImagecolorList.image_list,image_list_html:oImagecolorList.image_list_html,id_attribute:oImagecolorList.id_attribute,id_product_attribute:oImagecolorList.id_product_attribute});
  }

  eliminarImagen(oParentId,id_image):void{
    this.oAppService.deleteImage(id_image).subscribe(data=>{
      console.log(data);
      this.getProductAtributeImage(this.oProduct.id_product);
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

  eliminarProductAttribute(oImgColorId, id_product_attribute): void{
    if(confirm("¿Está seguro de eliminar?") === false)
      return;
    this.oAppService.deleteProductAttribute(id_product_attribute).subscribe(data => {
      console.log(data);
      this.getProductAtributeImage(this.oProduct.id_product);
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
  
  agregarColor(attribute: Attribute): void{
    const oAttribute = new Attribute();
    oAttribute.color = attribute.color;
    oAttribute.id_attribute = attribute.id_attribute;
    oAttribute.name = attribute.name;
    const oProductAttribute = new ProductAttribute();
    oProductAttribute.id_product = this.oProduct.id_product;
    oProductAttribute.quantity = this.oProduct.quantity;
    this.oAppService.postAttribute(oAttribute,oProductAttribute).subscribe(data=>{
      console.log(data);
      this.getProductAtributeImage(this.oProduct.id_product);
    });
  }

  getProductAtributeImage(IdProduct: number):void{
    this.oAppService.getProductAtribute(IdProduct).subscribe(data => {
      console.log(data.json());
      this.oListColorImages = [];
      const oListImageColor = data.json();
      for(let _i = 0;_i<oListImageColor.length;_i++){
        this.crearImageListControl({
            color: oListImageColor[_i].color,
            name: oListImageColor[_i].name,
            id: "", image_list_html: [],
            image_list: oListImageColor[_i].Images,
            nonce: 0,
            id_attribute: oListImageColor[_i].id_attribute,
            id_product_attribute: oListImageColor[_i].id_product_attribute
          });
      }
      console.log(this.oListColorImages);
    });
  }
  openColorPalette(nonceKey: number): void{
    this.getAttribute();
    this.indexColor = nonceKey;
    $("#modal-color").modal("show");
  }
  getAttribute(): void {
    this.oAppService.getAttributes().subscribe(data=>{
      this.oListAttribute = data.json();
    });
  }
  getAttributeColor(attribute: Attribute){
    this.oListColorImages.forEach(color => {
      if (color.nonce === this.indexColor){
        color.color = attribute.color;
      }
    });
    this.agregarColor(attribute);
    $("#modal-color").modal("hide");
  }
}

export interface iImage{
  id?: string;
  src?: string;
}

export interface iImageColorList{
  nonce: number;
  color: string;
  name: string;
  id: string;
  image_list: any[];
  image_list_html: iImage[];
  id_attribute: number;
  id_product_attribute: number;
}