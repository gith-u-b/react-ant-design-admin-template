import React, { Component } from 'react'
import * as echarts from 'echarts';
export default class Active extends Component {
    initChart = () => {
        var chartDom = document.getElementById('ActiveChart');
        this.myChart = echarts.init(chartDom);
        let echartData = [{
            name: "跳出率",
            value: "35"
        },
        {
            name: "留存率",
            value: "60"
        },
        {
            name: "活跃率",
            value: "70"
        }
        ];
        let formatNumber = function(num) {
            let reg = /(?=(\B)(\d{3})+$)/g;
            return num.toString().replace(reg, ',');
        }
        var option = {
            color: ['#f04864', '#1890ff', '#2fc25b'],
            tooltip: {
                trigger: 'item',
                formatter: '{b}：{c}%'
            },
            series: [{
                type: 'pie',
                roseType: 'radius',
                radius: ['25%', '60%'],
                center: ['50%', '50%'],
                data: echartData,
                hoverAnimation: false,
                itemStyle: {
                    normal: {
                        borderWidth: 2
                    }
                },
                labelLine: {
                    normal: {
                        length: 20,
                        length2: 40,
                        lineStyle: {
                            // color: '#e6e6e6'
                        }
                    }
                },
                label: {
                    normal: {
                        formatter: params => {
                            return (
                                '{icon|●}{name|' + params.name + '}\n{value|' +
                                formatNumber(params.value) + '%}'
                            );
                        },
                        // padding: [0 , -100, 25, -100],
                        rich: {
                            icon: {
                                fontSize: 16,
                                color: 'inherit'
                            },
                            name: {
                                fontSize: 18,
                                padding: [0, 0, 0, 10],
                                color: '#000'
                            },
                            value: {
                                fontSize: 14,
                                fontWeight: 'bolder',
                                padding: [10, 0, 0, 20],
                                color: 'inherit'
                                // color: '#333333'
                            }
                        }
                    }
                },
            }]
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
            <div className='w100 h100' id='ActiveChart'></div>
        )
    }
}
