addLoadEvent(function(){
  setTimeout(function(){ setup(); }, 10000);
});

function setup(){
  var vrButton = document.getElementsByClassName("a-enter-vr-button")[0];
  vrButton.onclick = function(){
    setTimeout(function(){ changeUserHeight(); }, 1500);
  };
};

function changeUserHeight(){
  var camera = document.getElementById("rail_camera");
  var position = camera.getAttribute("position");
  var xyz = Object.values(position);
  var y = xyz[1];
  var new_pos = xyz[0] + " " + 1 + " " + xyz[2];
  camera.setAttribute("position", new_pos);
};

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      };
      func();
    };
  };
};
