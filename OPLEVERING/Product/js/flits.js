function startFlits(){
  flits = document.getElementById("flits");
  lichtAan();
}

function lichtAan(){
  $("#shutterSound").remove();
  flits.setAttribute("light", "intensity", "1");
  var shutterSound = document.createElement("a-entity");
  shutterSound.setAttribute("id", "shutterSound");
  shutterSound.setAttribute("sound", "src", "#shutter");
  shutterSound.setAttribute("sound", "autoplay", "true");
  shutterSound.setAttribute("sound", "loop", "false");
  shutterSound.setAttribute("sound", "volume", "1");
  flits.appendChild(shutterSound);
  setTimeout(function(){ lichtUit(); }, 100);
}

function lichtUit(){
  $("#shutterSound").remove();
  flits.setAttribute("light", "intensity", "0");
  setTimeout(function(){ geluidAan(); }, 1500);
}

function geluidAan(){
  var shutterSound = document.createElement("a-entity");
  shutterSound.setAttribute("id", "shutterSound");
  shutterSound.setAttribute("sound", "src", "#shutterLoad");
  shutterSound.setAttribute("sound", "autoplay", "true");
  shutterSound.setAttribute("sound", "loop", "false");
  shutterSound.setAttribute("sound", "volume", "0.5");
  flits.appendChild(shutterSound);
  setTimeout(function(){ lichtAan(); }, 5000);
}
