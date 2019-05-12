
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
	
$.ajax({
  headers: {
    Accept: "text/plain; charset=utf-8",
    "Content-Type": "text/plain; charset=utf-8"
  },
  method: 'GET',
  url:"https://icanhazdadjoke.com/slack",
  success : function(response) {
    document.getElementById("quote").innerHTML = `<a style="color:black;" href="${response.attachments[0].footer.split('<')[1].split('|')[0]}">"${response.attachments[0].text}"</a>`;
        console.log(response)
    //setTimeout(function () {
     //$('.box').fadeOut('slow');
      $('.box')[0].style.display == 'none';
   // }, 2000); // Time taken to quickly read the joke.
  },
  error: function (response) {
    $("#quote").text('"Maturity is when you understand that you are imature."');
    //setTimeout(function () {
      //$('.box').fadeOut('slow');
      $('.box')[0].style.display == 'none';
    //}, 2000); // Time taken to quickly read the joke.
}
});

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
window.checkLoadOut = function() {
   if($('.box')[0].style.display !== 'none') {
     window.oldBrowser = true;
      $('.box')[0].style.display == 'none';
    }
}
//alert('hi')
function openBar() {
  if($('#search-bar').hasClass('show-bar') && $('#search-bar').val().length > 0) {
    return window.location.href = '/search?q=' + $('#search-bar').val()
  }

  $('#search-bar').toggleClass('show-bar');


  return false;
}
