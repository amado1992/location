import { Component, OnInit, Input, OnChanges, SimpleChanges  } from '@angular/core';

@Component({
  selector: 'app-pie-renta-chart',
  templateUrl: './pie-renta-chart.component.html',
  styleUrls: ['./pie-renta-chart.component.css']
})
export class PieRentaChartComponent implements OnChanges, OnInit {
  @Input('_data') public _data = [0, 0];
  title = '% Renta total habitantes';
  view: any[] = [400, 250];
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
  labels = true;

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
  setLabelFormatting(c): number {
      //return `${c.value}%`;
     // return `label=${c.label}<br/><small class="number-card-label">value=${c.value}</small>`;
     return c.value;
  }


}
