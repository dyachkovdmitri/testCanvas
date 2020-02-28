//task:
// left (назначение)
// top (назанчение)
// id (id ресурас, которое надо копать)
// now (что делать сейчас)
// swag (что надо тащить)

function doTask(unit) {
    if (unit.task !== undefined && unit.task != null) {
        switch (unit.task.now) {
            case('stay'):
                checkLazy(unit);
                break;
            case "findRes":
                findAndMine(unit);
                break;
            case "goto":
                moveUnit(unit);
                break;
            case "takeRes":
                takeRes(unit);
                break;
            case "mine":
                mine(unit);
                break;
            case "goWithResource":
                goWithResource(unit);
                break;
        }
    }

    function mine(it) {//уже в работе
        if (it.task.id === undefined || it.task.id === null) {
            findAndMine(it);
            return;
        }
        let resource = getObjectById(it.task.id);
        if (resource == null) {
            findAndMine(it);
            return;
        }
        addSwag(it);
        reduceRes(resource);
    }

    function takeRes(it) {//набрал  готовится взять
        let swag = getObjectById(it.task.swag);
        if (swag !== null) {
            swag.set('top', it.top - 5);
            swag.set('left', it.left);
            it.set('angle', 90);
           // console.log("GOTOBASE");
            it.task.now = "goWithResource";
            let homes = getNearestHome(it);
            it.task.left = homes[0];
            it.task.top = homes[1];
        }
    }
    function checkLazy(it) {
        if (it.task.id!=null){
            let res = getObjectById(it.task.id);
            if(res!==undefined&&res!==null){
            it.task.now='goto';
            it.task.left=res.left;
            it.task.top=res.top;
            it.angle=0;
            it.task.swag=null;}
        }
    }

    function goWithResource(it) {
        if(it.task.swag===null){

        }
        let swag = getObjectById(it.task.swag);
        if (swag !== null) {
            swag.set('top', it.top - 5);
            swag.set('left', it.left);
        } else {
            console.log("ERROR CANT FIND RESOURCE ", it.task);
            it.task.now='findRes';
            it.task.swag=null;
        }
        moveUnit(it);
    }

    function findAndMine(it) {
        resource = getNearResource(it);
        if (resource !== null) {
            moveTo(it.id, resource.left, resource.top);
            it.set('task', {
                left: resource.left,
                id: resource.id,
                top: resource.top,
                //  action: "transport",
                unitType: it.task.unitType,
                now: "goto"
            });
        }
    }
}