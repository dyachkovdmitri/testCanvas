
function move(rect){
  rect.set('left',rect.get('left')+40)
}
var rect;

function startGame(){
    var canvas = new fabric.Canvas('myCanvas');
    rect = new fabric.Circle({
        left: 100,
        top: 100,
        fill: 'red',
        radius: 20,
        height: 20,
        angle: 45
    });
    canvas.add(rect);
    rect.set('top',200);
    rect.set('top',300)
}


function run() {
    console.log(rect.get('left'));
    rect.set('top',200)

}

       