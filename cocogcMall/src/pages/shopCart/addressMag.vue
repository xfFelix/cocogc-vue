<template>
    <div class="addressMag">
        <header-top></header-top>
        <div class="address-contentW">
            <ul class="address-content" >
                <li v-for="(item,index) in addressList" :key="index" @click.prevent="jumpAddress(item)">
                    <div class="address-infoW one-bottom-px">
                        <p class="address-nameTel">
                            <span>{{item.name}}</span>
                            <span>{{item.tel}}</span>
                        </p>
                        <p class="address-address">{{item.area}}{{item.address}}</p>
                    </div>
                    <div class="address-operW">
                        <div class="address-def">
                            <span v-if="item.isDefault==1" class="address-defSpan">
                                默认
                            </span>
                        </div>
                        <div class="address-editDel">
                            <p class="address-edit" @click.stop="addressEditC(item,index)">
                                <span class="j1Png address-editImg"></span>
                                <span>编辑</span>
                            </p>
                            <p class="address-del">
                                <span class="j1Png address-delImg"></span>
                                <span @click="delAddress(item,index)">删除</span>
                            </p>
                        </div>
                    </div>
                </li>
            </ul>

            <p class="button addBnt" @click="goAddressEdit()">
                添加新地址
            </p>
        </div>

        <div class="address-fixedWrap" v-if="fixedshow">
            <div class="address-fixed">
                <div class="address-whether one-bottom-px">确定要删除该地址吗？</div>
                <p class="address-fixedDel">
                    <span @click="colseFixed">取消</span>
                    <span @click="delConfirm()">确定</span>
                </p>
            </div>
        </div>

    </div>
</template>

<script>
import headerTop from "../../common/header.vue";
import api from '../../service/api';

export default {
    data() {
        return {
            addressList: [],
            fixedshow: false,
            delIndex: '',
            delId: '',
            fromPath:''
        };
    },
    mounted() {
        this.addressMag()
    },

    methods: {
        addressEditC(item, index) {
            var editItem = JSON.stringify(item);
            localStorage.setItem('addressEdit', editItem);
            this.$router.push('addressEdit')
        },
        delAddress(item, index) {
            this.fixedshow = true;
            this.delIndex = index;
            this.delId = item.id;
        },
        goAddressEdit() {
            this.$router.push('addressEdit');
            localStorage.setItem('addressEdit', '');
        },
        //确定删除
        delConfirm() {
            this.fixedshow = false;
            this.removeAddress()

        },
        colseFixed() {
            this.fixedshow = false;
        },

        //地址列表
        addressMag: function(token) {
            let _this = this;
            this.axios(testUrl + api.selectAddresses, {
                "token": localStorage.getItem("yeyun_token")
            }, 'post')
                .then((data) => {
                    if (data.error_code == 0) {
                        _this.addressList = data.data;
                    } else {
                        _this.Toast(data.message)
                    }
                })
                .catch((err) => {
                    _this.Toast(err.message)
                })
        },

        //删除地址
        removeAddress: function(token, id) {
            let _this = this;
            this.axios(testUrl + api.removeAddress, {
                "token": localStorage.getItem("yeyun_token"),
                "id": _this.delId
            }, 'post')
                .then((data) => {
                    if (data.error_code == 0) {
                        _this.addressList.splice(this.delIndex, 1)
                    } else {
                        _this.Toast(data.message)
                    }
                })
                .catch((err) => {
                    _this.Toast(err.message)
                })
        },
        jumpAddress(item) {
            if(sessionStorage.getItem('fromOrder') == 'true'){
                let area = {};
                area.name = item.name;
                area.tel = item.tel;
                area.userAddress = item.area + ' ' + item.address
                localStorage.setItem('orderAddress',JSON.stringify(area));
                this.$router.push('/order');
            }
        }
    },
    beforeRouteEnter(to, from, next){     
         next(vm=>{
            vm.fromPath = from.name;
            if(from.name == 'order'){
                sessionStorage.setItem('fromOrder',true);
            }
        })
    },
    components: {
        "header-top": headerTop

    }

}
</script>

<style lang="less">
.address-content {
    li {
        background: #fff;
        margin: 0.2rem 0.28rem;

        font-size: 0.28rem;
        .address-infoW {
            padding: 0.3rem 0.32rem 0.2rem 0.32rem;
            .address-nameTel {
                color: #000;
                span:nth-of-type(1) {}
                span:nth-of-type(1) {}
            }
            .address-address {
                color: #666666;
                line-height: 0.5rem;
            }
        }
        .address-operW {
            font-size: 0.24rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.24rem 0.32rem;
            .address-def {
                display: flex;
                align-items: center;
                .address-defSpan {
                    background: #30ce84;
                    border-radius: 44px;
                    color: #fff;
                    padding: 2px 5px;
                }
                .address-defAddress {
                    color: #999999;
                    margin-left: 0.08rem;
                    span {}
                }
            }
            .address-editDel {
                color: #333;
                display: flex;
                align-items: center;
                .address-edit {
                    display: flex;
                    align-items: center;
                    .address-editImg {
                        width: 0.35rem;
                        height: 0.35rem;
                        background-position: -1.4rem -1.26rem;
                        margin-right: 0.1rem;
                    }
                    span {}
                }
                .address-del {
                    display: flex;
                    align-items: center;
                    .address-delImg {
                        width: 0.35rem;
                        height: 0.35rem;
                        background-position: -0.95rem -1.26rem;
                        margin-right: 0.1rem;
                        margin-left: 0.37rem;
                    }
                    span {}
                }
            }
        }
    }
}

.addBnt {
    background: #30ce84;
    margin: 2rem 0.26rem 0.1rem 0.26rem;
}

.address-fixedWrap {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: 0.3rem;
    z-index: 12;
    .address-fixed {
        border-radius: 5px;
        background: #fff;
        margin: 3rem 0.68rem 0 0.68rem;
        .address-whether {
            text-align: center;
            color: #000000;
            padding: 1.05rem 0 0.85rem 0;
        }
    }
    .address-fixedDel {
        display: flex;
        span {
            width: 50%;
            display: inline-block;
            text-align: center;
            height: 0.96rem;
            line-height: 0.96rem;
        }
        span:nth-of-type(2) {
            background: #30ce84;
            color: #fff;
            border-radius: 0 0 5px 0;
        }
    }
}
</style>
