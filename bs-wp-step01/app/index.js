require ('react');
require('bootstrap-webpack!./../bootstrap.config.js');
var $ = require('jquery');

var component = require('./component');

document.body.appendChild(component());
$('body').append("<h1>Add Some Bootstrap Components</h1>");
var dropdowns = '<div class="container"><h2>Dropdowns</h2><p>The .dropdown class is used to indicate a dropdown menu.</p><p>Use the .dropdown-menu class to actually build the dropdown menu.</p><div class="dropdown"><button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">Tutorials<span class="caret"></span></button><ul class="dropdown-menu" role="menu" aria-labelledby="menu1"><li role="presentation"><a role="menuitem" tabindex="-1" href="#">HTML</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#">CSS</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#">JavaScript</a></li><li role="presentation" class="divider"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#">About Us</a></li></ul></div></div>'
$('body').append(dropdowns);

$(document).ready(function() {
  //alert("hello");
  $('body').append("Hello from jQuery");
});

