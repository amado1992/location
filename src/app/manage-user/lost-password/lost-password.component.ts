import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { NotifyService } from 'ngx-notify';
import { SecCensalService } from 'src/app/services/sec-censal.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-lost-password',
  templateUrl: './lost-password.component.html',
  styleUrls: ['./lost-password.component.css']
})
export class LostPasswordComponent implements OnInit {

  setting: any = {
    position: ['right', 'bottom'],
    offset: [20, 20],
    lastOnBottom: true,
    zIndex: 1031,
    minWidth: 450,
    maxWidth: 450,
  };

  @ViewChild('templateDelete') templateDelete: TemplateRef<any>;

  dirLiteral: any = ""
  flagDeleteUpdate:boolean = false

  form = this.fb.group({
    user: ['', Validators.required]
  });

  objUser: any
  idUser: any

  name: string;
  id: any;
  closeBtnName: string;
  list: any[] = [];
  options = [{ id: 1, rol: "Administrador" }, { id: 2, rol: "Común" }]
  modalRef: BsModalRef;
  API_ENDPOINT = 'http://apiapk2ubic.corp.novaquality.es/geo';


  constructor(private fb: FormBuilder, public bsModalRef: BsModalRef,
    private modalService: BsModalService, private http: HttpClient,
    private censService: SecCensalService, private mapService: MapService,
    private _ns: NotifyService) { }

  ngOnInit() {

  }

  save() {
      this.censService.lostPassword(this.form.get("user").value).subscribe(next => {

          this._ns.success(next, '', { timeout: 2000 });
          this._ns.updateSetting(this.setting);
          this.bsModalRef.hide()
        }, (error) => {
          alert('Ha ocurrido un error en el servicio recuperar contraseña del usuario.');
          console.error(error);
        });
  }

  close(){
    this.bsModalRef.hide()
  }
  
}
