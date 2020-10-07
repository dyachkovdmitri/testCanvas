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
    if (color == 'aquamarine') {
        type = GRASS;
    }

    var unit = new fabric.Circle({
        left: left,
        top: top,
        id: id,
        task: {},
        lastShoot: tact,
        fill: color,
        radius: radius,
        unitType: type
    });
    lock(unit);
    while (true) {
        if (!intersects && intersectsAll(unit)) {
            unit.left += radius * 2;
        } else break;
    }
    return unit;
}

function lock(unit){
        unit.originX='center';
        unit.originY= 'center';
        unit.lockMovementX= true;
        unit.lockMovementY=true;
        unit.lockRotation=true;
        unit.lockScalingY=true;
        unit.hasControls = false;
        canvas.add(unit);
}

function addWorker(id, color, left, top, radius) {
    var unit = new fabric.Ellipse({
        left: left,
        top: top,
        id: id,
        task: {},
        lastShoot: tact,
        fill: color,
        radius: radius,
        rx: radius - 2,
        ry: radius,
        angle: 0,
    });
    addNear(unit);
    lock(unit);
    return unit;
}

function work(unit, typeResource) {
    unit.set('task', {unitType: typeResource, now: "findRes"});
}

function moveTo(id, left, top) {
    let me = getObjectById(id);
    me.task.left = left;
    me.task.top = top;
    me.task.now = 'goto';
}

function addNear(unit) {
    let n = 2;
    let l = unit.left;
    let t = unit.top;
    while (true) {
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


//docs
