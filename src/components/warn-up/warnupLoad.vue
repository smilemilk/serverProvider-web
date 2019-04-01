<template>
    <Spin :fix="fixType"
          :size="sizeType"
          :class="[
            sizeType === 'small' ? iconSize=16 :
            sizeType === 'normal' ? iconSize=18 :
            sizeType === 'large' ? iconSize=20 : ''
          ]"
    >
        <common-icons
                :type="iconType"
                :size="iconSize"
                class="spin-icon-load"></common-icons>
    </Spin>
</template>

<script>
    import CommonIcons from '_c/common-icon/index.js';

    export default {
        name: 'warnupLoad',
        components: {
            CommonIcons
        },
        props: {
            fixType: {
                type: String,
                required: false,
                default: 'fix'
            },
            sizeType: {
                type: String, // small large
                required: false,
                default: 'small'
            },
            iconSize: {
                type: Number, // 数字
                required: false,
                default: 16
            },
            iconType: {
                type: String,
                required: false,
                default: '_load-normal'
            }
        }
    }
</script>

<style lang="css">
    /*@import "../../styles/common";*/
    .spin-icon-load{
        display: inline-block;
        -webkit-transition-property: -webkit-transform;
        -webkit-transition-duration: 1s;
        -moz-transition-property: -moz-transform;
        -moz-transition-duration: 1s;
        -webkit-animation: rotate 1s linear infinite;
        -moz-animation: rotate 1s linear infinite;
        -o-animation: rotate 1s linear infinite;
        animation: rotate 1s linear infinite;
        color: #2d8cf0 !important;
    }
    @-webkit-keyframes rotate{from{-webkit-transform: rotate(0deg)}
        to{-webkit-transform: rotate(360deg)}
    }
    @keyframes rotate{from{-webkit-transform: rotate(0deg)}
        to{-webkit-transform: rotate(360deg)}
    }
</style>
