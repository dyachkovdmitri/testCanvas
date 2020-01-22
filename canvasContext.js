var canvasContext = {
    destinations: new Map(),
    units: new Map()
};

var canvas;

var destination = {
  var x;
  var
}


function moveTo(id, left, top) {
    canvasContext.destinations.set(id, [left-20, top-20]);
    console.log("set new dest ", left, ":", top)
}

function initContext() {
    canvas = new fabric.Canvas('myCanvas');
    canvas.on({
        'mouse:down': function (touch) {
            moveTo(1, touch.e.x, touch.e.y)
        },
        'mouse:down:before':function (a) {
        console.log(a)
        }
    }
)
    ;
}

function addUnit(id, color, left, top,radius) {
    var unit = new fabric.Circle({
        left: left-radius,
        top: top-radius,
        id: id,
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
    canvas.add(unit);
    canvasContext.units.set(id, unit)
}