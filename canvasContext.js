var canvasContext={
    destinations:new Map(),
    units:new Map()
};

var canvas;


function moveTo(id, left, top){
canvasContext.destinations.set(id, [left,top]);
console.log("set new dest ", left, ":", top)
}

function initContext(){
    canvas = new fabric.Canvas('myCanvas');
    canvas.on({
        'mouse:dblclick': function (touch) {
            if (canvas.getActiveObject() != null) {

            }

        }

    });
}

function addUnit(id,color,left, top){
    var unit = new fabric.Circle({
        left: left,
        top: 100,
        id:id,
        fill: color,
        radius: 10,
        lockMovementX: true,
        lockMovementY: true,
        lockRotation: true,
        lockScalingY: true,
        lockScalingX: true
    });
    unit.hasControls = false;
    // rect.on('selected', function () {
    // });
    canvas.add(unit);
    canvasContext.units.set(id,unit)
}