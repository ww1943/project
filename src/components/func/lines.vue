<template>
    <div class="linesGroup" :style="`top:${datas.top};left:${datas.left};background-color:${datas.backgroundColor}`">
        <p>{{datas.title}}</p>
        <div id="chart" :style="`width:${datas.width};height:${datas.height};`"></div>
    </div>
</template>
<script>
import echarts from 'echarts'
export default {
    props:['datas'],
    data() {
        return {
            series:{
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                data: [],
                lineStyle: {
                    normal: {
                        width: 1,
                        color:'',
                    }
                },
                areaStyle:{
                    normal:{}
                }
            }
        }
    },
    methods:{
        async wsOpen(){
            this.ws = new WebSocket(`ws://192.168.110.252/ws${this.datas.ajaxUrl}`);
            this.ws.onopen = function(evt) {};
            this.over = () => {
                this.ws.close();
            };
            return;
        },
        initChart(){
            let conf = this.datas;
            this.lineChart = echarts.init(document.getElementById("chart"));
            let option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {},
                grid:{
                    top:conf.panelPosition.top,
                    bottom:conf.panelPosition.bottom,
                    left:conf.panelPosition.left,
                    right:conf.panelPosition.right
                },
                xAxis: [{
                    type: 'category',
                    data: [],
                    axisLine: {
                        show:conf.xAxisLine.show,
                        lineStyle: {
                            color: conf.xAxisLine.color
                        }
                    },
                    axisLabel:{
                        color:conf.xAxisLable.color,
                        fontSize:conf.xAxisLable.fontSize
                    },
                }],
                yAxis: [{
                    type: 'value',
                    splitLine: {
                        lineStyle: {
                            type: 'dashed',
                            color: '#DDD'
                        }
                    },
                    axisLine: {
                        show: conf.yAxisLine.show,
                        lineStyle: {
                            color: conf.yAxisLine.color
                        },
                    },
                    axisLabel:{
                        color:conf.yAxisLable.color,
                        fontSize:conf.xAxisLable.fontSize
                    },
                    splitArea: {
                        show: false
                    },
                    axisTick:{
                        show:false
                    }
                }],
                series:[]
            };
            this.lineChart.setOption(option)
        },
        getData(evt){
            let receiveData = JSON.parse(evt.data)
            let option = this.lineChart.getOption();
            if(receiveData.length > 1){
                let xData = [],data = [];
                for(let key in receiveData[0].value){
                    data[key] = [];
                }
                receiveData.forEach(x => {
                    xData.push(x.time.substr(5,11));
                    x.value.forEach((y,i) => {
                        data[i].push(y)
                    })
                })
                option.xAxis[0].data = xData;
                option.legend = this.datas.legend;
                
                data.forEach((x,i) =>{
                    let seriesConf = {...this.series};
                    seriesConf.data = x;
                    seriesConf.name = this.datas.legend.data[i];
                    seriesConf.lineStyle.normal.color = this.datas.lineColor[i]
                    seriesConf.areaStyle.normal = this.datas.areaColor.length==0?'transparent':{
                       
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: this.datas.areaColor[i].from
                        }, {
                            offset: 0.8,
                            color: this.datas.areaColor[i].to
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                    option.series.push(seriesConf)
                })
            }else{
                option.xAxis[0].data.push(receiveData.time.substr(5,11));
                option.xAxis[0].data.splice(0,1);
                option.series.forEach((x,i) => {
                    x.data.push(receiveData.value[i])
                    x.data.splice(0,1)
                })
            }
            this.lineChart.setOption(option);
        }
    },
    mounted() {
        this.initChart();
        this.wsOpen().then(res => {
            this.ws.onmessage = evt => {
                this.getData(evt)
            }
            this.ws.onerror = error => {
                this.ws.onclose = () => {
                    this.ws = new WebSocket(`ws://192.168.110.252/ws${this.datas.ajaxUrl}`);
                    this.ws.onopen = function(evt) {};
                    this.over = () => {
                        this.ws.close();
                    };
                };
            };
        })
    }
}
</script>
