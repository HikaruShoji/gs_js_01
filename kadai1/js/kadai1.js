'use strict';
(() => {
const HAND_FORMS = [
  1, // グー
  2, // チョキ
  0  // パー
];
const HAND_X = [
  0,   // グー
  300, // チョキ
  600  // パー
];
const HAND_WIDTH = [
  300, // グー
  300, // チョキ
  300  // パー
];
const IMAGE_PATH = './img/sazaesprite.jpeg';
const FPS = 10;
let isPause = false;
let currentFrame = 0;
function main() {
  const canvas = document.getElementById('screen');
  const context = canvas.getContext('2d');
  const imageObj = new Image();
  currentFrame = 0;
  imageObj.onload = function () {
    function loop() {
      if (!isPause) {
        draw(canvas, context, imageObj, currentFrame++);
      }
      setTimeout(loop, 1000 / FPS);
      }
      loop();
    };
    imageObj.src = IMAGE_PATH;
  }
  function draw(canvas, context, imageObject, frame) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    const handIndex = frame % HAND_FORMS.length;
    const sx = HAND_X[handIndex];
    const swidth = HAND_WIDTH[handIndex];
    context.drawImage(
      imageObject,
      sx,
      0,
      swidth,
      imageObject.height,
      0,
      0,
      swidth,
      canvas.height
    );
  }
  function setButtonAction() {
    const rock = document.getElementById('rock');
    const scissors = document.getElementById('scissors');
    const paper = document.getElementById('paper');
    const restart = document.getElementById('restart');
    function onClick(event) {
      const myHandType = parseInt(event.target.value, 10);
      const enemyHandType = parseInt(currentFrame % HAND_FORMS.length, 10);
      isPause = true;
      judge(myHandType, enemyHandType);
    }
    rock.addEventListener('click', onClick);
    scissors.addEventListener('click', onClick);
    paper.addEventListener('click', onClick);
    restart.addEventListener('click', function () {
      window.location.reload();
    });
  }
  function judge(myHandType, enemyHandType) {
    const result = (myHandType - Math.abs(enemyHandType) + 3) % HAND_FORMS.length;

    if (result === 0) {
      $("#judgment").html('引き分けです!');
    } else if (result === 1) {
      $("#judgment").html('あなたの負けです...また来週！');
    } else {
      $("#judgment").html('あなたの勝ちです!');
    }
  }
  setButtonAction();
  main();
})();