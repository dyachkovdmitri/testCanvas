// var rockResources=mapOf();

function addProduct(unit) {
    if (unit.resource !== null && unit.resource !== undefined) {
        let res = getObjectById(unit.resource);
        res.set('radius', res.radius + 0.01);
        //console.log(res.radius);
        if (res.radius > 3) {
            unit.resource = null;
            unit.set('task', {
                left: res.left,
                id: res.id,
                top: res.top,
                action: "transport",
                unitType: STONE,
                now: "goto"
            })
            moveTo(unit.id, res.left, res.top);
        }
        document.getElementById("des2").innerText = res.radius.toString().charAt(0);
        return res;
    } else {
        var res = new fabric.Circle({
            left: unit.left,
            top: unit.top,
            id: randomInt(20000, 21000),
            originX: 'center',
            originY: 'center',
            stroke: 'LIGHTSALMON',
            unitType: unit.task.unitType + 10,
            // centeredRotation: true,
            fill: getColor(unit.task.unitType),
            radius: 1,
            lockMovementX: true,
            lockMovementY: true,
            lockRotation: true,
            lockScalingY: true,
            lockScalingX: true
        });
        while (true) {
            if (intersectsAll(unit)) {
                unit.left += radius + 1;
            } else break;
        }
        res.hasControls = false;
        addNear(res);
        unit.resource = res.id;
        canvas.add(res);
        // rockResources.push(res.id, res);
        return res;
    }
}

function getColor(unitType) {
    switch (unitType) {
        case ROCK:
            return "gray";
        case TREE:
            return "brown";
        case GRASS:
            return "green";
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
            if(intersected.id>19999&&intersected.id<21001){
            canvas.remove(intersected);
            me.set('radius',  Math.sqrt((3 * (me.radius) * (me.radius) + 3 * (intersected.radius) * (intersected.radius)   )    / 3))}
        }
    }
}