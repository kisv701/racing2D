/**
 * Created by Kim on 2017-06-08.
 */
var track;
var lastTimeStamp = Date.now();
var deltaT = 10; // 10 ms for each timestep.

//P5.js Main functions
function setup(){
    createCanvas(700,700);
    pixelDensity(1);
    background(51);
    translate(width/2,height/2,0,0);
    track = new Track();
}
function draw(){

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

    //console.log(counter); //Making sure update runs accordingly

}
function mouseClicked() {
    if(track.isOnTrack(mouseX,mouseY)){
        alert("on track");
    }
}

//Project specific functions

//Simulation timestep forward
function update(dt){

}