import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@brewdude/api-interfaces';

@Component({
  selector: 'brewdude-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  constructor(private http: HttpClient) {}
}
