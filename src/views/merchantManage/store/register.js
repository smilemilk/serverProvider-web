import {parseTime, moneyFormat} from '@/filters';
// import {reconciliationStatus} from 'filters';

export default function () {
    return {
        queryParams: {
            merchantType: '', // 商户类型
            merchantName: '', // 商户名称
            merchantShortName: '', // 商户简称
            outerNumber: '', // 外部编号
            merchantAddress: '', // 商户地址
            merchantManager: '', // 商户管理员
            merchantManagerPhone: '', // 管理员手机
            contacts: '', // 联系人
            contactsPhone: '', // 联系人手机
            payeeName: '', // 收款人名称
            payeeBank: '', // 收款银行
            payeeBankAccount: '', // 收款银行账号
            payeeBankAddress: '', // 收款银行地址
            applyReason: '', // 申请事由
            remark: '', // 备注
        },
    }
}

