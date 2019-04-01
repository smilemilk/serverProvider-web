<template>
    <Tabs type="card">
        <TabPane label="医院账单" name="0">
            <Row :gutter="16">
                <Col span="8" :xs="8" :sm="8" :md="8" :lg="8">
                    <div class="info-item margin-bottom-10 info-item-decoration_01">
                        <i class="iconfont icon-qiandai"></i>
                        <div class="info-item-left">
                            <p class="info-item-title">收入</p>
                            <code class="info-item-num" v-if="summaryList.businessInAmount">{{summaryList.businessInAmount+''|moneyFormatTemp}}</code>
                            <code class="info-item-num" v-else>--</code>
                        </div>
                    </div>
                </Col>
                <Col span="8" :xs="8" :sm="8" :md="8" :lg="8">
                    <div class="info-item margin-bottom-10 info-item-decoration_02">
                        <i class="iconfont icon-zhichu"></i>
                        <div class="info-item-left">
                            <p class="info-item-title">支出</p>
                            <code class="info-item-num" v-if="summaryList.businessOutAmount">{{summaryList.businessOutAmount+''|moneyFormatTemp}}</code>
                            <code class="info-item-num" v-else>--</code>
                        </div>
                    </div>
                </Col>
                <Col span="8" :xs="8" :sm="8" :md="8" :lg="8">
                    <div class="info-item margin-bottom-10 info-item-decoration_03">
                        <i class="iconfont icon-tubiao"></i>
                        <div class="info-item-left">
                            <p class="info-item-title">总计</p>
                            <code class="info-item-num" v-if="summaryList.businessTotalAmount">{{summaryList.businessTotalAmount|moneyFormatTemp}}</code>
                            <code class="info-item-num" v-else>--</code>
                        </div>
                    </div>
                </Col>
                <Col span="8" :xs="8" :sm="8" :md="8" :lg="8">
                    <div class="info-item margin-bottom-10 info-item-decoration_04">
                        <i class="iconfont icon-tixing"></i>
                        <div class="info-item-left">
                            <p class="info-item-title">异常</p>
                            <span class="info-item-num" v-if="summaryList.businessErrorAmount">{{summaryList.businessErrorAmount|moneyFormatTemp}}</span>
                            <code class="info-item-num" v-else>--</code>
                        </div>
                    </div>
                </Col>
                <Col span="8" :xs="8" :sm="8" :md="8" :lg="8">
                    <div class="info-item margin-bottom-10 info-item-decoration_05">
                        <i class="iconfont icon-duizhang"></i>
                        <div class="info-item-left">
                            <p class="info-item-title">对账通过</p>
                            <code class="info-item-num" v-if="summaryList.businessCheckSuccessAmount">{{summaryList.businessCheckSuccessAmount|moneyFormatTemp}}</code>
                            <code class="info-item-num" v-else>--</code>
                        </div>
                    </div>
                </Col>
                <Col span="8" :xs="8" :sm="8" :md="8" :lg="8">
                    <div class="info-item margin-bottom-10 info-item-decoration_06">
                        <i class="iconfont icon-clock"></i>
                        <div class="info-item-left">
                            <p class="info-item-title">挂账</p>
                            <code class="info-item-num" v-if="summaryList.businessHangAmount">{{summaryList.businessHangAmount|moneyFormatTemp}}</code>
                            <code class="info-item-num" v-else>--</code>
                        </div>
                    </div>
                </Col>
            </Row>
        </TabPane>
        <TabPane label="应用账单" name="1">
            <Row :gutter="16">
                <Col span="8" :xs="8" :sm="8" :md="8" :lg="8">
                    <div class="info-item margin-bottom-10 info-item-decoration_01">
                        <i class="iconfont icon-qiandai"></i>
                        <div class="info-item-left">
                            <p class="info-item-title">收入</p>
                            <code class="info-item-num" v-if="summaryList.applicationInAmount">{{summaryList.applicationInAmount|moneyFormatTemp}}</code>
                            <code class="info-item-num" v-else>--</code>
                        </div>
                    </div>
                </Col>
                <Col span="8" :xs="8" :sm="8" :md="8" :lg="8">
                    <div class="info-item margin-bottom-10 info-item-decoration_02">
                        <i class="iconfont icon-zhichu"></i>
                        <div class="info-item-left">
                            <p class="info-item-title">支出</p>
                            <code class="info-item-num" v-if="summaryList.applicationOutAmount">{{summaryList.applicationOutAmount|moneyFormatTemp}}</code>
                            <code class="info-item-num" v-else>--</code>
                        </div>
                    </div>
                </Col>
                <Col span="8" :xs="8" :sm="8" :md="8" :lg="8">
                    <div class="info-item margin-bottom-10 info-item-decoration_03">
                        <i class="iconfont icon-tubiao"></i>
                        <div class="info-item-left">
                            <p class="info-item-title">总计</p>
                            <code class="info-item-num" v-if="summaryList.applicationTotalAmount">{{summaryList.applicationTotalAmount|moneyFormatTemp}}</code>
                            <code class="info-item-num" v-else>--</code>
                        </div>
                    </div>
                </Col>
                <Col span="8" :xs="8" :sm="8" :md="8" :lg="8">
                    <div class="info-item margin-bottom-10 info-item-decoration_04">
                        <i class="iconfont icon-tixing"></i>
                        <div class="info-item-left">
                            <p class="info-item-title">异常</p>
                            <code class="info-item-num" v-if="summaryList.applicationErrorAmount">{{summaryList.applicationErrorAmount|moneyFormatTemp}}</code>
                            <code class="info-item-num" v-else>--</code>
                        </div>
                    </div>
                </Col>
                <Col span="8" :xs="8" :sm="8" :md="8" :lg="8">
                    <div class="info-item margin-bottom-10 info-item-decoration_05">
                        <i class="iconfont icon-duizhang"></i>
                        <div class="info-item-left">
                            <p class="info-item-title">对账通过</p>
                            <code class="info-item-num" v-if="summaryList.applicationCheckSuccessAmount">{{summaryList.applicationCheckSuccessAmount|moneyFormatTemp}}</code>
                            <code class="info-item-num" v-else>--</code>
                        </div>
                    </div>
                </Col>
                <Col span="8" :xs="8" :sm="8" :md="8" :lg="8">
                    <div class="info-item margin-bottom-10 info-item-decoration_06">
                        <i class="iconfont icon-clock"></i>
                        <div class="info-item-left">
                            <p class="info-item-title">挂账</p>
                            <code class="info-item-num" v-if="summaryList.applicationHangAmount">{{summaryList.applicationHangAmount|moneyFormatTemp}}</code>
                            <code class="info-item-num" v-else>--</code>
                        </div>
                    </div>
                </Col>
            </Row>
        </TabPane>
        <TabPane label="资金账单" name="2">
            <Row :gutter="16">
                <Col span="8" :xs="8" :sm="8" :md="8" :lg="8">
                    <div class="info-item margin-bottom-10 info-item-decoration_01">
                        <i class="iconfont icon-qiandai"></i>
                        <div class="info-item-left">
                            <p class="info-item-title">收入</p>
                            <code class="info-item-num" v-if="summaryList.fundInAmount">{{summaryList.fundInAmount|moneyFormatTemp}}</code>
                            <code class="info-item-num" v-else>--</code>
                        </div>
                    </div>
                </Col>
                <Col span="8" :xs="8" :sm="8" :md="8" :lg="8">
                    <div class="info-item margin-bottom-10 info-item-decoration_02">
                        <i class="iconfont icon-zhichu"></i>
                        <div class="info-item-left">
                            <p class="info-item-title">支出</p>
                            <code class="info-item-num" v-if="summaryList.fundOutAmount">{{summaryList.fundOutAmount|moneyFormatTemp}}</code>
                            <code class="info-item-num" v-else>--</code>
                        </div>
                    </div>
                </Col>
                <Col span="8" :xs="8" :sm="8" :md="8" :lg="8">
                    <div class="info-item margin-bottom-10 info-item-decoration_03">
                        <i class="iconfont icon-tubiao"></i>
                        <div class="info-item-left">
                            <p class="info-item-title">总计</p>
                            <code class="info-item-num" v-if="summaryList.fundTotalAmount">{{summaryList.fundTotalAmount|moneyFormatTemp}}</code>
                            <code class="info-item-num" v-else>--</code>
                        </div>
                    </div>
                </Col>
                <Col span="8" :xs="8" :sm="8" :md="8" :lg="8">
                    <div class="info-item margin-bottom-10 info-item-decoration_04">
                        <i class="iconfont icon-tixing"></i>
                        <div class="info-item-left">
                            <p class="info-item-title">异常</p>
                            <code class="info-item-num" v-if="summaryList.fundErrorAmount">{{summaryList.fundErrorAmount|moneyFormatTemp}}</code>
                            <code class="info-item-num" v-else>--</code>
                        </div>
                    </div>
                </Col>
                <Col span="8" :xs="8" :sm="8" :md="8" :lg="8">
                    <div class="info-item margin-bottom-10 info-item-decoration_05">
                        <i class="iconfont icon-duizhang"></i>
                        <div class="info-item-left">
                            <p class="info-item-title">对账通过</p>
                            <code class="info-item-num" v-if="summaryList.fundCheckSuccessAmount">{{summaryList.fundCheckSuccessAmount|moneyFormatTemp}}</code>
                            <code class="info-item-num" v-else>--</code>
                        </div>
                    </div>
                </Col>
                <Col span="8" :xs="8" :sm="8" :md="8" :lg="8">
                    <div class="info-item margin-bottom-10 info-item-decoration_06">
                        <i class="iconfont icon-clock"></i>
                        <div class="info-item-left">
                            <p class="info-item-title">挂账</p>
                            <code class="info-item-num" v-if="summaryList.fundHangAmount">{{summaryList.fundHangAmount|moneyFormatTemp}}</code>
                            <code class="info-item-num" v-else>--</code>
                        </div>
                    </div>
                </Col>
            </Row>
        </TabPane>
    </Tabs>
