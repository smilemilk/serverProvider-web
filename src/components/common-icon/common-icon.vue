<template>
    <component :is="iconType" :type="iconName" :color="iconColor" :size="iconSize"/>
</template>

<script>
    import Icons from '_c/icon'

    export default {
        name: 'CommonIcon',
        components: {Icons},
        props: {
            type: {
                type: String,
                required: true
            },
            color: String,
            size: Number
        },
        computed: {
            iconType() {
                return this.type.indexOf('_') > -1 ? 'Icons' : 'Icon'
            },
            iconName() {
                return this.iconType === 'Icons' ? this.getCustomIconName(this.type) : this.type
            },
            iconSize() {
                return this.size || (this.iconType === 'Icons' ? 12 : undefined)
            },
            iconColor() {
                return this.color || ''
            }
        },
        methods: {
            getCustomIconName(iconName) {
                return iconName.slice(1)
            }
        }
    }
</script>
