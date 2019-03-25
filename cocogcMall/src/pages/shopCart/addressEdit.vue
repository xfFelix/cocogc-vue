<template>
    <div id="addressEdit">
        <header-top></header-top>
        <div class="addEdit-contentWrap">
            <ul class="addEdit-content">
                <li class="one-bottom-px">
                    <p>
                        <span>收货人</span>
                        <span>
                            <input type="text" placeholder="请填写收货人姓名" v-model.trim="takeName">
                        </span>
                    </p>
                    <p class="j1Png addEdid-delInp" @click="takeNameC" v-if="takeName.length>0">
                    </p>
                </li>
                <li class="one-bottom-px">
                    <p>
                        <span>手机号码</span>
                        <span>
                            <input type="number" placeholder="请填写收货人手机号" v-model.trim="takeTel" pattern="\d*">
                        </span>
                    </p>
                    <p class="j1Png addEdid-delInp" @click="takeTelC" v-if="takeTel.length>0">
                    </p>
                </li>
                <li class="one-bottom-px">
                    <p>
                        <span>所在地区</span>
                        <span>
                            <input type="text" placeholder="省市区县、乡镇等" v-model.trim="takeAddress" @click="fixedShowC()" readonly="">
                        </span>
                    </p>
                    <p class="j1Png addEdid-delInp" @click="takeAddressC" v-if="takeAddress.length>0">
                    </p>
                </li>
                <li class="one-bottom-px">
                    <p>
                        <span>详细地区</span>
                        <textarea type="text" placeholder="街道、楼牌号等" v-model.trim="takeDAddress">
                        </textarea>
                    </p>
                    <p class="j1Png addEdid-delInp" @click="takeDAddressC" v-if="takeDAddress.length>0">
                    </p>
                </li>
            </ul>
            <div class="address-operW">
                <div class="address-def" @click="addressDef=!addressDef">
                    <span class="j1Png " :class="addressDef?'address-defImg':'address-defImgNo'"></span>
                    <span class="address-defAddress">
                        <span>设为默认地址</span>
                    </span>
                </div>
            </div>
        </div>

        <p class="address-keep" @click="takeKeep()">保存</p>
        <address-select v-if="fixedShow==true" @childShow="parentShow" @childAddress="parentAddress" @childAddressId="parentAddressId"></address-select>

    </div>
</template>
<script>

import headerTop from "../../common/header.vue";
import addressSelect from "../../components/shopCart/addressSelect.vue";
import api from '../../service/api';
import { IsEmpty, IsMobile, CheckPass } from "@/util/common";


