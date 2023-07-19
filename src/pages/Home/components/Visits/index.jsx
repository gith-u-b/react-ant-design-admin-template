import React, { Component } from 'react'
import * as echarts from 'echarts';

export default class Visits extends Component {
    initChart = () => {
        var chartDom = document.getElementById('VisitsChart');
        this.myChart = echarts.init(chartDom);
        let xData = [],
            yData = []
        for(var i = 0; i < 12; i++){
            xData.push(i+1+'月')
            yData.push(Math.ceil(Math.random()*1000))
        }
        var option = {
            grid: {
                top: '10%',
                left: '10%',
                right: '5%',
                bottom: '12%',
            },
            xAxis: {
                type: 'category',
                data: xData
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    lineStyle: {
                        color: '#f5f5f5'
                    }
                },
            },
            series: [
                {
                    data: yData,
                    type: 'bar',
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                          { offset: 0, color: '#83bff6' },
                        //   { offset: 0.5, color: '#188df0' },
                          { offset: 1, color: '#188df0' }
                        ])
                      },
                }
            ]
        };
        this.myChart.setOption(option);
    }
    chartReseize = () => {
        this.myChart && this.myChart.resize()
    }
    componentDidMount() {
        this.initChart()
    }
    render() {
        return (
            <div className='w100 h100' id='VisitsChart'></div>
        )
    }
}
