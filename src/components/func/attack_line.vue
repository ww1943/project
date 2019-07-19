<template>
    <div class="attackLine" id="test">
        <canvas id="canvas" :width="width" :height="height"></canvas>
    </div>
</template>
<script>
var THREE = require('three');
import auth from '@/js/c_auth.js'
import Line from '@/js/drawline.js'
export default {
    data() {
        return {
            width:0,
            height:0,
            fireworks:[],
            timerTotal:80,
		    timerTick:0,
            particles:[],
            hue:120,
            limiterTotal:5,
            limiterTick:0,
            mx:'',
            my:''
        }
    },
    methods: {
        drawLine(){
            this.width = document.getElementById("test").clientWidth-2;
            this.height = document.getElementById("test").clientHeight-3;
            let canvas = document.getElementById( 'canvas' );
            this.ctx = canvas.getContext( '2d' );
            // setInterval(() => {
                this.loop()
            // },50)
            
        },
        loop() {
            requestAnimFrame( this.loop );
            this.hue += 0.5;
            this.ctx.globalCompositeOperation = 'destination-out';
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect( 0, 0, this.width, this.height );
            this.ctx.globalCompositeOperation = 'lighter';
            
            var i = this.fireworks.length;
            while( i-- ) {
                this.fireworks[ i ].draw();
                this.fireworks[ i ].update( i );
            }
            if( this.timerTick >= this.timerTotal ) {
                if(true) {
                    this.fireworks.push( 
                        new Line( 
                            this.width / 2, 
                            this.height,
                            auth.random.call(this, 0, this.width ), 
                            auth.random.call(this, 0, this.height / 2 ), 
                            this.ctx,
                            this.hue,
                            this.fireworks
                        )
                    );
                    this.timerTick = 0;
                }
            } else {
                this.timerTick++;
            }
        },
    },
    mounted() {
        window.requestAnimFrame = ( function() {
            return window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        function( callback ) {
                            window.setTimeout( callback, 1000 / 60 );
                        };
        })();
        this.drawLine();
    },
}
</script>
