import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ObjSerie } from 'src/app/data/obj-serie';
import { ObjSerieMemiddleAges } from 'src/app/data/obj-serie-middle-ages';
import { FormatoDecimalService } from 'src/app/services/formato-decimal.service';

@Component({
  selector: 'app-vertic-viviend-chart',
  templateUrl: './vertic-viviend-chart.component.html',
  styleUrls: ['./vertic-viviend-chart.component.css']
})
export class VerticViviendChartComponent implements OnInit, OnChanges {

  //serie = new ObjSerie()

  @Input() checkType: any
  //horizontal
  serieSerieMemiddleAges: ObjSerieMemiddleAges
  @Input() _data: any[];
  //end horizontal

  //@Input('_data') public _data = [];
  //@Input('_data') public _data = [0, 0];
  @Input('title') public title = [''];

  //view: any[] = [210, 140];
  //view: any[] = [200, 220];

  // options for the chart
  /*showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  //showXAxisLabel = false;
  showXAxisLabel = true;
  xAxisLabel = '';
  //showYAxisLabel = false;
  showYAxisLabel = true;
  yAxisLabel = '';
  animations = true;
  timeline = true;
  showDataLabel = true;*/

  /*colorScheme = {
    domain: ['#548235', '#4472C4']
  };*/

  /*colorScheme = {
    domain: []
  };*/


  // data goes here
/*public multi = [
  {
    'name': 'Municipio',
    'value': this._data[0]
  },
  {
    'name': 'Zona',
    'value': this._data[1]
  },
];*/

//public multi = [];

//horizontal
animations = true;
showDataLabel = true;
timeline = true;
roundEdges = false;

//new code
view: any[] = [380, 150];

// options
showXAxis: boolean = true;
showYAxis: boolean = true;
gradient: boolean = false;
showLegend: boolean = false;
showXAxisLabel: boolean = true;
yAxisLabel: string = '';
showYAxisLabel: boolean = true;
xAxisLabel: string = '';
//end new code

colorScheme = {
  domain: []
};

// pie
showLabels = true;
public multi = [];
//end horizontal


  constructor(public formatDecimal: FormatoDecimalService) {
    //this.serie = new ObjSerie()
    this.serieSerieMemiddleAges = new ObjSerieMemiddleAges()
   }
   ngOnChanges(changes: SimpleChanges) {
    this.pillChart()
    /*this.multi = [
      {
        'name': 'Municipio',
        'value': this._data[0]
      },
      {
        'name': 'Zona',
        'value': this._data[1]
      },
    ];*/
  }
  ngOnInit() {
  }
  
  onSelect(event) {
    console.log(event);
  }
  formatDataLabel(value ) {
    let resultado = value.toString();
    resultado = resultado.replace('.', ',');
     return resultado ;
  }

  /*pillChart() {
    var value
    for (let i = 0; i < this._data.length; i++) {

      this.serie = new ObjSerie()

      var color = this._data[i].color
      var name = this._data[i].name

      if (this.checkType == "Antig"){
        value = this.formatDecimal.redondear(this._data[i].values.antiguedad)
      }
      
      if (this.checkType == "Alt"){
        value =this.formatDecimal.formatearNum(this._data[i].values.altu_media)
      }
      
      this.serie.name = name
      this.serie.value = value

      this.colorScheme.domain.push(color)
      this.multi.push(this.serie)
    }
  }*/

  pillChart() {
    var value
    for (let i = 0; i < this._data.length; i++) {

      this.serieSerieMemiddleAges = new ObjSerieMemiddleAges()

      var color = this._data[i].color
      var name = this._data[i].name

      if (this.checkType == "Antig"){
        value = this.formatDecimal.redondear(this._data[i].values.antiguedad)
      }
      
      if (this.checkType == "Alt"){
        value =this.formatDecimal.formatearNum(this._data[i].values.altu_media)
      }
      
      this.serieSerieMemiddleAges.name = name
      this.serieSerieMemiddleAges.value = value

      this.colorScheme.domain.push(color)
      this.multi.push(this.serieSerieMemiddleAges)
    }
  }
}
