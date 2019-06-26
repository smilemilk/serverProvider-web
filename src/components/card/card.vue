<template>
    <div class="wm-card-wrapper"
         :class="noShadow ? 'noShadow' : ''"
    >
        <div class="wm-card-title"
             v-if="!notTitle"
             :class="[
                  titleSize === 'large' ? 'large':'',
                  borderBottom ? 'bB1' : ''
             ]"
        >
            <span>{{title}}</span>
            <slot name="title"></slot>
        </div>
        <div class="wm-card-main"
             :class="[
                 bodyPadding === 'false' ? 'plr0 pb0' : '',
                 bodyPaddingBottom === 'false' ? 'pb0' : '',
             ]"
        >
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'WmCard',
        props: {
            title: {
                type: String,
                default: '',
                required: false
            },
            notTitle: {
                type: Boolean,
                default: false,
                required: false
            },
            titleSize: {
                type: String,
                default: '',
                required: false
            },
            bodyPadding: {
                type: String,
                default: '',
                required: false
            },
            bodyPaddingBottom: {
                type: String,
                default: '',
                required: false
            },
            noShadow: {
                type: Boolean,
                default: false,
                required: false

            },
            borderBottom: {
                type: Boolean,
                default: false,
                required: false
            }
        }
    }
</script>

<style lang="less">
    @import "../../styles/themeType";

    .wm-card {
        &-wrapper {
            padding: 0;
            background: @white;
            box-shadow: 0 2px 8px 0 @border;
            border-radius: 4px;
            &.noShadow {
                box-shadow: none;
            }
        }
        &-title {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding-bottom: 0;
            position: relative;
            .font(@font-color, @font-large);
            line-height: 1;
            min-height: 52px;
            padding-left: 26px;
            &>span {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                .font(@font-color, @font-large);
                font-weight: 500;
            }
            &.large {
                min-height: 58px;
            }
            &:before {
                position: absolute;
                top: 50%;
                left: 0;
                transform: translateY(-50%);
                display: inline-block;
                content: '';
                width: 18px;
                padding-right: 18px;
                height: 3px;
                background-color: @main-theme-color;
            }
        }
        &-main {
            padding: 0 12px 12px;
            &.plr0 {
                padding-left: 0;
                padding-right: 0;
            }
            &.pb0 {
                padding-bottom: 0;
            }
        }
    }

    //mixin
    .font (@color, @size) {
        color: @color;
        font-size: @size;
        line-height: 1;
    }

    @media screen and (max-height: 768px) {

    }

</style>