</template>
<script>
    import {moneyFormat} from '@/filters';

    export default {
        name: "total-account-info",
        props: {
            summaryList: {
                type: Object,
                default: {}
            }
        },
        created() {

        },
        filters: {
            moneyFormatTemp: function (value) {
                return moneyFormat(value/100);
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../../../styles/common";

    .info-item {
        border: none;
        border-radius: 0;
        padding: 15px 5px 13px 14px;
        background-color: @backgroundGreyest;
        box-sizing: border-box;
        .iconfont {
            display: inline-block;
            font-size: 45px;
            vertical-align: super;
        }
        &-left {
            display: inline-block;
            padding-left: 5px;
        }
        &-title {
            color: @fontColorLighter;
            font-size: 16px;
        }
        &-num {
            font-size: 20px;
            color: @fontColorDark;
        }
        &-decoration {
            &_01 {
                .iconfont {
                    color: @backgroundWarnDark;
                }
            }
            &_02 {
                .iconfont {
                    color: @mainThemeBlueHoverDark;
                }
            }
            &_03 {
                .iconfont {
                    color: @backgroundCalm;
                }
            }
            &_04 {
                .iconfont {
                    color: @backgroundWarnDarker;
                }
                .info-item-num {
                    color: @backgroundWarnDarker;
                }
            }
            &_05 {
                .iconfont {
                    color: @backgroundSuccess;
                }
                .info-item-num {
                    color: @backgroundSuccess;
                }
            }
            &_06 {
                .iconfont {
                    color: @mainThemeBlue;
                }
                .info-item-num {
                    color: @mainThemeBlue;
                }
            }
        }
    }
    @media screen and (max-height: 786px) {
        .info-item {
            width: 80%;
            padding: 10px 5px 8px 10px;
            .iconfont {
                font-size: 35px;
            }
            &-left {
                padding-left: 5px;
            }
            &-title {
                font-size: 12px;
            }
            &-num {
                font-size: 16px;
                &:after {
                    content: '元';
                    display: inline-block;
                    font-size: 12px;
                    margin-left: 3px;
                    vertical-align: middle;
                }
            }
        }
    }

</style>
