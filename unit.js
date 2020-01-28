
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
    canvasContext.units.set(id, unit);
    return unit;
}

function addWorker(id, color, left, top, radius, intersects) {
    var unit = new fabric.Ellipse({
        left: left,
        top: top,
        id: id,
        lastShoot: tact,
        fill: color,
        radius: radius,
        rx:radius-2,
        ry: radius,
        angle: 0,
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
    canvasContext.units.set(id, unit);
    return unit;
}

function work(unit){
    unit.set('angle',tact);
}


function moveTo(id, left, top) {
    canvasContext.destinations.set(id, [left, top, 0, 0]);
    //   console.log("set new dest ", left, ":", top)
}