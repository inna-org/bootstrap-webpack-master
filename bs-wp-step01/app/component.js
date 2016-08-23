module.exports = function () {
  var element = document.createElement('h1');
  //.setAttribute("class", this.toString());
  element.setAttribute('class', 'text-lowercase');
  element.innerHTML = 'HELLO WORLD';
  return element;
};
