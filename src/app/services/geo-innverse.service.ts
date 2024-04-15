import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeoInnverseService {
  API_ENDPOINT = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'; /*-73.989,40.733.json?types=poi&' +
  'access_token=pk.eyJ1IjoiZWJjYWJyZXJhMDgiLCJhIjoiY2swcXFlY3N2MGJiZTNjbWx4ZmR0cXk1NCJ9.MamOuw-sZvAdrcARBdne5Q';*/

  constructor(private httpClient: HttpClient) { }
  getDirecc(coord: string[] ) {
   // return  this.httpClient.post(this.API_ENDPOINT, { address: direccion}, this.options);
    return  this.httpClient.get(this.API_ENDPOINT  + coord['lng'] + ',' + coord['lat'] +
                     '.json?types=address&access_token=' + environment.mapbox.accessToken);
  }
}
