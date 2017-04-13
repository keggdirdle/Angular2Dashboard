import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import * as myGlobals from '../../globals';
import * as moment from 'moment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class WeatherService {
    constructor (private http: Http) {}

    getForcast():  Observable<JSON> {
      
        if((sessionStorage.getItem("weatherDate") === null) || 
            (sessionStorage.getItem("weatherDate") !== null && 
            moment(sessionStorage.getItem("weatherDate")).add(myGlobals.weatherCacheInHours, 'hours') < moment()))
        {
            return this.http.get(myGlobals.weatherUri)
                .map(this.extractData)
                .catch(this.handleError);
        }
        else 
        {
            return Observable.of(JSON.parse(sessionStorage.getItem("weather")));
        }
    }

    extractData(res) {
        //console.log("moment",moment().format());
        sessionStorage.setItem("weatherDate",moment().format());
        sessionStorage.setItem("weather",res._body);
    return res.json();
}

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.log(errMsg);
    return Observable.throw(errMsg);
  }
}