<template>
    <Row>
        <Col span="16" :lg="16" :md="18" :ms="20" :xs="24">
            <ul class="table-format-decoration">
                <li class="table-item table-item-header table-item-decoration_type01">
                    <span class="table-item-cell">资金通道名称</span>
                    <span class="table-item-cell">笔数(笔)</span>
                    <span class="table-item-cell">金额(元)</span>
                </li>
                <div v-if="list.length > 0">
                    <li class="table-item table-item-decoration_type01" v-for="item in list">
                        <span class="table-item-cell" v-if="item.name">{{item.name}}</span>
                        <span class="table-item-cell" v-else>--</span>
                        <span class="table-item-cell">{{item.TransactionTotalCount ? item.TransactionTotalCount : '--'}}</span>
                        <span class="table-item-cell" v-if="item.TransactionTotalAmount">{{item.TransactionTotalAmount|moneyFormatTemp}}</span>
                        <span class="table-item-cell" v-else>--</span>
                    </li>
                </div>
                <div v-else class="table-item-none">暂无数据</div>
            </ul>
        </Col>
    </Row>
</template>
<script>
    import {parseTime, moneyFormat} from '@/filters';
    import {billStatus, sourceType} from '@/filters/statistics';
    import {trueStatus, successStatus} from '@/filters/status';

    export default {
        name: "fund-table",
        props: {
            list: {
                type: Array,
                default: []
            }
        },
        filters: {
            moneyFormatTemp: (value) => {
                return moneyFormat(value / 100);
            }
        }
    }
</script>
