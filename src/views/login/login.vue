<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="header">
            <img src="../../images/login-logo.png">
        </div>
        <div class="background">
            <img src="../../images/login-bg.jpg"/>
        </div>
        <div class="login-con">
            <Card :bordered="false">
                <div class="form-con">
                    <Form ref="form" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                            <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                            <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip" @click="forgetPassword">忘记密码?</p>
                </div>
            </Card>
        </div>
        <div class="footer">
            <div class="copyright">Copyright©2016 杭州求是同创网络科技有限公司 浙ICP备16003350号-2</div>
            <div>
                <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33011002011357"
                   style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img
                        src="../../images/beian.png">浙公网安备 33011002011357号</a>
            </div>
        </div>
        <Modal
                v-model="toggleModal"
                :closable='true'
                :footer='true'
                :mask-closable=false
                :styles="{top:'50%',overflowY: 'auto',maxHeight: '94%',transform: 'translateY(-50%) !important'}">
            <h3 slot="header">忘记密码</h3>
                <p class="center">暂未开放自助找回密码功能，<br/>
                请联系我们,重置登录密码 400-000-3999</p>
            <div slot="footer">
              <Button @click="closePasswordModel" type="primary">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import Cookies from 'js-cookie';
    import ajax from '@/api/login';
    import RSA from '@/libs/RSANode';

    export default {
        data () {
            return {
                keyPair: '',
                rsaPassWord: '',
                form: {
                    userName: '',
                    password: ''
                },
                toggleModal: false,
                rules: {
                    userName: [
                        {required: true, message: '账号不能为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ]
                }
            };
        },
        created () {
            this.getToken();
        },
        methods: {
            getToken () {
                ajax.getToken({
                    _: new Date().getTime()
                }).then(response => {
                    if (!response.success === true) {
                        this.$Notice.open({
                            title: '登陆验证错误',
                            desc: response.msg ? response.msg : '获取用户认证错误'
                        });
                        return;
                    }
                    let res = response.data;
                    const keyPair = RSA.getKeyPair(
                        res.exponent, '', res.modulus
                    );
                    this.keyPair = keyPair;
                }).catch(() => {
                });
            },
            handleSubmit () {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        ajax.login({
                            login_name: this.form.userName,
                            login_pwd: RSA.encryptedString(this.keyPair, this.form.password)
                        }).then(response => {
                            if (!response.success === true) {
                                this.$Notice.open({
                                    title: '登陆出错',
                                    desc: response.msg ? response.msg : '登陆出错'
                                });
                                return;
                            }
                            this.getUser();
                            Cookies.set('user', this.form.userName);
                            Cookies.set('password', this.form.password);
                            this.$router.push({
                                name: 'home'
                            });
                            this.$store.state.app.welcomeHome = true;
                        }).catch(() => {
                            this.$Message.error('未成功提交登陆');
                        });

                    } else {
                        return false;
                    }
                });
            },
            getRule (param) {
                ajax.getRule({userName: param}).then(response => {
                    if (response.success === true ) {
                        if (response.data) {
                            Cookies.set('rule', response.data)
                        } else {
                            // this.$Message.error('权限数据为空');
                        }
                    } else {
                        // this.$Message.error('权限数据有异常');
                    }
                    //this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
//                            if (this.form.userName === 'admin') {
//                                Cookies.set('access', 0);
//                            } else {
//                                Cookies.set('access', 1);
//                            }
                }).catch(() => {
                    // this.$Message.error('权限请求未成功');
                });
            },
            getUser () {
                ajax.getUser({}).then(response => {
                    if (response.data.merchantName) {
                        this.getRule(response.data.merchantName);
                    } else {
                        this.$Message.error(response.msg ? response.msg : '用户信息数据返回有问题');
                    }
                }).catch(() => {
                    this.$Message.error('用户信息请求未成功');
                });
            },
            forgetPassword () {
                this.toggleModal = true;
            },
            closePasswordModel () {
                this.toggleModal = false;
            }
        }
    };
</script>

<style lang="less" scoped>
    .header {
        background-color: white;
        position: relative;
        width: 100%;
        height: 80px;
        left: 0px;
        top: 0px;
        img {
            display: inline-block;
            vertical-align: middle;
            height: 45px;
            margin-left: 20px;
            margin-top: 15px;
        }
    }

    .login {
        width: 100%;
        height: 100%;
        position: relative;
        &-con {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 340px;
            transform: translate(-50%, -60%);
            background-color: rgba(0, 0, 0, 0.5);
            .ivu-card {
                background-color: transparent;
                padding-left: 30px;
                padding-right: 30px;
                padding-top: 20px;
            }
            &-header {
                font-size: 16px;
                font-weight: 300;
                text-align: center;
                padding: 30px 0;
            }
            .form-con {
                padding: 10px 0 0;
            }
            .login-tip {
                font-size: 10px;
                text-align: left;
                color: #c3c3c3;
            }
        }
    }

    .footer {
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100px;
        padding: 10px 20px;
        background: none repeat scroll 0 0 white;
        border-top: 1px solid #e7eaec;
        text-align: center;
        .copyright {
            margin-top: 20px;
            & + div {
                width: 300px;
                margin: 0 auto;
                padding: 15px 0;
                img {
                    display: inline-block;
                    vertical-align: middle;
                }
            }
        }
    }

    .background {
        position: fixed;
        width: 100%;
        height: 100%;
        img {
            display: inline-block;
            height: 100%;
            width: 100%;
        }
    }

    .center {
        text-align: center;
    }

    @media screen and (max-height: 786px) {
        .header {
            height: 62px;
            img {
                height: 32px;
            }
        }
    }

</style>
