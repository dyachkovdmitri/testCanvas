var canvasContext = {
    destinations: new Map(),
    units: new Map()
};

var divShow = document.getElementById("des2");

var canvas;
var selection;
var selectionX = 10;
var selectionY = 20;
var selectionField =[0,0,0,0];

function moveTo(id, left, top) {
    canvasContext.destinations.set(id, [left, top, 0, 0]);
 //   console.log("set new dest ", left, ":", top)
}

function initContext() {
    canvas = new fabric.Canvas('myCanvas');
    canvas.selection = false;
    canvas.on({
            'mouse:dblclick': function (touch) {
                addUnit(8000, "red", touch.pointer.x, touch.pointer.y, 1);
               // for (var i = 0; i < 21; i++) {
                    moveTo(21, touch.pointer.x, touch.pointer.y);
                 //   console.log(touch);

            //    }
            },
            'mouse:down:before': function (a) {
                //    console.log(a)
            },

            'mouse:down': function (a) {
              //  canvas.clear();
                //addSelection(a.pointer.x, a.pointer.y, 20, 20)
                //writeSector(300,300,150,a.pointer.x,a.pointer.y,6)
            },
            'mouse:up': function (a) {
                canvas.remove(selection);
                selection = undefined;
                let left;
                let right;
                let top;
                let bottom;
                if(selectionX<a.pointer.x){
                    left = selectionX;
                    right = a.pointer.x
                } else {
                    right = selectionX;
                    left = a.pointer.x
                }
                if(selectionY<a.pointer.y){
                    top = selectionY;
                    bottom = selectionY+a.pointer.y
                } else {
                    bottom = selectionY;
                    top = selectionY+a.pointer.y
                }
                selectionField=[left,top,right,bottom];
               // console.log(selectionField);
            },
            'mouse:move': function (a) {

                if (selection !== undefined) {
                    canvas.remove(selection);
                    let width = a.pointer.x - selectionX;
                    let height = a.pointer.y - selectionY;
                    addSelection(selectionX, selectionY, width, height);
                    document.getElementById("des2").innerText = width;
                   }
            }


        }
    )
    ;
}

function addUnit(id, color, left, top, radius, intersects) {
    var unit = new fabric.Circle({
        left: left,
        top: top,
        id: id,
        lastShoot:tact,
        fill: color,
        radius: radius,
        lockMovementX: true,
        lockMovementY: true,
        lockRotation: true,
        lockScalingY: true,
        lockScalingX: true
    });
    unit.hasControls = false;
    while (true) {
        if (!intersects && intersectsAll(unit)) {

            unit.left += radius * 2;
        } else break;
    }
    canvas.add(unit);
    canvasContext.units.set(id, unit)
}

function addSelection(left, top, width, height) {
  //  console.log("CREATINF SELECTION",  height);
    selection = new fabric.Rect({
        left: left,
        top: top,
        opacity: 0.2,
        id: 1000,
        width: width,
        height: height,
        fill: "green",
    });
    selectionX = left;
    selectionY = top;
    canvas.add(selection);
}
