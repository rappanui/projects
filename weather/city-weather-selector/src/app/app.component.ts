import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  found:boolean;
  city;
  country;
  coordLon;
  coordLat;
  weatherMain;
  weatherDescription;
  weatherIcon;
  mainTemp;
  mainPressure;
  mainHumidity;
  mainTempMin;
  mainTempMax;
  visibility;
  windSpeed;
  windDeg
  clouds;
  sunrise;
  sunset;
 
  constructor(private http:Http){  }
    
  onNameKeyUp(event:any){
    this.city = event.target.value;
    this.found = false;
  }
  
  responses: Object[] = [];

  getWeather(){
    
    this.http.get('http://api.openweathermap.org/data/2.5/weather?q='+ this.city +'&units=metric&APPID=0977e0bbf83139942dba5e1a023fbc7e')
    .subscribe(res => {
      this.responses = res.json();
      if(this.responses['name'] != null) {
        this.found = true;
        this.city = this.responses['name'];
        this.country = this.responses['sys']['country'];
        this.sunrise = this.responses['sys']['sunrise'];
        this.sunset = this.responses['sys']['sunset'];
        this.coordLon = this.responses['coord']['lon'];
        this.coordLat = this.responses['coord']['lat'];
        this.weatherMain = this.responses['weather'][0]['main'];
        this.weatherDescription  = this.responses['weather'][0]['description'];
        this.weatherIcon = 'http://openweathermap.org/img/w/' + this.responses['weather'][0]['icon'] + '.png';
        this.mainTemp = this.responses['main']['temp'];
        this.mainPressure = this.responses['main']['pressure'];
        this.mainHumidity = this.responses['main']['humidity'];
        this.mainTempMin = this.responses['main']['temp_min'];
        this.mainTempMax = this.responses['main']['temp_max'];
        this.visibility = this.responses['visibility'];
        this.windSpeed = this.responses['wind']['speed'];
        this.windDeg = this.degToCompass(this.responses['wind']['deg']) + '(' + this.responses['wind']['deg'] + ')';
        this.clouds  = this.responses['clouds'];              
      } 
    })
  }

  degToCompass(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
  }
    
}
