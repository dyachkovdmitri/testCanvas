// var rockResources=mapOf();
var ROCK = 0;
var TREE = 1;
var RIVER = 2;
var GOLD = 4;
var METALL = 5;
var ENEMY = 6;
var GRASS = 8;

var STONE = 10;
var WOOD = 11;
var FOOD = 18;
var WATER = 12;

function addSwag(unit) {
    if (unit.task.swag !== null && unit.task.swag !== undefined) {
        let swag = getObjectById(unit.task.swag);
        if (swag !== null) {
            if (swag.radius > 3) {
                unit.task.now = "takeRes";
                return;
            }
            unit.set('angle', (tact % 72) * 5);
            swag.set('radius', swag.radius + 0.02);
            return swag;
        }
    } else {
        createSwag(unit);
    }
}

function createSwag(unit) {
    var swag = new fabric.Circle({
        left: unit.left,
        top: unit.top - 5,
        id: randomInt(20000, 21000),
        stroke: 'LIGHTSALMON',
        unitType: unit.task.unitType + 10,
        // centeredRotation: true,
        fill: getColor(unit.task.unitType),
        radius: 1,
    });
    lock(swag);
    unit.task.swag = swag.id;
    return swag;
}

function getColor(unitType) {
    switch (unitType) {
        case ROCK:
            return "gray";
        case TREE:
            return "brown";
        case GRASS:
            return "aquamarine";
        case RIVER:
            return "blue";
    }
}

function getNearResource(unit) {
    let res = 1000;
    let result = null;
    canvas.getObjects().forEach(it => {
        if (it.unitType === unit.task.unitType) {
            let dist = getDist(unit.left, unit.top, it.left, it.top);
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

function sumRes(me) {
    if (tact % 20 === 0) {
        let intersected = intersectWith(me);
        if (intersected !== null) {
            // console.log("INTERSECTED", intersected.fill, me.fill);
            if (intersected.id > 19999 && intersected.id < 21001) {
                if (intersected.unitType === me.unitType) {
                    let home = getNearestHome(me);
                    if(getDist(me.left, me.top, home[0],home[1])<me.radius+20){//внутри дома
                    // console.log("SUM", intersected.fill, me.fill)
                        console.log("removed",intersected.id);
                    canvas.remove(intersected);
                    me.set('radius', Math.sqrt((3 * (me.radius) * (me.radius) + 3 * (intersected.radius) * (intersected.radius)) / 3))
                   // me.id=me.unitType+9000;// стало богатсвом
                    return true;}
            } else {
                   // addNear(me);
                }
            }
        }
    }
    return false;
}

function reduceRes(resource) {
    let newR = Math.sqrt((3 * resource.radius * resource.radius - 1) / 3);
    if (newR > 0) {
        resource.set('radius', newR);
    } else {
     //   it.set('angle', 0);
        console.log("removed res",resource.id);
        canvas.remove(resource);
    }
}