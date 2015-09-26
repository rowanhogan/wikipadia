
function handleFont (font) {
  var htmlEl = document.body.parentElement;

  htmlEl.classList.remove('sans');

  if (font.length) {
    htmlEl.classList.add(font);
  }

  localStorage.setItem('font', font);
}

module.exports = handleFont;
