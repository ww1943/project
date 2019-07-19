import auth from '@/js/c_auth.js'
function Firework( sx, sy, tx, ty ,ctx,hue,fireworks) {
        var _this = this;
        this.hue = hue;
        this.ctx = ctx;
        this.fireworks = fireworks;
        // actual coordinates
        this.x = sx;
        this.y = sy;
        // starting coordinates
        this.sx = sx;
        this.sy = sy;
        // target coordinates
        this.tx = tx;
        this.ty = ty;
        // distance from starting point to target
        this.distanceToTarget = auth.calculateDistance.call(this,sx, sy, tx, ty );
        this.distanceTraveled = 0;
        // track the past coordinates of each firework to create a trail effect, increase the coordinate count to create more prominent trails
        this.coordinates = [];
        this.coordinateCount = 3;
        // populate initial coordinate collection with the current coordinates
        while( this.coordinateCount-- ) {
            this.coordinates.push( [ this.x, this.y ] );
        }
        this.angle = Math.atan2( ty - sy, tx - sx );
        this.speed = 2;
        this.acceleration = 1.05;
        this.brightness = auth.random.call(this, 50, 70 );
        // circle target indicator radius
        this.targetRadius = 1;



        // update firework
        Firework.prototype.update = function( index ) {
            // remove last item in coordinates array
            this.coordinates.pop();
            // add current coordinates to the start of the array
            this.coordinates.unshift( [ this.x, this.y ] );
            
            // cycle the circle target indicator radius
            if( this.targetRadius < 8 ) {
                this.targetRadius += 0.3;
            } else {
                this.targetRadius = 5;
            }
            
            // speed up the firework
            this.speed *= this.acceleration;
            
            // get the current velocities based on angle and speed
            var vx = Math.cos( this.angle ) * this.speed,
                    vy = Math.sin( this.angle ) * this.speed;
            // how far will the firework have traveled with velocities applied?
            this.distanceTraveled = auth.calculateDistance.call(this,_this.sx, _this.sy, this.x + vx, _this.y + vy );
            
            // if the distance traveled, including velocities, is greater than the initial distance to the target, then the target has been reached
            if( this.distanceTraveled >= this.distanceToTarget ) {
                // createParticles( this.tx, this.ty );
                // remove the firework, use the index passed into the update function to determine which to remove
                this.fireworks.splice( index, 1 );
            } else {
                // target not reached, keep traveling
                this.x += vx;
                this.y += vy;
            }
        }

        // draw firework
        Firework.prototype.draw = function() {
            //画线
            this.ctx.beginPath();
            this.ctx.moveTo( this.coordinates[ this.coordinates.length - 1][ 0 ], this.coordinates[ this.coordinates.length - 1][ 1 ] );
            this.ctx.lineTo( this.x, this.y );
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = 'hsl(' + hue + ', 100%, ' + this.brightness + '%)';
            this.ctx.stroke();
            //circle动效
            this.ctx.beginPath();
            this.ctx.arc( this.tx, this.ty, this.targetRadius, 0, Math.PI * 2 );
            this.ctx.stroke();
        }
}


export default Firework