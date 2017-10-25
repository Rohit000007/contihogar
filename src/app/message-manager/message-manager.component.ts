import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-message-manager',
  templateUrl: './message-manager.component.html',
  styleUrls: ['./message-manager.component.scss']
})
export class MessageManagerComponent implements OnInit {
  @Input() oListMessages:string[] = []; 
  @Input() sMessageTitle:string = "";
  @Output() MessageBoxClose = new EventEmitter(); 
  constructor() { }

  ngOnInit() {}
  
  closeMessageBox():void{
    this.MessageBoxClose.emit(false);
  };
}
