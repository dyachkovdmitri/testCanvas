// var rockResources=mapOf();

function addProduct(unit) {

    if (unit.resource !== null && unit.resource !== undefined) {
        let res = getObjectById(unit.resource);
        res.set('radius', res.radius + 0.01);
        //console.log(res.radius);
        if(res.radius>7){
            unit.resource=null;
            workingUnits.delete(unit.id);
            unit.inWork = false;
            unit.set('needRes', STONE);
            unit.set('purpose', {left:res.left, id:res.id, top:res.top, action:"transport", unitType:STONE, now: "goto"})
            moveTo(unit.id, res.left, res.top);
        }
        document.getElementById("des2").innerText = res.radius;
        return res;
    } else {
        var res = new fabric.Circle({
            left: unit.left,
            top: unit.top,
            id: randomInt(20000, 21000),
            originX: 'center',
            originY: 'center',
            stroke: 'LIGHTSALMON',
            unitType: unit.needRes+10,
            // centeredRotation: true,
            fill: getColor(unit.needRes),
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