import {Injectable, EventEmitter} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs';


const routes = {
  api: 'http://localhost:3000/api/'


};

@Injectable({
  providedIn: 'root'
})
export class ApiService {





  constructor(private httpClient: HttpClient,) {
  }

 

  /** garder les infonmations en cas de retour à la page demanade */




  register(request_body) {

    return this.httpClient
      .post(routes.api+"chercheur",request_body)
      .toPromise()
      .catch(this.handleError);
  }



getJobs(){
  return this.httpClient
  .get(routes.api+"chercheur")
  .toPromise()
  .catch(this.handleError);
}



  public extractData(res: Response) {
    const body = res.json();
    return body;
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }
}
