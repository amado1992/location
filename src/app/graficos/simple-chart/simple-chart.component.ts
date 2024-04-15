import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ObjSerie } from 'src/app/data/obj-serie';
import { ObjSerieMemiddleAges } from 'src/app/data/obj-serie-middle-ages';
import { FormatoDecimalService } from 'src/app/services/formato-decimal.service';

@Component({
  selector: 'app-simple-chart',
  templateUrl: './simple-chart.component.html',
  styleUrls: ['./simple-chart.component.css']
})
export class SimpleChartComponent implements OnInit, OnChanges {

  /*serie = new ObjSerie()
  @Input('_data') public _data = [];*/

  //horizontal
  serieSerieMemiddleAges: ObjSerieMemiddleAges
  @Input() _data: any[];
  //end horizontal
  
  title = 'Renta Relativa ';

  // options for the chart
  /*showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = '';
  showYAxisLabel = false;
  yAxisLabel = '';
  timeline = true;
  showDataLabel = true;*/

  //view: any[] = [200, 200];

  // options
  /*showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel = '';*/

  /*colorScheme = {
    domain: ['#5AA454', '#A10A28']
  };*/

  /*colorScheme = {
    domain: []
  };*/

  //pie
  //showLabels = true;

  // data goes here
  /*public single = [
    {
      'name': 'Zona',
      'value': this._data[0]
    },
  ];*/

  //public single = [];

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
    /*this.single = [
      {
        'name': 'Renta relativa zona',
        'value': this._data[0]
      },
    ];*/
  }

  ngOnInit() {
  }
  
  onSelect(event) {
    console.log(event);
  }
  formatDataLabel(value) {
    let resultado = value.toString();
    resultado = resultado.replace('.', ',');
    return resultado + '%';
  }

  /*pillChartVert() {
    var value
    for (let i = 0; i < this._data.length; i++) {

      this.serie = new ObjSerie()

      var color = this._data[i].color
      var name = this._data[i].name

      
     value = (this._data[i].municipio.renta_media_por_hogar === 0 ? 0 : this.formatDecimal.formatearNum((this._data[i].values.Renta_media_por_hogar / this._data[i].municipio.renta_media_por_hogar) * 100))
      
      this.serie.name = name
      this.serie.value = value

      this.colorScheme.domain.push(color)
      this.single.push(this.serie)
    }
  }*/

  pillChart() {
    for (let i = 0; i < this._data.length; i++) {

      this.serieSerieMemiddleAges = new ObjSerieMemiddleAges()

      var color = this._data[i].color
      var name = this._data[i].name

      var value = (this._data[i].municipio.renta_media_por_hogar === 0 ? 0 : this.formatDecimal.formatearNum((this._data[i].values.Renta_media_por_hogar / this._data[i].municipio.renta_media_por_hogar) * 100))

      this.serieSerieMemiddleAges.name = name
      this.serieSerieMemiddleAges.value = value

      this.colorScheme.domain.push(color)
      this.multi.push(this.serieSerieMemiddleAges)
    }
  }
}
