<template>
<div class="loadEffectW">
<div class="loadEffect">
        <span></span>
        <span></span>
         <span></span>
        <span></span>
         <span></span>
        <span></span>  
        <!-- <span></span>
        <span></span> -->
</div>
</div>

</template>
<script>
export default {
    data() {
        return {
        }
    },
    methods: {

    },
    mounted() {

    }
}
</script>
<style lang="less">
.loadEffectW{
background: #fff;
}
.loadEffect{
            width: 50px;
            height: 50px;
            position: relative;
            margin: 0 auto;
            margin-bottom:49px;
            
        }
        .loadEffect span{
            display: inline-block;
            width: 15px;
            height: 5px;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            background: #333;
            position: absolute;
            -webkit-animation: load 0.78s ease infinite;
        }
        @-webkit-keyframes load{
            0%{
                opacity: 1;
            }
            100%{
                opacity: 0.2;
            }
        }
        .loadEffect span:nth-child(1){
            left: 0;
            top: 50%;
            margin-top:-5px;
            -webkit-animation-delay:0.13s;
        }
        .loadEffect span:nth-child(2){
            left: 8px;
            top: 5px;
            -webkit-transform: rotate(60deg);
            -webkit-animation-delay:0.26s;
        }
        .loadEffect span:nth-child(3){
            right: 8px;
            top: 5px;
            margin-left: -15px;
            -webkit-transform: rotate(120deg);
            -webkit-animation-delay:0.39s;
        }
        .loadEffect span:nth-child(4){
            top: 20px;
            right:0px;
            -webkit-transform: rotate(180deg);
            -webkit-animation-delay:0.52s;
        }
        .loadEffect span:nth-child(5){
            right: 8px;
            top: 40px;
            margin-top:-5px;
            -webkit-transform: rotate(240deg);
            -webkit-animation-delay:0.65s;
        }
        .loadEffect span:nth-child(6){
            right: 27px;
            top:35px;
            -webkit-transform: rotate(300deg);
            -webkit-animation-delay:0.78s;
        }


</style>

