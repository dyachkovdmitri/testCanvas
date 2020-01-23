var canvasContext = {
    destinations: new Map(),
    units: new Map()
};

var canvas;
var selection;
var selectionX;
var selectionY;

function moveTo(id, left, top) {
    canvasContext.destinations.set(id, [left, top, 0, 0]);
    console.log("set new dest ", left, ":", top)
}

function initContext() {
    canvas = new fabric.Canvas('myCanvas');
    canvas.selection = false;
    canvas.on({
            'mouse:dblclick': function (touch) {
                for (var i = 0; i < 200; i++) {
                    moveTo(i, touch.e.x, touch.e.y)
                }
            },
            'mouse:down:before': function (a) {
                //    console.log(a)
            },

            'mouse:down': function (a) {
                addSelection(a.pointer.x, a.pointer.y)
                console.log("mouse:down")
            },
            'mouse:up': function (a) {
                console.log(a.pointer.x, a.pointer.y, selection.width, selection.height);
                canvas.remove(selection);
                selection=undefined;
            },
            'mouse:move': function (a) {
                console.log(selection);
                 if(selection!==undefined){
                     selection.width+=1;
                //     console.log(selection.get('left'));
                //     selection.animate('left', a.pointer.x, { onChange: canvas.renderAll.bind(canvas) });
                // selection.left =  Math.floor(a.pointer.x);
                // selection.top =  Math.floor(a.pointer.y);
                //selection.top = a.pointer.y;

                console.log(selection.left);}

            },


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
            console.log("intersect!");
            unit.left += radius * 2;
        } else break;
    }
    canvas.add(unit);
    canvasContext.units.set(id, unit)
}

function addSelection(left, top) {
    selection = new fabric.Rect({
        left: left,
        top: top,
        opacity:0.2,
        id: 1000,
        width: 100,
        fill:"green",
       // stroke:"black",
       // opacity:0.3,
        //strokeWidth : 1,
        height: 100,
        lockMovementX: true,
        lockMovementY: true,
        lockRotation: true
        // lockScalingY: true,
        // lockScalingX: true
    });
    selection.hasControls = false;
    selectionX=left;
    selectionY=top;
    // rect.on('selected', function () {
    // });
    canvas.add(selection);
}
