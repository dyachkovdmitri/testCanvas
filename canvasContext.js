var canvasContext = {
    destinations: new Map(),
    units: new Map()
};
var canvas;

function getObjectById(id) {
    let res = null;
    canvas.getObjects().forEach(it => {
        if (it.id === id) {
            //  console.log("res finded;", it);
            res = it;
            return;
        }

    });
    return res;
}


function initContext() {
    canvas = new fabric.Canvas('myCanvas');
    canvas.selection = false;
    canvas.on({
            'mouse:dblclick': function (touch) {
                selectedUnits.forEach(id => {
                    let it = getObjectById(id);
                    it.task = null;
                    it.set('angle', 0);
                    makePurpose(it, touch.pointer.x, touch.pointer.y);
                    moveTo(id, touch.pointer.x, touch.pointer.y);

                });
            },

            'mouse:wheel': function (a) {
                deselect();
            },

            'mouse:down': function (a) {
                addSelection(a.pointer.x, a.pointer.y, 20, 20)
            },

            'mouse:up': function (a) {
                saveSelectionField(a.pointer.x, a.pointer.y);
            },

            'mouse:move': function (a) {
                changeSelection(a.pointer.x, a.pointer.y)
            }
        }
    );

    function makePurpose(unit, left, top) {
        unit.task=null;
        let point = {id: 9999, left: left, top: top, radius: 1};
        let intersected = intersectWith(point);
        if (intersected !== null) {
            if (intersected.unitType === ROCK) {
             unit.set('task', {left:intersected.left, id:intersected.id, top:intersected.top, action:"transport", unitType:ROCK, now: "goto"});
            }

            if (intersected.unitType === STONE) {
                //unit.set('needRes', STONE);
                unit.set('task', {left:intersected.left, id:intersected.id, top:intersected.top, action:"transport", unitType:STONE, now: "goto"})
            }
        }
    }
}


