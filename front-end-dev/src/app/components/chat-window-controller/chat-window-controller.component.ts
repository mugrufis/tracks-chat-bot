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

  constructor(
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.initializeCurrentUser();
    this.sendMessageAndGetBotResponse(new Message('', true, this.currentUser));
  }

  private initializeCurrentUser() {
    // todo Dummy ID should be replace by actual ID
    this.currentUser = new User(
       Math.floor(Math.random() * (10 - 1 + 1) + 1).toString(),
      '',
      ''
    );
  }

  public onSend(event) {
    const lastUserMessage = new Message(event.message, true, this.currentUser);
    this.displayMessageInChatWindow(lastUserMessage);

    setTimeout(() => {
        this.sendMessageAndGetBotResponse(lastUserMessage);
      },
      500
    );
  }

  private sendMessageAndGetBotResponse(lastUserMessage: IMessage) {
    this.messageService.sendMessageAndGetBotResponse(lastUserMessage).subscribe(
      (success) => {
        this.displayBotMessage(success);
      },
      (error) => {
       console.error(error);
      }
    );
  }

  private displayBotMessage(response) {
    this.displayMessageInChatWindow(new Message(response.text, false, User.TracksBot));
  }

  private displayMessageInChatWindow(message: IMessage) {
    this.messages.push(message);
  }
}
