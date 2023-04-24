let scores = 0;
let cross = true;
let tryagain = document.querySelector(".button");
let levelUPEnemy = document.querySelector(".levelUpenemy");
let gameContainer = document.querySelector(".gamecontainer");
// all audio's call here
bg = new Audio("music.mp3");
jmp = new Audio("jump.mp3");
over = new Audio("gameover.mp3");
congratsAudio = new Audio("congrats.mp3");
let val = localStorage.getItem("lastscore");
// start game
let score = document.querySelector(".score");
let startBtn = document.querySelector(".startBtn");
startBtn.addEventListener("click", () => {
  enemy.classList.add("enemymove");
  levelUPEnemy.classList.add("enemymove");

  setTimeout(() => {
    bg.play();
    startBtn.style.display = "none";
    score.style.display = "block";
    lscore.style.display = "block";

    if (val == null) {
      lastplay = document.createTextNode("0");
    } else {
      lastplay = document.createTextNode("High Score: " + val);
    }
    console.log(lastplay);
    document.getElementById("lscore").appendChild(lastplay);
  }, 100);
});

// movements set
document.onkeydown = function (e) {
  //man jump using up arrow key
  if (e.keyCode == 38) {
    man = document.querySelector(".man");
    man.classList.add("manjump");
    jmp.play();
    setTimeout(() => {
      man.classList.remove("manjump");
      jmp.pause();
    }, 600);
  }
  //man move front using forword arrow key
  if (e.keyCode == 39) {
    man = document.querySelector(".man");
    front = parseInt(
      window.getComputedStyle(man, null).getPropertyValue("left")
    );
    man.style.left = front + 40 + "px";
  }
  //man move back using backword arrow key
  if (e.keyCode == 37) {
    man = document.querySelector(".man");
    front = parseInt(
      window.getComputedStyle(man, null).getPropertyValue("left")
    );
    man.style.left = front - 40 + "px";
  }
  if (e.keyCode == 13) {
    location.reload();
    startBtn.style.display = "none";
    enemy.classList.add("enemymove");
    levelUPEnemy.classList.add("enemymove");
  }
};

// main game logic start here
setInterval(() => {
  man = document.querySelector(".man");
  enemy = document.querySelector(".enemy");
  gameover = document.querySelector(".gameover");
  congrats = document.querySelector(".hidden");
  congratsTxt = document.querySelector(".highScoreTxt");

  // check current position of man and enemy
  mx = parseInt(window.getComputedStyle(man, null).getPropertyValue("left"));
  my = parseInt(window.getComputedStyle(man, null).getPropertyValue("bottom"));

  ex = parseInt(window.getComputedStyle(enemy, null).getPropertyValue("left"));
  ey = parseInt(
    window.getComputedStyle(enemy, null).getPropertyValue("bottom")
  );

  // findout distance b/w us
  checkx = Math.abs(mx - ex);
  checky = Math.abs(my - ey);

  // if position is same then ...gameover
  if (checkx < 20 && checky < 10) {
    gameover.style.visibility = "visible";
    enemy.classList.remove("enemymove");
    levelUPEnemy.classList.remove("enemymove");
    over.play();
    bg.pause();
    setTimeout(() => {
      if (val < scores) {
        congrats.style.visibility = "visible";
        congratsTxt.style.display = "block";
        congratsAudio.play();
        over.pause();
        checkscore = localStorage.setItem("lastscore", scores);
      }
    }, 10);
    setTimeout(() => {
      over.pause();
      tryagain.style.display = "block";
    }, 2000);
  }

  // update score
  else if (checkx < 20 && cross) {
    scores += 100;
    // cross set as false becuse score update continusly after 1s cross true
    cross = false;
    scoreupdate(scores);
    setTimeout(() => {
      cross = true;
    }, 1000);

    // after the score update animation duration decrised
    setTimeout(() => {
      Anidur = parseFloat(
        window
          .getComputedStyle(enemy, null)
          .getPropertyValue("animation-duration")
      );
      if (Anidur > 3) {
        newdur = Anidur - 0.1;
        enemy.style.animationDuration = newdur + "s";
      }

      // animation duration less than 3s then Level up the game
      else {
        let levelUP = document.querySelector(".levelUp");

        levelUP.style.display = "block";
        gameContainer.style.background = "rgb(15, 13, 13)";
        levelUPEnemy.style.display = "block";
        setInterval(() => {
          man = document.querySelector(".man");
          enemy = document.querySelector(".enemy");
          gameover = document.querySelector(".gameover");
          mx = parseInt(
            window.getComputedStyle(man, null).getPropertyValue("left")
          );
          my = parseInt(
            window.getComputedStyle(man, null).getPropertyValue("bottom")
          );

          lex = parseInt(
            window.getComputedStyle(levelUPEnemy, null).getPropertyValue("left")
          );
          ley = parseInt(
            window
              .getComputedStyle(levelUPEnemy, null)
              .getPropertyValue("bottom")
          );

          checklx = Math.abs(mx - lex);
          checkly = Math.abs(my - ley);
          console.log(checklx, checkly);

          if (checklx < 20 && checkly < 10) {
            gameover.style.visibility = "visible";
            enemy.classList.remove("enemymove");
            levelUPEnemy.classList.remove("enemymove");
            over.play();
            bg.pause();
            setTimeout(() => {
              if (val < scores) {
                congrats.style.visibility = "visible";
                congratsTxt.style.display = "block";
                congratsAudio.play();
                over.pause();
                checkscore = localStorage.setItem("lastscore", scores);
                console.log(val, scores, checkscore);
              }
            }, 10);
            setTimeout(() => {
              over.pause();
              tryagain.style.display = "block";
            }, 2000);
          }
        }, 10);
        setTimeout(() => {
          levelUP.style.display = "none";
        }, 2000);
      }
    }, 500);
  }
}, 10);
function scoreupdate(scores) {
  let score = document.querySelector(".score");
  score.innerHTML = "Your Score: " + scores;
}

tryagain.addEventListener("click", () => {
  location.reload();
  startBtn.style.display = "none";
  enemy.classList.add("enemymove");
  levelUPEnemy.classList.add("enemymove");
});

//mobile use
let up = document.querySelector(".up");
let right = document.querySelector(".right");
let left = document.querySelector(".left");
up.addEventListener("click", () => {
  man.classList.add("manjump");
  jmp.play();
  setTimeout(() => {
    man.classList.remove("manjump");
    jmp.pause();
  }, 600);
});

right.addEventListener("click", () => {
  front = parseInt(window.getComputedStyle(man, null).getPropertyValue("left"));
  man.style.left = front + 40 + "px";
});
left.addEventListener("click", () => {
  front = parseInt(window.getComputedStyle(man, null).getPropertyValue("left"));
  if (front > 20) man.style.left = front - 40 + "px";
});
