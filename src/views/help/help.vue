<template>
    <div class="message-main-con">
        <Row :gutter="20">
            <i-col :span="6" :xs="24" :sm="8" :md="6" :lg="4">
                <div class="message-mainlist-con ">
                    <div class="list-title">
                        <span>帮助中心</span>
                    </div>
                    <div class="list-link" @click="helpCheck('page1')" :class="showStatus_page1 ? 'active' : ''">
                        <Button size="large" long type="text">
                            <transition name="mes-current-type-btn">
                                <span class="mes-type-btn-text">对账单使用说明</span>
                            </transition>
                        </Button>
                    </div>
                    <div class="list-link" @click="helpCheck('page2')" :class="showStatus_page2 ? 'active' : ''">
                        <Button size="large" long type="text">
                            <transition name="mes-current-type-btn">
                                <span class="mes-type-btn-text">对账开发</span>
                            </transition>
                        </Button>
                    </div>
                </div>
            </i-col>
            <i-col :span="18" :xs="24" :sm="16" :md="18" :lg="20">
                <div class="message-content-con">
                    <ul>
                        <transition name="fade01">
                        <li v-show="showStatus_page1">

                            <dl class="help-container">
                                <dd class="help-item-title"><i class="iconfont icon-question"></i>对账单是什么?</dd>
                                <dt>对账单是交易的明细，分为日对账单和月对账单，日对账单汇总一天的交易流水明细，月对账单汇总一月的交易明细。您可以下载对账单进行对账。</dt>
                                <dd class="help-item-title"><i class="iconfont icon-question"></i>如何下载对账单？</dd>
                                <dt>查询您要下载的账单，操作栏有下载按钮，可供下载，如您无法下载请联系我们。</dt>
                                <dd class="help-item-title"><i class="iconfont icon-question"></i>对账有误如何处理？</dd>
                                <dt>如发现账单有误，可提交工单至系统，我们有专门的人员会帮您处理，您可以及时关注工单回复。</dt>
                                <dd class="help-item-title"><i class="iconfont icon-question"></i>我要查询的账单超过查询时间？</dd>
                                <dt>请提交工单至系统，提供您的邮箱，及联系方式，我们将发送账单至您的邮箱。</dt>
                            </dl>

                        </li>
                        </transition>
                        <transition name="fade02">

                        <li v-show="showStatus_page2">
                                <div class="help-container" :style="{height: heightAuto + 'px', overflowY: 'auto'}" ref="helpContainer">
                                    <h3>微脉支付对账方案</h3>
                                    <h4>一、  微脉支付概况</h4>
                                    <p>微脉支付是一款针对医疗健康行业支付的产品，目前微脉支付提供微脉钱包、支付宝、微信支付等3种支付通道。商家(主要包含医院、服务商、三方机构等)入驻微脉，微脉会给商户提供一个微脉钱包账户，用户购买商家的服务，通过微脉支付，电子货币会体现在商家的微脉钱包账户里。微脉支付根据与支付通道（如支付宝、微信支付、易宝支付）进行T+1对账之后，微脉支付提供支付订单给商户进行自行或者协助对账；对账完毕，微脉支付财务会打款给商户约定结算银行卡或者商户自行通过平台提款。</p>
                                    <h4>二、  对账流程</h4>
                                    <div><img src="../../images/help01.png"/></div>
                                    <h4>三、  对账字段</h4>
                                    <table>
                                        <thead>
                                        <td>字段名称</td>
                                        <td>描述</td>
                                        </thead>
                                        <tbody>
                                        <tr><td style="width: 40%;">商户号</td><td>微脉支付平台提供的</td></tr>
                                        <tr><td style="width: 40%;">交易流水号</td><td>微脉支付交易流水号</td></tr>
                                        <tr><td style="width: 40%;">业务流水号</td><td>
                                            医院或商户的业务单号</td></tr>
                                        <tr><td style="width: 40%;">交易方向</td><td>0支出 ，1收入；</td></tr>
                                        <tr><td style="width: 40%;">交易日期</td><td>为14位整型，格式为yyyyMMddHHmmss</td></tr>
                                        <tr><td style="width: 40%;">交易金额</td><td>以分为单位</td></tr>
                                        <tr><td style="width: 40%;">交易类型</td><td>1 钱包充值，2 取现，3 退款，4 就诊卡充值，5 一般支付,6 云诊疗支付，7 挂号支付，9 其他</td></tr>
                                        </tbody>
                                    </table>
                                    <small>所有金额单位都是以分。</small>
                                    <h4>四、  对账方式</h4>
                                    <div>
                                        <p>对账的方式主要有以下方式：</p>

                                        <p><strong class="dark">(1)  平台提供交易对账文件,商户对账</strong>

                                            一、  平台提供对账文件有两种方式：用户手动下载日对账文件或者平台会自动在微脉前置机的指定目录放置日对账文件。<br/>

                                            二、  商户可以用获取到的对账文件进行手工对账，或开发对账程序进行自动对账。
                                        </p>

                                        <p>
                                            <strong>(2)  商户上传业务对账文件，平台协助对账</strong>

                                            一、  平台为了方便商户对账，商户后台会开发一个功能。只要用户上传对应的交易记录到微脉平台，点击对账功能，微脉平台会自动触发对账程序协助商户进行对账，并展示对账结果，该方式可以作为您自行对账的参照结果。

                                            下面章节将对对账方式进行详细说明。
                                        </p>
                                    </div>
                                    <h4>
                                        五、  <span class="dark">平台提供交易</span>对账文件,商户对账
                                    </h4>
                                    <div>
                                        <p><strong>(1)  流程简述</strong>

                                            微脉平台根据对账日期，获取对账文件，自动下载到指定的<span class="dark">微脉前置机</span>文件目录中，该文件同商户后台（<a href="https://www.weimaipay.com" target="_blank">https://www.weimaipay.com</a>）手动下载的的日对账单文件一致，后台的账号和密码可以向平台索取。
                                        </p>
                                        <p><strong>(2)  应用场景</strong>

                                            商户可以用获取到的对账文件进行手工对账，或开发对账程序进行自动对账。
                                        </p>
                                        <p><strong>(3)  对账文件格式</strong>
                                            <img src="../../images/help02.png"/>
                                        <p><strong>标题行：</strong>对账文件数据行每列的标题</p>

                                        <p><strong>数据行：</strong>真实的对账记录</p>

                                        <p><strong>汇总行：</strong>数据行数据的汇总信息</p>

                                        <p><strong>第一个空行：</strong>一般用来分隔数据行和汇总行，如果商户不需要汇总行信息，该行也可作为数据行结束判断。</p>

                                        <p><strong>最后一个空行：</strong>作为结束行。</p>
                                        <p><strong>(4)  对账文件名规则</strong>

                                            <span class="danger">规则：商户号_日期_T.csv</span><br/>

                                            <span class="danger">示例: 815384542314499_20160616_T.csv</span></p>

                                        <p><strong>(5)  自动对账开发流程</strong>

                                            商户的对账程序只要从微脉前置机指定目录读取每日的对账文件,然后根据对账文件解析，解析出交易流水（数据行），之后进行对账过程。

                                            一般的对账过程可以是逐笔对，都对上则对账成功，未对上则对账不成功,之后可以自行根据业务编写代码。
                                        </p>


                                        <p><strong>六、  商户手动上传业务对账单，平台协助对账</strong>

                                        <p><strong>(1)  流程简述</strong>

                                            商户登录商户后台后，手动上传商户业务对账文件。</p>

                                        <p><strong>(2)  应用场景</strong>

                                            平台协助商户进行对账，并展示对账结果，该方式可以作为商户自行对账的参考。</p>

                                        <p><strong>(3)  业务对账文件格式</strong>

                                            未定</p>

                                        <p><strong>(4)  访问地址和登录账号</strong>

                                            商户的后台地址：<a href="https://www.weimaipay.com" target="_blank">https://www.weimaipay.com</a><br/>

                                            登录账号：平台将提供一个账户和初始密码给商户。
                                        </p>
                                    </div>
                                </div>
                        </li>
                        </transition>
                    </ul>
                </div>
            </i-col>
        </Row>
    </div>
