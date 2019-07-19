<template>
    <div class="getPosition">
        <input type="text" placeholder="请输入区域名称" v-model="area_item.area_name">
        <button @click="saveArea">保存</button>
        <button @click="getFinish">完成</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            area_data:{
                width:document.getElementById('app').clientWidth,
                height:document.getElementById('app').clientHeight,
                list:[]
            },
            area_item:{
                area_name:'',
                center:'',
                list:[]
            }
        }
    },
    methods:{
        savePosition(e,status){
            let obj = {
                x:e.clientX/this.area_data.width*100,
                y:e.clientY/this.area_data.height*100
            }
            this.$emit('addPoint',obj)
            if(status){
                this.area_item.list.push(obj)
            }else{
                //区域中心点
                this.area_item.center = obj;
            }
        },
        saveArea(){
            if(this.area_item.area_name == ''){
                alert('请输入区域名称')
                return;
            }
            let obj = this.area_item;
            this.area_data.list.push(obj);
            this.area_item = {
                area_name:'',
                center:'',
                list:[]
            }
            alert('保存成功')
        },
        setSize(width,height){
            this.area_data.width = width;
            this.area_data.width = width;
        },
        getFinish(){
            console.log(JSON.stringify(this.area_data))
        }
        
    }
}
</script>
<style lang="less" scoped>
.getPosition{
    position:absolute;
    top:20px;
    left:20px;
    z-index:99;
    >input{
        height: 30px;
        border-radius: 3px;
        outline: none;
        border:none;
        border:1px solid #87d8fb;
        padding-left:15px;
    }
    >button{
        cursor: pointer;
        height: 30px;
        border:none;
        border-radius: 3px;
        padding:0 10px;
        background-color: #87d8fb;
        color:#fff;
    }
}
</style>

