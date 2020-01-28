var canvasContext = {
    destinations: new Map(),
    units: new Map()
};

var divShow = document.getElementById("des2");

var canvas;




function initContext() {
    canvas = new fabric.Canvas('myCanvas');
    canvas.selection = false;
    canvas.on({
            'mouse:dblclick': function (touch) {
                selectedUnits.forEach(it => {
                    moveTo(it, touch.pointer.x, touch.pointer.y);
                });
            },

            'mouse:wheel': function (a) {
                deselect()
            },

            'mouse:down': function (a) {
                addSelection(a.pointer.x, a.pointer.y, 20, 20)
            },

            'mouse:up': function (a) {
                saveSelectionField(a.pointer.x,a.pointer.y);
            },

            'mouse:move': function (a) {
                changeSelection(a.pointer.x,a.pointer.y)
            }


        }
    )
    ;
}