</template>

<script>
    export default {
        name: 'help',
        data() {
            return {
                heightAuto: '',
                showStatus_page1: false,
                showStatus_page2: false
            }
        },
        created() {
          this.helpCheck('page1');
        },
        methods: {
            helpCheck(item) {
                if (item === 'page1') {
                    this.showStatus_page1 = true;
                    this.showStatus_page2 = false;
                }
                if (item === 'page2') {
                    this.showStatus_page1 = false;
                    this.showStatus_page2 = true;
                }
            }
        },
        computed: {

        },
        mounted () {
            let maxHeight = window.innerHeight - document.querySelector(".main-header-con").clientHeight - 20;
            document.querySelector('.help-container').style.height = maxHeight + 'px';
            this.heightAuto = maxHeight;
        },
        watch: {}
    };
</script>

<style lang="less" scoped>
    @import "../../styles/common";

    .message {
        &-main-con {
        }
        &-mainlist-con {
            padding: 10px 0;
            div {
                padding: 10px;
                /*margin: 0 20px;*/
                border-bottom: 1px dashed #d2d3d2;
                &.list-title {
                    text-align: center;
                    border-bottom-style: solid;
                    color: @fontColor;
                    font-size: @fontSize;
                }
                &.list-link {
                    [class*="text"] {
                        color: @mainThemeBlue;
                    }
                }
                &:last-child {
                    border: none;
                }
            }
            .active {
                button {
                    background-color: @mainThemeBlue;
                    .mes-type-btn-text {
                        color: #fff;

                    }
                }
            }
        }
        &-content-con {
            background: white;
            border-radius: 3px;
            box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, .1);
            overflow: auto;
        }
    }

    .fade01-enter, .fade02-enter {
        opacity: 0;
        width: 0;
        transform: translateX(100%);
    }
    .fade01-leave-to, .fade02-leave-to {
        opacity: 0;
        width: 0;
        transform: none;
    }
    .fade01-enter-active, .fade02-enter-active {
        transition: all .6s;
    }
    .fade01-leave-active, .fade02-leave-active {
        transition: 0s;
    }
    .help {
        &-container {
          padding: 20px;
            h3 {
                text-align: center;
                font-size: @fontSize;
                padding: 12px 0 10px;
            }
            h4 {
                margin-top: 20px;
                margin-bottom: 6px;
            }
            p {
                text-indent: 2em;
                text-align: justify;
                line-height: 1.75;
            }
            img {
                width: 100%;
                background-size: 100% auto;
            }
            table {
                border: 1px solid @borderLighter;
                border-collapse: collapse;
                padding: 0;
                thead {
                    border-bottom: 1px solid @mainThemeBlueHover;
                    td {
                        background-color: @mainThemeBlueHover;
                        padding: 5px 0;
                    }
                }
                td {
                    text-align: center;
                }
                tbody {
                    tr {
                        td{
                            &:nth-child(1) {
                                border-right: 1px solid @borderLighter;
                            }
                        }
                        border-bottom: 1px solid @borderLighter;
                        &:last-child {
                            border-bottom: none;
                        }
                    }
                }
            }
            strong {
                display:block;
                margin-top: 8px;
                margin-bottom: 3px;
            }
        }
        &-item-title {
            padding: 7px 0;
            border-bottom: 1px solid @borderLighter;
            i {
                margin-right: 5px;
            }
            &+dt {
                padding-top: 7px;
                margin-bottom: 15px;
            }
        }
    }
    .dark {
        color: @mainThemeBlueHoverDark !important;
    }
    .danger {
        color: @backgroundDanger !important;
    }

    @media screen and (max-width: 1200px) {
        .message {
            &-mainlist-con {
                div {
                    margin: 0 20px;
                }
            }
        }
    }
</style>