export default {
    data() {
        return {
            takeName: '',
            takeTel: '',
            takeAddress: '',
            takeAddressId: '',
            takeDAddress: '',
            addressDef: false,
            fixedShow: false,
            areaCode: '',
        };
    },
    watch: {

    },
    mounted() {
        var adEdit = localStorage.getItem('addressEdit');
        if (adEdit) {
            var item = JSON.parse(adEdit);
            this.takeName = item.name;
            this.takeTel = item.tel;
            this.takeAddress = item.area;
            this.takeDAddress = item.address;
            this.takeAddressId = item.id;
            this.areaCode = item.areaCode;  //编辑页面传来的areacode
            this.addressDef = item.isDefault;
        }
    },
    created() {
        var adEdit = localStorage.getItem('addressEdit');
        if (adEdit) {
            this.$route.meta.title = "编辑地址"
        } else {
            this.$route.meta.title = "添加地址";
        }
    },
    updated() {

    },
    methods: {
        parentShow(val) {
            this.fixedShow = val;
        },
        //子组件传来的地址名
        parentAddress(val) {
            this.takeAddress = val;
        },
        //子组件传来的areacode
        parentAddressId(valCode) {
            this.areaCode = valCode;
        },
        fixedShowC() {
            this.fixedShow = true;
        },
        takeNameC() {
            this.takeName = '';
        },
        takeTelC() {
            this.takeTel = '';
        },
        takeAddressC() {
            this.takeAddress = '';
        },
        takeDAddressC() {
            this.takeDAddress = '';
        },
        //地址更新
        updateAddress: function(addressDef) {
            let _this = this;
            this.axios(testUrl + api.updateAddress, {
                "token": localStorage.getItem("yeyun_token"),
                "name": _this.takeName,
                "tel": _this.takeTel,
                "code": _this.areaCode,
                "area": _this.takeAddress,
                "address": _this.takeDAddress,
                "id": _this.takeAddressId,
                "isDefault": addressDef
            }, 'post')
                .then((data) => {
                    if (data.error_code == 0) {
                        _this.addressList = data.data;
                        this.$router.replace('/addressMag')
                        localStorage.setItem('addressEdit', '');
                    } else {
                        return this.Toast(data.message)
                    }
                })
                .catch((err) => {

                })
        },
        takeKeep() {
            if (IsEmpty(this.takeName)) {
                this.MessageBox("提示", "收货人不能为空");
                return false;
            } else if (IsEmpty(this.takeTel)) {
                this.MessageBox("提示", "手机号码不能为空");
                return false;
            }
            else if (!IsMobile(this.takeTel)) {
                this.MessageBox("提示", "手机号码格式错误");
                return false;
            }
            else if (IsEmpty(this.takeAddress)) {
                this.MessageBox("提示", "地区不能为空")
                return false;
            }
            else if (IsEmpty(this.takeDAddress)) {
                this.MessageBox("提示", "详细地址不能为空")
                return false;
            } else if (this.takeDAddress.length >= 30) {
                this.MessageBox("提示", "详细地址不能超过30个字")
                return false;
            } else {
                if (this.addressDef == false) {
                    this.updateAddress(0)
                } else {
                    this.updateAddress(1)
                }

            }
        }
    },
    components: {
        "header-top": headerTop,
        "address-select": addressSelect
    }
};
</script>
<style lang="less">
.addEdit-contentWrap {
    background: #fff;
    margin: 0.2rem 0.28rem;
    padding: 0 0.4rem;
    .addEdit-content {
        font-size: 0.28rem;
        li {
            display: flex;
            justify-content: space-between;
            padding: 0.36rem 0 0.16rem 0;
            p:nth-of-type(1) {
                width: 90%;
                display: flex;
                span:nth-of-type(1) {
                    width: 24%;
                    display: inline-block;
                }
            }

            input {
                font-weight: bold;
                color: #000;
                height: 100%;
            }
             ::-webkit-input-placeholder {
                /* WebKit, Blink, Edge */
                color: #999999;
                font-size: 0.26rem;
                font-weight: 100;
            }

             :-moz-placeholder {
                /* Mozilla Firefox 4 to 18 */
                color: #999999;
                font-size: 0.26rem;
                font-weight: 100;
            }

             ::-moz-placeholder {
                /* Mozilla Firefox 19+ */
                color: #999999;
                font-size: 0.26rem;
                font-weight: 100;
            }

            input:-ms-input-placeholder {
                /* Internet Explorer 10-11 */
                color: #999999;
                font-size: 0.26rem;
                font-weight: 100;
            }
            .addEdid-delInp {
                width: 0.45rem;
                height: 0.45rem;
                background-color: #efefef;
                border-radius: 50%;
                background-position: -4.78rem -1.44rem;
            }
        }
        li:nth-of-type(1),
        li:nth-of-type(2),
        li:nth-of-type(3) {
            height: 0.46rem;
            p:nth-of-type(1) {
                span:nth-of-type(1) {
                    display: flex;
                    align-items: center;
                }
            }
        }
    }
}

.address-operW {
    font-size: 0.24rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.24rem 0;
    .address-def {
        display: flex;
        align-items: center;
        .address-defImg,
        .address-defImgNo {
            width: 0.34rem;
            height: 0.34rem;
        }
        .address-defImg {
            background-position: -1.87rem -1.52rem;
        }
        .address-defImgNo {
            background-position: -2.94rem -1.52rem;
        }
        .address-defAddress {
            color: #999999;
            margin-left: 0.08rem;
        }
    }
}

.address-keep {
    margin: 0.2rem 0.28rem;
    height: 45px;
    background: #30ce84;
    border-radius: 40px;
    line-height: 45px;
    color: #fff;
    font-size: 0.3rem;
    text-align: center;
}

textarea {
    border: none;
    resize: none;
    outline: none;
    font-weight: bold;
    color: #000;
    width: 70%;
    height: 1.38rem;
    margin-top: 0.05rem;
}
</style>




