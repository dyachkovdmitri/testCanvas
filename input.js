(function () {
    var pressedKeys = {};

    function setKey(event, status) {
        var code = event.keyCode;
        var key;

        switch (code) {
            case 32:
                key = 'SPACE';
                break;
            case 37:
                key = 'LEFT';
                break;
            case 38:
                key = 'UP';
                break;
            case 39:
                key = 'RIGHT';
                break;
            case 40:
                key = 'DOWN';
                break;
            default:
                // Convert ASCII codes to letters
                key = String.fromCharCode(code);
        }
        pressedKeys[key] = status;
    }

    document.addEventListener('keydown', function (e) {
        if (e.keyCode === 32) {
            let unit = getObjectById(selectedUnits[0]);
            let base = addUnit(5001, 'white', unit.left, unit.top, 20, true);
            base.set("fill", "white");
            base.set("stroke", "gray");
            base.set("id", 5001);
            base.set('opacity', 0.5);
            base.set("radius", 20);
            homes.push(unit.left, unit.top);
        }
        setKey(e, true);
    });

    document.addEventListener('keyup', function (e) {
        setKey(e, false);
    });

    window.addEventListener('blur', function () {
        pressedKeys = {};
    });

    window.input = {
        isDown: function (key) {
            return pressedKeys[key.toUpperCase()];
        }
    };
})();