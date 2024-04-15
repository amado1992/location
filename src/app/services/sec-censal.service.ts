import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {DataApiModel} from '../interfaces/api-data';
import {DataApiVisual} from '../interfaces/api-data-visual';

@Injectable({
  providedIn: 'root'
})
export class SecCensalService {
 //private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  API_ENDPOINT_OLD = 'https://api.normalizador.nvqlt.com/geo'; //lat=0.0&lng=1.1';
  //API_ENDPOINT = 'http://apiapk2ubic.corp.novaquality.es/geo';//Modo desarrollo

  API_ENDPOINT = ' https://api.ubicaciones.nvqlt.com/geo';//Modo produccion
 
  headers = new HttpHeaders();
  user: any = ""
  pass: any = ""
  _logUser: any
  options: any

  constructor(private httpClient: HttpClient) {

    this._logUser = localStorage.getItem('usuario')
    this.user = JSON.parse(this._logUser).alias;
    this.pass = JSON.parse(this._logUser).pass;

    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set('user', this.user);
    this.headers = this.headers.set('password', this.pass);
    this.options = {headers: this.headers};
  }
  getCensalAttr(long: string, latit: string ) {
    return  this.httpClient.get(this.API_ENDPOINT + '/sec-censal?lat=' + latit + '&lng=' + long, this.options);
  }
  getCensalRadio(long: string, latit: string, radio: number) {
    return  this.httpClient.get(this.API_ENDPOINT + '/sec-censal/area?lat=' + latit + '&lng=' + long + '&radio=' + radio, this.options);
  }
  getCensalMunic(cod: string) {
    return  this.httpClient.get(this.API_ENDPOINT + '/sec-censal/muni?cod=' + cod, this.options);
  }
  getDataZona(data: DataApiModel) {
    return this.httpClient.post(this.API_ENDPOINT + '/influ-zone', data, this.options);
  }
  getDataViviendas(data: DataApiVisual) {
    return this.httpClient.post(this.API_ENDPOINT + '/viviendas', data, this.options);
  }
  getDataCompetencia(data: DataApiVisual) {
    return this.httpClient.post(this.API_ENDPOINT + '/competencia', data, this.options);
  }
  getDataCentrosPropios(data: DataApiVisual) {
    return this.httpClient.post(this.API_ENDPOINT + '/centros-propios', data, this.options);
  }
  getCensalMunicipio(cod: string) {
    return  this.httpClient.get(this.API_ENDPOINT + '/sec-censal/municipio?cod=' + cod, this.options);
  }
  getNormalizaInversa(x: any, y: any) {
    return this.httpClient.post(this.API_ENDPOINT + '/normalizacion-inversa',  {lat: x, lng: y}, this.options);
  }
  getPuntosInteres(x: any, y: any, area: any, tipos: string) {
    return this.httpClient.post(this.API_ENDPOINT + '/get-pois2?lat=' + x + '&lng=' + y + '&d=' + area + '&tipos=' + tipos, {headers: '', date : ''}, this.options);
  }
  getMeteoroloia(censal: any) {
    return this.httpClient.post(this.API_ENDPOINT + '/datos-meteo',  {seccensal: censal}, this.options);
  }

  /*getEstimacionVentas(long: string, latit: string, tipo_centro:  string, tamano: string  ) {
    return this.httpClient.post(this.API_ENDPOINT + '/estimacion-ventas',  {'coordenadas': {'lng': long, 'lat': latit},
                                                  'tipo_centro':tipo_centro, 'tamano':tamano,
                                                  'modelos' : ['modelo_1', 'modelo_2', 'modelo_3', 'modelo_4', 'modelo_5', 'modelo_6', 'modelo_7', 'modelo_8', 'modelo_9', 
                                                                'modelo_10', 'modelo_11', 'modelo_12', 'modelo_13'],
                                                  'indicadores': ['indicador_1', 'indicador_2', 'indicador_3']
                      });
  }*/

