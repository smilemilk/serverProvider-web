<template>
    <Row>
        <Col span="16" :lg="16" :md="18" :ms="20" :xs="24">
            <ul class="table-format-decoration">
                <li class="table-item table-item-header table-item-decoration_type01">
                    <span class="table-item-cell">应用名称</span>
                    <span class="table-item-cell">交易笔数(笔)</span>
                    <span class="table-item-cell">交易金额(元)</span>
                </li>
                <div v-if="list.length > 0">
                    <li class="table-item table-item-decoration_type01" v-for="item in list">
                        <span class="table-item-cell" v-if="item.name">{{item.name}}</span>
                        <span class="table-item-cell" v-else>--</span>
                        <span class="table-item-cell">{{item.BusinessTotalCount ? item.BusinessTotalCount : '--'}}</span>
                        <span class="table-item-cell" v-if="item.BusinessTotalAmount">{{item.BusinessTotalAmount|moneyFormatTemp}}</span>
                        <span class="table-item-cell" v-else>--</span>
                    </li>
                </div>
                <div v-else class="table-item-none">暂无数据</div>
            </ul>
        </Col>
    </Row>
</template>
<script>
    import {moneyFormat} from '@/filters';

    export default {
        name: "app-table",
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
