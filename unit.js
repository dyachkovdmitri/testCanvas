var workingUnits = new Map();
var ROCK = 0;
var TREE = 1;
var RIVER = 2;
var GOLD = 4;
var METALL = 5;
var ENEMY = 6;
var FRIEND = 7;
var GRASS = 8;
var STONE = 10;
var WOOD = 11;


function addUnit(id, color, left, top, radius, intersects) {
    let type;
    if (color == 'gray') {
        type = ROCK;
    }
    if (color == 'blue') {
        type = RIVER;
    }
    if (color == 'brown') {
        type = TREE;
    }

    var unit = new fabric.Circle({
        left: left,
        top: top,
        id: id,
        lastShoot: tact,
        fill: color,
        originX: 'center',
        originY: 'center',
        radius: radius,
        unitType: type,
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

function addWorker(id, color, left, top, radius) {
    var unit = new fabric.Ellipse({
        left: left,
        top: top,
        id: id,
        lastShoot: tact,
        originX: 'center',
        originY: 'center',
        // centeredRotation: true,
        fill: color,
        radius: radius,
        rx: radius - 2,
        ry: radius,
        angle: 0,
        lockMovementX: true,
        lockMovementY: true,
        lockRotation: true,
        lockScalingY: true,
        lockScalingX: true
    });
    unit.hasControls = false;
    addNear(unit);
    canvas.add(unit);
    canvasContext.units.set(id, unit);
    return unit;
}

function work(unit, resource) {
    workingUnits.set(unit.id, resource);
}

function stopWork(id) {
    workingUnits.delete(id);
}


function moveTo(id, left, top) {
    // getById(id);
    //  it.inWork=false;
    //  it.needRes=null;
    canvasContext.destinations.set(id, [left, top, 0, 0]);
    //   console.log("set new dest ", left, ":", top)
}

function workUnit(it) {
    if (it.inWork === true) {
        //   console.log("WORK ");
        it.set('angle', (tact % 72) * 5);
        if (tact % 2 === 0) {
            let resource = workingUnits.get(it.id);
            // rocks++;
            addProduct(it);

            let newR = Math.sqrt((3 * resource.radius * resource.radius - 1) / 3);
            if (newR > 0) {
                resource.set('radius', newR);
            } else {
                workingUnits.delete(it.id);
                workingUnits.set(it.id, null);
                it.set('angle', 0);
                canvas.remove(resource);
                it.inWork = false
            }
        }
        return
    }
    if (workingUnits.has(it.id)) {
        let resource = workingUnits.get(it.id);
        if (resource === null || resource === undefined) {
            resource = getNearResource(it, ROCK);//todo hardcode ROCK
            if (resource !== null) {
                workingUnits.set(it.id, resource);
                moveTo(it.id, resource.left, resource.top);
                it.needRes = ROCK;
            } else {
                it.needRes == null;
                it.inWork == null;
                workingUnits.delete(it.id);
            }
        }
    }
}

function shootUnit(it) {

}

function attackUnit(it) {

}

function transportUnit(it) {
    console.log(it.purpose);
    if (it.purpose !== undefined && it.purpose !== null && it.purpose.action === "transport") {
        if (it.purpose.now === "takeRes") {
            let product = getObjectById(it.purpose.id);
            if (product !== null) {
                product.set('top', it.top - 4);
                product.set('left', it.left);
                it.set('angle', 90);
                it.purpose.now = "gotoBase";
                moveTo(it.id, 100, 111)
            }
        } else if (it.purpose.now === "gotoBase") {
            let product = getObjectById(it.purpose.id);
            if (product !== null) {
                product.set('top', it.top - 3);
                product.set('left', it.left);
            }
        }
    }
}

function addNear(unit) {
    let n = 2;
    let l = unit.left;
    let t = unit.top;
    while (true) {
        console.log("try", unit.id);
        n++;
        if (intersectsAll(unit)) {
            unit.left = l + n;
            if (intersectsAll(unit)) {
                unit.left = l - n;
                if (intersectsAll(unit)) {
                    unit.left = l;
                    unit.top = t + n;
                    if (intersectsAll(unit)) {
                        unit.top = t - n;
                        if (intersectsAll(unit)) {
                            unit.top = t;
                        }
                    }
                }
            }
        } else break;
    }
}