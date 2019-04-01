<template>
    <div>
        <Modal
                class-name="reconciliationsDialog"
                width="70%"
                :mask-closable="false"
                v-model="handleDialog"
                @on-cancel="handleCloseAction"
                :styles="{top:'50%',overflowY: 'auto',maxHeight: '94%',transform: 'translateY(-50%) !important'}">
            <div slot="header">
                <title style="display: inline-block; font-size: 14px; margin-left: calc(50% - 28px)">手工勾对</title>
            </div>
            <Form inline :label-width="60" class="right margin-bottom-10">
                <Button type="primary" class="margin-right-10" @click="adjustAction">财务调账</Button>
                <Button type="primary" class="margin-right-10" @click="addAction">录入数据</Button>
                <Button type="primary" class="margin-right-10" @click="passAction">对账通过</Button>
                <Button type="primary" @click="delayAction">挂账</Button>
            </Form>
            <el-table
                    class="mineTable"
                    :data="dataList"
                    ref="table"
                    :empty-text="noneText"
                    highlight-current-row
                    border
                    style="width: 100%">
                <el-table-column
                        align="center"
                        label="医院账单"
                        min-width="98"
                >
                    <el-table-column
                            align="center"
                            :render-header="hisBillAmountHeader"
                            min-width="98"
                    >
                        <template slot-scope="scope">
                            <div v-if="businessList">
                                <ul>
                                    <li v-for="(item,key) in businessList"
                                        class="bg-light-radius"
                                        :class="key > 0 ? 'margin-top-5' : ''"
                                    >
                                        <div>
                                            <p class="left">医院单号:{{item.mchBusinessNo ? item.mchBusinessNo : '--'}}</p>
                                            <p class="left">应用:{{item.appName ? item.appName : '--'}}</p>
                                            <p class="left" v-if="item.appBusinessNo && item.appBusinessNo.length > 15">
                                                应用单号:<br/>{{item.appBusinessNo}}</p>
                                            <p class="left" v-else>应用单号:{{item.appBusinessNo ? item.appBusinessNo :
                                                '--'}}</p>
                                            <p class="left" v-if="item.businessAmount">
                                                交易金额:{{item.businessAmount|moneyFormatTemp}}&nbsp;&nbsp;
                                                <span v-if="item.businessDirection">交易方向:{{item.businessDirection|directionStatistics}}</span>
                                                <span v-else>交易方向:--</span>
                                            </p>
                                            <p class="left" v-else>交易金额:--&nbsp;&nbsp;
                                                <span v-if="item.businessDirection">交易方向:{{item.businessDirection|directionStatistics}}</span>
                                                <span v-else>交易方向:--</span>
                                            </p>
                                            <p class="left" v-if="item.businessTime">
                                                交易时间:{{item.businessTime|parseTime}}</p>
                                            <p class="left" v-else>交易时间:--</p>
                                            <div class="left">
                                                <Button type="default" size="small" @click="removeAction(1, key)"
                                                        v-if="item.isDelete" class="margin-right-10">删除
                                                </Button>
                                                <Button type="default" size="small" @click="cancelLinkAction(item.indexKey)"
                                                        v-if="item.isCancel" class="margin-right-10" :disabled="item.isDisabled">取消勾对
                                                </Button>
                                                <Button type="primary" size="small" @click="editAction(1, key)">编辑
                                                </Button>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div v-else>
                                --
                            </div>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="应用账单"
                        min-width="98"
                >
                    <el-table-column
                            align="center"
                            :render-header="appBusinessBillAmountHeader"
                            min-width="98"
                    >
                        <template slot-scope="scope">
                            <div v-if="appBusinessList">
                                <ul>
                                    <li v-for="(item,key) in appBusinessList"
                                    >
                                        <div
                                                class="bg-light-radius"
                                                :class="key > 0 ? 'margin-top-5' : ''"
                                        >
                                            <p class="left">应用:{{item.appName ? item.appName : '--'}}</p>
                                            <p class="left" v-if="item.appBusinessNo && item.appBusinessNo.length > 15">
                                                业务单号:<br/>{{item.appBusinessNo}}</p>
                                            <p class="left" v-else>业务单号:{{item.appBusinessNo ? item.appBusinessNo
                                                : '--'}}</p>
                                            <p class="left" v-if="item.businessAmount">
                                                交易金额:{{item.businessAmount|moneyFormatTemp}}&nbsp;&nbsp;
                                                <span v-if="item.businessDirection">交易方向:{{item.businessDirection|directionStatistics}}</span>
                                                <span v-else>交易方向:--</span>
                                            </p>
                                            <p class="left" v-else>交易金额:--&nbsp;&nbsp;
                                                <span v-if="item.businessDirection">交易方向:{{item.businessDirection|directionStatistics}}</span>
                                                <span v-else>交易方向:--</span>
                                            </p>
                                            <p class="left" v-if="item.businessTime">
                                                交易时间:{{item.businessTime|parseTime}}</p>
                                            <p class="left" v-else>交易时间:--</p>
                                            <div class="left">
                                                <Button type="default" size="small" @click="removeAction(2, key)"
                                                        v-if="item.isDelete" class="margin-right-10">删除
                                                </Button>
                                                <Button type="default" size="small" @click="cancelLinkAction(item.indexKey)"
                                                        v-if="item.isCancel" class="margin-right-10" :disabled="item.isDisabled">取消勾对
                                                </Button>
                                                <Button type="primary" size="small" @click="editAction(2, key)">编辑
                                                </Button>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div v-else>
                                --
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            :render-header="appFundBillAmountHeader"
                            min-width="98"
                    >
                        <template slot-scope="scope">
                            <div v-if="appTransactionList">
                                <ul>
                                    <li v-for="(item,key) in appTransactionList"
                                    >
                                        <div
                                                class="bg-light-radius"
                                                :class="key > 0 ? 'margin-top-5' : ''"
                                        >
                                            <p class="left">通道:{{item.fundName ? item.fundName : '--'}}</p>
                                            <p class="left"
                                               v-if="item.fundTransactionNo && item.fundTransactionNo.length > 15">
                                                通道单号:<br/>{{item.fundTransactionNo}}</p>
                                            <p class="left" v-else>通道单号:{{item.fundTransactionNo ?
                                                item.fundTransactionNo
                                                : '--'}}</p>
                                            <p class="left" v-if="item.transactionAmount">
                                                金额:{{item.transactionAmount|moneyFormatTemp}}&nbsp;&nbsp;
                                                <span v-if="item.transactionDirection">交易方向:{{item.transactionDirection|directionStatistics}}</span>
                                                <span v-else>交易方向:--</span>
                                            </p>
                                            <p class="left" v-else>金额:--&nbsp;&nbsp;
                                                <span v-if="item.transactionDirection">交易方向:{{item.transactionDirection|directionStatistics}}</span>
                                                <span v-else>交易方向:--</span>
                                            </p>
                                            <p class="left" v-if="item.transactionTime">
                                                支付时间:{{item.transactionTime|parseTime}}</p>
                                            <p class="left" v-else>支付时间:--</p>
                                            <div class="left">
                                                <Button type="default" size="small" @click="removeAction(3, key)"
                                                        v-if="item.isDelete" class="margin-right-10">删除
                                                </Button>
                                                <Button type="default" size="small" @click="cancelLinkAction(item.indexKey)"
                                                        v-if="item.isCancel" class="margin-right-10" :disabled="item.isDisabled">取消勾对
                                                </Button>
                                                <Button type="primary" size="small" @click="editAction(3, key)">编辑
                                                </Button>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div v-else>
                                --
                            </div>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="资金通道账单"
                        min-width="98"
                >
                    <el-table-column
                            align="center"
                            :render-header="fundBillAmountHeader"
                            min-width="98"
                    >
                        <template slot-scope="scope">
                            <div v-if="transactionList">
                                <ul>
                                    <li v-for="(item,key) in transactionList"
                                    >
                                        <div
                                                class="bg-light-radius"
                                                :class="key > 0 ? 'margin-top-5' : ''"
                                        >
                                            <p class="left">通道:{{item.fundName ? item.fundName : '--'}}</p>
                                            <p class="left"
                                               v-if="item.appTransactionNo && item.appTransactionNo.length > 15">
                                                应用单号:<br/>{{item.appTransactionNo}}</p>
                                            <p class="left" v-else>应用单号:{{item.appTransactionNo ?
                                                item.appTransactionNo
                                                : '--'}}</p>
                                            <p class="left"
                                               v-if="item.fundTransactionNo && item.fundTransactionNo.length > 15">
                                                通道单号:<br/>{{item.fundTransactionNo}}</p>
                                            <p class="left" v-else>通道单号:{{item.fundTransactionNo ?
                                                item.fundTransactionNo
                                                : '--'}}</p>
                                            <p class="left" v-if="item.transactionAmount">
                                                金额:{{item.transactionAmount|moneyFormatTemp}}&nbsp;&nbsp;
                                                <span v-if="item.transactionDirection">方向:{{item.transactionDirection|directionStatistics}}</span>
                                                <span v-else>方向:--</span>
                                            </p>
                                            <p class="left" v-else>金额:--&nbsp;&nbsp;
                                                <span v-if="item.transactionDirection">方向:{{item.transactionDirection|directionStatistics}}</span>
                                                <span v-else>方向:--</span>
                                            </p>
                                            <p class="left" v-if="item.transactionTime">
                                                支付时间:{{item.transactionTime|parseTime}}</p>
                                            <p class="left" v-else>支付时间:--</p>
                                            <div class="left">
                                                <Button type="default" size="small" @click="removeAction(4, key)"
                                                        v-if="item.isDelete" class="margin-right-10">删除
                                                </Button>
                                                <Button type="default" size="small" @click="cancelLinkAction(item.indexKey)"
                                                        v-if="item.isCancel" class="margin-right-10" :disabled="item.isDisabled">取消勾对
                                                </Button>
                                                <Button type="primary" size="small" @click="editAction(4, key)">编辑
                                                </Button>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div v-else>
                                --
                            </div>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>

            <link-bill
                    ref="linkBillRef"
                    :autoCheckNo="autoCheckNo"
                    :id="checkNo"
                    v-on:spot="linkEmpty"
                    v-on:move="linkMoved"
            ></link-bill>
            <div slot="footer">
                <Button type="default" @click="handleCloseAction">关闭</Button>
            </div>
        </Modal>

        <Modal
                :width="editModalWidth"
                footer-hide
                :mask-closable="false"
                v-model="editDialog"
                @on-cancel="editReset"
                :styles="{top:'50%',overflowY: 'auto',maxHeight: '94%',transform: 'translateY(-50%) !important'}">
            <div slot="header">
                <title style="display: inline-block; font-size: 14px; margin-left: calc(50% - 28px)">
                    {{editTitle}}</title>
            </div>

            <div v-if="editSingle">
                <Form ref="editForm" :model="editForm" :rules="rules" :label-width="102" style="width: 445px;">
                    <FormItem :label='valueIndex === 1 ? "医院单号：" : "资金通道编号："' class="margin-bottom-10">
                        <span>{{editForm.no}}</span>
                    </FormItem>
                    <FormItem :label='valueIndex === 1 ? "应用单号：" : "应用支付单号："' class="margin-bottom-10">
                        <span>{{editForm.appNo}}</span>
                    </FormItem>
                    <FormItem prop="editAmount" label="支付金额：" required>
                        <Input
                                type="text"
                                v-model="editForm.editAmount"
                                :value.sync="editForm.editAmount"
                                placeholder="请输入金额"
                                style="width: 200px;"
                        />
                    </FormItem>
                    <FormItem label="支付方向：" required>
                        <Select v-model="editForm.direction"
                                style="width:200px">
                            <Option v-for="item in checkDirectionList" :value="item.id" :key="item.value">
                                {{item.value}}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="支付时间：" required prop="editTime">
                        <Date-Picker :value="editForm.editTime"
                                     :confirm="dateConfirmStatus"
                                     @on-change="editTimeChange"
                                     placement="top-end"
                                     format="yyyy-MM-dd HH:mm:ss"
                                     type="datetime"
                                     :transfer="true"
                                     :editable="false"
                                     placeholder="选择时间"
                                     style="width: 200px"></Date-Picker>
                    </FormItem>
                    <FormItem class="right margin-bottom-0 border-top-dash padding-top-10">
                        <Button type="default" @click="editReset('editForm')">取消</Button>
                        <Button type="primary" @click="editSubmit('editForm', valueIndex, keyIndex)"
                                class="margin-left-10 margin-right-10">确定
                        </Button>
                    </FormItem>
                </Form>
            </div>
            <div v-else>
                <Form ref="editForm"
                      :model="editForm"
                      :rules="rules"
                      :label-width="102"
                      style="width: 100%;">
                    <Row :gutter="16">
                        <Col span="12">
                            <FormItem label="业务对账单号：" class="margin-bottom-10">
                                <span>{{editForm.appNo_bis}}</span>
                            </FormItem>
                            <FormItem prop="editAmount_bis" label="支付金额：" required>
                                <Input
                                        type="text"
                                        v-model="editForm.editAmount_bis"
                                        :value.sync="editForm.editAmount_bis"
                                        placeholder="请输入金额"
                                        style="width: 200px;"
                                />
                            </FormItem>
                            <FormItem label="支付方向：" required>
                                <Select v-model="editForm.direction_bis"
                                        style="width:200px">
                                    <Option v-for="item in checkDirectionList" :value="item.id" :key="item.value">
                                        {{item.value}}
                                    </Option>
                                </Select>
                            </FormItem>
                            <FormItem label="支付时间：" required prop="editTime_bis">
                                <Date-Picker :value="editForm.editTime_bis"
                                             :confirm="dateConfirmStatus"
                                             @on-change="editTimeChange_bis"
                                             placement="top-end"
                                             format="yyyy-MM-dd HH:mm:ss"
                                             type="datetime"
                                             :transfer="true"
                                             placeholder="选择时间"
                                             style="width: 200px"></Date-Picker>
                            </FormItem>
                        </Col>
                        <Col span="12" class="border-left-dash">
                            <FormItem label="资金对账单号：" class="margin-bottom-10">
                                <span>{{editForm.appNo_app}}</span>
                            </FormItem>
                            <FormItem prop="editAmount_app" label="支付金额：" required>
                                <Input
                                        type="text"
                                        v-model="editForm.editAmount_app"
                                        :value.sync="editForm.editAmount_app"
                                        placeholder="请输入金额"
                                        style="width: 200px;"
                                />
                            </FormItem>
                            <FormItem label="支付方向：" required>
                                <Select v-model="editForm.direction_app"
                                        style="width:200px">
                                    <Option v-for="item in checkDirectionList" :value="item.id" :key="item.value">
                                        {{item.value}}
                                    </Option>
                                </Select>
                            </FormItem>
                            <FormItem label="支付时间：" required prop="editTime_app">
                                <Date-Picker :value="editForm.editTime_app"
                                             :confirm="dateConfirmStatus"
                                             @on-change="editTimeChange_app"
                                             placement="top-end"
                                             format="yyyy-MM-dd HH:mm:ss"
                                             type="datetime"
                                             :transfer="true"
                                             placeholder="选择时间"
                                             style="width: 200px"></Date-Picker>
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem class="right margin-bottom-0 border-top-dash padding-top-10">
                        <Button type="default" @click="editReset('editForm')">取消</Button>
                        <Button type="primary" @click="editSubmit('editForm', valueIndex, keyIndex)"
                                class="margin-left-10 margin-right-10">确定
                        </Button>
                    </FormItem>
                </Form>
            </div>
        </Modal>

        <Modal
                width="522"
                :footer-hide="true"
                :mask-closable="false"
                v-model="adjustDialog"
                @on-cancel="adjustReset"
                :styles="{top:'50%',overflowY: 'auto',maxHeight: '94%',transform: 'translateY(-50%) !important'}">
            <div slot="header">
                <title style="display: inline-block; font-size: 14px; margin-left: calc(50% - 28px)">
                    财务调账</title>
            </div>
            <Form ref="adjustForm" :model="adjustForm" :rules="rulesAdjust" :label-width="72" style="width: 488px;">

                <Tabs type="card"
                      :value="adjustTabIndex">
                    <TabPane label="医院账单" name="bis">
                        <FormItem label="应用名称：" class="margin-bottom-10">
                            <span>财务调账</span>
                        </FormItem>
                        <FormItem prop="editAmount_bis" label="支付金额：">
                            <Input
                                    type="text"
                                    v-model="adjustForm.editAmount_bis"
                                    placeholder="请输入金额"
                                    style="width: 200px;"
                            />
                        </FormItem>
                        <FormItem label="支付方向：">
                            <Select v-model="adjustForm.direction_bis"
                                    style="width:200px">
                                <Option v-for="item in checkDirectionList" :value="item.id" :key="item.value">
                                    {{item.value}}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="支付时间：" prop="editTime_bis">
                            <Date-Picker :value="adjustForm.editTime_bis"
                                         format="yyyy-MM-dd HH:mm:ss"
                                         type="datetime"
                                         placeholder="选择时间"
                                         placement="top-end"
                                         :transfer="true"
                                         :editable="false"
                                         @on-change="adjustTimeChange_bis"
                                         style="width: 200px"></Date-Picker>
                        </FormItem>
                    </TabPane>
                    <TabPane label="应用账单" name="app">
                        <Row :gutter="16">
                            <Col span="12">
                                <FormItem label="应用名称：" class="margin-bottom-10">
                                    <span>财务调账</span>
                                </FormItem>
                                <FormItem prop="editAmount_adjustBis" label="支付金额：">
                                    <Input
                                            type="text"
                                            v-model="adjustForm.editAmount_adjustBis"
                                            placeholder="请输入金额"
                                            style="width: 160px;"
                                    />
                                </FormItem>
                                <FormItem label="支付方向：">
                                    <Select v-model="adjustForm.direction_adjustBis"
                                            style="width:160px">
                                        <Option v-for="item in checkDirectionList" :value="item.id" :key="item.value">
                                            {{item.value}}
                                        </Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="支付时间：" prop="editTime_adjustBis">
                                    <Date-Picker :value="adjustForm.editTime_adjustBis"
                                                 format="yyyy-MM-dd HH:mm:ss"
                                                 type="datetime"
                                                 placement="top-end"
                                                 :transfer="true"
                                                 :editable="false"
                                                 placeholder="选择时间"
                                                 @on-change="adjustTimeChange_adjustBis"
                                                 style="width: 160px"></Date-Picker>
                                </FormItem>
                            </Col>
                            <Col span="12" class="border-left-dash">
                                <FormItem label="通道名称：" class="margin-bottom-10">
                                    <span>财务调账</span>
                                </FormItem>
                                <FormItem prop="editAmount_adjustApp" label="支付金额：">
                                    <Input
                                            type="text"
                                            v-model="adjustForm.editAmount_adjustApp"
                                            placeholder="请输入金额"
                                            style="width: 160px;"
                                    />
                                </FormItem>
                                <FormItem label="支付方向：">
                                    <Select v-model="adjustForm.direction_adjustApp"
                                            style="width:160px">
                                        <Option v-for="item in checkDirectionList" :value="item.id" :key="item.value">
                                            {{item.value}}
                                        </Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="支付时间：" prop="editTime_adjustApp">
                                    <Date-Picker :value="adjustForm.editTime_adjustApp"
                                                 format="yyyy-MM-dd HH:mm:ss"
                                                 type="datetime"
                                                 placement="top-end"
                                                 :transfer="true"
                                                 :editable="false"
                                                 placeholder="选择时间"
                                                 @on-change="adjustTimeChange_adjustApp"
                                                 style="width: 160px"></Date-Picker>
                                </FormItem>
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
                <FormItem class="right margin-bottom-0 border-top-dash padding-top-10">
                    <Button type="default" @click="adjustReset('adjustForm')">取消</Button>
                    <Button type="primary" @click="adjustSubmit('adjustForm')" :modal="adjustType"
                            class="margin-left-10 margin-right-10">确定
                    </Button>
                </FormItem>
            </Form>
        </Modal>

        <Modal
                width="565"
                :footer-hide="true"
                :mask-closable="false"
                v-model="addDialog"
                @on-cancel="addReset"
                :styles="{top:'50%',overflowY: 'auto',maxHeight: '94%',transform: 'translateY(-50%) !important'}">
            <div slot="header">
                <title style="display: inline-block; font-size: 14px; margin-left: calc(50% - 28px)">
                    录入数据</title>
            </div>
            <Form ref="addForm" :model="addForm" :rules="rulesAdd" :label-width="96" style="width: 534px;">

                <Tabs type="card">
                    <TabPane label="医院账单">
                        <FormItem label="应用名称：">
                            <Select v-model="addForm.no_bis"
                                    style="width:200px">
                                <Option v-for="item in appParamList" :value="item.value" :key="item.value">
                                    {{item.value}}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem prop="bisNo_bis" label="医院单号：">
                            <Input
                                    type="text"
                                    v-model="addForm.bisNo_bis"
                                    placeholder="请输入医院单号"
                                    style="width: 200px;"
                            />
                        </FormItem>
                        <FormItem prop="appNo_bis" label="应用单号：">
                            <Input
                                    type="text"
                                    v-model="addForm.appNo_bis"
                                    placeholder="请输入应用单号"
                                    style="width: 200px;"
                            />
                        </FormItem>
                        <FormItem prop="editAmount_bis" label="支付金额：">
                            <Input
                                    type="text"
                                    v-model="addForm.editAmount_bis"
                                    placeholder="请输入金额"
                                    style="width: 200px;"
                            />
                        </FormItem>
                        <FormItem label="支付方向：">
                            <Select v-model="addForm.direction_bis"
                                    style="width:200px">
                                <Option v-for="item in checkDirectionList" :value="item.id" :key="item.value">
                                    {{item.value}}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="支付时间：" prop="editTime_bis">
                            <Date-Picker :value="addForm.editTime_bis"
                                         format="yyyy-MM-dd HH:mm:ss"
                                         type="datetime"
                                         placeholder="选择时间"
                                         :transfer="true"
                                         :editable="false"
                                         @on-change="addTimeChange_bis"
                                         style="width: 200px"></Date-Picker>
                        </FormItem>
                    </TabPane>
                    <TabPane label="应用账单">
                        <Row :gutter="16">
                            <Col span="12">
                                <FormItem label="应用名称：">
                                    <Select v-model="addForm.no_addBis"
                                            style="width:160px">
                                        <Option v-for="item in appParamList" :value="item.value" :key="item.value">
                                            {{item.value}}
                                        </Option>
                                    </Select>
                                </FormItem>
                                <FormItem prop="bisNo_addBis" label="医院单号：">
                                    <Input
                                            type="text"
                                            v-model="addForm.bisNo_addBis"
                                            placeholder="请输入医院单号"
                                            style="width: 160px;"
                                    />
                                </FormItem>
                                <FormItem prop="appNo_addBis" label="应用单号：">
                                    <Input
                                            type="text"
                                            v-model="addForm.appNo_addBis"
                                            placeholder="请输入应用单号"
                                            style="width: 160px;"
                                    />
                                </FormItem>
                                <FormItem prop="editAmount_addBis" label="支付金额：">
                                    <Input
                                            type="text"
                                            v-model="addForm.editAmount_addBis"
                                            placeholder="请输入金额"
                                            style="width: 160px;"
                                    />
                                </FormItem>
                                <FormItem label="支付方向：">
                                    <Select v-model="addForm.direction_addBis"
                                            style="width:160px">
                                        <Option v-for="item in checkDirectionList" :value="item.id" :key="item.value">
                                            {{item.value}}
                                        </Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="支付时间：" prop="editTime_addBis">
                                    <Date-Picker :value="addForm.editTime_addBis"
                                                 format="yyyy-MM-dd HH:mm:ss"
                                                 type="datetime"
                                                 :transfer="true"
                                                 :editable="false"
                                                 placeholder="选择时间"
                                                 @on-change="addTimeChange_addBis"
                                                 style="width: 160px"></Date-Picker>
                                </FormItem>
                            </Col>
                            <Col span="12" class="border-left-dash">
                                <FormItem label="通道名称：">
                                    <Select v-model="addForm.no_addApp"
                                            style="width:160px">
                                        <Option v-for="item in fundParamList" :value="item.value" :key="item.value">
                                            {{item.value}}
                                        </Option>
                                    </Select>
                                </FormItem>
                                <FormItem prop="bisNo_addApp" label="资金通道单号：">
                                    <Input
                                            type="text"
                                            v-model="addForm.bisNo_addApp"
                                            placeholder="请输入资金通道单号"
                                            style="width: 160px;"
                                    />
                                </FormItem>
                                <FormItem prop="appNo_addApp" label="应用支付单号：">
                                    <Input
                                            type="text"
                                            v-model="addForm.appNo_addApp"
                                            placeholder="请输入应用支付单号"
                                            style="width: 160px;"
                                    />
                                </FormItem>
                                <FormItem prop="editAmount_addApp" label="支付金额：">
                                    <Input
                                            type="text"
                                            v-model="addForm.editAmount_addApp"
                                            placeholder="请输入金额"
                                            style="width: 160px;"
                                    />
                                </FormItem>
                                <FormItem label="支付方向：">
                                    <Select v-model="addForm.direction_addApp"
                                            style="width:160px">
                                        <Option v-for="item in checkDirectionList" :value="item.id" :key="item.value">
                                            {{item.value}}
                                        </Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="支付时间：" prop="editTime_addApp">
                                    <Date-Picker :value="addForm.editTime_addApp"
                                                 format="yyyy-MM-dd HH:mm:ss"
                                                 type="datetime"
                                                 :transfer="true"
                                                 :editable="false"
                                                 placeholder="选择时间"
                                                 @on-change="addTimeChange_addApp"
                                                 style="width: 160px"></Date-Picker>
                                </FormItem>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane label="资金账单">
                        <FormItem label="通道名称：">
                            <Select v-model="addForm.no_app"
                                    style="width:200px">
                                <Option v-for="item in fundParamList" :value="item.value" :key="item.value">
                                    {{item.value}}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem prop="bisNo_app" label="资金通道单号：">
                            <Input
                                    type="text"
                                    v-model="addForm.bisNo_app"
                                    placeholder="请输入资金通道单号"
                                    style="width: 200px;"
                            />
                        </FormItem>
                        <FormItem prop="appNo_app" label="应用支付单号：">
                            <Input
                                    type="text"
                                    v-model="addForm.appNo_app"
                                    placeholder="请输入应用支付单号"
                                    style="width: 200px;"
                            />
                        </FormItem>
                        <FormItem prop="editAmount_app" label="支付金额：">
                            <Input
                                    type="text"
                                    v-model="addForm.editAmount_app"
                                    placeholder="请输入金额"
                                    style="width: 200px;"
                            />
                        </FormItem>
                        <FormItem label="支付方向：">
                            <Select v-model="addForm.direction_app"
                                    style="width:200px">
                                <Option v-for="item in checkDirectionList" :value="item.id" :key="item.value">
                                    {{item.value}}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="支付时间：" prop="editTime_app">
                            <Date-Picker :value="addForm.editTime_app"
                                         format="yyyy-MM-dd HH:mm:ss"
                                         type="datetime"
                                         :transfer="true"
                                         :editable="false"
                                         placeholder="选择时间"
                                         @on-change="addTimeChange_app"
                                         style="width: 200px"></Date-Picker>
                        </FormItem>
                    </TabPane>
                </Tabs>
                <FormItem class="right margin-bottom-0 border-top-dash padding-top-10">
                    <Button type="default" @click="addReset('addForm')">取消</Button>
                    <Button type="primary"
                            class="margin-left-10 margin-right-10" @click="addSubmit('addForm')">确定
                    </Button>
                </FormItem>
            </Form>
        </Modal>

        <Modal
                width="480"
                footer-hide
                v-model="passDialog"
                :close="passReset"
                :styles="{top:'50%',overflowY: 'auto',maxHeight: '94%',transform: 'translateY(-50%) !important'}">
            <div slot="header">
                <title style="display: inline-block; font-size: 14px; margin-left: calc(50% - 28px)">
                    对账通过</title>
            </div>

            <Form ref="passForm" :model="passForm" :label-width="102" style="width: 445px;">
                <FormItem prop="remark" label="备注：">
                    <Input
                            type="textarea"
                            :rows="4"
                            v-model="passForm.remark"
                            placeholder="请输入备注"
                            style="width: 276px;"
                    />
                </FormItem>
                <FormItem class="right margin-bottom-0 border-top-dash padding-top-10">
                    <Button type="default" @click="passReset('passForm')">取消</Button>
                    <Button type="primary" @click="passSubmit('passForm')"
                            class="margin-left-10 margin-right-10">确定
                    </Button>
                </FormItem>
            </Form>

        </Modal>
    </div>
