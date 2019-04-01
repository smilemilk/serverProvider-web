<template>
    <Spin :fix="fixType" :size="sizeType"></Spin>
</template>

<script>
    export default {
        name: 'warnupSpin',
        props: {
            fixType: {
                type: String,
                required: false,
                default: 'fix'
            },
            sizeType: {
                type: String, // small large
                required: false
            }
        }
    }
</script>
