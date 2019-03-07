<template>
    <div class="addressFixed" v-if="fixedshow">
        <div class="addressSelect">
            <div>
                <p class="address-selTitle one-bottom-px">
                    <span>配送至</span>
                    <span class="j1Png address-selColse" @click="colseFixed"></span>
                </p>

                <section class=" address-selAlready">
                    <div class="address-area" @click="provinceSelected()">
                        {{Province?Province:info[province-1].name}}
                    </div>
                    <div class="address-area" @click="citySelected()" :class="City?'':'active'">
                        {{City?City:'请选择'}}
                    </div>
                    <div class="address-area" @click="districtSelected()" :class="District?'':'active'" v-show="City">
                        {{District?District:'请选择'}}
                    </div>
                </section>

                <ul class="addressUl one-top-px">
                    <li class="addList" v-for="(v,k) in info" @click="getProvinceId(v.id, v.name, k)" v-show="showProvince" :class="v.selected ? 'active' : ''" :key="k">
                        {{v.name}}

                    </li>
                    <li class="addList" v-for="(v,k) in showCityList" @click="getCityId(v.id, v.name, k)" v-show="showCity" :class="v.selected ? 'active' : ''" :key="k">
                        {{v.name}}
                    </li>
                    <li class="addList" v-for="(v,k) in showDistrictList" @click="getDistrictId(v.id, v.name, k)" v-show="showDistrict" :class="v.selected ? 'active' : ''" :key="k">
                        {{v.name}}
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
            fixedshow: true,
            addressVal: '',

            showChose: true,
            showProvince: true,  //省份是否展示
            showCity: false,
            showDistrict: false,  //市是否展示
            showCityList: false,      //市列表
            showDistrictList: false,  //地区列表
            province: 1,              //省份id
            city: 3,             //市id
            district: 57,        //地区id
            GetProvinceId: 2,
            District: false,    //省份name
            Province: false,    //省份name
            City: false,
            // v-for循环判断是否为当前
            selected: false,
        };
    },
    mounted() {




    },
    methods: {
        // 选择城市
        selectCities: function(codeId) {
            let _this = this;
            this.axios(testUrl + api.selectCities, {
                "id": codeId
            }, 'post')
                .then((data) => {
                
               
                    _this.showCityList = data.data.cities;

// Object.keys(_this.showCityList)

// console.log(Object.getOwnPropertyDescriptors(_this.showCityList))
//                    for (let key in _this.showCityList) {
//     console.log(key)
// }
                

                    if (data.error_code == 0) {

                    } else {

                    }
                })
                .catch((err) => {

                    console.log('2222222222222222222')
                })
        },
        colseFixed() {
            this.fixedshow = false;
        },
        addressSelect(value) {
            this.addressVal = value;
        },



        _filter(add, name, code) {
            let result = [];
            for (let i = 0; i < add.length; i++) {
                if (code == add[i].id) {
                    result = add[i][name];
                }
            }
            return result;
        },
        getProvinceId: function(code, input, index) {

            this.province = code;
            this.Province = input;
            this.showProvince = false;
            this.showCity = true;
            this.showDistrict = false;
            this.selectCities(code);
            this.showCityList = this._filter(this.info, 'city', this.province);

            // 点击选择当前
            this.info.map(a => a.selected = false);
            this.info[index].selected = true;
        },
        provinceSelected: function() {
            console.log(this.info[this.province - 1].name);
            console.log(this.Province);
            console.log(this.info)
            console.log(this.province)

            // 清除市级和区级列表
            this.showCityList = false;
            this.showDistrictList = false;
            // 清除市级和区级选项
            this.City = false;
            this.District = false;
            // 选项页面的切换
            this.showProvince = true;
            this.showCity = false;
            this.showDistrict = false;
        },
        getCityId: function(code, input, index) {
            this.city = code;
            this.City = input;
            this.showProvince = false;
            this.showCity = false;
            this.showDistrict = true;
            this.showDistrictList = this._filter(this.showCityList, 'district', this.city);
            // 选择当前添加active
            this.showCityList.map(a => a.selected = false);
            this.showCityList[index].selected = true;
        },
        citySelected: function() {
            this.showProvince = false;
            this.showCity = true;
            this.showDistrict = false;
        },
        getDistrictId: function(code, input, index) {
            this.district = code;
            this.District = input;
            // 选择当前添加active
            this.showDistrictList.map(a => a.selected = false);
            this.showDistrictList[index].selected = true;
            // 选取市区选项之后关闭弹层
            this.showChose = false;
        },
        districtSelected: function() {
            this.showProvince = false;
            this.showCity = false;
            this.showDistrict = true;
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
</style>




