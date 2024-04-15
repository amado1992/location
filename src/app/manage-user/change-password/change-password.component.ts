import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { NotifyService } from 'ngx-notify';
import { SecCensalService } from 'src/app/services/sec-censal.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

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

    idusuario: [''],
    password: ['']
    
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
    if (this.idUser == 1) {
      
      if (this.objUser != undefined){
      this.form.patchValue({
        idusuario: this.objUser.IdUsuario
      })
    }
    }

  }

  save() {
      this.censService.changePassword(this.form.get("idusuario").value, 
      this.form.get("password").value,).subscribe(next => {

          this._ns.success(next, '', { timeout: 2000 });
          this.bsModalRef.hide()
        }, (error) => {
          alert('Ha ocurrido un error al cambiar la contraseña del usuario.');
          console.error(error);
        });
  }

  close(){
    this.bsModalRef.hide()
  }
}
