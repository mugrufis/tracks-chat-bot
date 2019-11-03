import {IUser} from './IUser';

export interface IMessage {
  type: string; // available options text|file|map|quote
  text: string;
  reply: boolean;
  date: Date;
  files: undefined[];
  quote: string;
  latilatitude: number;
  longitude: number;
  avatar: string; // a url string of the avatar to be shown. png on example
}
