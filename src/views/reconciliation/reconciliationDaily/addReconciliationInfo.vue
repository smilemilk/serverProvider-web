<template>
    <ul class="table-format-decoration">
        <li class="table-item table-item-header table-item-decoration_type01">
            <span class="table-item-cell">类型</span>
            <span class="table-item-cell">账单名称</span>
            <span class="table-item-cell">账单数量</span>
            <span class="table-item-cell">是否提供</span>
            <span class="table-item-cell">上传时间</span>
            <span class="table-item-cell">数据获取方式</span>
            <span class="table-item-cell">获取成功</span>
        </li>
        <div v-if="infoList.length > 0">
            <li class="table-item table-item-decoration_type01" v-for="item in infoList">
                <span class="table-item-cell" v-if="item.checkType">{{item.checkType|billStatus}}</span>
                <span class="table-item-cell" v-else>--</span>
                <span class="table-item-cell">{{item.billName ? item.billName : '--'}}</span>
                <span class="table-item-cell">{{item.count ? item.count : '--'}}</span>
                <span class="table-item-cell" v-if="item.isProvide">{{item.isProvide|trueStatus}}</span>
                <span class="table-item-cell" v-else>--</span>
                <span class="table-item-cell" v-if="item.uploadTime">{{item.uploadTime|parseTime}}</span>
                <span class="table-item-cell" v-else>--</span>
                <span class="table-item-cell" v-if="item.sourceType">{{item.sourceType|sourceType}}</span>
                <span class="table-item-cell" v-else>--</span>
                <span class="table-item-cell" v-if="item.isGetSuccess">{{item.isGetSuccess|successStatus}}</span>
                <span class="table-item-cell" v-else>--</span>
            </li>
        </div>
        <div v-else class="table-item-none">暂无数据</div>
    </ul>
</template>
<script>
    import {parseTime} from '@/filters';
    import {billStatus, sourceType} from '@/filters/statistics';
    import {trueStatus, successStatus} from '@/filters/status';

    export default {
        name: "add-reconciliation-info",
        props: {
            infoList: {
                type: Array,
                default: []
            }
        },
        filters: {
            billStatus: (value) => {
                return billStatus(value);
            },
            sourceType: (value) => {
                return sourceType(value);
            },
            parseTime: (value) => {
                return parseTime(value);
            },
            trueStatus: (value) => {
                return trueStatus(value);
            },
            successStatus: (value) => {
                return successStatus(value);
            }
        }
    }
</script>
