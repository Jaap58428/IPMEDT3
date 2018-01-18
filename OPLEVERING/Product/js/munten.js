addLoadEvent(function(){
  canChange = true;
  numberOfCoins = 1;
  coinNumber = 0;
  coinNumberDelete = 0;
  soundVolume = 1;
  dropInterval = 2000;
  numberOfSounds = 0;
  createSound = true;
  keepDropping = true;
});

function stopMunten(){
  keepDropping = false;
}

function startMunten(){
  coinPlane = document.getElementById("coinPlane");
  coinPlane.addEventListener('collide', function (e) {
    if (numberOfSounds < 4 && createSound == true) {
      createSound = false;
      numberOfSounds ++;
      var coinSound = document.createElement("a-sound");
      coinSound.setAttribute("src", "#coinDrop");
      coinSound.setAttribute("autoplay", "true");
      coinSound.setAttribute("loop", "false");
      coinSound.setAttribute("volume", soundVolume);
      coinPlane.appendChild(coinSound);
      soundVolume = (soundVolume - 0.25);
      setTimeout(function(){ removeSound(); }, 1000);
      setTimeout(function(){ setCreateSound(); }, 47);
    }
  });
  coinDrop();
}

function setCreateSound(){
  createSound = true;
}

function removeSound(){
  coinPlane.removeChild(coinPlane.childNodes[0]);
  soundVolume = (soundVolume + 0.25);
  numberOfSounds--;
}

function coinDrop(){
  for (var i = 0; i < numberOfCoins; i++) {
    coinString = '<a-box id="coin' + coinNumber + '" color="yellow" depth="0.01" width="0.07" height="0.07" position="0.365 4.22 -63.9" dynamic-body></a-box>'
    $("#scene").append(coinString);
    var rotation = (Math.floor((Math.random() * 360) + 1) + " " + Math.floor((Math.random() * 360) + 1) + " " + Math.floor((Math.random() * 360) + 1));
    var coin = document.getElementById("coin" + coinNumber).setAttribute("rotation", rotation);
    coinNumber++;
  }
  if (keepDropping == true) {
    setTimeout(function(){ coinDrop(); }, dropInterval);
  }
  setTimeout(function(){ deleteCoin(); }, 3500);
}

function deleteCoin(coinId){
  for (var i = 0; i < numberOfCoins; i++) {
    $("#coin" + coinNumberDelete).remove();
    coinNumberDelete++;
  }
}
