var workingUnits = new Map();
var ROCK = 0;
var TREE = 1;
var RIVER = 2;
var GOLD = 4;
var METALL = 5;
var ENEMY = 6;
var FRIEND = 7;
var GRASS = 8;


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
    while (true) {
        if (intersectsAll(unit)) {
            unit.left += radius * 2;
        } else break;
    }
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
    if (it.inWork) {
        console.log("WORK ");
        it.set('angle', (tact % 72) * 5);
        if (tact % 2 === 0) {
            let resource = workingUnits.get(it.id);
            rocks++;
            document.getElementById("des2").innerText = rocks;
            let newR = Math.sqrt((3*resource.radius*resource.radius-1)/3);
            if (newR > 0) {
                resource.set('radius', newR);
            } else {
                workingUnits.delete(it.id);
                workingUnits.set(it.id, null);
                it.set('angle',0);
                canvas.remove(resource);
                it.inWork = false
            }
        }
        return
    }
    if (workingUnits.has(it.id)) {
        let resource = workingUnits.get(it.id);

        if (resource === null || resource == undefined) {
            resource = getNearResource(it, ROCK);
            workingUnits.set(it.id, resource);
            moveTo(it.id, resource.left, resource.top);
            it.needRes = ROCK
            //   console.log("res finded", resource.left, resource.top)
        }


        // console.log("WORK ", it.radius, it.left, it.top, resource.radius, resource.left, resource.top);
        // if (intersect(it.radius, it.left, it.top, resource.radius, resource.left, resource.top)) {
        //     //     console.log("BEGIN WORK ");
        //     //     canvasContext.destinations.delete(it.id);
        //     //     it.set('angle', (tact % 72) * 5);//todo normal angle
        //     // }
        //
        //     //else moveTo(it.id, resource.left, resource.top)
        //
        //
        // }
    }
}

function shootUnit(it) {

}

function getNearResource(unit, type) {
    let res = 1000;
    let result = null;
    canvas.getObjects().forEach(it => {
        if (it.unitType === type) {
            let dist = getDist(unit.left, unit.top, it.left, it.top);
            console.log("dist", dist);
            if (dist < res) {
                res = dist;
                result = it;
            }
            if (dist < 10) {
                return result;
            }

        }
    });
    return result;
}

function attackUnit(it) {

}