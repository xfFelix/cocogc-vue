<template>
    <div class="addressFixed">
        <div class="addressSelect">
            <div>
                <p class="address-selTitle one-bottom-px">
                    <span>配送至</span>
                    <span class="j1Png address-selColse" @click="colseFixed"></span>
                </p>

                <section class=" address-selAlready">
                    <div class="address-area" @click="provinceSelected()" :class="Province?'':'active'">
                        <span :class="selectArea == 1?'selectArea':''">
                            {{Province?Province:'请选择'}}
                        </span>

                    </div>
                    <div class="address-area" @click="citySelected()" :class="City?'':'active'" v-show="Province">
                        <span :class="selectArea == 2?'selectArea':''">
                            {{City?City:'请选择'}}
                        </span>
                    </div>
                    <div class="address-area" @click="districtSelected()" :class="District?'':'active'" v-show="City">
                        <span :class="selectArea == 3?'selectArea':''">
                            {{District?District:'请选择'}}
                        </span>

                    </div>
                    <div class="address-area" @click="townSelected()" :class="Town?'':'active'" v-show="District">
                        <span :class="selectArea == 4?'selectArea':''">
                            {{Town?Town:'请选择'}}
                        </span>
                    </div>
                </section>

                <ul class="addressUl one-top-px">
                    <li class="addList" v-for="(v,k) in info" @click="getProvinceId(v.id, v.name, k)" v-show="showProvince" :class="v.name ==  Province? 'active' : ''" :key="k">
                        {{v.name}}

                    </li>
                    <li class="addList" v-for="(v,k,i) in showCityList" @click="getCityId(v,k,i)" v-show="showCity" :class="v[0]==City ? 'active' : ''" :key="k">
                        {{v[0]}}
                    </li>
                    <li class="addList" v-for="(v,k,i) in showDistrictList" @click="getDistrictId(v, k, i)" v-show="showDistrict" :key="k">

                        <span v-if="levelShow==false" :class="v[0] == District ? 'active' : ''">{{v[0]}}</span>
                        <span v-if="levelShow" :class="v == District ? 'active' : ''">{{v}}</span>

                    </li>

                    <li class="addList" v-for="(v,k) in showTownList" @click="getTownId(v,k)" v-show="showTown" :class="v == Town ? 'active' : ''" :key="k">
                        {{v}}
                    </li>
                </ul>

            </div>

        </div>
    </div>
</template>
<script>

