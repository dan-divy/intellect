
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
$.ajax({
  headers: {
    Accept: "text/plain; charset=utf-8",
    "Content-Type": "text/plain; charset=utf-8"
  },
  method: 'GET',
  url:"https://icanhazdadjoke.com/slack",
  success : function(response) {
    document.getElementById("quote").innerHTML = `<a href="${response.attachments[0].footer.split('<')[1].split('|')[0]}">"${response.attachments[0].text}"</a>`;
        console.log(response)
    setTimeout(function () {
      $('.box').fadeOut('slow');
    }, 2000); // Time taken to quickly read the joke.
  },
  error: function (response) {
    $("#quote").text('"Maturity is when you understand that you are imature."');
    setTimeout(function () {
      $('.box').fadeOut('slow');
    }, 2000); // Time taken to quickly read the joke.
}
});

/** window.onload = function() {
  $('.box').fadeOut('slow');
}**/
