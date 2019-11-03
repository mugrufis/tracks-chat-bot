import {Component, OnInit} from '@angular/core';
import {IMessage} from '../../interfaces/IMessage';
import {Message} from '../../models/Message';
import {User} from '../../models/User';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-chat-window-controller',
  templateUrl: './chat-window-controller.component.html',
  styleUrls: ['./chat-window-controller.component.css']
})
export class ChatWindowControllerComponent implements OnInit {
  public messages: IMessage[] = [];

  constructor(
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.messageService.getBotInitialMessage().subscribe(
      (success) => {
        this.displayBotMessage(success);
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  public onSend(event) {
    const lastUserMessage = new Message(event.message, true);
    this.displayMessageInChatWindow(lastUserMessage);

    setTimeout(() => {
      this.messageService.sendMessageAndGetBotResponse(lastUserMessage).subscribe(
        (success) => {
          this.displayBotMessage(success);
        },
        (error) => {
          this.handleError(error);
        }
      );
    }, 500);
  }

  private displayBotMessage(response) {
    this.displayMessageInChatWindow(new Message(response, false, User.TracksBot));
  }

  private displayMessageInChatWindow(message: IMessage) {
    this.messages.push(message);
  }

  private handleError(error) {
    // todo better error handling
    console.error(error);
  }
}
