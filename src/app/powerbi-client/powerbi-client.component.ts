import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-powerbi-client',
  templateUrl: './powerbi-client.component.html',
  styleUrls: ['./powerbi-client.component.css']
})
export class PowerbiClientComponent implements OnInit {
  reportConfig: any = {
    type: 'report',
    embedUrl: undefined,
    tokenType: undefined,
    accessToken: undefined,
    settings: undefined,
  };

title: string;
closeBtnName: string;
list: any[] = [];
isHideReport: boolean = false

  // CSS Class to be passed to the wrapper
  // Hide the report container initially
  reportClass = 'report-container hidden';
  // Flag which specify the type of embedding
  phasedEmbeddingFlag = false;

  constructor(private fb: FormBuilder, public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.embedReport()
  }
  embedReport() {
    let baseUrl = "https://app.powerbi.com/reportEmbed?reportId=921b3a3c-0188-4740-be6b-2d566e3dc7f2"
    var group = "&groupId=00f48e3c-13b4-4db2-b8d6-e3c0878bc65e"

    // Update the reportConfig to embed the PowerBI report
    this.reportConfig = {
      ...this.reportConfig,
      id: "921b3a3c-0188-4740-be6b-2d566e3dc7f2",
      embedUrl: baseUrl + group,
      accessToken: undefined,
    };

  }

close(){
  
}

hideReport(){
  this.isHideReport = !this.isHideReport
}

}
