import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IMessage} from '../interfaces/IMessage';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private URL = 'http://localhost:3000/message';

  constructor(private http: HttpClient) { }

  public getBotInitialMessage() {
    return this.http.get(this.URL);
  }

  public sendMessageAndGetBotResponse(userMessage: IMessage) {
    return this.http.post(this.URL, userMessage);
  }
}
