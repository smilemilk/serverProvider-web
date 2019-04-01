<template>
    <Row :gutter="16">
        <Col span="12" :xs="24" :sm="12" :md="12" :lg="12">
            <Col span="22" :xs="24" :sm="22" :md="22" :lg="22" class="padding-top-10">
                <title-item text="Top5 应用" sizeType="small"></title-item>
                <div class="table-format-decoration">
                    <div class="table-item table-item-header table-item-decoration_type01">
                        <code class="table-item-cell">应用名称</code>
                        <code class="table-item-cell">金额(元)</code>
                        <code class="table-item-cell">笔数(笔)</code>
                    </div>
                    <div v-if="top_app.length > 0">
                        <ul>
                            <li
                                    v-for="(item, key) in top_app"
                                    v-if="key < 5"
                                    class="table-item table-item-decoration_type01">
                                <p class="table-item-cell">
                                    <span v-if="item.appFundName">{{item.appFundName}}</span>
                                    <span v-else="item.appFundName">--</span>
                                </p>
                                <p class="table-item-cell">
                                    <span v-if="item.amount || item.amount===0">{{item.amount|moneyFormatTemp}}</span>
                                    <span v-else>--</span>
                                </p>
                                <p class="table-item-cell">
                                    <span v-if="item.count || item.count===0">{{item.count}}</span>
                                    <span v-else="item.count">--</span>
                                </p>
                            </li>
                        </ul>
                        <p
                            v-if="top_app.length>0 && top_app.length<5"
                            style="position: absolute;"
                            class="margin-top-10">( 应用排行,仅{{top_app.length}}条数据 )</p>
                    </div>
                    <div v-else>
                        <ul  class="table-item-none">暂无数据</ul>
                    </div>

                </div>
            </Col>
        </Col>
        <Col span="12" :xs="24" :sm="12" :md="12" :lg="12">
            <Col span="22" :xs="24" :sm="22" :md="22" :lg="22" class="padding-top-10">
                <title-item text="Top5 资金" sizeType="small"></title-item>
                <div class="table-format-decoration">
                    <div class="table-item table-item-header table-item-decoration_type01">
                        <code class="table-item-cell">应用名称</code>
                        <code class="table-item-cell">金额(元)</code>
                        <code class="table-item-cell">笔数(笔)</code>
                    </div>
                    <div v-if="top_fund.length > 0">
                        <ul>
                            <li
                                    v-for="(item, key) in top_fund"
                                    v-if="key < 5"
                                    class="table-item table-item-decoration_type01">
                                <p class="table-item-cell">
                                    <span v-if="item.appFundName">{{item.appFundName}}</span>
                                    <span v-else="item.appFundName">--</span>
                                </p>
                                <p class="table-item-cell">
                                    <span v-if="item.amount || item.amount===0">{{item.amount|moneyFormatTemp}}</span>
                                    <span v-else>--</span>
                                </p>
                                <p class="table-item-cell">
                                    <span v-if="item.count || item.count===0">{{item.count}}</span>
                                    <span v-else>--</span>
                                </p>
                            </li>
                        </ul>
                        <p
                                v-if="top_fund.length>0 && top_fund.length<5"
                                style="position: absolute;"
                                class="margin-top-10 margin-bottom-10">( 资金排行,仅{{top_fund.length}}条数据 )</p>
                    </div>
                    <div v-else>
                        <ul class="table-item-none">暂无数据</ul>
                    </div>
                </div>
            </Col>
        </Col>
    </Row>
</template>
<script>
    import TitleItem from '_c/title/index';
    import {moneyFormat} from '@/filters';

    export default {
        name: "top-range",
        props: {
            top_app: {
                type: Array,
                default: []
            },
            top_fund: {
                type: Array,
                default: []
            }
        },
        components: {
            TitleItem
        },
        filters: {
            moneyFormatTemp: function (value) {
                if (value === 0) {
                    return moneyFormat(value+'');
                }
                return moneyFormat(value/100);
            }
        }
    }
</script>
