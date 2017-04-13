import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import * as myGlobals from '../../globals';
import * as moment from 'moment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class NetworkService {
    constructor (private http: Http) {}

    isConnected():  Observable<boolean> {    
        return this.http.get(myGlobals.weatherUri + "?t=" + Date.now()) //to prevent caching
            .map(this.extractData)
            .catch(this.handleError);
    }

    extractData(res: Response) {
        let output:boolean = true;
        if(res.status === 200) {
            output = true;
        }
        else {
            output = false;
        }
    return output;
}

  private handleError (error: Response | any) {
    return Observable.of(false);
  }
}