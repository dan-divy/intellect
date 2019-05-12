
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

    Intellect.init()

});



window.changeTheme = function () {
  var theme = localStorage.getItem("theme") || "light";
  switch (theme) {
    case "dark":
      window.toggleLightMode();
      break;
    case "light":
      window.toggleDarkMode();
      break;
    //default: window.toggleLightMode();
  }
}
window.oldBrowser = false;

$('.box').fadeOut('slow');
window.checkLoadOut();

window.checkLoadOut = function() {
   if($('.box')[0].style.display !== 'none') {
     window.oldBrowser = true;
    $('.box')[0].style.display = 'none';
    }
}
function openBar() {
  if($('#search-bar').hasClass('show-bar') && $('#search-bar').val().length > 0) {
    return window.location.href = '/search?q=' + $('#search-bar').val()
  }
  $('#search-bar').fadeIn('slow');
  $('#search-bar').toggleClass('show-bar');
  if(!$('#search-bar').hasClass('show-bar')) {
    $('#search-bar').fadeOut('slow');
  }

  return false;
}
