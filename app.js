const canvas = document.getElementById("jscanvas");
const ctx = canvas.getContext("2d"); // Context는 Pixel을 컨트롤
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "black";
const CANVAS_SIZE = "700";

canvas.width = CANVAS_SIZE; // canvas의 크기를 다시 한번 지정!!!!
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white"; // 이미지 의 기본 배경화면 지정
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR; // 선들의 색상을 지정
ctx.fillStyle = INITIAL_COLOR; // 채움 색상
ctx.lineWidth = 2.5; // 선들의 두깨를 지정

let painting = false;
let filling = false;

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath(); // Path는 선이다 선의 경로를 그린다
    ctx.moveTo(x, y); //
  } else {
    if (filling === false) {
      // filling시 선이 나타나지않음
      ctx.lineTo(x, y); // 선의 시작점부터 끝까지를 이음
      ctx.stroke(); // strokeStyle의 색상으로 선을 채움
    }
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor; // target해서 bgcolor를 color로 불러옴
  console.log(color);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const rag = event.target.value; // input의 value값을 찾아서 rag으로 불러옴
  ctx.lineWidth = rag; // rag값으로 선 두께를 바꿈
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleSaveClick() {
  const img = canvas.toDataURL(); // 이미지의 내용을 url로 변경
  const link = document.createElement("a"); // url태그인 a를 생성
  link.href = img;
  link.download = "bbung_";
  link.click();
}

function handleCM(event) {
  event.preventDefault();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM); //우클릭 방지
}
Array.from(colors).forEach(
  (color) => color.addEventListener("click", handleColorClick) // Array.from(colors)는 colors를 배열로 바꿔줌
); // color는 배열안에 각 객체를 의미함(변경가능), forEach는 Array에서만 사용 가능

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (save) {
  save.addEventListener("click", handleSaveClick);
}
