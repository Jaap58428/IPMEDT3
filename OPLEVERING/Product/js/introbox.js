addLoadEvent(function(){
  startExperience();
  startingAudio();
});

function startExperience() {
  var loading_bar_text = document.getElementById('loading_bar_text');
  var loading_bar_plane = document.getElementById('loading_bar_plane');
  var loading_bar_holder = document.getElementById('loading_bar_holder')
  var info_plane = document.getElementById('info_plane');

  var current_iteration = 0

  var updateLoading = setInterval(function() {
    current_iteration++;
    let dots_amount = (current_iteration % 4) + 1;
    loading_bar_text.setAttribute("value", "Enkele seconden" + Array(dots_amount).join("."));
  }, 500);

  setTimeout(function() {
    clearInterval(updateLoading);
    loading_bar_text.setAttribute("value", "START");
    loading_bar_plane.setAttribute("material", "color", "#3c3");
    info_plane.removeChild(loading_bar_holder);
  }, 15000);

  setTimeout(function() {
    document.getElementById('exit_plane').setAttribute("scale", "1 1 1")
  }, 45000);

}

function startingAudio() {
  let hasAudio = document.getElementsByClassName("hasAudio");
  document.getElementById('bg_music').volume = 0.1;
  for (let i = 0; i < hasAudio.length; i++) {
    hasAudio[i].play();
    hasAudio[i].setAttribute("sound", "volume", 0.1);
    // entity.components.sound.playSound();
  };
}
