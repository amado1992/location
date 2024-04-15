import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-new-folder',
  templateUrl: './new-folder.component.html',
  styleUrls: ['./new-folder.component.css']
})
export class NewFolderComponent implements OnInit {
  form = this.fb.group({

    name: [''],
    folder: [''],
    description: [''],
    comment: ['']

});
title: string;
closeBtnName: string;
list: any[] = [];
options = [{id: 1, description: "Folder 1"}, {id: 2, description: "Folder 2"}]

  constructor(private fb: FormBuilder, public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }
  save(){}

}
