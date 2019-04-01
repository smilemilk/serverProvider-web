<template>
    <ul v-if="rowTemp.unionCheckTransactionList && rowTemp.unionCheckTransactionList.length > 0">
        <li v-for="item in rowTemp.unionCheckTransactionList">
            <div v-if="item.ownerType === 'App'">
                <p class="left">通道:{{item.fundName ? item.fundName : '--'}}</p>
                <p class="left" v-if="item.fundTransactionNo">通道单号:<br/>{{item.fundTransactionNo}}</p>
                <p class="left" v-else="item.fundTransactionNo">通道单号:--</p>
                <p class="left">金额:{{item.transactionAmount ? ((item.transactionAmount + '').indexOf('.') > -1) ? item.transactionAmount : (parseFloat(item.transactionAmount) / 100).toFixed(2)+'元' : '--'}}
                    <span style="margin-left: 10px;" v-if="item.transactionDirection">交易方向:{{item.transactionDirection|formatDirection}}</span>
                    <span style="margin-left: 10px;" v-else="item.transactionDirection">交易方向:--</span>
                </p>
                <p class="left" v-if="item.transactionTime">支付时间:{{item.transactionTime|parseTime}}</p>
                <p class="left" v-else="!item.transactionTime">支付时间:--</p>
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
