const numDivs = 36;
const maxClicks = 10;

let hits = 0;
let miss = 0;
let startTime = 0;

function round() {
  let divSelector = randomDivId();

  $(".game-field").removeClass("target");
  $(divSelector).addClass("target");
  $(divSelector).text(String(hits+1))
  if (hits === maxClicks) {
    endGame();
  }
}

function handleClick(event) {
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    $(".target").text("");
    $(".game-field").removeClass("miss");
    round();
  }
  else{
    $(event.target).addClass("miss");
    miss += 1;
  }
}

function endGame() {
  let playTimeMsec = getTimestamp() - startTime;
  let playTime = Number(playTimeMsec / 1000).toPrecision(3);
  
  $(".playing-field").addClass("d-none");
  $("#game-time").text(playTime);
  $("#miss-count").text(miss);
  $("#win-message").removeClass("d-none");
}

function init() {
  $("#button-start").click(function(){
    $(this).attr("class", "d-none");
    $("#button-reload").removeClass("d-none");
    startTime = getTimestamp();
    round();
    $(".game-field").click(handleClick);
  });

  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);