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
$.ajax({
  headers: {
    Accept: "text/plain; charset=utf-8",
    "Content-Type": "text/plain; charset=utf-8"
  },
  method: 'GET',
  url:"https://icanhazdadjoke.com/slack",
  success : function(response) {
    $("#quote").text('"'+response.attachments[0].text+'"');
    console.log(response)
    setTimeout(function () {
      $('.box').fadeOut('slow');
    }, 5000); // Time taken to quickly read the joke.
  },
  error: function (response) {
  $('.box').fadeOut('slow');
}
});
/** window.onload = function() {
  $('.box').fadeOut('slow');
}**/
