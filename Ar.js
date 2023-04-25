let [canvas]= document.getElementsByClassName('a-canvas');
let ctx = canvas.getContext("2d");

canvas.addEventListener('click', function (e) {
    let x = e.offsetX;
    let y = e.offsetY;

    ctx.fillStyle="red";
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
})
