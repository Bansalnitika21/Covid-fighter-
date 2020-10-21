function onLoad()
{
   enemy_img1= new Image();

        enemy_img1.src="virus2.png";
door_img= new Image();
door_img.src= "door.jpg";

player_img= new Image();
player_img.src="player.png";


}
function init() {
    //define objects here
    canvas = document.getElementById("mycanvas");
    console.log(canvas);
     W = 1000;
    H = 500;
    canvas.width = W;
    canvas.height = H;

    game_over = false;
    //create a context
    pen = canvas.getContext('2d');
    console.log(pen);


    e1={
        x:250,
        y:75,
        w:60,
        h:60,
        speed:30,

    };
    e2= {
        x:400,
        y:85,
        w:60,
        h:60,
        speed:50,

    };
    e3={
        x:600,
        y:95,
        w:70,
        h:70,
        speed:40,


    };
    enemy=[e1,e2,e3];

player={
   x:20,
   y:200,
   h:70,
   w:70,
   speed:20,
   moving:false,
   health:100,
};
 door={
   x:W-200,
   y:100,
   h:300,
   w:150,
};
canvas.addEventListener('mousedown', function(){
                        console.log("mouse pressed");

                       player.moving=true;
}
);
canvas.addEventListener('mouseup', function(){
                        console.log("mouse unpressed");

                       player.moving=false;
}
);
}
function isOverLap(rect1,rect2){
if (rect1.x < rect2.x + rect2.w &&
   rect1.x + rect1.w > rect2.x &&
   rect1.y < rect2.y + rect2.h &&
   rect1.y + rect1.h > rect2.y) {
        return true

}
return false;

}
function draw() {

         pen.clearRect(0,0,W,H);
pen.drawImage(player_img,player.x,player.y,player.w,player.h);
pen.drawImage(door_img,door.x,door.y,door.w,door.h);
           for(let i=0; i<enemy.length;i++)
           {

               pen.drawImage( enemy_img1,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
               //pen.fillStyle="blue";
           }
pen.fillStyle="white";
pen.fillText("score"+player.health,10,10);
}
function update()
{
    if(player.moving==true)
    {
        player.x += player.speed;
        player.health +=20;


    }
    for(let i=0;i<enemy.length;i++)
    {
        if(isOverLap(enemy[i],player))
{
    player.health-=50;

if(player.health<0)
{

    console.log(player.health);
    game_over=true;
    alert("game_over" + player.health);


}
}

    }

if(isOverLap(player,door))
{
    alert("you won");
    game_over= true;
return ;
}

    for(let i=0;i<enemy.length;i++)
{
   enemy[i].y += enemy[i].speed;
         if(enemy[i].y>H-enemy[i].h || enemy[i].y<0 )
        {
            enemy[i].speed *= -1;
 }

}


}
function gameLoop(){
    if(game_over==true)
        {
            clearInterval(f);


        }
    draw();
    update();

    console.log("in gameLoop");
}
onLoad();
init();
var f=setInterval(gameLoop,100);
