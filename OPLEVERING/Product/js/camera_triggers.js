// Nieuwe interactie toevoegen? -> 1. trackDurations[] invullen 2. interactFunctie aanmaken 3. interactFunctie toevoegen aan de switch case

addLoadEvent(function(){
  // trackDurations = [1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500];
  trackDurations = [1000, 10000, 12000, 26000, 28000, 24000, 18000, 10000];
  startOnTrack(1);
});

function startOnTrack(startNummer){
  trackDone = [];
  for (var i = 0; i < trackDurations.length; i++) {
    trackDone[i] = false;
  }
  trackDone[(startNummer-1)] = true;
  cameraPathSwith();
}

function cameraPathSwith() {
  for (var i = 0; i < trackDone.length; i++) {
    if (trackDone[i]) {
      setNextInteraction(i);
      break;
    };
  };
}

function setNextInteraction(iteration) {
  var duration = trackDurations[iteration];
  switchToTrack(iteration, duration);
  setTimeout(function () {
    interactionSwitch(iteration);
  }, duration);
}

function interactionSwitch(iteration){
  switch(iteration) {
    case 0:
      interactIntroBox();
      break;
    case 1:
      interactCarousel();
      break;
    case 2:
      interactRoltrap();
      break;
    case 3:
      interactScreen();
      break;
    case 4:
      interactGeld();
      break;
    case 5:
      interactTerras();
      break;
    case 6:
      interactFotohokje();
      break;
    default:
      startingAudio();
  }

}

function switchToTrack(iteration, duration){
  var camera_on_path = document.getElementById('cameraOnPath');
  var trackString = "#cameraTrack" + (iteration);
  camera_on_path.setAttribute("alongpath", "curve", trackString);
  camera_on_path.setAttribute("alongpath", "dur", duration);
}

function incrementPath(){
  for (var i = 0; i < trackDone.length; i++) {
    if (trackDone[i]) {
      trackDone[i] = false;
      trackDone[i+1] = true;
      break;
    };
  };
};

function createVrouw(){
  endPath = false;
  var vrouw = document.getElementById('vrouwOnPath');
  // alongpath="curve: #cameraTrackRoltrap1;delay: 0; loop: false"
  vrouw.setAttribute("alongpath", "curve", "#cameraTrackRoltrap1");
  vrouw.setAttribute("alongpath", "dur", "15000");
  vrouw.setAttribute("alongpath", "delay", "1000");
  vrouw.setAttribute("alongpath", "loop", "false");
  setTimeout(function(){setEndOfPath(true)}, 16000);
};

function changeVrouwPath(){
  if (endPath == true) {
    var vrouw = document.getElementById('vrouwOnPath');
    vrouw.setAttribute("alongpath", "curve", "#cameraTrackRoltrap2");
    setTimeout(function(){resetVrouw()}, 16000);
  } else {
    setTimeout(function(){changeVrouwPath()}, 1000);
  }

};

function resetVrouw(){
  document.getElementsByTagName("a-scene")[0].removeChild(document.getElementById('vrouwOnPath'));
  // document.getElementById('vrouwOnPath').setAttribute("position", "-0.701 3.895 -24.552");
}

function setEndOfPath(waarde){
  endPath = waarde;
}

function interactIntroBox(){
  startingAudio();
  console.log("waiting for start input");
  let observable = document.getElementById('loading_bar_plane');
  observable.addEventListener("mouseenter", fovDownAnimation);
  observable.addEventListener("mouseleave", fovUpAnimation);
  observable.addEventListener("click", function catchStart() {
    observable.removeEventListener("mouseenter", fovDownAnimation);
    observable.removeEventListener("mouseleave", fovUpAnimation);
    observable.removeEventListener("click", catchStart);
    returnVision();
    setSubtitle("Ik ga een broodje kopen...");
    document.getElementById('info_plane').appendChild(document.getElementById('opacity_down'));
    incrementPath();
    cameraPathSwith();
  });
}

function interactCarousel() {
  console.log("waiting for input carousel");
  // nieuwe funtie die beeld en geluid omzet
  setSubtitle("Hey! Een TR413 toestel...");
  fadeVision();
  document.getElementById('roltrapVrouw').setAttribute("src", "#vrouw_BW");
  let observable = document.getElementById('speeltoestel');
  observable.setAttribute("sound", "volume", 1);
  observable.addEventListener("mouseenter", fovDownAnimation);
  observable.addEventListener("mouseleave", fovUpAnimation);
  observable.addEventListener("click", function catchCarousel() {
    setSubtitle("...ohja, ik was bezig...");
    observable.removeEventListener("mouseenter", fovDownAnimation);
    observable.removeEventListener("mouseleave", fovUpAnimation);
    observable.removeEventListener("click", catchCarousel);
    returnVision();
    document.getElementById('roltrapVrouw').setAttribute("src", "#vrouw");
    createVrouw();
    incrementPath();
    cameraPathSwith();
  });
}

