module.exports = function () {
  var element = document.createElement('div');
  //.setAttribute("class", this.toString());
  element.setAttribute('class', 'text-lowercase');
  element.innerHTML = '<h3>HELLO WORLD</h3><p>I am from React and was originally in UPPERCASE but had the Bootstrap class <i>text-lowercase added to demonstrate that Bootstrap CSS is working.</i></p>';

  return element;
};
