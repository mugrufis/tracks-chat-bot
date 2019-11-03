import {IMessage} from '../interfaces/IMessage';
import {IUser} from '../interfaces/IUser';

export class Message implements IMessage {
  date: Date;
  files: undefined[];
  latitude: number;
  longitude: number;
  quote: string;
  reply: boolean;
  text: string;
  type: string;
  user: IUser;

  constructor(
    text: string,
    reply: boolean,
    user?: IUser,
    date: Date = new Date(),
    avatar?: string,
    files?: undefined[],
    latitude?: number,
    longitude?: number,
    quote?: string,
    type?: string
  ) {
    this.text = text;
    this.reply = reply;
    this.date = date;
    this.user = user;
    this.files = files;
    this.latitude = latitude;
    this.longitude = longitude;
    this.quote = quote;
    this.type = type;
  }
}
