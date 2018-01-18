window.onload = function() {
  let button = document.getElementById('buttonsBox');
  button.onclick = function() {
    if (confirm("Let op! Voor deze beleving is een koptelefoon aangeraden.") == true){
      window.location.href='vr.html'
    }
  }
}
