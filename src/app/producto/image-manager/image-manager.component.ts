import { Component, OnInit, Input,OnChanges, SimpleChanges } from '@angular/core';
import { AppService } from '../../service/app.service';

@Component({
  selector: 'app-image-manager',
  templateUrl: './image-manager.component.html',
  styleUrls: ['./image-manager.component.scss'],
  providers:[AppService]
})
export class ImageManagerComponent implements OnChanges,OnInit {
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.IdProduct);
    if(this.IdProduct > 0){
      this.oAppService.getImage(changes.IdProduct.currentValue).subscribe(data=>{
        console.log(data);
      });
    }
  }
  @Input() IdProduct:number = 0;
  sNameImageList:string = "list_img_";
  oListColorImages:iImageColorList[] = [];
  constructor(private oAppService:AppService) { }

  ngOnInit() {
    this.oListColorImages.push({nonce:0,color:"#2E2EFE",id:this.sNameImageList+"0",image_list:[],image_list_html:[]});
  }

  subirImagen(oEventControl,oControlId):void{
    let oListImages:iImage[] = [];
    let oFiles = oEventControl.target.files;
    let oListDataForm = new FormData();
    oListDataForm.append("id_product",this.IdProduct.toString());
    for(let _i = 0;_i<oFiles.length;_i++){
      let oFile = oFiles[_i];
      let oFileReader = new FileReader();
      oListDataForm.append("files[]",oFiles[_i]);
      oFileReader.onloadend  = function(){
        oListImages.push({id:_i.toString(),src:this.result});
      }
      if(oFile){
        oFileReader.readAsDataURL(oFile);
      }
    }
    for(let _i in this.oListColorImages){
      if(this.oListColorImages[_i].nonce == oControlId){
        this.oListColorImages[_i].image_list_html = oListImages;
      }
    }

    this.oAppService.postIamage(oListDataForm).subscribe(res=>{
      console.log(res);
    });
  }

  agregarImageList():void{
    let vListNonce = [];
    for(let _i in this.oListColorImages){
      vListNonce.push(this.oListColorImages[_i].nonce);
    }
    let vNextNonce = this.getMaxOfArray(vListNonce)+1;
    vNextNonce = (vNextNonce == -Infinity)?0:vNextNonce;
    this.oListColorImages.push({nonce:vNextNonce,color:"#2E2EFE",id:this.sNameImageList+vNextNonce,image_list:[],image_list_html:[]});
  }

  eliminarImagen(oParentId,oItemId):void{
    for(let _i in this.oListColorImages){
      if(this.oListColorImages[_i].nonce == parseInt(oParentId)){
        let oListImages = this.oListColorImages[_i].image_list_html;
        for(let __i in oListImages){
          if(oListImages[__i].id == oItemId){
            oListImages.splice(parseInt(__i),1);
            break;
          }
        }
      }
    }
  }
  eliminarImageColor(oImgColorId):void{
    console.log(oImgColorId);
    for(let _i in this.oListColorImages){
      if(this.oListColorImages[_i].nonce == parseInt(oImgColorId)){
        this.oListColorImages.splice(parseInt(_i),1);
        break;
      }}
  }
  getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
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
  image_list_html:iImage[]
}