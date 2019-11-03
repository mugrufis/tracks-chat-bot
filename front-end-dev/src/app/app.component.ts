import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public reply;
  private url = 'http://localhost:3000/message';


  constructor(
    private http: HttpClient
  ) {
  }

  public onClick() {
    this.postRequest();
  }

  private getRequest() {
    this.http.get(this.url).subscribe((success) => {
        this.reply = success;
      },
      (failure) => {
        this.reply = failure;
      }
    );
  }

  private postRequest() {
    this.http.post(this.url, {
      user: 1,
      // todo does not get saved as string
      timestampp: new Date(),
      text: 'Lorem Ipsum la la la'
    }).subscribe(
      (success) => {
        this.reply = success;
      },
      (failure) => {
        this.reply = failure;
      }
    );
  }
}
