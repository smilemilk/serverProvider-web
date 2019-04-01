<template>
    <ul v-if="rowTemp.unioncheckBusinessList && rowTemp.unioncheckBusinessList.length > 0">
        <li v-for="item in rowTemp.unioncheckBusinessList">
            <div v-if="item.ownerType === 'App'">
                <p class="left">应用:{{item.appName ? item.appName : '--'}}</p>
                <p class="left" v-if="item.appBusinessNo">业务单号:<br/>{{item.appBusinessNo}}</p>
                <p class="left" v-else="item.appBusinessNo">业务单号:--</p>
                <p class="left">交易金额:{{item.businessAmount ? ((item.businessAmount + '').indexOf('.') > -1) ?
                    item.businessAmount : (parseFloat(item.businessAmount) / 100).toFixed(2)+'元' : '--'}}
                    <span style="margin-left: 10px;" v-if="item.businessDirection">交易方向:{{item.businessDirection|formatDirection}}</span>
                    <span style="margin-left: 10px;" v-else="item.businessDirection">交易方向:--</span>
                </p>
                <p class="left" v-if="item.businessTime">交易时间:{{item.businessTime|parseTime}}</p>
                <p class="left" v-else="!item.businessTime">交易时间:--</p>
            </div>
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
            formatDirection: (value) => {
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
