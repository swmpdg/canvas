var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var c = { w: canvas.width, h: canvas.height };
var m = { x: 0, y: 0, l: false };
var om;
ctx.fillStyle = "#818479";
ctx.fillRect(0, 0, c.w, c.h);
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var masks = [];
function mask(x, y, w, h) {
    var msk = {
        d: ctx.createImageData(w, h),
        x: x,
        y: y
    };
    for (var i = 0, l = msk.d.data.length; i < l; ++i)
        msk.d.data[i] = (i + 1) % 4 == 0 ? 255 : 0;
    masks.push(msk);
}
function linearSpray(r, p1, p2) {
    //var d = Math.ceil(Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)));
    window.setTimeout(function () {
        var d = {
            x: Math.ceil(Math.sqrt(Math.pow(p1.x - p2.x, 2))),
            y: Math.ceil(Math.sqrt(Math.pow(p1.y - p2.y, 2)))
        };
        for (var x = 0; x <= d.x; x += r) {
            var x2 = x;
            if (p1.x < p2.x)
                x2 += p1.x;
            else
                x2 += p2.x;
            var t = {
                x: x2,
                y: Math.ceil(p1.y + (x2 - p1.x) * (p2.y - p1.y) / (p2.x - p1.x))
            };
            spray(r, t, 2);
        }
        for (var y = 0; y <= d.y; y += r) {
            var y2 = y;
            if (p1.y < p2.y)
                y2 += p1.y;
            else
                y2 += p2.y;
            var t = {
                x: Math.ceil(p1.x + (y2 - p1.y) * (p2.x - p1.x) / (p2.y - p1.y)),
                y: y2
            };
            // p1.y + (x2 - p1.x) * (p2.y - p1.y)/(p2.x - p1.x)
            spray(r, t, 2);
        }
    }, 10);
}
function spray(r, p, o) {
    var f = 1 / r;
    for (var x = -r; x <= r; ++x) {
        for (var y = -r; y <= r; ++y) {
            var d = Math.sqrt(x * x + y * y);
            if (d > r)
                continue;
            ctx.fillStyle = 'rgba(211, 0, 0,' + (1 - d * f) / o + ')';
            ctx.beginPath();
            ctx.arc(p.x - 7 - x, p.y - 6 - y, 1, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
}
function render() {
    if (m.l) {
        spray(20, m, 4);
        if (om) {
            linearSpray(20, {
                x: om.x,
                y: om.y
            }, {
                x: m.x,
                y: m.y
            });
        }
        else
            om = { x: 0, y: 0 };
        om.x = m.x;
        om.y = m.y;
    }
    for (var i = 0, l = masks.length; i < l; ++i) {
        var msk = masks[i];
        ctx.putImageData(msk.d, msk.x, msk.y);
    }
    requestAnimationFrame(render);
}
canvas.onmousemove = function (e) {
    m.x = e.clientX;
    m.y = e.clientY;
};
canvas.onmousedown = function (e) {
    if (e.button == 0)
        m.l = true;
};
canvas.onmouseup = function (e) {
    if (e.button == 0) {
        m.l = false;
        om = null;
    }
};
canvas.onmouseleave = function (e) {
    m.l = false;
    om = null;
};
mask(100, 100, 400, 300);
mask(550, 100, 100, 300);
requestAnimationFrame(render);
