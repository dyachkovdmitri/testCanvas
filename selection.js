var selectedUnits = [];
var selection;
var selectionX = 10;
var selectionY = 20;
var selectionField = [0, 0, 0, 0];

function select(it) {
    if (selectionField[0] !== 0 && selectionField[1] !== 0) {
        if (it.left > selectionField[0] && it.left < selectionField[2] && it.top > selectionField[1] && it.top < selectionField[3]) {
            it.set('stroke', 'red');
            selectedUnits.push(it.id)
        }
    }
}

function deselect() {
    canvas.getObjects().forEach(it => {
        if (selectedUnits.includes(it.id)) {
            it.set('stroke', "green");
            //todo break;
        }
    });
    selectedUnits = [];
}

function addSelection(left, top, width, height) {
    //  console.log("CREATINF SELECTION",  height);
    selection = new fabric.Rect({
        left: left,
        top: top,
        opacity: 0.2,
        id: 1000,
        width: width,
        height: height,
        fill: "green",
    });
    selectionX = left;
    selectionY = top;
    canvas.add(selection);
}

function changeSelection(x, y) {
    if (selection !== undefined) {
        canvas.remove(selection);
        let width = x - selectionX;
        let height = y - selectionY;
        addSelection(selectionX, selectionY, width, height);

    }
}

function saveSelectionField(x, y) {
    //console.log("UP");
    canvas.remove(selection);
    selection = undefined;
    let left;
    let right;
    let top;
    let bottom;
    if (selectionX < x) {
        left = selectionX;
        right = x
    } else {
        right = selectionX;
        left = x
    }
    if (selectionY < y) {
        top = selectionY;
        bottom = selectionY + y
    } else {
        bottom = selectionY;
        top = selectionY + y
    }
    selectionField = [left, top, right, bottom];
}