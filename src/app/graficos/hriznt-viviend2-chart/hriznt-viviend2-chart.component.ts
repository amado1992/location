import { Component, OnInit, Input, OnChanges, SimpleChanges  } from '@angular/core';
import { ObjSerieMemiddleAges } from 'src/app/data/obj-serie-middle-ages';
import { FormatoDecimalService } from 'src/app/services/formato-decimal.service';

@Component({
  selector: 'app-hriznt-viviend2-chart',
  templateUrl: './hriznt-viviend2-chart.component.html',
  styleUrls: ['./hriznt-viviend2-chart.component.css']
})
export class HrizntViviend2ChartComponent implements OnInit, OnChanges  {

  serieSerieMemiddleAges: ObjSerieMemiddleAges
  @Input('_data') public _data = [];
  //@Input('_data') public _data = [0, 0];
  @Input('title') public title = '';
  view: any[] = [290, 150];
  data: any[] = [40.6, 33.3];
  // data = this._data;

  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = '';
  showYAxisLabel = false;
  yAxisLabel = '';
  timeline = true;
  showDataLabel = true;
  roundEdges = false;

  /*colorScheme = {
    domain: ['#4472C4', '#548235']
  };*/

  colorScheme = {
    domain: []
  };

  // pie
  showLabels = true;

  // data goes here

 /*public multi = [
  {
    'name': 'Zona',
    'value': this._data[0],
    'extra': {
      'code': 'de'
    }
  },
  {
    'name': 'Municipio',
    'value': this._data[1],
    'extra': {
      'code': 'de'
    }
  },
 ];*/

 public multi = [];

  constructor(public formatDecimal: FormatoDecimalService) { 
    this.serieSerieMemiddleAges = new ObjSerieMemiddleAges()
  }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    this.pillChart()
    // changes.prop contains the old and the new value...
  //   this. view = [200, 100];
    /*this.multi = [
      {
        'name': 'Zona',
        'value': this._data[0],
        'extra': {
          'code': 'de'
        }
      },
      {
        'name': 'Municipio',
        'value': this._data[1],
        'extra': {
          'code': 'de'
        }
      },
    ];*/
   }
   onSelect(event) {
    console.log(event);
  }
  formatDataLabel(value ) {
    let resultado = value.toString();
    resultado = resultado.replace('.',',');
     return resultado;
   }

   pillChart() {
    for (let i = 0; i < this._data.length; i++) {

      this.serieSerieMemiddleAges = new ObjSerieMemiddleAges()

      var color = this._data[i].color
      var name = this._data[i].name 
          
      var value = (this._data[i].values.num_fincas=== 0? 0 : this.formatDecimal.formatearNum(this._data[i].values.total_poblacion/this._data[i].values.num_fincas))

      this.serieSerieMemiddleAges.name = name
      this.serieSerieMemiddleAges.value = value

      this.colorScheme.domain.push(color)
      this.multi.push(this.serieSerieMemiddleAges)
    }
  }
}
