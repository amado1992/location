import { Component, OnInit, Input, OnChanges, SimpleChanges  } from '@angular/core';

@Component({
  selector: 'app-pie-viviend-chart',
  templateUrl: './pie-viviend-chart.component.html',
  styleUrls: ['./pie-viviend-chart.component.css']
})
export class PieViviendChartComponent implements OnChanges, OnInit {
  @Input('_data') public _data = [0, 0];
  @Input('title') public title = '';
  view: any[] = [400, 230];
  data: any[] = [33, 21];


  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  timeline = true;
  legendTitle = '';
  explodeSlices = false;
  doughnut = false;



  colorScheme = {
    domain: ['#4472C4', '#548235']
  };

  //pie
   showLabels = true;

  // data goes here

  public single = [
    {
      'name': 'Zona',
      'value': this._data[0],
    },
    {
      'name': 'Municipio',
      'value': this._data[1],
    },
  ];
    constructor() {
    }
  ngOnInit() {

    console.log(this._data);
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    this.single = [
      {
      'name': 'Zona',
      'value': this._data[0],
    },
    {
      'name': 'Municipio',
      'value': this._data[1],
    },
    ];

    console.log(this._data[0]);

   }
   onSelect(event) {
    console.log(event);
    }


}
