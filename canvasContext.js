var canvasContext = {
    destinations: new Map(),
    units: new Map()
};

var divShow = document.getElementById("des2");

var canvas;


function moveTo(id, left, top) {
    canvasContext.destinations.set(id, [left, top, 0, 0]);
    //   console.log("set new dest ", left, ":", top)
}

function initContext() {
    canvas = new fabric.Canvas('myCanvas');
    canvas.selection = false;
    canvas.on({
            'mouse:dblclick': function (touch) {
                selectedUnits.forEach(it => {
                    moveTo(it, touch.pointer.x, touch.pointer.y);
                });
            },

            'mouse:wheel': function (a) {
                deselect()
            },

            'mouse:down': function (a) {
                addSelection(a.pointer.x, a.pointer.y, 20, 20)
            },

            'mouse:up': function (a) {
                saveSelectionField(a.pointer.x,a.pointer.y);
            },

            'mouse:move': function (a) {
                changeSelection(a.pointer.x,a.pointer.y)
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
        lastShoot: tact,
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