function interactRoltrap() {
  console.log("waiting for input escelator");
  setSubtitle("Die tassen zijn zo luid!");
  fadeVision();
  let observable = document.getElementById('roltrapVrouw');
  let observable_audio = document.getElementById('roltrapVrouw_audio');
  observable_audio.setAttribute("sound", "volume", 1);
  observable.addEventListener("mouseenter", fovDownAnimation);
  observable.addEventListener("mouseleave", fovUpAnimation);
  observable.addEventListener("click", function catchRoltrap() {
    setSubtitle("Keek die vrouw me aan...?");
    observable.removeEventListener("mouseenter",fovDownAnimation);
    observable.removeEventListener("mouseleave",fovUpAnimation);
    observable.removeEventListener("click",catchRoltrap);
    changeVrouwPath();
    returnVision();
    incrementPath();
    cameraPathSwith();
  });
}

function interactScreen() {
  console.log("waiting for input big screen");
  setSubtitle("Treinen!");
  fadeVision();
  screenColor();
  let observable = document.getElementById('reclame_scherm');
  observable.addEventListener("mouseenter", fovDownAnimation);
  observable.addEventListener("mouseleave", fovUpAnimation);
  observable.addEventListener("click", function catchScherm() {
    setSubtitle("Ooooh... die is mooi.");
    observable.removeEventListener("mouseenter",fovDownAnimation);
    observable.removeEventListener("mouseleave",fovUpAnimation);
    observable.removeEventListener("click",catchScherm);
    returnVision();
    startMunten();
    incrementPath();
    cameraPathSwith();
  });
}

function interactGeld() {
  console.log("waiting for input geld");
  setSubtitle("Die automaat laat muntjes vallen");
  fadeVision();
  let observable = document.getElementById('geld');
  observable.setAttribute("sound", "volume", 1);
  observable.addEventListener("mouseenter", fovDownAnimation);
  observable.addEventListener("mouseleave", fovUpAnimation);
  observable.addEventListener("click", function catchFontein() {
    setSubtitle("Ik laat ze maar liggen.");
    observable.removeEventListener("mouseenter",fovDownAnimation);
    observable.removeEventListener("mouseleave",fovUpAnimation);
    observable.removeEventListener("click",catchFontein);
    returnVision();
    incrementPath();
    cameraPathSwith();
  });
}

function interactTerras() {
  stopMunten();
  console.log("waiting for input terras");
  setSubtitle("Misschien hebben ze hier broodjes.");
  fadeVision();
  let observable = document.getElementById('terras');
  let observable_audio = document.getElementById('terras_audio');
  observable_audio.setAttribute("sound", "volume", 1);
  observable.addEventListener("mouseenter", fovDownAnimation);
  observable.addEventListener("mouseleave", fovUpAnimation);
  observable.addEventListener("click", function catchFontein() {
    setSubtitle("Zoveel mensen...");
    observable.removeEventListener("mouseenter",fovDownAnimation);
    observable.removeEventListener("mouseleave",fovUpAnimation);
    observable.removeEventListener("click",catchFontein);
    returnVision();
    incrementPath();
    cameraPathSwith();
    startFlits();
  });
}

function interactFotohokje() {
  console.log("waiting for input fotoHokje");
  setSubtitle("Dat geluid is eng..");
  fadeVision();
  let observable = document.getElementById('fotoHokje');
  // observable.setAttribute("sound", "volume", 1);
  observable.addEventListener("mouseenter", fovDownAnimation);
  observable.addEventListener("mouseleave", fovUpAnimation);
  observable.addEventListener("click", function catchFontein() {
    setSubtitle("Zo fel! Ik ga naar huis.");
    observable.removeEventListener("mouseenter",fovDownAnimation);
    observable.removeEventListener("mouseleave",fovUpAnimation);
    observable.removeEventListener("click",catchFontein);
    returnVision();
    incrementPath();
    cameraPathSwith();
  });
}

function fovDownAnimation() {
  var node = document.getElementById('camera_zoom_in');
  node.setAttribute("from", getCurrentSize())
  document.getElementById('rail_cursor').appendChild(node);
}

