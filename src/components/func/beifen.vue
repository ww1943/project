<template>
    <div class="lineGroup" id="test">
        <canvas id="canvas" :width="width" :height="height"></canvas>
    </div>
</template>
<script>
var THREE = require('three');
export default {
    data() {
        return {
            width:0,
            height:0,
        }
    },
    methods: {
        drawLine(){
            this.width = document.getElementById("test").clientWidth-2;
            this.height = document.getElementById("test").clientHeight-3;
            let canvas = document.getElementById("canvas");
            let ctx = canvas.getContext("2d");
            // ctx.moveTo(100,100);
            // ctx.lineTo(500,500);
            let d = [{"x":61.302083333333336,"y":36.01651186790505},{"x": 37.864583333333336, "y": 53.86996904024768}];
            let _src = {x:d[0].x/100*this.width,y:d[0].y/100*this.height,z:0};
            let _dst = {x:d[1].x/100*this.width,y:d[1].y/100*this.height,z:0};
            // let _src = {x:864,y:366,z:0};
            // let _dst = {x:1238,y:514,z:0};
            let _center = [
                (_src.x + _dst.x) / 2,
                (_src.y + _dst.y) / 2,
                (_src.z + _dst.z) / 2
            ]
            var curve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(_src.x, _src.y, _src.z),
                new THREE.Vector3(_center[0], _center[1], _center[2]),
                new THREE.Vector3(_dst.x, _dst.y, _dst.z),
            ]);
            let point = curve.getPoints(50);
            let i = 0;
            ctx.moveTo(point[i].x+6,point[i].y+9);
            let loop  = setInterval(()=>{
                if(i == point.length){
                    clearInterval(loop)
                    return;
                }
                ctx.lineTo(point[i].x+6,point[i].y+9);
                ctx.lineWidth = 1;
                ctx.strokeStyle = '#fff';
                ctx.stroke()
                i++;
            },20)
        },
        resize(){
            this.width = document.getElementById("test").clientWidth-2;
            this.height = document.getElementById("test").clientHeight-3;
        }
    },
    mounted() {
        this.drawLine();
        window.addEventListener('resize',this.resize)
    },
}
</script>
