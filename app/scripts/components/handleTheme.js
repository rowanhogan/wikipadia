
function handleTheme (theme) {
  var htmlEl = document.body.parentElement;

  htmlEl.classList.remove('dark');
  htmlEl.classList.remove('inverted');

  if (theme.length) {
    htmlEl.classList.add(theme);
  }

  localStorage.setItem('theme', theme);
}

module.exports = handleTheme;
