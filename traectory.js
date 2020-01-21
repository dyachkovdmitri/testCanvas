function move(id) {
    getDestination();
    getCoordinates();
    getDirection()
}

function getDestination(id) {
    return canvasContext.destinations.get(id);
}

function getObject(id) {
    var result = null;
    canvas.getObjects().forEach(it => {
        if (it.id == id) return result = id
    });
    return result;
}

function moveDirect(unit, direction){
    unit.left+=dirDic[direction][0];
    unit.top+=dirDic[direction][1];
}

function moveDirect2(id, direction){
    var unit =getObject(id);
    moveDirect(unit, direction);
    var object = intersectAll(unit.radius,unit.left,unit.top);
    if(object!=null){
    }
}

function getLeftDirection(dir){}
function getRightDirection(dir){}




var dirDic={
    0:[0,-1],
    1:[1,-1],
    2:[1,0],
    3:[1,1],
    4:[0,1],
    5:[-1,1],
    6:[-1,0],
    7:[-1,-1]
};
function getDirection(id) {
    if (canvasContext.destinations.get(id) != null) {
        var objectX = it.left;
        var objectY = it.top;
        var destinationX = canvasContext.destinations.get(it.id)[0];
        var destinationY = canvasContext.destinations.get(it.id)[1];
        var left = 0;
        var top = 0;
        if (objectX == destinationX && objectY < destinationY) return 0;
        if (objectX < destinationX && objectY < destinationY) return 1;
        if (objectX < destinationX && objectY == destinationY) return 2;
        if (objectX < destinationX && objectY > destinationY) return 3;
        if (objectX == destinationX && objectY > destinationY) return 4;
        if (objectX > destinationX && objectY > destinationY) return 5;
        if (objectX > destinationX && objectY == destinationY) return 6;
        if (objectX > destinationX && objectY < destinationY) return 7




    }
    return [0, 0]
}

function intersect(r1, x1, y1, r2, x2, y2) {
    if (((x1 + r1 - x2 - r2) * (x1 + r1 - x2 - r2) + (y1 + r1 - y2 - r2) * (y1 + r1 - y2 - r2)) < (r1 + r2) * (r1 + r2)) {
        console.log("INTERSECT")
    }
    return ((x1 + r1 - x2 - r2) * (x1 + r1 - x2 - r2) + (y1 + r1 - y2 - r2) * (y1 + r1 - y2 - r2)) < (r1 + r2) * (r1 + r2)

}

function intersectsAll(r1, x1, y1) {
    var isi = null;
    canvas.getObjects().forEach(it => {
        if (it.id != 1) {
            if (intersect(r1, x1, y1, it.radius, it.left, it.top))
                isi = {left: it.left, top: it.top, radius: it.radius}
        }
    });
    return isi;
}