import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IMessage} from '../../interfaces/IMessage';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
  constructor() {
  }

  @Input() public messages: IMessage[] = [];
  @Output() send = new EventEmitter();

  ngOnInit() {
  }

  public sendMessage(event) {
    this.send.emit(event);
  }


}
