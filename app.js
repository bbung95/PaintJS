const canvas = document.getElementById("jscanvas");
const ctx = canvas.getContext("2d"); // Context는 Pixel을 컨트롤

canvas.width = 700; // canvas의 크기를 다시 한번 지정!!!!
canvas.height = 700;

ctx.strokeStyle = "black"; // 선들의 색상을 지정
ctx.lineWdith = 2.5; // 선들의 두깨를 지정

let painting = false;

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
  console.log(painting);
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  console.log(x, y);
  if (!painting) {
    ctx.beginPath(); // Path는 선이다 선의 경로를 그린다
    ctx.moveTo(x, y); //
  } else {
    ctx.lineTo(x, y); // 선의 시작점부터 끝까지를 이음
    ctx.stroke(); // strokeStyle의 색상으로 선을 채움
  }
}

function onMouseDown(event) {
  painting = true;
  console.log(painting);
}

function onMouseUp(event) {
  stopPainting();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}
