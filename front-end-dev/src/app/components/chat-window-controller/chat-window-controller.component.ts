import {Component, OnInit} from '@angular/core';
import {IMessage} from '../../interfaces/IMessage';
import {Message} from '../../models/Message';
import {User} from '../../models/User';
import {MessageService} from '../../services/message.service';
import {IUser} from '../../interfaces/IUser';

@Component({
  selector: 'app-chat-window-controller',
  templateUrl: './chat-window-controller.component.html',
  styleUrls: ['./chat-window-controller.component.css']
})

export class ChatWindowControllerComponent implements OnInit {
  public messages: IMessage[] = [];
  private currentUser: IUser;
  private currentSpecName = '';

  constructor(
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.initializeCurrentUser();
    this.sendMessageAndGetBotResponse(new Message('', true, this.currentUser));
  }

  private initializeCurrentUser() {
    this.currentUser = new User(
      '',
      '',
      ''
    );
  }

  public onSend(event) {
    const lastUserMessage = this.createUSerMessage(event);
    this.displayMessageInChatWindow(lastUserMessage);

    setTimeout(() => {
        this.sendMessageAndGetBotResponse(lastUserMessage);
      },
      500
    );
  }

  private createUSerMessage(event): IMessage {
    const newMessage = new Message(event.message, true, this.currentUser);
    newMessage.specName = this.currentSpecName;
    return newMessage;
  }

  private sendMessageAndGetBotResponse(lastUserMessage: IMessage) {
    this.messageService.sendMessageAndGetBotResponse(lastUserMessage).subscribe(
      (success) => {
        this.displayBotMessage(success);
        this.updateCurrentUser(success);
        this.updateCurrentSpecName(success);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  private updateCurrentSpecName(response) {
    this.currentSpecName = response.specName;
  }

  private updateCurrentUser(response) {
    if (!this.currentUser.id) {
      this.currentUser.id = response.user.id;
    }
  }

  private displayBotMessage(response) {
    this.displayMessageInChatWindow(new Message(response.text, false, User.TracksBot));
  }

  private displayMessageInChatWindow(message: IMessage) {
    this.messages.push(message);
  }

}
