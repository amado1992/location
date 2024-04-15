import { Component, OnInit, Input, OnChanges, SimpleChanges  } from '@angular/core';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-line-echart',
  templateUrl: './line-echart.component.html',
  styleUrls: ['./line-echart.component.css']
})
export class LineEchartComponent implements OnInit, OnChanges  {
  @Input('_data') public _data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  @Input('title') public title = '';
  @Input('color') public color = '#FFFFFF';
  chartOption: EChartOption = {
    xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Ene', 'Feb', 'Mar', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Sept', 'Oct', 'Nov', 'Dic']
      },
      yAxis: {
          type: 'value'
      },
      color : [ this.color],
      series: [{
          data: this._data,
          type: 'line'
      }]
  };

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    this.chartOption = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Ene', 'Feb', 'Mar', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Sept', 'Oct', 'Nov', 'Dic']
    },
    yAxis: {
        type: 'value'
    },
    color : [ this.color],
    series: [{
        data: this._data,
        type: 'line'
    }]
      };
   }

}

