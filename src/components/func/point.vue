<template>
    <div class="imgGroup"> 
        <img :src="Image.points.low" v-for="(item,index) in conf.position.list[0].list" :key="index" :style="`top:${item.y}%;left:${item.x}%`">
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
}
</script>


