<template>
    <div ref="dom" class="charts chart-bar"></div>
</template>

<script>
    import echarts from 'echarts';
    import tdTheme from './theme.json';
    echarts.registerTheme('tdTheme', tdTheme);
    export default {
        name: 'ChartBarMulti',
        props: {
            xAxisData: Array,
            seriesData: Array,
            text: String,
            subtext: String,
            seriesName: String,
            legendData: {
                type: Array,
                default: []
            },
            multiStatus: {
                type: Boolean,
                default: false
            },
            yAxisItems: {  // multiStatus 为true需要配置
                type: Array,
                default: []
            },
            seriesItems: { // multiStatus 为true需要配置
                type: Array,
                default: []
            }
        },
        mounted () {
            // this.$nextTick(() => {
                let option = {
                    title: {
                        text: this.text,
                        subtext: this.subtext,
                        x: 'center'
                    },
                    tooltip: {
                       trigger: 'axis',
                       axisPointer: {
                           type: 'cross',
                           crossStyle: {
                               color: '#999'
                           }
                       }
                    },
                    calculable: true,
                    grid: { // 图表距边框的距离
                        left: '1%',
                        right: '1%',
                        bottom: '1%',
                        containLabel: true,
                        y:70,
                        y2:30,
                        x2:20
                    },
                    xAxis: {
                        type: 'category',
                        data: this.xAxisData
                    },
                    yAxis: this.multiStatus ? this.yAxisItems : {
                        type: 'value',
                        splitLine: {
                            //y轴背景表格
                            show: false
                        },
                        axisTick: {
                            alignWithLabel: true,
                            lineStyle: { // y轴刻度线
                                opacity: 1
                            }
                        },
                        axisLine: {
                            show: false,
                            onZero: false
                        }
                    },
                    series: this.multiStatus ? this.seriesItems : [{
                        data: this.seriesData,
                        type: 'bar',
                        // symbolSize: 5, // 折线拐点大小
                        smooth: true,
                        name: this.seriesName,
                        // stack: '当日'+ this.seriesName// 名称一致会导致数据不重叠
                    }]
                };

                let dom = echarts.init(this.$refs.dom, 'tdTheme');
                dom.setOption(option);
            // })
        }
    }
</script>

<style lang="less">
    .charts{
        //
    }
</style>
