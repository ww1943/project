<template>
    <div>
        <div class="textGroup">
            <p v-for="(item,index) in conf.text" :key="index" :style="`top:${item.top};left:${item.left};color:${item.color};font-size:${item.fontSize};font-weight:${item.fontWeight};text-shadow:${item.textShadow};`">{{item.title}}</p>
        </div>
        <div class="backClick"  id="content">
            <img src="../configure/image/maps.png" alt="">
        </div>
        <div>
            <!-- <Point></Point> -->
            <StaticTable v-for="(item,index) in conf.bar" :key="index" :datas="item"></StaticTable> 
            <AttackLine></AttackLine>
            <Lines v-for="(item,index) in conf.line" :key="index" :datas="item"></Lines>
        </div>
    </div>
    
</template>
<script>
import Point from '@/components/func/point';
import StaticTable from '@/components/func/static_table';
import AttackLine from '@/components/func/attack_line';
import Lines from '@/components/func/lines';
export default {
    components:{
        Point,StaticTable,AttackLine,Lines
    },
    data() {
        return {
            
        }
    },
    created() {
    },
    methods: {
    },
    mounted() {
    },
}
</script>