</template>

<script>
    import TitleItem from '_c/title/index';
    import ajax from '@/api/statistics';
    import LinkBill from './linkBillTable';
    import {parseTime, moneyFormat} from '@/filters';
    import {directionStatistics} from '@/filters/statistics';
    import {mathRand} from '@/libs/common';
    import moment from 'moment';
    import _ from 'lodash';
    import {validaNumberCharacter} from '@/libs/validate';

    export default {
        name: 'hand-reconciliation',
        components: {
            TitleItem,
            LinkBill
        },
        props: {
            appParamList: {
                type: Array,
                default: []
            },
            fundParamList: {
                type: Array,
                default: []
            }
        },
        data() {
            const validateMoney = (rule, value, callback) => {
                if (value) {
                    setTimeout(() => {
                        if (!(/^\d+(\.\d+)?$/).test(value)) {
                            callback(new Error('请输入正数'));
                        } else {
                            if (value.toString().indexOf(".") > -1 && value.toString().split(".")[1].length > 2) {
                                callback(new Error('小数位数最多两位'));
                            } else {
                                if (value === '0') {
                                    callback(new Error('请输入大于0的数值'));
                                } else {
                                    callback();
                                }
                            }
                        }
                    }, 600);
                } else {
                    callback();
                }
            };
            const validateAmount = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('金额不能为空'));
                }
                setTimeout(() => {
                    if (!(/^\d+(\.\d+)?$/).test(value)) {
                        callback(new Error('请输入正数'));
                    } else {
                        if (value.toString().indexOf(".") > -1 && value.toString().split(".")[1].length > 2) {
                            callback(new Error('小数位数最多两位'));
                        } else {
                            if (value === '0') {
                                callback(new Error('请输入大于0的数值'));
                            } else {
                                callback();
                            }
                        }
                    }
                }, 600);
            };
            const validateNo = (rule, value, callback) => {
                if (value) {
                    if (validaNumberCharacter(value)) {
                        callback();
                    } else {
                        return callback(new Error('编号只能为数字、字母'));
                    }
                } else {
                    callback();
                }
            };
            const validateTime = (rule, value, callback) => {
                if (!this.editForm.editTime) {
                    return callback(new Error('时间不能为空'));
                } else {
                    callback();
                }
            };
            const validateTime_bis = (rule, value, callback) => {
                if (!this.editForm.editTime_bis) {
                    return callback(new Error('时间不能为空'));
                } else {
                    callback();
                }
            };
            const validateTime_app = (rule, value, callback) => {
                if (!this.editForm.editTime_app) {
                    return callback(new Error('时间不能为空'));
                } else {
                    callback();
                }
            };

            return {
                checkOrderNo: '',
                checkDate: '',
                loading: true,
                dataList: [],
                handleDialog: false, // 手工勾对 start
                fundAmount_column: null,
                queryCheckDetailObj: {},
                selectAll: false,
                showBill: false,
                checkNo: '',
                autoCheckNo: null,
                noneText: '暂无数据',
                businessList: [],
                appBusinessList: [],
                appTransactionList: [],
                transactionList: [],
                mchTotalAmount: null,
                appMchTotalAmount: null,
                appFundTotalAmount: null,
                fundTotalAmount: null,
                editDialog: false,
                editTitle: '',
                editFormQuery: {},
                editForm: {},
                editModalWidth: 480,
                editSingle: true,
                keyIndex: undefined,
                valueIndex: undefined,
                checkDirectionList: [
                    {
                        id: '0', value: '支出'
                    },
                    {
                        id: '1', value: '收入'
                    }
                ],
                dateConfirmStatus: false,
                passDialog: false, // 对账通过
                passForm: {
                    remark: ''
                },
                adjustDialog: false, // 财务调账
                adjustForm: {
                    editAmount_bis: null,
                    editAmount_adjustBis: null,
                    editAmount_adjustApp: null
                },
                adjustTabIndex: 'bis',
                adjustType: '',
                adjustType_bis: false,
                adjustType_app: false,
                adjustConfigIdApp: undefined,
                addDialog: false,
                addForm: {
                    editAmount_bis: null,
                    editAmount_addBis: null,
                    editAmount_addApp: null,
                    editAmount_app: null
                },
                addType: {
                    bis: false,
                    app_bis: false,
                    app_fund: false,
                    fund: false
                },
                rulesAdjust: {
                    editAmount_bis: [
                        {validator: validateMoney, trigger: 'blur'}
                    ],
                    editAmount_adjustBis: [
                        {validator: validateMoney, trigger: 'blur'}
                    ],
                    editAmount_adjustApp: [
                        {validator: validateMoney, trigger: 'blur'}
                    ]
                },
                rulesAdd: {
                    editAmount_bis: [
                        {validator: validateMoney, trigger: 'blur'}
                    ],
                    editAmount_addBis: [
                        {validator: validateMoney, trigger: 'blur'}
                    ],
                    editAmount_addApp: [
                        {validator: validateMoney, trigger: 'blur'}
                    ],
                    editAmount_app: [
                        {validator: validateMoney, trigger: 'blur'}
                    ],
                    bisNo_bis: [ // 医院 医院单号
                        {validator: validateNo, trigger: 'blur'}
                    ],
                    bisNo_addBis: [ // 应用 医院单号
                        {validator: validateNo, trigger: 'blur'}
                    ],
                    bisNo_addApp: [ // 应用 资金通道单号
                        {validator: validateNo, trigger: 'blur'}
                    ],
                    bisNo_app: [ // 资金 资金通道单号
                        {validator: validateNo, trigger: 'blur'}
                    ],
                    appNo_bis: [ // 医院 应用单号
                        {validator: validateNo, trigger: 'blur'}
                    ],
                    appNo_addBis: [ // 应用 应用单号
                        {validator: validateNo, trigger: 'blur'}
                    ],
                    appNo_addApp: [ // 应用 应用支付单号
                        {validator: validateNo, trigger: 'blur'}
                    ],
                    appNo_app: [ // 资金 应用支付单号
                        {validator: validateNo, trigger: 'blur'}
                    ],
                },
                rules: {
                    editAmount: [
                        {validator: validateAmount, required: true},
                        {validator: validateAmount, trigger: 'change'},
                        {validator: validateAmount, trigger: 'blur'},
                    ],
                    editTime: [
                        {validator: validateTime, required: true},
                        {validator: validateTime, trigger: 'blur'}
                    ],
                    editAmount_bis: [
                        {validator: validateAmount, required: true},
                        {validator: validateAmount, trigger: 'change'},
                        {validator: validateAmount, trigger: 'blur'}
                    ],
                    editAmount_app: [
                        {validator: validateAmount, required: true},
                        {validator: validateAmount, trigger: 'change'},
                        {validator: validateAmount, trigger: 'blur'}
                    ],
                    editTime_bis: [
                        {validator: validateTime_bis, required: true},
                        {validator: validateTime_bis, trigger: 'blur'}
                    ],
                    editTime_app: [
                        {validator: validateTime_app, required: true},
                        {validator: validateTime_app, trigger: 'blur'}
                    ]
                }
            }
        },
        watch: {
            'adjustForm.editAmount_bis': function (value) {
                if (value) {
                    if (this.adjustType_app) {
                        this.adjustType = '3';
                    } else {
                        this.adjustType = '1';
                    }
                    this.adjustType_bis = true;
                } else {
                    this.adjustType_bis = false;
                }
            },
            'adjustForm.editAmount_adjustBis': function (value) {
                if (value) {
                    this.adjustType_app = true;
                    if (this.adjustType_bis) {
                        this.adjustType = '3';
                    } else {
                        this.adjustType = '2';
                    }
                } else {
                    if (this.adjustForm.editAmount_adjustApp) {
                        this.adjustType_app = true;
                    } else {
                        this.adjustType_app = false;
                    }
                }
            },
            'adjustForm.editAmount_adjustApp': function (value) {
                if (value) {
                    this.adjustType_app = true;
                    if (this.adjustType_bis) {
                        this.adjustType = '3';
                    } else {
                        this.adjustType = '2';
                    }
                } else {
                    if (this.adjustForm.editAmount_adjustBis) {
                        this.adjustType_app = true;
                    } else {
                        this.adjustType_app = false;
                    }
                }
            },
            'addForm.editAmount_bis': function (value) {
                if (value) {
                    this.addType.bis = true;
                } else {
                    this.addType.bis = false;
                }
            },
            'addForm.editAmount_addBis': function (value) {
                if (value) {
                    this.addType.app_bis = true;
                } else {
                    this.addType.app_bis = false;
                }
            },
            'addForm.editAmount_addApp': function (value) {
                if (value) {
                    this.addType.app_fund = true;
                } else {
                    this.addType.app_fund = false;
                }
            },
            'addForm.editAmount_app': function (value) {
                if (value) {
                    this.addType.fund = true;
                } else {
                    this.addType.fund = false;
                }
            }
        },
        methods: {
            // 手工勾对 begin ---------------------------------
            show(row, checkOrderNo, time) {
                this.handleDialog = true;
                this.showBill = true;
                this.checkOrderNo = checkOrderNo;
                this.checkDate = time;
                this.$nextTick(() => {
                    if (row) {
                        this.checkNo = this.checkOrderNo + '' || '';
                        this.autoCheckNo = row.autoCheckNo * 1 || null;
                        this.handleDetailFetch(row, true);
                    }
                    this.$refs.linkBillRef.show();
                })
            },
            handleDetailFetch(row, isInit) { // isInit true 第一次初始化
                if (this.handleDialog === true) {
                    this.handleDetail(row, isInit);
                }
            },
            handleDetail(row, isInit) {
                this.queryCheckDetailObj = {
                    autoCheckNo: row.autoCheckNo || null,
                    orderNo: '',
                    checkOrderNo: this.checkOrderNo || '',
                    relationQuery: false
                };
                ajax.checkSummary(this.queryCheckDetailObj).then(response => {
                    if (response.success === true) {
                        this.loading = false;

                        const res = response.data.items;
                        this.dataList = res;

                        for (let i in res) {
                            const item = res[i];
                            const unionCheckBusinessList = item.unioncheckBusinessList;
                            const unionCheckTransactionList = item.unionCheckTransactionList;
                            let unionCheckBusinessArray = [],
                                unionCheckTransactionArray = [],
                                transationListArray = [],
                                appTransationListArray = [],
                                unionCheckBusinessAmount = null,
                                unionCheckTransactionAmount = null,
                                transationAmount = null,
                                appTransationAmount = null;

                            for (let j in unionCheckBusinessList) {
                                if (isInit) {
                                    if (unionCheckBusinessList[j].ownerType === 'Mch') {
                                        if (unionCheckBusinessList[j].businessDirection === '0') {
                                            unionCheckBusinessAmount = unionCheckBusinessAmount + (-unionCheckBusinessList[j].businessAmount * 1);
                                        } else {
                                            unionCheckBusinessAmount = unionCheckBusinessAmount + unionCheckBusinessList[j].businessAmount * 1;
                                        }
                                        unionCheckBusinessArray.push(unionCheckBusinessList[j]);
                                    } else if (unionCheckBusinessList[j].ownerType === 'App') {
                                        if (unionCheckBusinessList[j].businessDirection === '0') {
                                            unionCheckTransactionAmount = unionCheckTransactionAmount + (-unionCheckBusinessList[j].businessAmount * 1);
                                        } else {
                                            unionCheckTransactionAmount = unionCheckTransactionAmount + unionCheckBusinessList[j].businessAmount * 1;
                                        }
                                        unionCheckTransactionArray.push(unionCheckBusinessList[j]);
                                    }
                                    this.adjustConfigIdApp = unionCheckBusinessList[0].configIdApp;
                                }
                            }
                            this.businessList = unionCheckBusinessArray;
                            this.appBusinessList = unionCheckTransactionArray;
                            this.mchTotalAmount = unionCheckBusinessAmount === null ? '0' : unionCheckBusinessAmount + '';
                            this.appMchTotalAmount = unionCheckTransactionAmount === null ? '0' : unionCheckTransactionAmount + '';

                            for (let q in unionCheckTransactionList) {
                                if (isInit) {
                                    if (unionCheckTransactionList[q].ownerType === 'Pay') {
                                        if (unionCheckTransactionList[q].businessDirection === '0') {
                                            transationAmount = transationAmount + (-unionCheckTransactionList[q].transactionAmount * 1);
                                        } else {
                                            transationAmount = transationAmount + unionCheckTransactionList[q].transactionAmount * 1;
                                        }
                                        transationListArray.push(unionCheckTransactionList[q]);
                                    } else if (unionCheckTransactionList[q].ownerType === 'App') {
                                        if (unionCheckTransactionList[q].transactionDirection === '0') {
                                            appTransationAmount = appTransationAmount + (-unionCheckTransactionList[q].transactionAmount * 1);
                                        } else {
                                            appTransationAmount = appTransationAmount + unionCheckTransactionList[q].transactionAmount * 1;
                                        }
                                        appTransationListArray.push(unionCheckTransactionList[q]);
                                    }
                                    this.adjustConfigIdApp = unionCheckTransactionList[0].configIdApp;
                                }
                            }
                            this.transactionList = transationListArray;
                            this.appTransactionList = appTransationListArray;
                            this.fundTotalAmount = transationAmount === null ? '0' : transationAmount + '';
                            this.appFundTotalAmount = appTransationAmount === null ? '0' : appTransationAmount + '';
                        }

                    } else {
                        this.loading = false;
                        this.$Message.error({
                            content: response.msg ? response.msg : '归档请求未成功',
                            duration: 2,
                            closable: true
                        });
                    }
                }).catch(() => {
                });
            },
            hisBillAmountHeader(h) {
                return h('div', {
                        class: ['mine-tableCell']
                    },
                    [
                        h('span', {
                            domProps: {
                                innerHTML: '汇总金额',
                            }
                        }),
                        h('span', {
                            domProps: {
                                innerHTML: this.mchTotalAmount !== '0' ? moneyFormat(this.mchTotalAmount / 100) : '0',
                            }
                        }),
                        h('span', {
                            domProps: {
                                innerHTML: '元',
                            }
                        })

                    ]
                );
            },
            appBusinessBillAmountHeader(h) {
                return h('div', {
                        class: ['mine-tableCell']
                    },
                    [
                        h('span', {
                            domProps: {
                                innerHTML: '汇总金额',
                            }
                        }),
                        h('span', {
                            domProps: {
                                innerHTML: this.appMchTotalAmount !== '0' ? moneyFormat(this.appMchTotalAmount / 100) : '0',
                            }
                        }),
                        h('span', {
                            domProps: {
                                innerHTML: '元',
                            }
                        })

                    ]
                );
            },
            appFundBillAmountHeader(h) {
                return h('div', {
                        class: ['mine-tableCell']
                    },
                    [
                        h('span', {
                            domProps: {
                                innerHTML: '汇总金额',
                            }
                        }),
                        h('span', {
                            domProps: {
                                innerHTML: this.appFundTotalAmount !== '0' ? moneyFormat(this.appFundTotalAmount / 100) : '0',
                            }
                        }),
                        h('span', {
                            domProps: {
                                innerHTML: '元',
                            }
                        })

                    ]
                );
            },
            fundBillAmountHeader(h) {
                return h('div', {
                        class: ['mine-tableCell']
                    },
                    [
                        h('span', {
                            domProps: {
                                innerHTML: '汇总金额',
                            }
                        }),
                        h('span', {
                            domProps: {
                                innerHTML: this.fundTotalAmount !== '0' ? moneyFormat(this.fundTotalAmount / 100) : '0',
                            }
                        }),
                        h('span', {
                            domProps: {
                                innerHTML: '元',
                            }
                        })

                    ]
                );
            },
            handleCloseAction() {
                this.$refs.linkBillRef.show();
                this.handleDialog = false;
                this.showBill = false;
                _.remove(this.businessList, it => {
                    return it.isCancel;
                });
                _.remove(this.appBusinessList, it => {
                    return it.isCancel;
                });
                _.remove(this.transactionList, it => {
                    return it.isCancel;
                });
                _.remove(this.appTransactionList, it => {
                    return it.isCancel;
                });

                this.amountTotalCalc();
            },
            editAction(value, key) {
                this.keyIndex = key;
                this.valueIndex = value;
                this.editDialog = true;
                if (value === 4 || value === 1) {
                    this.editSingle = true;
                    this.editModalWidth = 480;
                }
                if (value === 2 || value === 3) {
                    this.editSingle = false;
                    this.editModalWidth = 740;
                }
                if (value === 4) {
                    this.editFormQuery.no = this.transactionList[key].fundTransactionNo || '';
                    this.editFormQuery.appNo = this.transactionList[key].appTransactionNo || '';
                    this.editFormQuery.amount = parseFloat(((this.transactionList[key].transactionAmount * 1)).toFixed(2)) || null;
                    this.editFormQuery.direction = this.transactionList[key].transactionDirection || '';
                    this.editFormQuery.time = this.transactionList[key].transactionTime || '';
                    this.editTitle = '资金通道账单';
                } else if (value === 3 || value === 2) {

                    this.editFormQuery.no_bis = this.appBusinessList[key].mchBusinessNo || '';
                    this.editFormQuery.appNo_bis = this.appBusinessList[key].appBusinessNo || '';
                    this.editFormQuery.amount_bis = this.appBusinessList[key].businessAmount * 1 || null;
                    this.editFormQuery.direction_bis = this.appBusinessList[key].businessDirection || '';
                    this.editFormQuery.time_bis = this.appBusinessList[key].businessTime || '';
                    this.editFormQuery.no_app = this.appTransactionList[key].fundTransactionNo || '';
                    this.editFormQuery.appNo_app = this.appTransactionList[key].fundTransactionNo || '';
                    this.editFormQuery.amount_app = parseFloat(((this.appTransactionList[key].transactionAmount * 1)).toFixed(2)) || null;
                    this.editFormQuery.direction_app = this.appTransactionList[key].transactionDirection || '';
                    this.editFormQuery.time_app = this.appTransactionList[key].transactionTime || '';
                    this.editTitle = '应用账单';
                    this.editForm = {
                        no_bis: this.editFormQuery.no_bis,
                        appNo_bis: this.editFormQuery.appNo_bis,
                        direction_bis: this.editFormQuery.direction_bis,
                        no_app: this.editFormQuery.no_app,
                        appNo_app: this.editFormQuery.appNo_app,
                        direction_app: this.editFormQuery.direction_app,
                        editAmount_bis: this.editFormQuery.amount_bis ? this.editFormQuery.amount_bis / 100 : null,
                        editAmount_app: this.editFormQuery.amount_app ? this.editFormQuery.amount_app / 100 : null,
                        editTime_bis: parseTime(this.editFormQuery.time_bis),
                        editTime_app: parseTime(this.editFormQuery.time_app)
                    };
                } else if (value === 1) {
                    this.editFormQuery.no = this.businessList[key].mchBusinessNo || '';
                    this.editFormQuery.appNo = this.businessList[key].appBusinessNo || '';
                    this.editFormQuery.amount = parseFloat(((this.businessList[key].businessAmount * 1)).toFixed(2)) || null;
                    this.editFormQuery.direction = this.businessList[key].businessDirection || '';
                    this.editFormQuery.time = this.businessList[key].businessTime || '';
                    this.editTitle = '医院账单';
                }
                this.editForm.editTime = parseTime(this.editFormQuery.time);
                this.editForm.editAmount = this.editFormQuery.amount ? this.editFormQuery.amount / 100 : null;
                this.editForm = {
                    ...this.editForm,
                    no: this.editFormQuery.no,
                    appNo: this.editFormQuery.appNo,
                    direction: this.editFormQuery.direction
                };

            },
            editSubmit(form, valueIndex, keyIndex) {
                this.$refs[form].validate((valid) => {
                    if (valid) {

                        if (valueIndex === 4 || valueIndex === 1) {
                            this.editFormQuery.amount = this.editForm.editAmount * 100;
                            this.editFormQuery.time = this.editForm.editTime;
                            this.editFormQuery.direction = this.editForm.direction;
                        }

                        if (valueIndex === 4) {
                            this.transactionList[keyIndex].fundTransactionNo = this.editFormQuery.no;
                            this.transactionList[keyIndex].appTransactionNo = this.editFormQuery.appNo;
                            this.transactionList[keyIndex].transactionAmount = this.editFormQuery.amount;
                            this.transactionList[keyIndex].transactionDirection = this.editFormQuery.direction;
                            this.transactionList[keyIndex].transactionTime = this.editFormQuery.time;
                        } else if (valueIndex === 3 || valueIndex === 2) {
                            this.editFormQuery.amount_bis = this.editForm.editAmount_bis * 100;
                            this.editFormQuery.time_bis = this.editForm.editTime_bis;
                            this.editFormQuery.amount_app = this.editForm.editAmount_app * 100;
                            this.editFormQuery.time_app = this.editForm.editTime_app;
                            this.editFormQuery.direction_bis = this.editForm.direction_bis;
                            this.editFormQuery.direction_app = this.editForm.direction_app;

                            this.appBusinessList[keyIndex].mchBusinessNo = this.editFormQuery.no_bis;
                            this.appBusinessList[keyIndex].appBusinessNo = this.editFormQuery.appNo_bis;
                            this.appBusinessList[keyIndex].businessAmount = this.editFormQuery.amount_bis;
                            this.appBusinessList[keyIndex].businessDirection = this.editFormQuery.direction_bis;
                            this.appBusinessList[keyIndex].businessTime = this.editFormQuery.time_bis;

                            this.appTransactionList[keyIndex].fundTransactionNo = this.editFormQuery.no_app;
                            this.appTransactionList[keyIndex].appTransactionNo = this.editFormQuery.appNo_app;
                            this.appTransactionList[keyIndex].transactionAmount = this.editFormQuery.amount_app;
                            this.appTransactionList[keyIndex].transactionDirection = this.editFormQuery.direction_app;
                            this.appTransactionList[keyIndex].transactionTime = this.editFormQuery.time_app;

                        } else if (valueIndex === 1) {
                            this.businessList[keyIndex].mchBusinessNo = this.editFormQuery.no;
                            this.businessList[keyIndex].appBusinessNo = this.editFormQuery.appNo;
                            this.businessList[keyIndex].businessAmount = this.editFormQuery.amount;
                            this.businessList[keyIndex].businessDirection = this.editFormQuery.direction;
                            this.businessList[keyIndex].businessTime = this.editFormQuery.time;
                        }

                        this.amountTotalCalc();
                        this.editReset(form);
                    } else {
                        this.$Message.error('请填写符合要求的数据');
                    }
                });
            },
            amountTotalCalc() {
                // 汇总金额更新
                if (this.businessList) {
                    let amount_business = null;
                    this.businessList.map(it => {
                        if (it.businessDirection === '0') {
                            amount_business = (-it.businessAmount * 1) + amount_business;
                        } else {
                            amount_business = it.businessAmount * 1 + amount_business;
                        }
                    });
                    this.mchTotalAmount = amount_business === null ? '0' : amount_business + '';
                }
                if (this.appBusinessList) {
                    let amount_appBusiness = null;
                    this.appBusinessList.map(it => {
                        if (it.businessDirection === '0') {
                            amount_appBusiness = (-it.businessAmount * 1) + amount_appBusiness;
                        } else {
                            amount_appBusiness = it.businessAmount * 1 + amount_appBusiness;
                        }
                    });
                    this.appMchTotalAmount = amount_appBusiness === null ? '0' : amount_appBusiness + '';
                }
                if (this.appTransactionList) {
                    let amount_appTransaction = null;
                    this.appTransactionList.map(it => {
                        if (it.transactionDirection === '0') {
                            amount_appTransaction = (-it.transactionAmount * 1) + amount_appTransaction;
                        } else {
                            amount_appTransaction = it.transactionAmount * 1 + amount_appTransaction;
                        }
                    });
                    this.appFundTotalAmount = amount_appTransaction === null ? '0' : amount_appTransaction + '';
                }
                if (this.transactionList) {
                    let amount_transaction = null;
                    this.transactionList.map(it => {
                        if (it.transactionDirection === '0') {
                            amount_transaction = (-it.transactionAmount * 1) + amount_transaction;
                        } else {
                            amount_transaction = it.transactionAmount * 1 + amount_transaction;
                        }
                    });
                    this.fundTotalAmount = amount_transaction === null ? '0' : amount_transaction + '';
                }
            },
            editReset(form) {
                this.keyIndex = undefined;
                this.valueIndex = undefined;
                this.editDialog = false;
                if (form) {
                    this.$refs[form].resetFields();
                } else {
                    this.$refs['editForm'].resetFields();
                }
            },
            editTimeChange(value) {
                this.editForm.editTime = value;
            },
            editTimeChange_bis(value) {
                this.editForm.editTime_bis = value;
            },
            editTimeChange_app(value) {
                this.editForm.editTime_app = value;
            },
            adjustAction() {
                this.adjustEmpty();
                this.adjustDialog = true;
                let timeFormat = parseTime(this.checkDate, '{y}-{m}-{d}');
                this.adjustForm.editTime_bis = timeFormat + ' ' + '00:00:00';
                this.adjustForm.editTime_adjustBis = timeFormat + ' ' + '00:00:00';
                this.adjustForm.editTime_adjustApp = timeFormat + ' ' + '00:00:00';
                this.adjustForm.direction_bis = '0';
                this.adjustForm.direction_adjustBis = '0';
                this.adjustForm.direction_adjustApp = '0';
            },
            adjustTimeChange_bis(value) {
                this.adjustForm.editTime_bis = value;
            },
            adjustTimeChange_adjustBis(value) {
                this.adjustForm.editTime_adjustBis = value;
            },
            adjustTimeChange_adjustApp(value) {
                this.adjustForm.editTime_adjustApp = value;
            },
            adjustSubmit(form) {
                if (this.adjustForm.editAmount_bis === null &&
                    this.adjustForm.editAmount_adjustBis === null &&
                    this.adjustForm.editAmount_adjustApp === null) {
                    this.$Message.error({
                        content: '请填写财务调账数据',
                        duration: 2,
                        closable: true
                    });
                    return false;
                }
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        const autoCheckNo = mathRand(16);

                        if (this.adjustForm.editAmount_adjustBis) {
                            if (!this.adjustForm.editAmount_adjustApp) {
                                this.$Message.error({
                                    content: '通道金额不能为空',
                                    duration: 2,
                                    closable: true
                                });
                                return false;
                            }
                        }

                        if (this.adjustForm.editAmount_adjustApp) {
                            if (!this.adjustForm.editAmount_adjustBis) {
                                this.$Message.error({
                                    content: '应用金额不能为空',
                                    duration: 2,
                                    closable: true
                                });
                                return false;
                            }
                        }

                        Promise.all([this.adjustItem_bisRule()]).then(results => {
                            if (results && results[0]['rule'] === true) {
                                this.adjustItem_bis(autoCheckNo);
                                this.amountTotalCalc();
                                this.adjustDialog = false;
                            } else {
                                return false;
                            }
                        }).catch(() => {
                            return false;
                        });
                        Promise.all([this.adjustItem_appRule()]).then(results => {
                            if (results && results[0]['rule'] === true) {
                                this.adjustItem_app(autoCheckNo);
                                this.amountTotalCalc();
                                this.adjustDialog = false;
                            } else {
                                return false;
                            }
                        }).catch(() => {
                            return false;
                        });
                        Promise.all([this.adjustItem_rule()]).then(results => {
                            if (results && results[0]['rule'] === true) {
                                this.adjustItem_bis(autoCheckNo);
                                this.adjustItem_app(autoCheckNo);
                                this.amountTotalCalc();
                                this.adjustDialog = false;
                            } else {
                                return false;
                            }
                        }).catch(() => {
                            return false;
                        });
                    } else {
                        return false;
                    }
                });
            },
            adjustItem_bis(autoCheckNo) {
                let item = {};
                this.$set(item, 'addFlag', true);
                this.$set(item, 'isDelete', true);
                this.$set(item, 'autoCheckNo', autoCheckNo);
                this.$set(item, 'businessId', mathRand(16));
                this.$set(item, 'ownerType', 'Mch');
                this.$set(item, 'appName', '财务调账');
                this.$set(item, 'appBusinessNo', mathRand(16));
                this.$set(item, 'mchBusinessNo', mathRand(16));
                this.$set(item, 'configIdApp', this.adjustConfigIdApp || null);
                this.$set(item, 'businessDirection', this.adjustForm.direction_bis);
                this.$set(item, 'businessAmount', parseFloat((this.adjustForm.editAmount_bis*1).toFixed(2)) * 100);
                this.$set(item, 'businessTime', this.adjustForm.editTime_bis);

                this.businessList.push(item);
            },
            adjustItem_app(autoCheckNo) {
                let businessItem = {};
                this.$set(businessItem, 'addFlag', true);
                this.$set(businessItem, 'isDelete', true);
                this.$set(businessItem, 'autoCheckNo', autoCheckNo);
                this.$set(businessItem, 'ownerType', 'App');
                this.$set(businessItem, 'businessId', mathRand(16));
                this.$set(businessItem, 'businessAmount', parseFloat((this.adjustForm.editAmount_adjustBis*1).toFixed(2)) * 100);
                this.$set(businessItem, 'businessDirection', this.adjustForm.direction_adjustBis);
                this.$set(businessItem, 'businessTime', this.adjustForm.editTime_adjustBis);
                this.$set(businessItem, 'configIdApp', this.adjustConfigIdApp || null);
                this.$set(businessItem, 'appName', "财务调账");
                this.$set(businessItem, 'appBusinessNo', mathRand(16));
                this.$set(businessItem, 'mchBusinessNo', mathRand(16));

                this.appBusinessList.push(businessItem);

                let transactionItem = {};
                this.$set(transactionItem, 'addFlag', true);
                this.$set(transactionItem, 'isDelete', true);
                this.$set(transactionItem, 'autoCheckNo', autoCheckNo);
                this.$set(transactionItem, 'transactionId', mathRand(16));
                this.$set(transactionItem, 'ownerType', 'App');
                this.$set(transactionItem, 'transactionAmount', parseFloat((this.adjustForm.editAmount_adjustApp*1).toFixed(2)) * 100);
                this.$set(transactionItem, 'transactionDirection', this.adjustForm.direction_adjustApp);
                this.$set(transactionItem, 'transactionTime', this.adjustForm.editTime_adjustApp);
                this.$set(transactionItem, 'configIdFund', this.adjustConfigIdApp || null);
                this.$set(transactionItem, 'appName', "财务调账");
                this.$set(transactionItem, 'fundName', "财务调账");
                this.$set(transactionItem, 'appTransactionNo', mathRand(16));
                this.$set(transactionItem, 'fundTransactionNo', mathRand(16));

                this.appTransactionList.push(transactionItem);
            },
            adjustItem_bisRule() {
                return new Promise((resolve) => {
                    if (this.adjustForm.editAmount_bis &&
                        (!this.adjustForm.editAmount_adjustBis && !this.adjustForm.editAmount_adjustApp)) {
                        if (!this.adjustForm.editTime_bis) {
                            this.$Message.error({
                                content: '医院账单 信息填充完整',
                                duration: 2,
                                closable: true
                            });
                            return resolve({rule: false});
                        } else {
                            return resolve({rule: true});
                        }
                    }
                });
            },
            adjustItem_appRule() {
                return new Promise((resolve) => {
                    if (
                        !this.adjustForm.editAmount_bis &&
                        (this.adjustForm.editAmount_adjustBis || this.adjustForm.editAmount_adjustApp)
                    ) {
                        if (!this.adjustForm.editTime_adjustBis || !this.adjustForm.editTime_adjustApp) {
                            this.$Message.error({
                                content: '应用账单 信息填充完整',
                                duration: 2,
                                closable: true
                            });
                            return resolve({rule: false});
                        } else {
                            return resolve({rule: true});
                        }
                    }
                });
            },
            adjustItem_rule() {
                return new Promise((resolve) => {
                    if (
                        this.adjustForm.editAmount_bis &&
                        (this.adjustForm.editAmount_adjustBis || this.adjustForm.editAmount_adjustApp)
                    ) {
                        if (
                            !this.adjustForm.editTime_bis ||
                            (!this.adjustForm.editTime_adjustBis || !this.adjustForm.editTime_adjustApp)
                        ) {
                            this.$Message.error({
                                content: '两类账单 均需 信息填充完整',
                                duration: 2,
                                closable: true
                            });
                            return resolve({rule: false});
                        } else {
                            return resolve({rule: true});
                        }
                    }
                });
            },
            adjustReset(form) {
                this.adjustDialog = false;
                this.adjustEmpty(form);
            },
            adjustEmpty(form) {
                if (form) {
                    this.$refs[form].resetFields();
                } else {
                    this.$refs['adjustForm'].resetFields();
                }
                this.adjustTabIndex = 'bis';
                this.adjustForm.editAmount_bis = null;
                this.adjustForm.editAmount_adjustBis = null;
                this.adjustForm.editAmount_adjustApp = null;
            },
            addAction() {
                this.addEmpty();
                this.addDialog = true;
                let timeFormat = parseTime(this.checkDate, '{y}-{m}-{d}');
                this.addForm.editTime_bis = timeFormat + ' ' + '00:00:00';
                this.addForm.editTime_addBis = timeFormat + ' ' + '00:00:00';
                this.addForm.editTime_addApp = timeFormat + ' ' + '00:00:00';
                this.addForm.editTime_app = timeFormat + ' ' + '00:00:00';
                this.addForm.direction_bis = '0';
                this.addForm.direction_addBis = '0';
                this.addForm.direction_addApp = '0';
                this.addForm.direction_app = '0';
                this.addForm.no_bis = '不限';
                this.addForm.no_addBis = '不限';
                this.addForm.no_addApp = '不限';
                this.addForm.no_app = '不限'; // 名称
            },
            addTimeChange_bis(value) {
                this.addForm.editTime_bis = value;
            },
            addTimeChange_addBis(value) {
                this.addForm.editTime_addBis = value;
            },
            addTimeChange_addApp(value) {
                this.addForm.editTime_addApp = value;
            },
            addTimeChange_app(value) {
                this.addForm.editTime_app = value;
            },
            addEmpty(form) {
                if (form) {
                    this.$refs[form].resetFields();
                } else {
                    this.$refs['addForm'].resetFields();
                }
                this.addForm.bisNo_bis = '';
                // this.addForm.bisNo_bis = '';
                this.addForm.appNo_bis = '';
                this.addForm.editAmount_bis = '';
                this.addForm.bisNo_addBis = '';
                // this.addForm.bisNo_addBis = '';
                this.addForm.appNo_addBis = '';
                this.addForm.editAmount_addBis = '';
                this.addForm.bisNo_addApp = '';
                // this.addForm.bisNo_addApp = '';
                this.addForm.appNo_addApp = '';
                this.addForm.editAmount_addApp = '';
                this.addForm.bisNo_app = ''; // 医院单号
                // this.addForm.bisNo_app = '';
                this.addForm.appNo_app = ''; // 应用支付单号
                this.addForm.editAmount_app = '';
            },
            addSubmit(form) {
                if ((this.addForm.editAmount_bis === null &&
                    this.addForm.editAmount_addBis === null &&
                    this.addForm.editAmount_addApp === null &&
                    this.addForm.editAmount_app === null) ||
                    (this.addForm.editAmount_bis === '' &&
                        this.addForm.editAmount_addBis === '' &&
                        this.addForm.editAmount_addApp === '' &&
                        this.addForm.editAmount_app === '')
                ) {
                    this.$Message.error({
                        content: '请填写录入数据',
                        duration: 2,
                        closable: true
                    });
                    return false;
                }

                const autoCheckNo = mathRand(16);
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        Promise.all([this.addItem_bisRule(), this.addItem_appRule(), this.addItem_fundRule()]).then(results => {
                            if (results.filter(it=>{return it.rule === true}).length === 3) {
                                if (results && results[0]['rule'] === true && !results[0]['empty']) {
                                    this.addItem_bis(autoCheckNo);
                                }
                                if (results && results[1]['rule'] === true && !results[1]['empty']) {
                                    this.addItem_appBis(autoCheckNo);
                                    this.addItem_appFund(autoCheckNo);
                                }
                                if (results && results[2]['rule'] === true && !results[2]['empty']) {
                                    this.addItem_fund(autoCheckNo);
                                }
                                this.amountTotalCalc();
                                this.addDialog = false;
                            }
                        }).catch(() => {
                            return false;
                        });
                    } else {
                        return false;
                    }
                });
            },
            addItem_bis(autoCheckNo) {
                let item = {};
                this.$set(item, 'addFlag', true);
                this.$set(item, 'isDelete', true);
                this.$set(item, 'businessId', mathRand(16));
                this.$set(item, 'ownerType', 'Mch');
                this.$set(item, 'autoCheckNo', autoCheckNo);
                this.$set(item, 'appName', this.addForm.no_bis);
                this.$set(item, 'appBusinessNo', this.addForm.appNo_bis);
                this.$set(item, 'mchBusinessNo', this.addForm.bisNo_bis);
                this.$set(item, 'businessDirection', this.addForm.direction_bis);
                this.$set(item, 'businessAmount', parseFloat((this.addForm.editAmount_bis*1).toFixed(2)) * 100);
                this.$set(item, 'businessTime', this.addForm.editTime_bis);

                this.businessList.push(item);
            },
            addItem_appBis(autoCheckNo) {
                let item = {};
                this.$set(item, 'addFlag', true);
                this.$set(item, 'isDelete', true);
                this.$set(item, 'businessId', mathRand(16));
                this.$set(item, 'ownerType', 'App');
                this.$set(item, 'autoCheckNo', autoCheckNo);
                this.$set(item, 'appName', this.addForm.no_addBis);
                this.$set(item, 'appBusinessNo', this.addForm.appNo_addBis);
                this.$set(item, 'mchBusinessNo', this.addForm.bisNo_addBis);
                this.$set(item, 'businessDirection', this.addForm.direction_addBis);
                this.$set(item, 'businessAmount', parseFloat((this.addForm.editAmount_addBis*1).toFixed(2)) * 100);
                this.$set(item, 'businessTime', this.addForm.editTime_addBis);
                this.appBusinessList.push(item);
            },
            addItem_appFund(autoCheckNo) {
                let item = {};
                this.$set(item, 'addFlag', true);
                this.$set(item, 'isDelete', true);
                this.$set(item, 'appName', this.addForm.no_addApp);
                this.$set(item, 'fundName', this.addForm.no_addApp);
                this.$set(item, 'transactionId', mathRand(16));
                this.$set(item, 'ownerType', 'App');
                this.$set(item, 'autoCheckNo', autoCheckNo);
                this.$set(item, 'appTransactionNo', this.addForm.appNo_addApp);
                this.$set(item, 'fundTransactionNo', this.addForm.bisNo_addApp);
                this.$set(item, 'transactionDirection', this.addForm.direction_addApp);
                this.$set(item, 'transactionAmount', parseFloat((this.addForm.editAmount_addApp*1).toFixed(2)) * 100);
                this.$set(item, 'transactionTime', this.addForm.editTime_addApp);
                this.appTransactionList.push(item);
            },
            addItem_fund(autoCheckNo) {
                let item = {};
                this.$set(item, 'addFlag', true);
                this.$set(item, 'isDelete', true);
                this.$set(item, 'fundName', this.addForm.no_app);
                this.$set(item, 'transactionId', mathRand(16));
                this.$set(item, 'ownerType', 'Pay');
                this.$set(item, 'autoCheckNo', autoCheckNo);
                this.$set(item, 'appTransactionNo', this.addForm.appNo_app);
                this.$set(item, 'fundTransactionNo', this.addForm.bisNo_app);
                this.$set(item, 'transactionDirection', this.addForm.direction_app);
                this.$set(item, 'transactionAmount', parseFloat((this.addForm.editAmount_app*1).toFixed(2)) * 100);
                this.$set(item, 'transactionTime', this.addForm.editTime_app);

                this.transactionList.push(item);
            },
            addItem_bisRule() {
                return new Promise((resolve) => {
                    if (!this.addForm.bisNo_bis && !this.addForm.appNo_bis && !this.addForm.editAmount_bis) {
                        return resolve({rule: true, empty: true});
                    } else if (this.addForm.no_bis === '不限') {
                        this.$Message.error({
                            content: '请选择医院账单 应用名称',
                            duration: 2,
                            closable: true
                        });
                        return resolve({rule: false});
                    } else if (!this.addForm.bisNo_bis ||
                        !this.addForm.appNo_bis ||
                        !this.addForm.editAmount_bis) {
                        this.$Message.error({
                            content: '医院账单 信息填充完整',
                            duration: 2,
                            closable: true
                        });
                        return resolve({rule: false});
                    } else {
                        if (!this.addForm.editTime_bis) {
                            this.$Message.error({
                                content: '医院账单 信息填充完整',
                                duration: 2,
                                closable: true
                            });
                            return resolve({rule: false});
                        } else {
                            return resolve({rule: true});
                        }
                    }
                });
            },
            addItem_appRule() {
                return new Promise((resolve) => {
                    if (!this.addForm.bisNo_addBis &&
                        !this.addForm.appNo_addBis &&
                        !this.addForm.editAmount_addBis &&
                        !this.addForm.bisNo_addApp &&
                        !this.addForm.appNo_addApp &&
                        !this.addForm.editAmount_addApp) {
                        return resolve({rule: true, empty: true});
                    } else if (this.addForm.no_addBis === '不限') {
                        this.$Message.error({
                            content: '请选择应用账单 应用名称',
                            duration: 2,
                            closable: true
                        });
                        return resolve({rule: false});
                    } else if (this.addForm.no_addApp === '不限') {
                        this.$Message.error({
                            content: '请选择应用账单 通道名称',
                            duration: 2,
                            closable: true
                        });
                        return resolve({rule: false});
                    } else if (!this.addForm.bisNo_addBis ||
                        !this.addForm.appNo_addBis ||
                        !this.addForm.editAmount_addBis ||
                        !this.addForm.bisNo_addApp ||
                        !this.addForm.appNo_addApp ||
                        !this.addForm.editAmount_addApp
                    ) {
                        this.$Message.error({
                            content: '应用账单 信息填充完整',
                            duration: 2,
                            closable: true
                        });
                        return resolve({rule: false});
                    } else {
                        if (!this.addForm.editTime_addBis || !this.addForm.editTime_addApp) {
                            this.$Message.error({
                                content: '应用账单 信息填充完整',
                                duration: 2,
                                closable: true
                            });
                            return resolve({rule: false});
                        } else {
                            return resolve({rule: true});
                        }
                    }
                });
            },
            addItem_fundRule() {
                return new Promise((resolve) => {
                    if (!this.addForm.bisNo_app &&
                        !this.addForm.appNo_app &&
                        !this.addForm.editAmount_app) {
                        return resolve({rule: true, empty: true});
                    } else if (this.addForm.no_app === '不限') {
                        this.$Message.error({
                            content: '请选择资金通道 应用名称',
                            duration: 2,
                            closable: true
                        });
                        return resolve({rule: false});
                    } else if (!this.addForm.bisNo_app ||
                        !this.addForm.appNo_app ||
                        !this.addForm.editAmount_app) {
                        this.$Message.error({
                            content: '资金通道 信息填充完整',
                            duration: 2,
                            closable: true
                        });
                        return resolve({rule: false});
                    } else {
                        if (!this.addForm.editTime_app) {
                            this.$Message.error({
                                content: '资金通道 信息填充完整',
                                duration: 2,
                                closable: true
                            });
                            return resolve({rule: false});
                        } else {
                            return resolve({rule: true});
                        }
                    }
                });
            },
            addReset(form) {
                this.addEmpty(form);
                this.addDialog = false;
            },
            passAction() {
                this.passDialog = true;
                this.passForm.remark = '';
                this.passEmpty();
            },
            passSubmit(form) {
                let businessList = [],
                    appBusinessList = [],
                    appTransactionList = [],
                    transactionList = [];

                if (this.businessList && this.businessList.length > 0) {
                    this.businessList.forEach(it => {
                        let item = {
                            ...it,
                            businessTime: moment(it.businessTime).valueOf(),
                            businessAmount: (parseFloat((it.businessAmount*1/100).toFixed(2))*100).toFixed(0)+''
                        };
                        businessList.push(item);
                    });
                }
                if (this.appBusinessList && this.appBusinessList.length > 0) {
                    this.appBusinessList.forEach(it => {
                        let item = {
                            ...it,
                            businessTime: moment(it.businessTime).valueOf(),
                            businessAmount: (parseFloat((it.businessAmount*1/100).toFixed(2))*100).toFixed(0)+''
                        };
                        appBusinessList.push(item);
                    });
                }
                if (this.appTransactionList && this.appTransactionList.length > 0) {
                    this.appTransactionList.forEach(it => {
                        let item = {
                            ...it,
                            transactionTime: moment(it.transactionTime).valueOf(),
                            transactionAmount: (parseFloat((it.transactionAmount*1/100).toFixed(2))*100).toFixed(0)+''
                        };
                        appTransactionList.push(item);
                    });
                }
                if (this.transactionList && this.transactionList.length > 0) {
                    this.transactionList.forEach(it => {
                        let item = {
                            ...it,
                            transactionTime: moment(it.transactionTime).valueOf(),
                            transactionAmount: (parseFloat((it.transactionAmount*1/100).toFixed(2))*100).toFixed(0)+''
                        };
                        transactionList.push(item);
                    });
                }

                let params = {
                    autoCheckNo: this.queryCheckDetailObj.autoCheckNo || null,
                    checkOrderNo: this.checkOrderNo || '',
                    remark: this.passForm.remark || '',
                    mchUnioncheckBusiness: businessList,
                    appUnioncheckBusiness: appBusinessList,
                    appUnionCheckTransaction: appTransactionList,
                    payUnionCheckTransaction: transactionList
                };

                //1.医院账单 ownerType:MCH;
                //2.应用账单 ownerType:APP
                //3.资金通道账单 ownerType:Pay

                ajax.doBlend(params).then(response => {
                    if (response.success === true) {
                        this.$Message.success({
                            content: response.msg ? response.msg : '对账通过成功',
                            duration: 2,
                            closable: true
                        });
                        this.passReset(form);
                        this.emitEvent();
                        this.handleDialog = false;
                    } else {
                        this.$Message.error({
                            content: response.msg ? response.msg : '对账通过失败',
                            duration: 2,
                            closable: true
                        });
                        this.passReset(form);
                    }
                }).catch(() => {
                });
            },
            passReset(form) {
                this.passEmpty(form);
                this.passDialog = false;
                this.$Modal.remove();
            },
            passEmpty(form) {
                if (form) {
                    this.$refs[form].resetFields();
                } else {
                    this.$refs['passForm'].resetFields();
                }
                this.passForm.remark = '';
            },
            // 挂账
            delayAction() {
                this.$Modal.confirm({
                    content: '确定挂账吗?',
                    okText: '确定',
                    cancelText: '取消',
                    onOk: () => {
                        setTimeout(() => {
                            this.delayFetch();
                        }, 600);
                    }
                });
            },
            delayFetch() {
                if (this.businessList && this.businessList.length > 0) {
                    this.businessList.map(it => {
                        it.businessTime = moment(it.businessTime).valueOf();
                    });
                }
                if (this.appBusinessList && this.appBusinessList.length > 0) {
                    this.appBusinessList.map(it => {
                        it.businessTime = moment(it.businessTime).valueOf();
                    });
                }
                if (this.appTransactionList && this.appTransactionList.length > 0) {
                    this.appTransactionList.map(it => {
                        it.transactionTime = moment(it.transactionTime).valueOf();
                    });
                }
                if (this.transactionList && this.transactionList.length > 0) {
                    this.transactionList.map(it => {
                        it.transactionTime = moment(it.transactionTime).valueOf();
                    });
                }

                let params = {
                    autoCheckNo: this.queryCheckDetailObj.autoCheckNo || null,
                    checkOrderNo: this.checkOrderNo || '',
                    mchUnioncheckBusiness: this.businessList,
                    appUnioncheckBusiness: this.appBusinessList,
                    appUnionCheckTransaction: this.appTransactionList,
                    payUnionCheckTransaction: this.transactionList
                };

                ajax.doHang(params).then(response => {
                    if (response.success === true) {
                        this.$Message.success({
                            content: response.msg ? response.msg : '挂账成功',
                            duration: 2,
                            closable: true
                        });
                        this.delayReset();
                        this.emitEvent();
                        this.handleDialog = false;
                    } else {
                        this.$Message.error({
                            content: response.msg ? response.msg : '挂账失败',
                            duration: 2,
                            closable: true
                        });
                    }
                }).catch(() => {
                });
            },
            delayReset() {
                this.editDialog = false;
            },
            removeAction(item, key) {
                let title = '';
                if (item === 1) {
                    title = '医院账单';
                }
                if (item === 2 || item === 3) {
                    title = '应用账单';
                }
                this.$Modal.confirm({
                    content: '确定删除' + title + '吗?',
                    okText: '确定',
                    cancelText: '取消',
                    onOk: () => {
                        setTimeout(() => {
                            if (item === 1) {
                                this.businessList.splice(key, 1);
                            }
                            if (item === 2) {
                                this.appBusinessList.splice(key, 1);
                            }
                            if (item === 3) {
                                this.appTransactionList.splice(key, 1);
                            }
                            if (item === 4) {
                                this.transactionList.splice(key, 1);
                            }
                            this.amountTotalCalc();
                            this.$Message.success({
                                content: '删除成功',
                                duration: 2,
                                closable: true
                            });
                        }, 600);
                    }
                });
            },
            emitEvent() {
                this.$emit('on-success');
            },
            linkEmpty(value) {
                // console.log(value)
            },
            linkMoved(value) {
                if (value) {
                    for (let i in value) {
                        const item = value[i];
                        const unionCheckBusinessList = item.unioncheckBusinessList || [];
                        const unionCheckTransactionList = item.unionCheckTransactionList || [];

                        if (unionCheckBusinessList) {
                            for (let j in unionCheckBusinessList) {
                                if (unionCheckBusinessList[j].ownerType === 'Mch') {
                                    this.$set(unionCheckBusinessList[j], 'isCancel', true);
                                    this.$set(unionCheckBusinessList[j], 'isDisabled', false);
                                    this.$set(unionCheckBusinessList[j], 'indexKey', item['indexKey']);
                                    this.businessList.push(unionCheckBusinessList[j]);
                                } else if (unionCheckBusinessList[j].ownerType === 'App') {
                                    this.$set(unionCheckBusinessList[j], 'isCancel', true);
                                    this.$set(unionCheckBusinessList[j], 'isDisabled', false);
                                    this.$set(unionCheckBusinessList[j], 'indexKey', item['indexKey']);
                                    this.appBusinessList.push(unionCheckBusinessList[j]);
                                }
                            }
                        }
                        if (unionCheckTransactionList) {
                            for (let q in unionCheckTransactionList) {
                                if (unionCheckTransactionList[q].ownerType === 'Pay') {
                                    this.$set(unionCheckTransactionList[q], 'isCancel', true);
                                    this.$set(unionCheckTransactionList[q], 'isDisabled', false);
                                    this.$set(unionCheckTransactionList[q], 'indexKey', item['indexKey']);
                                    this.transactionList.push(unionCheckTransactionList[q]);
                                } else if (unionCheckTransactionList[q].ownerType === 'App') {
                                    this.$set(unionCheckTransactionList[q], 'isCancel', true);
                                    this.$set(unionCheckTransactionList[q], 'isDisabled', false);
                                    this.$set(unionCheckTransactionList[q], 'indexKey', item['indexKey']);
                                    this.appTransactionList.push(unionCheckTransactionList[q]);
                                }
                            }
                        }
                        this.amountTotalCalc();
                    }
                }
            },
            cancelLinkDisabled(key) {
                return new Promise((resolve) => {
                    if (key) {
                        _.map(this.businessList, it => {
                            if (it.indexKey === key) {
                                return this.$set(it, 'isDisabled', true);
                            }
                        });
                        _.map(this.appBusinessList, it => {
                            if (it.indexKey === key) {
                                return this.$set(it, 'isDisabled', true);
                            }
                        });
                        _.map(this.transactionList, it => {
                            if (it.indexKey === key) {
                                return this.$set(it, 'isDisabled', true);
                            }
                        });
                        _.map(this.appTransactionList, it => {
                            if (it.indexKey === key) {
                                return this.$set(it, 'isDisabled', true);
                            }
                        });
                    }
                    return resolve({'set': 'finish'});
                }).catch(()=>{
                    return resolve({});
                });
            },
            cancelLinkData(key) {
                return new Promise((resolve) => {
                    _.remove(this.businessList, it => {
                        if (it.indexKey === key) {
                            return it.isCancel;
                        }
                    });
                    _.remove(this.appBusinessList, it => {
                        if (it.indexKey === key) {
                            return it.isCancel;
                        }
                    });
                    _.remove(this.transactionList, it => {
                        if (it.indexKey === key) {
                            return it.isCancel;
                        }
                    });
                    _.remove(this.appTransactionList, it => {
                        if (it.indexKey === key) {
                            return it.isCancel;
                        }
                    });
                    return resolve({'set': 'finish'});
                }).catch(()=>{
                    return resolve({});
                });
            },
            cancelLinkAction(key) {
                Promise.all([this.cancelLinkDisabled(key), this.cancelLinkData(key)]).then(results=>{
                    if (results[1] && results[1]['set'] === 'finish') {
                        this.$nextTick(() => {
                            this.businessList.map(it=>{
                                return this.$set(it);
                            });
                            this.appBusinessList.map(it=>{
                                return this.$set(it);
                            });
                            this.transactionList.map(it=>{
                                return this.$set(it);
                            });
                            this.appTransactionList.map(it=>{
                                return this.$set(it);
                            });
                            this.amountTotalCalc();
                            this.$refs.linkBillRef.removeRelation(key);

                            setTimeout(() => {
                                this.$Message.success({
                                    content: '已取消勾对',
                                    duration: 2,
                                    closable: true
                                });
                            }, 600);
                        });
                    }
                });
            }
        },
        filters: {
            parseTime: function (value) {
                return parseTime(value);
            },
            moneyFormatTemp: function (value) {
                if (value > 0) {
                    return moneyFormat(value / 100) + '元';
                } else if (value === 0) {
                    return 0 + '元';
                } else {
                    return moneyFormat(value / 100) + '元';
                }
            },
            directionStatistics: function (value) {
                return directionStatistics(value);
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../styles/common";

    .bg-light-radius {
        padding: 3px 5px 5px;
        background-color: @borderLighter;
        border-radius: 3px;
    }

    @media screen and (max-height: 786px) {

    }
</style>


