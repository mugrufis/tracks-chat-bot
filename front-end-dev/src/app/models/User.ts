import {IUser} from '../interfaces/IUser';

export class User implements IUser {
  public static TracksBot: User = {
    id: '',
    tempID: '',
    name: 'Tracks GmbH',
    avatar: '../../assets/03-11-2019-03-52-07.png'
  };

  constructor(
    public id: string,
    public tempID: string,
    public avatar: string,
    public name: string
  ) {
  }
}
