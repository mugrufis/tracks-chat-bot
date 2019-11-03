import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
  public messages = [];
  constructor() { }

  ngOnInit() {
  }

  public sendMessage(event) {
    console.log(event);
    this.messages.push({text: event.message});
  }
}
