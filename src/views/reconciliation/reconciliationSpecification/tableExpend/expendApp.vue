<template>
    <ul>
        <li v-for ="item in rowTemp">
            {{item}}
        </li>
        <!--<p>rowTemp.applicationDetailAmount</p>-->
        <!--<li v-for="item in rowTemp.applicationDetailAmount">-->

        <!--</li>-->
    </ul>
</template>
<script>
    import {directionStatistics, sourceType} from '@/filters/statistics';
    import {parseTime} from '@/filters';
    export default {
        props: {
            rowTemp: {
                type: Array,
                default: []
            }
        },
        filters: {
            formatDirection: (value)=> {
                return directionStatistics(value);
            },
            parseTime: (value) => {
                return parseTime(value);
            },
            sourceType: (value) => {
                return sourceType(value);
            }
        }
    };
</script>
<style scoped>
    li {
        display: inline-block;
    }
</style>
