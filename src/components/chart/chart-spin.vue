<template>
    <div>
        <div class="chart-container" v-if="fetchStatus && noneList.length === 0">
            <p class="chart-none" >暂无数据</p>
        </div>
        <Spin :fix="fixType" :size="sizeType" v-if="fetchStatus === false"></Spin>
    </div>
</template>

<script>
    export default {
        name: 'chartSpin',
        props: {
            noneList: {
                type: Array,
                default: []
            },
            fetchStatus: {
                type: Boolean,
                default: false
            },
            fixType: {
                type: String,
                required: false,
                default: 'fix'
            },
            sizeType: {
                type: String, // small large
                required: false
            }
        }
    }
</script>

<style lang="less">
    @import "../../styles/common";

    .chart {
        &-container {
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid @borderLighter;
            border-radius: 0;
            height: 50px;
            box-sizing: border-box;
        }
        &-none {
            font-size: 12px;
        }
    }
</style>
