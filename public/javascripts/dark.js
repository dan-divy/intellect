window.toggleDarkMode = function () {
  $("*").addClass("border-dark");
  $('body').removeClass()
  $("body").addClass('dark-mode');
  $("a,p,h1,h2,h3,h4,h5").addClass('light')
  localStorage.setItem("theme","dark");
}

window.toggleLightMode = function () {
  $("*").removeClass("border-dark");
  $("a,p,h1,h2,h3,h4,h5").removeClass('light')
  $('body').removeClass()
  $("body").addClass('light-mode');
  localStorage.setItem("theme","light");
}
