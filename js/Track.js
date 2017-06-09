/**
 * Created by Kim on 2017-06-09.
 */
function Track() {


    this.wsin = random(40,80);   //Random weight for one of the sines
    this.wsin2 = random(20,40);  //Random weight for one of the sines
    var n = 1000;               //Number of points
    var aStep = 2*PI/n;         //Angle step

    this.isOnTrack = function(x,y){
        return this.pix[(x+y*width)];
    };

    this.draw = function () {
        //Generate a track

        var a = 0;                  //Starting Angle

        while(a < 2*PI){
            var r = 200+this.wsin*sin(2*a)+this.wsin2*sin(4*a-PI/3);
            var x = Math.floor(r*Math.sin(a));
            var y = Math.floor(r*Math.cos(a));
            a+= aStep;
            noStroke();
            fill(225);
            ellipse(x,y,70,70);
        }


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

    this.draw();
}