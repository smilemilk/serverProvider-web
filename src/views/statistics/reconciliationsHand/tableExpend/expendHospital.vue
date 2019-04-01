<template>
    <ul v-if="rowTemp.mchUnioncheckBusiness && rowTemp.mchUnioncheckBusiness.length > 0">
        <li v-for="item in rowTemp.mchUnioncheckBusiness">
            <p class="left" v-if="item.mchBusinessNo">医院单号:<br/>{{item.mchBusinessNo}}</p>
            <p class="left" v-else="item.mchBusinessNo">医院单号:--</p>
            <p class="left">应用:{{item.appName ? item.appName : '--'}}</p>
            <p class="left" v-if="item.appBusinessNo">单号:<br/>{{item.appBusinessNo}}</p>
            <p class="left" v-else="item.appBusinessNo">单号:--</p>
            <p class="left">金额:{{item.businessAmount ? ((item.businessAmount + '').indexOf('.') > -1) ? item.businessAmount : (parseFloat(item.businessAmount) / 100).toFixed(2)+'元' : '--'}}
                <span style="margin-left: 10px;" v-if="item.businessDirection">方向:{{item.businessDirection|formatDirection}}</span>
                <span style="margin-left: 10px;" v-else="item.businessDirection">方向:--</span>
            </p>
            <p class="left" v-if="item.businessTime">时间:{{item.businessTime|parseTime}}</p>
            <p class="left" v-else="!item.businessTime">时间:--</p>
            <p class="left" v-if="item.sourceType">数据来源:{{item.sourceType|sourceType}}</p>
            <p class="left" v-else="!item.sourceType">数据来源:--</p>
        </li>
    </ul>
    <p v-else>--</p>
</template>
<script>
    import {directionStatistics, sourceType} from '@/filters/statistics';
    import {parseTime} from '@/filters';
    export default {
        props: {
            rowTemp: Object
        },
        filters: {
            formatDirection: (value)=> {
                return directionStatistics(value);
            },
            parseTime: (value) => {
                return parseTime(value);
            },
            sourceType: (value) => {
                return sourceType(value);
            }
        }
    };
</script>
<style scoped>
</style>
