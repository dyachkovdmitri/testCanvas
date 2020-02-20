

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

function work(unit, typeResource) {
    unit.set('task', {unitType: typeResource, now: "findRes"});
}

function moveTo(id, left, top) {
    canvasContext.destinations.set(id, [left, top, 0, 0]);
}

function workUnit(it) {
    if (it.task !== undefined && it.task !== null) {
        if (it.task.now === "mine") {//уже в работе
            it.set('angle', (tact % 72) * 5);
            if (tact % 2 === 0) {
                let resource = getObjectById(it.task.id);
                addProduct(it);
                if(resource==null){
                    findAndMine(it);
                    return;
                }
                let newR = Math.sqrt((3 * resource.radius * resource.radius - 1) / 3);
                if (newR > 0) {
                    resource.set('radius', newR);
                } else {
                    it.set('angle', 0);
                    canvas.remove(resource);
                }
            }
            return;
        }

        if (it.task.unitType !== null && it.task.unitType !== undefined) {
            findAndMine(it)
        }

}}

function findAndMine(it){
    let resource = getObjectById(it.task.id);
    if (resource === null || resource === undefined) {
        resource = getNearResource(it);
        if (resource !== null) {
            moveTo(it.id, resource.left, resource.top);
            it.set('task', {
                left: resource.left,
                id: resource.id,
                top: resource.top,
                action: "transport",
                unitType: it.task.unitType,
                now: "goto"
            });
        } else {
            console.log("STRANGE PLACE");
            it.task.now = "mine";
        }
    }
}


function shootUnit(it) {

}

function attackUnit(it) {

}

function transportUnit(it) {
    if (it.task !== undefined && it.task !== null && it.task.action === "transport") { // now - goto, takeRes, gotoBase,
        if (it.task.now === "takeRes") {
        //    console.log("TAKERES", it);
            let product = getObjectById(it.task.id);
            if (product !== null) {
                product.set('top', it.top - 5);
                product.set('left', it.left);
                it.set('angle', 90);
                it.task.now = "gotoBase";
                let home = getNearestHome(it);
                moveTo(it.id, home[0], home[1])
            }
        } else if (it.task.now === "gotoBase" && canvasContext.destinations.get(it.id) === undefined) {
            it.task.now = "goto";
            it.angle = 0;
            it.resource = null;
            it.task.unitType = it.task.unitType - 10;
            moveTo(it.id, it.task.left, it.task.top);
        } else if (it.task.now === "gotoBase") {
            let product = getObjectById(it.task.id);
            if (product !== null) {
                product.set('top', it.top - 5);
                product.set('left', it.left);
            }
        } else if (it.task.now === "goto" && canvasContext.destinations.get(it.id) === undefined) {//check LAZY units
           let resource = getNearResource(it);
           it.task.id = resource.id;
           moveTo(it.id, resource.left, resource.top);

        }
    }
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
