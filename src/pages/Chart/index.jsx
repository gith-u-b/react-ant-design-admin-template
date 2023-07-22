import React, { Component } from 'react';
import ReactEcharts from "echarts-for-react"

export default class CalculationCharts extends Component {
	getOption = ()=>{
		let option = {
			title: {
				text: '计算报表'
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					label: {
						backgroundColor: '#6a7985'
					}
				}
			},
			legend: {
				data: ['工商制冷', '家用制冷', '空调', '泡沫', '其他']
			},
			toolbox: {
				feature: {
					saveAsImage: {}
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					boundaryGap: false,
					data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
				}
			],
			yAxis: [
				{
					type: 'value'
				}
			],
			series: [
				{
					name: '工商制冷',
					type: 'line',
					stack: 'Total',
					areaStyle: {},
					emphasis: {
						focus: 'series'
					},
					data: [120, 132, 101, 134, 90, 230, 210]
				},
				{
					name: '家用制冷',
					type: 'line',
					stack: 'Total',
					areaStyle: {},
					emphasis: {
						focus: 'series'
					},
					data: [220, 182, 191, 234, 290, 330, 310]
				},
				{
					name: '空调',
					type: 'line',
					stack: 'Total',
					areaStyle: {},
					emphasis: {
						focus: 'series'
					},
					data: [150, 232, 201, 154, 190, 330, 410]
				},
				{
					name: '泡沫',
					type: 'line',
					stack: 'Total',
					areaStyle: {},
					emphasis: {
						focus: 'series'
					},
					data: [320, 332, 301, 334, 390, 330, 320]
				},
				{
					name: '其他',
					type: 'line',
					stack: 'Total',
					label: {
						show: true,
						position: 'top'
					},
					areaStyle: {},
					emphasis: {
						focus: 'series'
					},
					data: [820, 932, 901, 934, 1290, 1330, 1320]
				}
			]
		};
		return option;
	};

	getOption2 = ()=>{
		let option2 = {
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			legend: {},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
				}
			],
			yAxis: [
				{
					type: 'value'
				}
			],
			series: [
				{
					name: '工商制冷',
					type: 'bar',
					emphasis: {
						focus: 'series'
					},
					data: [320, 332, 301, 334, 390, 330, 320]
				},
				{
					name: '家用制冷',
					type: 'bar',
					stack: 'Ad',
					emphasis: {
						focus: 'series'
					},
					data: [120, 132, 101, 134, 90, 230, 210]
				},
				{
					name: '空调',
					type: 'bar',
					stack: 'Ad',
					emphasis: {
						focus: 'series'
					},
					data: [220, 182, 191, 234, 290, 330, 310]
				},
				{
					name: '泡沫',
					type: 'bar',
					stack: 'Ad',
					emphasis: {
						focus: 'series'
					},
					data: [150, 232, 201, 154, 190, 330, 410]
				},
				{
					name: '其他',
					type: 'bar',
					data: [862, 1018, 964, 1026, 1679, 1600, 1570],
					emphasis: {
						focus: 'series'
					},
					markLine: {
						lineStyle: {
							type: 'dashed'
						},
						data: [[{ type: 'min' }, { type: 'max' }]]
					}
				}
			]
		};
		return option2;
	}

	render() {
		return (
			<>
				<div>demo来自：https://echarts.apache.org/examples/zh/index.html#chart-type-line，可以选择合适的，来引入</div>
				<ReactEcharts style={{marginTop: '50px'}} option={this.getOption()}/>

				<ReactEcharts style={{marginTop: '50px'}} option={this.getOption2()}/>
				
			</>
		)
	}
}