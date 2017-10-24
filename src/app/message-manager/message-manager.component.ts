import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message-manager',
  templateUrl: './message-manager.component.html',
  styleUrls: ['./message-manager.component.scss']
})
export class MessageManagerComponent implements OnInit {
  @Input() oListMessages:string[] = []; 
  @Input() sMessageTitle:string = "";
  @Input() isVisible:boolean = false;
  constructor() { }

  ngOnInit() {
    this.closeComponent();
  }

  closeComponent(){
    setTimeout(function(){ 
      this.isVisible = false;
    }, 3000);
  }
}
