<template>
    <div class="staticPanel" :style="`top:${datas.top};left:${datas.left};background-color:${datas.backgroundColor}`">
        <p>{{datas.title}}</p>
        <div class="barGroup" :style="`width:${datas.width};height:${datas.height};`">
            <img :src="require(`../../configure/image/bar/${datas.backImg}`)" alt="">
            <ul>
                <li v-for="(item,index) in list" :key="index" :style="`height:${height}%;`">
                    <span class="_name" :style="`left:${item.nameLeft}`">{{item.name}}</span>
                    <span class="_value" :style="`left:${item.valueLeft}`">{{item.value}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props:['datas'],
    data() {
        return {
            list:[],
            height:0
        }
    },
    created() {
    },
    methods: {
        getData(){
            this.$get(`${this.$url}${this.datas.ajaxUrl}`).then(res => {
                this.list = res.splice(0,5);
                this.height = 100/this.list.length;
            })
        }
    },
    mounted() {
        this.getData();
    },
    watch: {
    },
}

</script>
