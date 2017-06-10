/**
 * Created by Kim on 2017-06-08.
 */
var track;
var lastTimeStamp = Date.now();
var deltaT = 10; // 10 ms for each timestep.
var car;
var dwAngl = 0; //Drive wheel angle
var gasPedal = 0; //Gas pedal level (can go to -1 for reverse)
var forwadPressed = false;  //Keep track of which keys are pressed, drive with WASD
var backwardPressed = false;
var leftPressed = false;
var rightPressed = false;

//P5.js Main functions
function setup(){
    createCanvas(700,700);
    pixelDensity(1);
    background(51);
    track = new Track();
    track.init();
    var carx = track.sx();
    var cary = track.sy();
    car = new Car(carx,cary,track.sa());
}
function draw(){

    handleInputs();
    car.applyForce(dwAngl,-gasPedal);
    background(51);
    track.show();
    //Initialize a timedebt that the simulation much run through to catch up to the actual time.
    //I want constant timesteps so therefore a dt is used. Makes for better simulation
    var currentTime = Date.now();
    var timeDebt = currentTime-lastTimeStamp;
    var counter = 0;
    while(timeDebt > 0){
        update(deltaT);
        timeDebt = timeDebt - deltaT;
        counter++;
    }
    lastTimeStamp = currentTime;
    car.show();
    //console.log(counter); //Making sure update runs accordingly

}
function mouseClicked() {
    if(track.isOnTrack(mouseX,mouseY)){
        //alert("on track");
        console.log("Hit","X:" + mouseX +  ", Y:" + mouseY);
    } else {
        console.log("Miss","X:" + mouseX +  ", Y:" + mouseY);
    }
}

function keyPressed(){
    switch (keyCode) {
        case 87:    //w
            forwadPressed =true;
            break;
        case 83:    //s
            backwardPressed =true;
            break;
        case 65:    //a
            leftPressed = true;
            break;
        case 68:    //d
            rightPressed = true;
            break;
    }
}

function keyReleased() {
    switch (keyCode) {
        case 87:    //w
            forwadPressed =false;
            gasPedal=0;
            break;
        case 83:    //s
            backwardPressed =false;
            gasPedal=0;
            break;
        case 65:    //a
            leftPressed = false;
            dwAngl=0;
            break;
        case 68:    //d
            rightPressed = false;
            dwAngl=0;
            break;
    }
}

//Project specific functions

function handleInputs() {
    if(forwadPressed){
        gasPedal += 0.2;
        gasPedal = (gasPedal > 1) ? 1:gasPedal;
    }
    if(backwardPressed){
        gasPedal -= 0.2;
        gasPedal = (gasPedal < -1) ? -1:gasPedal;
    }
    if(leftPressed){
        dwAngl -= 0.2;
        dwAngl = (dwAngl < -1) ? -1:dwAngl;
    }
    if(rightPressed){
        dwAngl += 0.2;
        dwAngl = (dwAngl > 1) ? 1:dwAngl;
    }
}
//Simulation timestep forward
function update(dt){
    //Project specific functions
    car.update(dt);

}