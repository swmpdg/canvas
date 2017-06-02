// const canvas = document.getElementById("canvas") as HTMLCanvasElement;
//
// interface Point2D {
//   x: number;
//   y: number;
// }
//
// interface Mask {
//   d: ImageData;
//   x: number;
//   y: number;
// }
//
// const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
// const c = { w: canvas.width, h: canvas.height };
// const m = { x: 0, y: 0, l: false };
// let om: Point2D;
//
// ctx.fillStyle = "#818479";
// ctx.fillRect(0, 0, c.w, c.h);
//
// function getRandomInt(min: number, max: number) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }
//
// const masks = [] as Mask[];
// function mask(x: number, y: number, w: number, h: number) {
//   const msk = {
//     d: ctx.createImageData(w, h),
//     x: x,
//     y: y
//   } as Mask;
//   for (let i = 0, l = msk.d.data.length; i < l; ++i)
//     msk.d.data[i] = (i + 1) % 4 == 0 ? 255 : 0;
//   masks.push(msk);
// }
//
// function linearSpray(r: number, p1: Point2D, p2: Point2D) {
//   //var d = Math.ceil(Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)));
//   window.setTimeout(function () {
//     const d = {
//       x: Math.ceil(Math.sqrt(Math.pow(p1.x - p2.x, 2))),
//       y: Math.ceil(Math.sqrt(Math.pow(p1.y - p2.y, 2)))
//     };
//     for (let x = 0; x <= d.x; x += r) {
//       let x2 = x;
//       if (p1.x < p2.x)
//         x2 += p1.x;
//       else
//         x2 += p2.x;
//       let t = {
//         x: x2,
//         y: Math.ceil(p1.y + (x2 - p1.x) * (p2.y - p1.y)/(p2.x - p1.x))
//       };
//       spray(r, t, 2);
//     }
//     for (let y = 0; y <= d.y; y += r) {
//       let y2 = y;
//       if (p1.y < p2.y)
//         y2 += p1.y;
//       else
//         y2 += p2.y;
//       let t = {
//         x: Math.ceil(p1.x + (y2 - p1.y) * (p2.x - p1.x)/(p2.y - p1.y)),
//         y: y2
//       };
//       // p1.y + (x2 - p1.x) * (p2.y - p1.y)/(p2.x - p1.x)
//       spray(r, t, 2);
//     }
//   }, 10);
// }
//
// function spray(r: number, p: Point2D, o: number) {
//   const f = 1 / r;
//   for (let x = -r; x <= r; ++x) {
//     for (let y = -r; y <= r; ++y) {
//       let d = Math.sqrt(x * x + y * y);
//       if (d > r)
//         continue;
//       ctx.fillStyle = 'rgba(211, 0, 0,' + (1 - d * f) / o + ')';
//       ctx.beginPath();
//       ctx.arc(p.x - 7 - x, p.y - 6 - y, 1, 0, 2 * Math.PI);
//       ctx.fill();
//     }
//   }
// }
//
// function render() {
//
//   if (m.l) {
//     spray(20, m, 4);
//
//     if (om) {
//       linearSpray(20, {
//         x: om.x,
//         y: om.y
//       }, {
//         x: m.x,
//         y: m.y
//       });
//     } else
//       om = { x: 0, y: 0 } as Point2D;
//
//     om.x = m.x;
//     om.y = m.y;
//   }
//
//   for (var i = 0, l = masks.length; i < l; ++i) {
//     var msk = masks[i];
//     ctx.putImageData(msk.d, msk.x, msk.y);
//   }
//
//   requestAnimationFrame(render);
// }
//
// canvas.onmousemove = function (e: MouseEvent) {
//   m.x = e.clientX;
//   m.y = e.clientY;
// };
//
// canvas.onmousedown = function (e: MouseEvent) {
//   if (e.button == 0)
//     m.l = true;
// };
//
// canvas.onmouseup = function (e: MouseEvent) {
//   if (e.button == 0) {
//     m.l = false;
//     om = null;
//   }
// };
//
// canvas.onmouseleave = function (e: MouseEvent) {
//   m.l = false;
//   om = null;
// };
//
// mask(100, 100, 400, 300);
// mask(550, 100, 100, 300);
//
// requestAnimationFrame(render);