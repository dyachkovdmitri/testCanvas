var homes = [];

function getNearestHome(it) {
    let max = 10000;
    let res = [it.left+1, it.top+1];
    for (let i = 0; i < homes.length; i=i+2) {
        let tmp = getDist(it.left, it.top, homes[i], homes[i+1]);
        if (tmp < max) {
            res = tmp;
            res = [homes[i], homes[i+1]];
            console.log("find NEAREST HOME", res)
        }
    }

    return res;
}
