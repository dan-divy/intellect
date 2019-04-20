window.toggleDarkMode = function () {
  $("*").addClass("border-dark");
  $('body').removeClass()
  $("body").addClass('dark-mode');
  localStorage.setItem("theme","dark");
}

window.toggleLightMode = function () {
  $("*").removeClass("border-dark");
  $('body').removeClass()
  $("body").addClass('light-mode');
  localStorage.setItem("theme","light");
}
