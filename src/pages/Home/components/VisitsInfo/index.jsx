import React, { Component } from 'react'
import * as echarts from 'echarts';
export default class VisitsInfo extends Component {
    initChart = () => {
        var chartDom = document.getElementById('VisitsInfoChart');
        this.myChart = echarts.init(chartDom);
        let data1 = [],
            data2 = []
        let now = new Date().getTime(),
            m = 1000*60
        for(var i = 0; i < 60; i++){
            let d = now - m*i
            data1.push([d, Math.ceil(Math.random()*10)])
            data2.push([d, Math.ceil(Math.random()*10)])
        }
        var option = {
                color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
                tooltip: {
                    trigger: 'axis',
                },
                legend: {
                    top: '5%',
                    right: '5%',
                    data: ['浏览量', '访客数']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'time',
                        boundaryGap: false,
                        axisLabel: {
                            formatter: '{HH}:{mm}'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        splitLine: {
                            lineStyle: {
                                color: '#f5f5f5'
                            }
                        },
                    }
                ],
                series: [
                    {
                        name: '浏览量',
                        type: 'line',
                        stack: 'Total',
                        smooth: true,
                        showSymbol: false,
                        areaStyle: {
                            opacity: 0.8,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgb(128, 255, 165)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgb(1, 191, 236)'
                                }
                            ])
                        },
                        data: data1.reverse()
                    },
                    {
                        name: '访客数',
                        type: 'line',
                        stack: 'Total',
                        smooth: true,
                        showSymbol: false,
                        areaStyle: {
                            opacity: 0.8,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgb(0, 221, 255)'
                            },
                            {
                                offset: 1,
                                color: 'rgb(77, 119, 255)'
                            }
                            ])
                        },
                        data: data2.reverse()
                    },
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
            <div className='w100 h100' id='VisitsInfoChart'></div>
        )
    }
}
