/**
 * Created by Kim on 2017-06-09.
 */
function Track() {

    this.wsin = random(40,80);   //Random weight for one of the sines
    this.wsin2 = random(20,40);  //Random weight for one of the sines
    var n = 1000;               //Number of points
    var aStep = 2*PI/n;         //Angle step

    //Starting y position
    this.sy = function(){
        return height*0.5 | 0;
    };
    //Starting x position
    this.sx = function(){
        console.log("sx: ",200+this.wsin2*sin(-PI/3) | 0);
        return (width*0.5 + 200+this.wsin2*sin(-PI/3) | 0);
    };
    //Starting angle
    this.sa = function () {
        var l = 10*aStep; //length of hop for derivative
        var r = 200+this.wsin*sin(2*l)+this.wsin2*sin(4*l-PI/3);
        var nexty = height*0.5 + Math.floor(r*Math.sin(l));
        var nextx = width*0.5 + Math.floor(r*Math.cos(l));
        return Math.atan2(this.sy()-nexty, this.sx() - nextx);

    };

    this.isOnTrack = function(x,y){
        return this.pix[(x+y*width)];
    };

    this.show = function () {
        //Generate a track
        
        var a = 0;                  //Starting Angle

        while(a < 2*PI){
            var r = 200+this.wsin*sin(2*a)+this.wsin2*sin(4*a-PI/3);
            var y = height*0.5 + Math.floor(r*Math.sin(a));
            var x = width*0.5 + Math.floor(r*Math.cos(a));
            a+= aStep;
            noStroke();
            fill(225);
            ellipse(x,y,70,70);
        }

    };

    this.init = function () {
        this.show();
        var x,y;
        loadPixels();
        this.pix =Array((pixels.length/4 | 0));
        for(y=0;y< height; y++){
            for(x=0; x < width;  x++){
                var i = (x+y*width)*4;
                var R = pixels[i], G = pixels[i+1], B = pixels[i+2], A = pixels[i+3];
                if((R+B+G)/3 > 51){
                    this.pix[(x+y*width)] = 1;
                } else {
                    this.pix[(x+y*width)] = 0;
                }

                pixels[i] = R; pixels[i+1] = G; pixels[i+2] = B; pixels[i+3] = A;
            }
        }
        updatePixels();
    };
}