  getEstimacionVentas(long: string, latit: string, tipo_centro:  string, tamano: string, respPois: any) {
    return this.httpClient.post(this.API_ENDPOINT + '/estimacion-ventas',  {'coordenadas': {'lng': long, 'lat': latit},
                                                  'tipo_centro':tipo_centro, 'tamano':tamano,
                                                  'modelos' : ['modelo_1', 'modelo_2', 'modelo_3', 'modelo_4', 'modelo_5', 'modelo_6', 'modelo_7', 'modelo_8', 'modelo_9', 
                                                                'modelo_10', 'modelo_11', 'modelo_12', 'modelo_13'],
                                                  'indicadores': ['indicador_1', 'indicador_2', 'indicador_3'],
                                                  "resp_pois" : respPois
                      }, this.options);
  }

  getParamVentas(user: string) {
    return  this.httpClient.get(this.API_ENDPOINT + '/params-ventas?t=' + user, this.options);
  }
  getPuntoInteresPalClave(lat: string, lng: string, area: string,  pclave: string) {
    return this.httpClient.post(this.API_ENDPOINT + '/ptos-interes-palabraclave',  {"lat":lat ,"lng":lng,"area":area,"pclave":pclave}, this.options);
  }

  getPuntoInteres(lat: any, lng: any, area: any,  tipos: any) {

    /*var formData: any = new FormData();
    formData.append('lat', lat);
    formData.append('lng', lng);
    formData.append('d', d);
    formData.append('tipos', tipos);

    return this.httpClient.post(this.API_ENDPOINT + '/get-pois2', formData);*/
    //return this.httpClient.post(this.API_ENDPOINT + '/get-pois2',  {"lat":lat ,"lng":lng,"d":d,"tipos":tipos});
    //return this.httpClient.get(this.API_ENDPOINT + '/get-pois2?lat=' + lat + '&lng=' + lng + '&d=' + area + '&tipos=' + tipos);
    return this.httpClient.post(this.API_ENDPOINT + '/get-pois2?lat=' + lat + '&lng=' + lng + '&d=' + area + '&tipos=' + tipos, {}, this.options);
  }

  saveProject(nombre_api, direccion_api, comentario_api){
    return this.httpClient.get(this.API_ENDPOINT + '/guardar-proy?nombre_api=' + nombre_api + '&direccion_api=' + direccion_api + '&comentario_api=' + comentario_api, {headers: this.headers, responseType: 'text'});
   }

   listProjects(){
    return this.httpClient.get(this.API_ENDPOINT + '/abrir-proy', this.options);
   }

   updateProject(nombre_api, direccion_api, comentario_api, id_api){
    return this.httpClient.get(this.API_ENDPOINT + '/modificar-proy?id_api=' + id_api + '&nombre_api=' + nombre_api + '&direccion_api=' + direccion_api + '&comentario_api=' + comentario_api, {headers: this.headers, responseType: 'text'});
   }
   
   deleteProject(id_api: any){
    return this.httpClient.get(this.API_ENDPOINT + '/borrar-proy?id_api=' + id_api , {headers: this.headers, responseType: 'text'});
   }

   //Manage user
   listUsers(){
    return this.httpClient.get(this.API_ENDPOINT + '/listar-usuarios', this.options);
   }

   deleteUser(id){
    return this.httpClient.get(this.API_ENDPOINT + '/borrar-usuario?idusuario=' + id, {headers: this.headers, responseType: 'text'});
   }

   createUser(usuario, password, rol){
    return this.httpClient.get(this.API_ENDPOINT + '/nuevo-usuario?usuario=' + usuario + '&password=' + password + '&rol=' + rol, {headers: this.headers, responseType: 'text'});
  }

   changePassword(id, password){
    return this.httpClient.get(this.API_ENDPOINT + '/cambiar-password?idusuario=' + id + '&password=' + password, {headers: this.headers, responseType: 'text'});
   }

   lostPassword(user){
    return this.httpClient.get(this.API_ENDPOINT + '/lost-password?usuario=' + user, {headers: this.headers, responseType: 'text'});
   }

   resetPassword(user, password){
    return this.httpClient.get(this.API_ENDPOINT + '/reset-password?usuario=' + user + '&password=' + password, {headers: this.headers, responseType: 'text'});
   }
   //End manage user
}
