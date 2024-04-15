import { Component, OnInit, Input, OnChanges, SimpleChanges  } from '@angular/core';
import { EChartOption } from 'echarts';
import { ObjSeriePie } from 'src/app/data/obj-serie-pie';

@Component({
  selector: 'app-pie-echart',
  templateUrl: './pie-echart.component.html',
  styleUrls: ['./pie-echart.component.css']
})
export class PieEchartComponent implements OnChanges, OnInit  {

  serie = new ObjSeriePie()
  @Input('_data') public _data = [];

  //@Input('_data') public _data = [0, 0];
  @Input('title') public title = '';
  //title = this._title;
 /* chartOption: EChartOption = {
  color : [ '#4472C4', '#548235'],
  tooltip : {
      trigger: 'item',
      formatter: '({d}%)'//<br/>{b} : {c} ({d}%)"
  },
  series : [
      {
          name: this.title,
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data: [
              {value: this._data[0], name: this._data[0] + '%'},
              {value: this._data[1], name: this._data[1] + '%'},
          ],
          itemStyle: {
              emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          }
      }
  ]
  };*/

  chartOption = {
    color : [],
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series : [
        {
            name: this.title,
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data: [],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
    };
  
  constructor() { }
  ngOnChanges(changes: SimpleChanges) {
    this.pillChart()
    /*this.chartOption = {
      color : [ '#4472C4', '#548235'],
      tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"//'({d}%)'//<br/>{b} : {c} ({d}%)"
      },
      series : [
          {
              name: this.title,
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data: [
                  {value: this._data[0], name: 'Zona:' + this.porc( this._data[0]) + '%'},
                  {value: this._data[1], name: 'Municipio: ' + this.porc( this._data[1]) + '%'},
              ],
              itemStyle: {
                  emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
          }
      ]
      };*/
   }
  ngOnInit() {
  }
  
 porc(value: number) {
   return Math.round((value * 100) / (this._data[0] + this._data[1]));
 }

 pillChart(){
    for (let i = 0; i < this._data.length; i++) {
      
      this.serie = new ObjSeriePie()
  
     var color = this._data[i].color 
     var name = this._data[i].name   
     var value = this._data[i].values.Renta_media_por_persona *  this._data[i].values.total_poblacion
     
     this.serie.value = value
     this.serie.name = name + " " + this.porc(value) + '%'
     
     this.chartOption.color.push(color)

     this.chartOption.series[0].data.push(this.serie)
    }
}

 
}
