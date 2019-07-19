<template>
    <div>
        <div class="backClick" @click="getPosition" @dblclick="getCenter" id="content">
            <img src="../configure/image/maps.png" alt="">
        </div>
        <div id="pointContainer">
            <GetPosition v-if="conf.development" ref="getPosition" @addPoint="addPoint"></GetPosition>
        </div>
    </div>
</template>
<script>
import GetPosition from '@/components/system/getPosition';
import point from '@/configure/image/point/low.png';
export default {
    components:{
        GetPosition
    },
    data() {
        return {
            
        }
    },
    methods: {
        getPosition(e){
            console.log(e)
            if(this.conf.development){
                this.$refs.getPosition.savePosition(e,true)
            }
        },
        getCenter(e){
            if(this.conf.development){
                this.$refs.getPosition.savePosition(e,false)
            }
        },
        addPoint(data){
            let img = document.createElement('img');
            img.src = point;
            img.style.position = 'absolute';
            img.style.top = `${data.y}%`;
            img.style.left = `${data.x}%`;
            img.style.transform = "translate("+(-img.width/2)+"px,"+(-img.height/2)+"px)";
            img.setAttribute('title',`x：${data.x} , y：${data.y}`);
            console.log(img.height)
            document.getElementById("pointContainer").appendChild(img)
        }
    },
}
</script>
<style lang="less" scoped>

</style>
