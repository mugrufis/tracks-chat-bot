import {IUser} from './IUser';

export interface IMessage {
  type: string; // available options text|file|map|quote
  text: string;
  reply: boolean;
  date: Date;
  files: undefined[];
  quote: string;
  latitude: number;
  longitude: number;
  user: IUser;
}
