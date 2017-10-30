import { Component, OnInit } from '@angular/core';
import { AppService } from '../../service/app.service';

@Component({
  selector: 'app-image-manager',
  templateUrl: './image-manager.component.html',
  styleUrls: ['./image-manager.component.scss'],
  providers:[AppService]
})
export class ImageManagerComponent implements OnInit {
  oListFile:any[] = [];

  constructor(private oAppService:AppService) { }

  ngOnInit() {
  }

  subirImagen(oEventControl):void{
    //let oListTempFile = [];
    let oFiles = oEventControl.target.files;
    let oForData = new FormData();
    for(let _i in oFiles){
      oForData.append("files[]",oFiles[_i]);
    }
    this.oAppService.postIamage(oForData).subscribe(data=>{
      console.log(data);
    });
    /*for(let _i in oFiles){
      let oFileReader = new FileReader();
      oFileReader.onloadend  = function(){
        console.log(oFileReader.result);
        oListTempFile.push({file:oFileReader.result});
      }
      console.log(oFiles[_i]);
      oFileReader.readAsDataURL(oFiles[_i]);
    }
    this.oListFile.push(oListTempFile);
    console.log(this.oListFile);*/
  }
}
