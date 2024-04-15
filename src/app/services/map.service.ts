import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json'), withCredentials: true };
  //API_ENDPOINT_OLD = 'https://api.normalizador.nvqlt.com/geo';
  //API_ENDPOINT = 'http://apiapk2ubic.corp.novaquality.es/geo';

  API_ENDPOINT = ' https://api.ubicaciones.nvqlt.com/geo';//Modo produccion

  token: any = localStorage.getItem('tokenApk2Ubic');
  _logUser = localStorage.getItem('usuario')

  private sub = new Subject();
  public subObservable$

  private subClear = new Subject();
  public subClearObservable$

  private subDirLiteral= new Subject();
  public subDirLiteralObservable$

  private subForm = new Subject();
  public subFormObservable$

  private subDeleteUpdate = new Subject();
  public subDeleteUpdateObservable$

  private subCrudUser = new Subject();
  public subCrudUserObservable$

  constructor(private httpClient: HttpClient) {
   this.subObservable$ = this.sub as Observable<any>

   this.subClearObservable$ = this.subClear as Observable<any>

   this.subDirLiteralObservable$ = this.subDirLiteral as Observable<any>

   this.subFormObservable$ = this.subForm as Observable<any>

   this.subDeleteUpdateObservable$ = this.subDeleteUpdate as Observable<any>

   this.subCrudUserObservable$ = this.subCrudUser as Observable<any>
  }
  sendMessage(message: string) {
    this.sub.next(message)
  }

  sendClearMessage(message: string) {
    this.subClear.next(message)
  }

  sendMessageDirLiteral(message: string) {
    this.subDirLiteral.next(message)
  }

  sendFormMessage(message: string) {
    this.subForm.next(message)
  }

  sendDeleteUpdate(message: any) {
    this.subDeleteUpdate.next(message)
  }

  sendCrudUser(message: any) {
    this.subCrudUser.next(message)
  }

  getAttr(direccion: string) {
    let headers = new HttpHeaders();
    var user = JSON.parse(this._logUser).alias;
    var pass = JSON.parse(this._logUser).pass;

    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('user', user);
    headers = headers.set('password', pass);
    const options = {headers: headers};

    return this.httpClient.post(this.API_ENDPOINT + '/normalize', { address: direccion }, options);
  }
  getAttrPrivate(direccion: string, usuario: Usuario) {
    let headers = new HttpHeaders();
    console.log('desde API', usuario.alias);
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('user', usuario.alias);
    headers = headers.set('password', usuario.pass);
    //return this.httpClient.post(this.API_ENDPOINT + '/normalize-private', { address: direccion }, { headers: headers, withCredentials: true});
    return this.httpClient.post(this.API_ENDPOINT + '/normalize-private', { address: direccion }, { headers: headers });
  }

  /*getAttrPrivate(direccion: string, usuario: Usuario) {
    //const token = this.token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'Bearer '+token
    });
    const options = {headers: headers};

    return this.httpClient.post(this.API_ENDPOINT + '/normalize-private', { address: direccion }, options);
  }*/

  login(usuario: Usuario) {
    let headers = new HttpHeaders();
    headers = headers.set("user", usuario.alias);
    headers = headers.set("password", usuario.pass);

  /*headers = headers.set("user", "testing@nvqlt.com");
    headers = headers.set("password", "ydOjlIX3NSopUXdIFzeLOslWSD4PP22H0Ki4Dmt0PqM");*/
    
    //return this.httpClient.post(this.API_ENDPOINT + '/login-user', {}, {headers: headers, withCredentials: true});
    return this.httpClient.post(this.API_ENDPOINT + '/login-user', {}, {headers: headers});
  }
}
