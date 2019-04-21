window.addEventListener('load',function () {
    window.theme = localStorage.getItem("theme");
    switch (window.theme) {
      case "dark":
        window.toggleDarkMode();
        break;
      case "light":
        window.toggleLightMode();
        break;
      //default: window.toggleLightMode();
    }
});



window.changeTheme = function () {

  switch (localStorage.getItem("theme")) {
    case "dark":
      window.toggleLightMode();
      break;
    case "light":
      window.toggleDarkMode();
      break;
    //default: window.toggleLightMode();
  }
}

window.onload = function() {
  $('.box').fadeOut('slow')
}