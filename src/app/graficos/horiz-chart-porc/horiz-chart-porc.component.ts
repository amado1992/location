import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ObjSerieMemiddleAges } from 'src/app/data/obj-serie-middle-ages';
import { FormatoDecimalService } from 'src/app/services/formato-decimal.service';

@Component({
  selector: 'app-horiz-chart-porc',
  templateUrl: './horiz-chart-porc.component.html',
  styleUrls: ['./horiz-chart-porc.component.css']
})
export class HorizChartPorcComponent implements OnInit, OnChanges {

  serieSerieMemiddleAges: ObjSerieMemiddleAges
   @Input() _data: any[];
  //@Input('_data') public _data = [0, 0];
  //@Input() _colors = []
  //@Input('_data') public _data = [0, 0, 0, 0];
  @Input('title') public title = '';
  view: any[] = [250, 100];
  data: any[] = [40.6, 33.3];
  // data = this._data;

  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel = '';
  animations = true;
  showDataLabel = true;
  timeline = true;
  roundEdges = false;

  /*colorScheme = {
    domain: ['#4472C4', '#548235']
  };*/

  //Now
  /*colorScheme = {
    domain: [this._colors[0], this._colors[1], this._colors[2], this._colors[3]]
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

  //Now
    {
      "name": "Zona 1",
      "value": this._data[0],
      'extra': {
        'code': 'de'
      }
    },
    {
      "name": "Zona 2",
      "value": this._data[1],
      'extra': {
        'code': 'de'
      }
    },
    {
      "name": "Zona 3",
      "value": this._data[2],
      'extra': {
        'code': 'de'
      }
    },
    {
      "name": "Zona 4",
      "value": this._data[3],
      'extra': {
        'code': 'de'
      }
    }
  
   ];*/
  
   public multi = [];

  constructor(public formatDecimal: FormatoDecimalService) {
    this.serieSerieMemiddleAges = new ObjSerieMemiddleAges()
   }
   ngOnChanges(changes: SimpleChanges) {
    this.pillChart()
    // changes.prop contains the old and the new value...
    //   this. view = [200, 100];
   //Now
   /*this.colorScheme = {
    domain: [this._colors[0], this._colors[1], this._colors[2], this._colors[3]]
  };
  this.multi = [   
    {
      "name": "Zona 1",
      "value": this._data[0],
      'extra': {
        'code': 'de'
      }
    },
    {
      "name": "Zona 2",
      "value": this._data[1],
      'extra': {
        'code': 'de'
      }
    },
    {
      "name": "Zona 3",
      "value": this._data[2],
      'extra': {
        'code': 'de'
      }
    },
    {
      "name": "Zona 4",
      "value": this._data[3],
      'extra': {
        'code': 'de'
      }
    }
  
   ];*/
  }
  ngOnInit() {
    //Now
    /*this.colorScheme = {
      domain: [this._colors[0], this._colors[1], this._colors[2], this._colors[3]]
    };
    this.multi = [   
      {
        "name": "Zona 1",
        "value": this._data[0],
        'extra': {
          'code': 'de'
        }
      },
      {
        "name": "Zona 2",
        "value": this._data[1],
        'extra': {
          'code': 'de'
        }
      },
      {
        "name": "Zona 3",
        "value": this._data[2],
        'extra': {
          'code': 'de'
        }
      },
      {
        "name": "Zona 4",
        "value": this._data[3],
        'extra': {
          'code': 'de'
        }
      }
    
     ];*/
  }
  
  onSelect(event) {
  }
  formatDataLabel(value) {
    let resultado = value.toString();
    resultado = resultado.replace('.', ',');
    return resultado + '%';
  }
  pillChart(){
    for (let i = 0; i < this._data.length; i++) {
      
      this.serieSerieMemiddleAges = new ObjSerieMemiddleAges()
  
     var color = this._data[i].color 
     var name = this._data[i].name   
     var value = this.formatDecimal.formatearNum(this._data[i].values.Porc_hogares_unipersonales)
     
     this.serieSerieMemiddleAges.name = name
     this.serieSerieMemiddleAges.value = value
  
     this.colorScheme.domain.push(color)
     this.multi.push(this.serieSerieMemiddleAges)
    }
   }
}
