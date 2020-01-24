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
                addUnit(8000, "blue", touch.pointer.x, touch.pointer.y, 1);
                for (var i = 0; i < 200; i++) {
                    moveTo(i, touch.pointer.x, touch.pointer.y);
                 //   console.log(touch);

                }
            },
            'mouse:down:before': function (a) {
                //    console.log(a)
            },

            'mouse:down': function (a) {
                canvas.clear();
                //addSelection(a.pointer.x, a.pointer.y, 20, 20)
                writeSector(300,300,150,a.pointer.x,a.pointer.y,6)
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
                    // let left;
                    // let right;
                    // let top;
                    // let bottom;
                    // if(width>0){left = selectionX;
                    //     right = selectionX+width
                    // } else {
                    //     right = selectionX;
                    //     left = selectionX+width
                    // }
                    //
                    // if(height>0){top = selectionY;
                    //     bottom = selectionY+top
                    // } else {
                    //     bottom = selectionY;
                    //     top = selectionY+top
                    // }
                    // selectionField=[left,right,top,bottom];
                    // console.log(selectionField);
                    //canvas.renderAll();
                    //     console.log(selection.get('left'));
                    //     selection.animate('left', a.pointer.x, { onChange: canvas.renderAll.bind(canvas) });
                    // selection.left =  Math.floor(a.pointer.x);
                    // selection.top =  Math.floor(a.pointer.y);
                    //selection.top = a.pointer.y;

                    //   console.log(selection.left);} else  console.log("EROOR")

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
        // originX: 'center',
        // originY: 'center',
        fill: color,
        radius: radius,
        lockMovementX: true,
        lockMovementY: true,
        lockRotation: true,
        lockScalingY: true,
        lockScalingX: true
    });
    unit.hasControls = false;
    // rect.on('selected', function () {
    // });
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
        // stroke:"black",
        // opacity:0.3,
        //strokeWidth : 1,
        // lockMovementX: true,
        // lockMovementY: true,
        // lockRotation: true
        // lockScalingY: true,
        // lockScalingX: true
    });
    // selection.hasControls = false;
    selectionX = left;
    selectionY = top;
    // rect.on('selected', function () {
    // });
    canvas.add(selection);
}
