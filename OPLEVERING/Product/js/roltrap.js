addLoadEvent(function(){
  var treden_enkel_up = document.getElementById('treden_enkel_up');
  var treden_enkel_down = document.getElementById('treden_enkel_down');
  var i, j;

  var treden_box_up = document.getElementsByClassName('treden_box_up');
  for (i = 0 ; i < treden_box_up.length ; i++) {
    setInterval(function (i) {
      treden_box_up[i].appendChild(treden_enkel_up.cloneNode(true));
      setTimeout(function(i) {
        treden_box_up[i].removeChild(treden_box_up[i].firstChild);
      }, 30000, i)
    }, 1000, i);
  }

  var treden_box_down = document.getElementsByClassName('treden_box_down');
  for (j = 0 ; j < treden_box_down.length ; j++) {
    setInterval(function (j) {
      treden_box_down[j].appendChild(treden_enkel_down.cloneNode(true));
      setTimeout(function(j) {
        treden_box_down[j].removeChild(treden_box_down[j].firstChild);
      }, 30000, j)
    }, 1000, j);
  }

});
