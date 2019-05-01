import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { promise } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hackaton';

}
