<template>
    <div>
        <h3 class="title-item"
            :class="[
           sizeType === 'small' ? 'title-item-small' : '',
           colorType === 'light' ? 'title-item-light' : '',
           bottomType === 'bottom_0' ? 'margin-bottom-0' : ''
        ]"
            :size="sizeType"
            :color="colorType"
            :bottom="bottomType"
        >
            {{text}}
            <span><slot></slot></span>
        </h3>
    </div>
</template>

<script>
    export default {
        props: {
            text: {
                type: String,
                default: ''
            },
            sizeType: {
                type: String,
                default: ''
            },
            colorType: {
                type: String,
                default: ''
            },
            bottomType: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less" scoped>
    @import "../../styles/common";

    .title-item {
        color: #333;
        font-weight: normal;
        font-size: 18px;
        line-height: 1;
        padding: 0px 10px;
        box-sizing: border-box;
        border-left: 4px solid @main-theme-color;
        margin: 25px 5px 20px;
        &.title-item-small {
            border-left-width: 3px;
            font-size: 14px;
            margin-top: 15px;
            margin-bottom: 10px;
        }
        &.title-item-light {
            color: @font-light;
            border-left-color: @main-theme-blueLighter;
        }
    }

    @media screen and (max-height: 786px) {
        .title-item {
            font-size: 14px;
            margin-top: 15px;
            margin-bottom: 5px;
            margin-left: 5px;
            margin-right: 5px;
            &.title-item-small {
                margin-top: 10px;
                font-size: 12px;
            }
        }
    }
</style>