import api from '../../service/api';
export default {
    data() {
        return {
            info: [
                { id: 1, name: '北京市' },
                { id: 2, name: '上海市' },
                { id: 3, name: '天津市' },
                { id: 4, name: '重庆市' },
                { id: 5, name: '河北省' },
                { id: 6, name: '山西省' },
                { id: 7, name: '河南省' },
                { id: 8, name: '辽宁省' },
                { id: 9, name: '吉林省' },
                { id: 10, name: '黑龙江省' },
                { id: 11, name: '内蒙古' },
                { id: 12, name: '江苏省' },
                { id: 13, name: '山东省' },
                { id: 14, name: '安徽省' },
                { id: 15, name: '浙江省' },
                { id: 16, name: '福建省' },
                { id: 17, name: '湖北省' },
                { id: 18, name: '湖南省' },
                { id: 19, name: '广东省' },
                { id: 20, name: '广西自治区' },
                { id: 21, name: '江西省' },
                { id: 22, name: '四川省' },
                { id: 23, name: '海南省' },
                { id: 24, name: '贵州省' },
                { id: 25, name: '云南省' },
                { id: 26, name: '西藏自治区' },
                { id: 27, name: '陕西省' },
                { id: 28, name: '甘肃省' },
                { id: 29, name: '青海省' },
                { id: 30, name: '宁夏省' },
                { id: 31, name: '新疆自治区' },
                { id: 32, name: '台湾' },
                { id: 84, name: '钓鱼岛' },
                { id: 52993, name: '港澳地区' },
                { id: 53283, name: '海外' },
            ],
            addressArray: [],
            addressVal: '',

            showChose: true,
            showProvince: true,  //省(展示)
            showCity: false,   //市(展示)
            showDistrict: false,  //区(展示)
            showTown: false,   //镇(展示)

            showCityList: false,      //市列表
            showDistrictList: false,  //地区列表
            showTownList: false,  //镇列表

            province: 1,              //省份id
            city: 0,             //市id
            district: 0,        //地区id
            town: 0,

            District: false,    //省份name
            Province: false,    //省份name
            City: false,
            Town: false,

            levelShow: false,
            selectArea: 0,
            areaAddress: ''

        };
    },
    mounted() {
    },
    methods: {

        //关闭
        colseFixed() {
            this.showChose = false;
            this.$emit('childShow', this.showChose)
        },
        // 选择城市
        selectCities: function(codeId) {
            let _this = this;
            this.axios(testUrl + api.selectCities, {
                "id": codeId
            }, 'post')
                .then((data) => {
                    if (data.error_code == 0) {
                        var citiecList = []
                        citiecList = data.data.cities;
                        _this.showCityList = citiecList;

                    }
                })
                .catch((err) => {

                    console.log('2222222222222222222')
                })
        },



        //点击省份
        getProvinceId: function(value, key, index) {
            this.province = value;
            this.Province = key;

            this.showProvince = false;
            this.showCity = true;
            this.showDistrict = false;
            this.showTown = false;

            this.selectCities(value);
            this.selectArea = 2;


        },
        //点击市
        getCityId: function(value, key, index) {

            this.city = key;
            this.City = value[0];
            this.selectArea = 3;

            this.showProvince = false;
            this.showCity = false;
            this.showDistrict = true;
            this.showTown = false;

            var disValue = {};
            disValue = value[1];
            for (const key in disValue) {
                let DisType = typeof (disValue[key])
                if (DisType == 'object') {
                    this.levelShow = false;
                } else {
                    this.levelShow = true;

                }
                this.showDistrictList = disValue
                return
            }

        },


        //点击区
        getDistrictId: function(value, key, index) {
            this.selectArea = 4;
            this.district = key;
            if (typeof (value) == 'object') {
                this.District = value[0];

            } else {
                this.District = value;
                // this.District = false;
                this.showChose = false;
                this.$emit('childShow', this.showChose);

                this.areaAddress = this.Province + ' ' + this.City + ' ' + this.District;
                this.$emit('childAddress', this.areaAddress);

                this.areaAddressId = this.province + ',' + this.city + ',' + this.district  + ',0';
                this.$emit('childAddressId', this.areaAddressId);


                return
            }

            this.showProvince = false;
            this.showCity = false;
            this.showDistrict = false;
            this.showTown = true;

            this.showTownList = value[1]
        },

        //点击镇
        getTownId: function(value, key, index) {
            this.town = key;
            this.Town = value;

            // 选取市区选项之后关闭弹层
            this.showChose = false;
            this.$emit('childShow', this.showChose);

            this.areaAddress = this.Province + ' ' + this.City + ' ' + this.District + ' ' + this.Town;
            this.$emit('childAddress', this.areaAddress);

             this.areaAddressId = this.province + ',' + this.city + ',' + this.district+',' + this.town;
                this.$emit('childAddressId', this.areaAddressId);

        },




        provinceSelected: function() {
            this.showProvince = true;
            this.showCity = false;
            this.showDistrict = false;
            this.showTown = false;
            this.selectArea = 1;
        },

        citySelected: function() {
            this.showProvince = false;
            this.showCity = true;
            this.showDistrict = false;
            this.showTown = false;
            this.selectArea = 2;
        },

        districtSelected: function() {
            this.showProvince = false;
            this.showCity = false;
            this.showDistrict = true;
            this.showTown = false;
            this.selectArea = 3;
        },
        townSelected: function() {
            this.showProvince = false;
            this.showCity = false;
            this.showDistrict = false;
            this.showTown = true;

            this.selectArea = 4;
        }
    },
    components: {

    }
};
</script>
<style lang="less">
.addressFixed {
    position: fixed;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 0.26rem;
    color: #000;
    .addressSelect {
        background: #fff;
        bottom: 0;
        position: fixed;
        width: 100%;
        .address-selTitle {
            padding: 0.36rem 0;
            text-align: center;
            font-size: 0.3rem;
            .address-selColse {
                width: 0.3rem;
                height: 0.3rem;
                background-position: -4.85rem -1.52rem;
                position: absolute;
                top: 0.4rem;
                right: 0.26rem;
            }
        }
        .addressUl {
            padding: 0.1rem 0;
            height: 6.25rem;
            overflow: auto;
            li {
                padding: 0.28rem 0 0.28rem 0.26rem;
            }
            li:first-of-type {}
            li:last-of-type {}
            .addressYes {
                width: 0.3rem;
                height: 0.22rem;
                background-position: -5.31rem -1.58rem;
                margin-left: 0.1rem;
            }
        }
        .address-selAlready {
            .address-area {
                display: inline-block;
                margin: 0 0.26rem;
                font-size: 0.3rem;
                padding: 0.26rem 0 0.16rem 0;
                .address-selName {
                    display: inline-block;
                }
                .address-selactive {
                    height: 3px;
                    width: 100%;
                    background: #30ce84;
                    display: inline-block;
                    float: left;
                }
            }
        }
    }
}

.selectArea {
    padding-bottom: 4px;
    border-bottom: 2px solid #30CE84;
}
</style>