function fovUpAnimation() {
  var node = document.getElementById('camera_zoom_out');
  node.setAttribute("from", getCurrentSize())
  document.getElementById('rail_cursor').appendChild(node);
}

function getCurrentSize() {
  let current_size = document.getElementById('rail_cursor').getAttribute("scale");
  let newPosText = '';
  Object.keys(current_size).forEach(function(key) {
    newPosText += current_size[key]+' ';
  });
  return newPosText
}

function lowerVolume(){
  let hasAudio = document.getElementsByClassName("hasAudio");
  document.getElementById('bg_music').volume = 0.1;
  for (let i = 0; i < hasAudio.length; i++) {
    hasAudio[i].setAttribute("sound", "volume", 0.2);
  };
};

function defaultVolume(){
  let hasAudio = document.getElementsByClassName("hasAudio");
  document.getElementById('bg_music').volume = 0.4;
  for (let i = 0; i < hasAudio.length; i++) {
    hasAudio[i].setAttribute("sound", "volume", .7);
  };
};

function setBW() {
  document.getElementById('floor_main').setAttribute("material", "src", "#floor_texture_BW");
  document.getElementById('floor_ring').setAttribute("material", "src", "#floor_texture_BW");
  document.getElementById('ingang1').setAttribute("material", "src", "#ingang_texture_BW");
  document.getElementById('ingang2').setAttribute("material", "src", "#ingang_texture_BW");

  document.getElementById('wall_lang1').setAttribute("material", "src", "#wall_lang_text1_BW");
  document.getElementById('wall_lang2').setAttribute("material", "src", "#wall_lang_text2_BW");
  document.getElementById('wall_lang3').setAttribute("material", "src", "#wall_lang_text3_BW");
  document.getElementById('wall_lang4').setAttribute("material", "src", "#wall_lang_text4_BW");

  document.getElementById('wall_kort1').setAttribute("material", "src", "#wall_kort_text1_BW");
  document.getElementById('wall_kort2').setAttribute("material", "src", "#wall_kort_text2_BW");
  document.getElementById('wall_kort3').setAttribute("material", "src", "#wall_kort_text3_BW");
  document.getElementById('wall_kort4').setAttribute("material", "src", "#wall_kort_text4_BW");
  document.getElementById('wall_kort5').setAttribute("material", "src", "#wall_kort_text5_BW");
  document.getElementById('wall_kort6').setAttribute("material", "src", "#wall_kort_text6_BW");
  document.getElementById('wall_kort7').setAttribute("material", "src", "#wall_kort_text7_BW");
  document.getElementById('wall_kort8').setAttribute("material", "src", "#wall_kort_text8_BW");
  document.getElementById('wall_kort9').setAttribute("material", "src", "#wall_kort_text9_BW");
  document.getElementById('wall_kort10').setAttribute("material", "src", "#wall_kort_text10_BW");
  document.getElementById('wall_kort11').setAttribute("material", "src", "#wall_kort_text11_BW");
  document.getElementById('wall_kort12').setAttribute("material", "src", "#wall_kort_text12_BW");
  document.getElementById('wall_kort13').setAttribute("material", "src", "#wall_kort_text13_BW");
  document.getElementById('wall_kort14').setAttribute("material", "src", "#wall_kort_text14_BW");
}

function setColor() {
  document.getElementById('floor_main').setAttribute("material", "src", "#floor_texture");
  document.getElementById('floor_ring').setAttribute("material", "src", "#floor_texture");
  document.getElementById('ingang1').setAttribute("material", "src", "#ingang_texture");
  document.getElementById('ingang2').setAttribute("material", "src", "#ingang_texture");

  document.getElementById('wall_lang1').setAttribute("material", "src", "#wall_lang_text1");
  document.getElementById('wall_lang2').setAttribute("material", "src", "#wall_lang_text2");
  document.getElementById('wall_lang3').setAttribute("material", "src", "#wall_lang_text3");
  document.getElementById('wall_lang4').setAttribute("material", "src", "#wall_lang_text4");

  document.getElementById('wall_kort1').setAttribute("material", "src", "#wall_kort_text1");
  document.getElementById('wall_kort2').setAttribute("material", "src", "#wall_kort_text2");
  document.getElementById('wall_kort3').setAttribute("material", "src", "#wall_kort_text3");
  document.getElementById('wall_kort4').setAttribute("material", "src", "#wall_kort_text4");
  document.getElementById('wall_kort5').setAttribute("material", "src", "#wall_kort_text5");
  document.getElementById('wall_kort6').setAttribute("material", "src", "#wall_kort_text6");
  document.getElementById('wall_kort7').setAttribute("material", "src", "#wall_kort_text7");
  document.getElementById('wall_kort8').setAttribute("material", "src", "#wall_kort_text8");
  document.getElementById('wall_kort9').setAttribute("material", "src", "#wall_kort_text9");
  document.getElementById('wall_kort10').setAttribute("material", "src", "#wall_kort_text10");
  document.getElementById('wall_kort11').setAttribute("material", "src", "#wall_kort_text11");
  document.getElementById('wall_kort12').setAttribute("material", "src", "#wall_kort_text12");
  document.getElementById('wall_kort13').setAttribute("material", "src", "#wall_kort_text13");
  document.getElementById('wall_kort14').setAttribute("material", "src", "#wall_kort_text14");
}

