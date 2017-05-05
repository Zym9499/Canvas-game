//背景图片加载
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.getElementById("mycanvas").appendChild(canvas);
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function(){
    bgReady = true;
};
bgImage.src = "images/background.png";
//英雄图片加载
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function (){
    heroReady = true;
};
heroImage.src = "images/hero.png";
//怪物图片加载
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function (){
    monsterReady = true;
};
monsterImage.src = "images/monster.png";
//设定英雄怪物对象以便添加属性
var hero = {
    speed:256
};
var monster ={};
var monsterCaught = 0 ;
//监听用户输入
var keysDown = {};
addEventListener("keydown",function(e){//监听按下的键，获取keycode
    keysDown[e.keyCode] = true;
},false);
addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);
//当抓到怪物时重新开始游戏
var reset = function () {
    hero.x = canvas.width/2;
    hero.y = canvas.height/2;
    //将怪物随机到地图上任意地方
    monster.x = 32 + (Math.random()*(canvas.width - 64))
    monster.y = 32 + (Math.random()*(canvas.height - 64))
};
//更新对象
var update = function(modifer) {
    if (38 in keysDown) {   //点了up
        hero.y -= hero.speed * modifer;
    }
    if (40 in keysDown) {   //点了down
        hero.y += hero.speed * modifer;
    }
    if (37 in keysDown) {   //点了left
        hero.x -= hero.speed * modifer;
    }
    if (39 in keysDown) {   //点了right
        hero.x += hero.speed * modifer;
    }
//判断是否到达地图边界
    if(hero.x < 16){
        hero.x = 16;
    }
    if(hero.x > 452){
        hero.x = 452;
    }
    if(hero.y < 16){
        hero.y = 16;
    }
    if(hero.y > 414){
        hero.y = 414;
    }
//判断是否抓到怪物
    if (
        hero.x <= (monster.x + 32)
        && monster.x <= (hero.x + 32)
        && hero.y <= (monster.y + 32)
        && monster.y <= (hero.y + 32)
    ) {
        ++monsterCaught;
        reset();
    }
};


//渲染
var render = function(){
    if(bgReady){
        ctx.drawImage(bgImage,0,0)
    }
    if(heroReady){
        ctx.drawImage(heroImage, hero.x, hero.y)
    }
    if(monsterReady){
        ctx.drawImage(monsterImage, monster.x, monster.y)
    }
    //得分
    ctx.fillStyle = "rgb(250,250,250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline ="top";
    ctx.fillText("Goblins caught:" + monsterCaught,32,32);
};
//游戏循环
var main = function(){
    var now = Date.now();
    var delta = now - then;
    update(delta/1000);
    render();

    then = now;

    requestAnimationFrame(main);
};
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
// 开始游戏
var then = Date.now();
reset();
main();
