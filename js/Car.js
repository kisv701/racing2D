/**
 * Created by Kim on 2017-06-10.
 */
function Car(x,y,dir){
    var scl = 2;
    var maxWheelAngle = 60*(PI/180); //Max Angle the wheels can take 70 degrees.
    var maxGasForce = 1; //The force generated by the giving full gas (ie 1=100%).
    this.x = x;
    this.y = y;
    this.vx = 0; //Velocity X
    this.vy = 0; //Velocity Y
    this.ax = 0; //Acceleration X
    this.ay = 0; //Acceleration Y
    this.dir = dir; //Car direction
    this.wa = 0; //Fron wheelangle
    this.speed = 0;
    this.acc = 0;
    

    this.update = function (dt) {
        //Using the classic control theory state-space model where
        // x(t+1) = A*x(t)+B*u(t) where u(t) is the inputs, x(t) is the states, A and B are matrices
        //New position after dt time has elapsed

        this.x += this.vx*dt/1000;      // Divided by 1000 to make it millisecs
        this.y += this.vy*dt/1000;      // Divided by 1000 to make it millisecs

        //New speed after accelerating dt time
        this.vx += this.ax*dt/1000;
        this.vy += this.ay*dt/1000;
        //console.log("(x,y)", "(" + this.x + "," +this.y+")");
        //console.log("(vx,vy)", "(" + this.vx + "," +this.vy+")");
        this.speed = Math.sqrt(this.vx*this.vx + this.vy*this.vy);
        
        //The following handles the physics of the forces
        //Ref: http://www.asawicki.info/Mirror/Car%20Physics%20for%20Games/Car%20Physics%20for%20Games.html

        var m = 1;              //Mass of the the car
        var cDrag = 0.2;        //Some constant for the wind effects (aerodynamic drag)
        var cFric = 5*cDrag;   //Some constant for friction between wheels and road, and other axis stuff

        //Aerodynamic drag force

        var fDragx = cDrag * this.vx * this.speed;     //The drag force in x
        var fDragy = cDrag * this.vy * this.speed;     //The drag force in y

        //Friction force
        var fFricx = cFric * this.vx;
        var fFricy = cFric * this.vy;
        
        //Angle change

        var lengthBetweenAxes = 15*scl;
        var R = lengthBetweenAxes/sin(this.wa);
        var omega = this.speed/R;

        this.dir += omega*dt/1000;
        
        //Engine force
        var fEnginex = this.acc*3000*cos(this.dir);
        var fEnginey = this.acc*3000*sin(this.dir);

        //Total force
        var Fx = fEnginex- fDragx - fFricx;
        var Fy = fEnginey- fDragy - fFricy;

        this.ax = Fx / m;
        this.ay = Fy / m;
        
    };

    this.applyForce = function (steerAngle, gas){
        this.wa = steerAngle*maxWheelAngle;
        this.ax = cos(this.dir)*gas;
        this.ay = sin(this.dir)*gas;
        this.acc = Math.sqrt(this.ax*this.ax + this.ay*this.ay);
    };

    this.show = function () {
        //Draw driver interface

        //Steering indicator
        noFill();
        stroke(255);
        rect(10,10,50,10);
        rect(60,10,50,10);
        noStroke();
        fill(200,30,0);
        if(this.wa > 0){
            rect(60,11, (this.wa/maxWheelAngle)*50 ,8)
        } else {
            rect(60+(this.wa/maxWheelAngle)*50,11, (-this.wa/maxWheelAngle)*50 ,8)
        }
        fill(255);
        text("Speed: "+ this.speed.toFixed(2),10,40);
        text("Acc: "+ (this.acc*100 | 0) + "%",10,60);

        //console.log("(vx,vy)", "(" + this.vx + "," +this.vy+")");

        //Draw the car
        noStroke();
        var w = 8*scl;
        var h = 15*scl;
        var p = Math.floor(scl/2); //Tier padding

        translate(this.x,this.y,0,0);
        rotate(this.dir+PI/2);


        //Draw the body of the car
        fill(0,200,20);
        rect(Math.floor(-w/2),Math.floor(-h/2),w,h);
        fill(200,20,20);
        ellipse(0,-0*scl,2*scl,2*scl);


        //Draw the tiers
        //fill(120,10,120);
        var th = 3*scl; //Tier height
        var tw = scl; //Tier width

        //Back wheels
        fill(0,0,0);
        push();
        translate(Math.floor(-w/2)-tw,Math.floor(h/2)-th,0,0);
        rect(-tw/2,-th/2,tw,th);
        pop();

        push();
        translate(Math.floor(w/2)+tw,Math.floor(h/2)-th,0,0);
        rect(-tw/2,-th/2,tw,th);
        pop();


        //Front wheels
        push();
        translate(Math.floor(-w/2)-tw/2-p,Math.floor(-h/2)+th,0,0);
        rotate(this.wa);
        rect(-tw/2,-th/2,tw,th);
        pop();

        push();
        translate(Math.floor(w/2)+tw/2+p,Math.floor(-h/2)+th,0,0);
        rotate(this.wa);
        rect(-tw/2,-th/2,tw,th);
        pop();

        //console.log("FrontWheel Angle: ", this.wa * 180/PI);


    }
}