function hekRed() {
  var korteHekjes = document.getElementsByClassName('isHekjeKort');
  var langeHekjes = document.getElementsByClassName('isHekjeLang');

  for (var i = 0; i < korteHekjes.length; i++) {
    korteHekjes[i].setAttribute("obj-model", "mtl", "#hek_rood-mtl");
  }
  for (var i = 0; i < langeHekjes.length; i++) {
    langeHekjes[i].setAttribute("obj-model", "mtl", "#hek_lang_rood-mtl");
  }

}


function stopBlack() {
  var stopBord = document.getElementsByClassName('stopBord');
  for (var i = 0; i < stopBord.length; i++) {
    stopBord[i].setAttribute("obj-model", "mtl", "");
  }
}

function stopColor() {
  var stopBord = document.getElementsByClassName('stopBord');
  for (var i = 0; i < stopBord.length; i++) {
    stopBord[i].setAttribute("obj-model", "mtl", "#stop-mtl");
  }
}

function hekBlack() {
  var korteHekjes = document.getElementsByClassName('isHekjeKort');
  var langeHekjes = document.getElementsByClassName('isHekjeLang');

  for (var i = 0; i < korteHekjes.length; i++) {
    korteHekjes[i].setAttribute("obj-model", "mtl", "#hek-mtl");
  }
  for (var i = 0; i < langeHekjes.length; i++) {
    langeHekjes[i].setAttribute("obj-model", "mtl", "#hek_lang-mtl");
  }
}

function fonteinBW() {
  document.getElementById('fontein').setAttribute("obj-model", "mtl", "");
}

function fonteinColor() {
    document.getElementById('fontein').setAttribute("obj-model", "mtl", "#fontein-mtl");
}

function screenBW() {
  document.getElementById('headline_box').setAttribute("material", "color", "#aaa");
  document.getElementById('article_box').setAttribute("material", "color", "#aaa");
  document.getElementById('time_box').setAttribute("material", "color", "#aaa");
  newsGreyBoolean = false;
}

function screenColor() {
  document.getElementById('headline_box').setAttribute("material", "color", "#19224A");
  document.getElementById('article_box').setAttribute("material", "color", "#3A5987");
  document.getElementById('time_box').setAttribute("material", "color", "#FFCF10");
  newsGreyBoolean = true;
}

function mensenBW(){
  mensenSprites = document.getElementsByClassName("mensenSprites");
  for (var i = 0; i < mensenSprites.length; i++) {
    mensenSprites[i].setAttribute("src", ("#mensen" + (i+1) + "_BW"));
  }
}

function mensenColor(){
  mensenSprites = document.getElementsByClassName("mensenSprites");
  for (var i = 0; i < mensenSprites.length; i++) {
    mensenSprites[i].setAttribute("src", ("#mensen" + (i+1)));
  }
}

function setSubtitle(subt_string1) {
  // je kan een (of twee) strings aan de functie meegeven
  // die fade in en na X seconden weer out
  var subtitles = document.getElementById('subtitles');
  var opa_up = document.getElementById('insert_text');
  var opa_down = document.getElementById('remove_text');
  var text_up = document.getElementById('insert_font');
  var text_down = document.getElementById('remove_font');
  subtitles.setAttribute("text", "value", subt_string1);
  subtitles.appendChild(opa_up);
  subtitles.appendChild(text_up);
  setTimeout(function() {
    subtitles.appendChild(opa_down);
    subtitles.appendChild(text_down);
    subtitles.setAttribute("text", "value", "");
  }, 3000);
}

function fadeVision() {
  hekBlack();
  setBW();
  screenBW();
  stopBlack();
  fonteinBW();
  mensenBW();
  lowerVolume();
}

function returnVision() {
  hekRed();
  screenColor();
  stopColor();
  fonteinColor();
  mensenColor();
  setColor();
  defaultVolume();
  fovUpAnimation();
}
