function writeCircle(xc, yc, r, sinus, righter, rp) {

    for (var y = yc - r; y < yc + r; y = y + 7) {
        x = Math.sqrt(r * r - (y - yc) * (y - yc)) + xc;
        let x2 = -Math.sqrt(r * r - (y - yc) * (y - yc)) + xc;

        if (Math.abs(sinus - sin(xc, yc, x, y)) < 0.3) {
            if (righter) {
                laser(xc, yc, x, y, rp);
            } else {
                laser(xc, yc, x2, y, rp);
            }
        }
    }
}

function sin(xc, yc, x1, y1) {
    return (yc - y1) / Math.sqrt((xc - x1) * (xc - x1) + (yc - y1) * (yc - y1));
}

function writeSector(xc, yc, r, x1, y1, rp) {
    console.log("SINUS ", sin(xc, yc, x1, y1));
    addUnit(900, "brown", xc, yc, 4);
    addUnit(900, "blue", x1, y1, rp);
    writeCircle(xc, yc, r, sin(xc, yc, x1, y1), x1 > xc, rp);
}


function addLaser(left, top) {
    var unit = new fabric.Circle({
        left: left,
        top: top,
        id: 890,
        // originX: 'center',
        // originY: 'center',
        fill: 'red',
        radius: 1,
        lockMovementX: true,
        lockMovementY: true,
        lockRotation: true,
        lockScalingY: true,
        lockScalingX: true
    });
    unit.hasControls = false;
    // rect.on('selected', function () {
    // });
    canvas.add(unit);
    return intersectsAll(unit);
}


function laser(x1, y1, x2, y2) {
    let self = true;
    let n = (y2 - y1) / (x2 - x1);
    for (var i = 0; i < x2 - x1; i = i + 3) {
        if (addLaser(x1 + i+2, y1+2+ n * i,)) {
          if(self){console.log("SELF");continue}
            console.log("SHOOTED");
            break;
        }else{self = false}
    }
}


// var laser = new fabric.Line([x1, y1, x2, y2], {
//     stroke: 'red',
//     lockMovementX: true,
//     lockMovementY: true,
//     lockRotation: true,
//     lockScalingY: true,
//     lockScalingX: true
// });
// laser.hasControls = false;
// canvas.add(laser);
// canvasContext.units.set(id, laser)


