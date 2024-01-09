let Playicon = document.querySelector(".fa-fantasy-flight-games");
let Playbtn = document.querySelector(".fa-play");
let page1_h1 = document.querySelector(".page1 h1");
let page2 = document.querySelector(".page2");
let page3 = document.querySelector(".page3");
let PageCover = document.querySelector(".PageCover");
let imgTemp = document.querySelectorAll(".ImageBox img");
let imgElements = document.querySelectorAll(".ImageBoxHide img");
let moves = document.querySelector(".moves p");
let points = document.querySelector(".points p");
let second = document.querySelector(".sec");
let milliSecond = document.querySelector(".m_sec");
let clock = document.querySelector(".time");
let move, point, time, sec, msec, moveCount, pointCount;
let sharigan = document.querySelector(".Sharigan");
let Mangekyo_sharigan = document.querySelector(".Mangekyo_Sharigan");
let result = document.querySelector(".Board");
let displayMoves = document.querySelector(".DisplayMoves");
let displayPoints = document.querySelector(".DisplayPoints");
let displayTime = document.querySelector(".DisplayTime");
let displayRatio = document.querySelector(".PointPerSec");
let imgArr = [
    { id: "./Images/Deku.jpg" },
    { id: "./Images/Gojo.jpg" },
    { id: "./Images/kaneki.jpg" },
    { id: "./Images/Levi.jpg" },
    { id: "./Images/Pikachu.jpg" },
    { id: "./Images/Saitama.jpeg" },
    { id: "./Images/Sasuke.jpg" },
    { id: "./Images/zenitsu.jpg" }
];

Playbtn.onclick = () => {
    Playicon.classList.remove("noStart");
    Playicon.classList.add("Start");
    IconHandle();
    ImageClickedHandle();
}

function TimingClockHandle() {
    let s = 0;
    let ms = 0;
    time = setInterval(() => {
        ms++;
        if (ms < 10) {
            milliSecond.textContent = "0" + ms;
        } else if (ms > 9 && ms <= 60) {
            milliSecond.textContent = ms;
            if (ms == 60) {
                s++;
                if (s < 10) {
                    second.textContent = "0" + s;
                } else {
                    second.textContent = s;
                    if (s > 14 && s < 20) {
                        clock.classList.add("RunningOut");
                    } else if (s == 20) {
                        clearInterval(time);
                        clock.style.color = "red";
                        clock.classList.remove("RunningOut");
                        sec = 20;
                        milliSecond.textContent = "00";
                        msec = 0;
                        pointCount = parseInt(points.textContent);
                        moveCount = parseInt(moves.textContent);
                        Ending();
                    }
                }
            }
        } else {
            ms = 0;
        }
    }, 100)
}

function IconHandle() {
    setTimeout(() => {
        PageCover.classList.add("BlurredPageCover");
        Playicon.classList.remove("Start");
        Playicon.classList.add("ReStart");
        page2.classList.remove("hidden");
        page1_h1.classList.add("hidden");
        Playbtn.classList.add("hidden");
    }, 10000);
}

function ImageRender() {
    let imgArrDuplicated = imgArr.concat(imgArr);

    for (let i = imgArrDuplicated.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [imgArrDuplicated[i], imgArrDuplicated[j]] = [imgArrDuplicated[j], imgArrDuplicated[i]];
    }
    for (let i = 0; i < imgElements.length; i++) {
        imgElements[i].src = imgArrDuplicated[i].id;
    }
}

function ImageClickedHandle() {
    ImageRender();
    setTimeout(() => {
        TimingClockHandle();
    }, 20000)
    let DataArr = [];
    let isMatched = [];

    function isAlreadyMatched(index) {
        return isMatched.includes(index);
    }

    let clickHandler = function (i) {
        return function () {
            if (isAlreadyMatched(i)) {
                return;
            }
            if (DataArr.length < 2) {
                if (!imgTemp[i].classList.contains("clicked")) {
                    InputMovesHandling();
                    DataArr.push(i);
                    if (DataArr.length === 2) {
                        let var1 = DataArr[0];
                        let var2 = DataArr[1];
                        let var1Link = imgElements[var1].src;
                        let var2Link = imgElements[var2].src;
                        let image1 = var1Link.split("/").pop().replace(/\.[^/.]+$/, "");
                        let image2 = var2Link.split("/").pop().replace(/\.[^/.]+$/, "");
                        if (image1 === image2) {
                            InputPointHandling();
                            DataArr = [];
                            isMatched.push(var1, var2);
                            imgTemp[var1].removeEventListener("click", clickHandler(var1));
                            imgTemp[var2].removeEventListener("click", clickHandler(var2));
                            imgTemp[var1].classList.remove("clicked");
                            imgTemp[var2].classList.remove("clicked");
                            imgTemp[var1].classList.add("Matched");
                            imgTemp[var2].classList.add("Matched");
                            if (Array.from(imgTemp).every((element) => element.classList.contains("Matched"))) {
                                clearInterval(time);
                                sec = parseInt(second.textContent)
                                msec = parseInt(milliSecond.textContent);
                                pointCount = 8;
                                moveCount = parseInt(moves.textContent);
                                Ending();
                            }
                        } else {
                            setTimeout(() => {
                                imgTemp[var1].classList.remove("hoverImg", "ImageRotate");
                                imgTemp[var2].classList.remove("hoverImg", "ImageRotate");
                                imgTemp[var1].style.opacity = "1";
                                imgElements[var1].style.opacity = "0";
                                imgTemp[var2].style.opacity = "1";
                                imgElements[var2].style.opacity = "0";
                                DataArr = [];
                                imgTemp[var1].classList.remove("clicked");
                                imgTemp[var2].classList.remove("clicked");
                            }, 2000);
                        }
                    }
                    imgTemp[i].classList.remove("hoverImg");
                    imgTemp[i].classList.add("ImageRotate");
                    setTimeout(() => {
                        imgTemp[i].style.opacity = "0";
                        imgElements[i].style.opacity = "1";
                    }, 1000);
                    imgTemp[i].classList.add("clicked");
                }
            }
        };
    };

    for (let i = 0; i < imgTemp.length; i++) {
        imgTemp[i].addEventListener("click", clickHandler(i));
    }
}

function InputMovesHandling() {
    move = parseInt(moves.textContent);
    move++;
    if (move < 10) {
        moves.textContent = "0" + move;
    } else {
        moves.textContent = move;
    }
}

function InputPointHandling() {
    point = parseInt(points.textContent);
    point++;
    if (point < 10) {
        points.textContent = "0" + point;
    } else {
        points.textContent = point;
    }
}

function Ending() {
    page3.classList.remove("hidden");
    page2.classList.add("hidden");
    setTimeout(() => {
        sharigan.classList.add("Sharigan_animation");
        Mangekyo_sharigan.classList.add("Mangekyo_Sharigan_animation");
        PageCover.classList.add("PageCoverAnimation");
    }, 5000);
    setTimeout(() => {
        result.classList.remove("hidden");
        DisplayResult();
    }, 11000)
}

function DisplayResult() {
    if (moveCount < 10) {
        displayMoves.textContent = "0" + moveCount;
    } else {
        displayMoves.textContent = moveCount;
    }
    displayPoints.textContent = "0" + pointCount;
    let SecondResult = sec * 3;
    if (SecondResult < 10) {
        displayTime.textContent="0"+SecondResult+"sec";
    }else{
        displayTime.textContent=SecondResult+"sec";
    }
    let ratio=moveCount/SecondResult;
    displayRatio.textContent=ratio.toFixed(3);
}