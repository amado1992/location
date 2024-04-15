import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NewFolderComponent } from '../new-folder/new-folder.component';
import { HttpClient } from '@angular/common/http';
import { SecCensalService } from '../services/sec-censal.service';
import { MapService } from '../services/map.service';
import { NotifyService } from 'ngx-notify';
@Component({
  selector: 'app-save-project',
  templateUrl: './save-project.component.html',
  styleUrls: ['./save-project.component.css']
})
export class SaveProjectComponent implements OnInit {

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

    nombre_api: [''],
    direccion_api: [''],
    comentario_api: ['']

  });

  objProj: any
  idProj: any

  name: string;
  id: any;
  closeBtnName: string;
  list: any[] = [];
  options = [{ id: 1, description: "Carpeta 1" }, { id: 2, description: "Carpeta 2" }, { id: 2, description: "Carpeta 3" }]
  modalRef: BsModalRef;
  API_ENDPOINT = 'http://apiapk2ubic.corp.novaquality.es/geo';


  constructor(private fb: FormBuilder, public bsModalRef: BsModalRef,
    private modalService: BsModalService, private http: HttpClient,
    private censService: SecCensalService, private mapService: MapService,
    private _ns: NotifyService) { }

  ngOnInit() {
    var dirLiteral = localStorage.getItem("dirLiteral")
    if (dirLiteral != null) {
      this.dirLiteral = JSON.parse(dirLiteral)
      this.form.get('direccion_api').setValue(this.dirLiteral)
    }

    this.mapService.subDirLiteralObservable$.subscribe((next: any) => {

      localStorage.setItem("dirLiteral", JSON.stringify(next))
      this.form.get('direccion_api').setValue(next)
    })

    if (this.idProj == 1) {
      console.log("Edit projecto www ", this.objProj)
      this.form.patchValue({
        nombre_api: this.objProj.Nombre,
        direccion_api: this.objProj.Descripcion,
        comentario_api: this.objProj.Comentario
      })
    }

  }

  save() {
    /*this.http.post(this.API_ENDPOINT + '/guardar-proy', this.form.value).subscribe(next =>{
      this.bsModalRef.hide()
    });*/
    if (this.idProj == 0) {
      this.censService.saveProject(
        this.form.get('nombre_api').value,
        this.form.get('direccion_api').value,
        this.form.get('comentario_api').value).subscribe(next => {

          this._ns.success(next, '', { timeout: 2000 });
          this.bsModalRef.hide()
        }, (error) => {
          alert('Ha ocurrido un error al guardar el proyecto.');
          console.error(error);
        });
    } else {
      this.censService.updateProject(
        this.form.get('nombre_api').value,
        this.form.get('direccion_api').value,
        this.form.get('comentario_api').value, this.objProj.Id).subscribe(next => {

          this._ns.success(next, '', { timeout: 2000 });
          this._ns.updateSetting(this.setting);

          this.bsModalRef.hide()
          this.mapService.sendDeleteUpdate(this.flagDeleteUpdate)
        }, (error) => {
          alert('Ha ocurrido un error al modificar el proyecto.');
          console.error(error);
        });
    }
  }

  openModalWithComponent() {
    const initialState = {
      list: [],
      title: 'Modal with component'
    };
    this.modalRef = this.modalService.show(NewFolderComponent, { initialState });
    if (this.modalRef.content != null) {
      this.modalRef.content.closeBtnName = 'Close';
    }
  }
  see() {
    
    this.mapService.sendFormMessage(this.form.get('direccion_api').value)
    this.bsModalRef.hide()
    this.modalService.hide(1)
  }
  delete() {
    /*this.bsModalRef.hide()
    this.modalService.hide(1);*/

    this.modalRef.hide();
    this.censService.deleteProject(this.objProj.Id).subscribe(next => {

      this._ns.success(next, '', { timeout: 2000 });
      this._ns.updateSetting(this.setting);
      
      this.bsModalRef.hide()
      this.mapService.sendDeleteUpdate(!this.flagDeleteUpdate)
    }, (error) => {
      alert('Ha ocurrido un error al eliminar el proyecto.');
      console.error(error);
    });
  }

  deleteModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  confirm(): void {
    this.delete()
  }

  decline(): void {
    this.modalRef.hide();
  }
}
