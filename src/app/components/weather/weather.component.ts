import { Component, trigger, state, animate, transition, style } from '@angular/core';
import { WeatherService } from '../../services/weather/weather.service';
import { Weather } from '../../classes/weather.class';
import * as moment from 'moment';

@Component({
  selector: 'weather', 
  templateUrl: './templates/weather.template.html',
  styleUrls: ['./weather.component.css'],
  animations: [
    trigger('visibility', [
        state('shown', style({
            width:'500px',left:'0px',height:'200px','background-color': '#EEEBD3', display:'block','z-index':'1',position:'relative',top:'45px'
        })),
        state('hidden', style({
            width:'500px',left:'-550px',height:'200px','background-color': '#EEEBD3', display:'none','z-index':'1',position:'relative',top:'45px'
        })),
        transition('* => *', animate('.2s'))
    ])
]

})
export class WeatherComponent {
    private currentWeatherResponse;
    isDataAvailable:boolean = false;
    Weather: Weather[];
    city: string;
    errorMessage: string;    
    visibility = 'hidden';

    constructor(private weatherService: WeatherService) {   
        let t = weatherService.getForcast()
        .subscribe(
                currentWeather => this.currentWeatherResponse = currentWeather,
                error =>  this.errorMessage = <any>error,
                () => this.onComplete(this)
                ); 
    }

    onComplete(obj) {
       this.city = obj.currentWeatherResponse.city.name;
       this.Weather = this.convertToViewModel(obj.currentWeatherResponse.list);
       //console.log("list",this.Weather);
    }

    showSeperator(collection: JSON, i:number,last:boolean) {
        //debugger;
        if(i>0) {
        let rowDate = moment(collection[i].dt * 1000).day();
        let nextDate = moment(collection[i-1].dt * 1000).day();
        //console.log(rowDate);
        return rowDate != nextDate;
        }
        return true;
    }

    convertToViewModel(weatherFull): Weather[] {    
        weatherFull = weatherFull.filter(time => time.dt_txt.indexOf("18:00") > -1); //18:00 is UTC, so 18 is 2pm
        let aryWeatherOut: Weather[] = [];
        let i: number;
        let currDate: string = "";
        for(let i:number=0; i< weatherFull.length; i++) {
            let weatherOut = new Weather();
            weatherOut.Date = moment(weatherFull[i].dt * 1000).format('M/D/YYYY h:mm:ss A');
            weatherOut.AvgTemp = Math.round(weatherFull[i].main.temp);
            weatherOut.HighTemp = weatherFull[i].main.temp_max;
            weatherOut.LowTemp = weatherFull[i].main.temp_min;
            weatherOut.Description = weatherFull[i].weather[0].description;
            weatherOut.WindSpeed = weatherFull[i].wind.speed;
            weatherOut.Icon = weatherFull[i].weather[0].icon;
            if(currDate != weatherOut.Date) {
                aryWeatherOut.push(weatherOut);
                currDate = weatherOut.Date;
            }
        }
        this.isDataAvailable = true;
        return aryWeatherOut;
    }

    toggleVisibility() {
    this.visibility = this.visibility == 'shown' ? 'hidden' : 'shown';
  }

}