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
//deprecated
function workUnit(it) {
    if (it.task !== undefined && it.task !== null) {

        if (it.task.now === "mine") {//уже в работе
            it.set('angle', (tact % 72) * 5);
            if (tact % 2 === 0) {
                let resource = getObjectById(it.task.id);
                addProduct(it);
                if (resource == null) {
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

    }
}



function transportUnit(it) {
    if (it.task !== undefined && it.task !== null) {


        // now - goto, takeRes, goWithResource,

        if (it.task.now === "takeRes") {
            //    console.log("TAKERES", it);
            let product = getObjectById(it.task.id);
            if (product !== null) {
                product.set('top', it.top - 5);
                product.set('left', it.left);
                it.set('angle', 90);
                console.log("GOTOBASE");
                it.task.now = "goWithResource";
                let home = getNearestHome(it);
                moveTo(it.id, home[0], home[1])
            }
        } else if (it.task.now === "goWithResource" && (it.task.left === null || it.task.top === undefined)) {
            it.task.now = "goto";
            console.log("GOTO");
            it.angle = 0;
            it.resource = null;
            it.task.unitType = it.task.unitType - 10;
            moveTo(it.id, it.task.left, it.task.top);
        } else if (it.task.now === "goWithResource") {
            let product = getObjectById(it.task.id);
            if (product !== null) {
                product.set('top', it.top - 5);
                product.set('left', it.left);
            }
        } else if (it.task.now === "goto" && (it.task.left === null || it.task.top === undefined)) {//check LAZY units
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
