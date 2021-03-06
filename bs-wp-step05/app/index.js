'use strict';
// require ('react');
import React from 'react';
//require('bootstrap-webpack!./../bootstrap.config.js');
import BootstrapJS from 'bootstrap-webpack!./../bootstrap.config.js';
//require("css!./main.css"); cretaes error
//require('./main.css'); file not found
var $ = require('jquery');

console.log("NODE_ENV = " + process.env.NODE_ENV);
if(process.env.NODE_ENV !== 'production') {
  React.Perf = require('react-addons-perf');
}

var component = require('./component');

$('#div-react').append(component());
$('#div-jquery').append("<h3>Use jQuery to add HTML</h3>");
$('#div-jquery').append("<p>This is added using $().append()</p>");

var dropdowns = '<h3>Dropdowns</h3><p>This is a very long string of HTML packed into an array and then appended to a DIV with .append(arrayName).</p><div class="dropdown"><button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">Tutorials<span class="caret"></span></button><ul class="dropdown-menu" role="menu" aria-labelledby="menu1"><li role="presentation"><a role="menuitem" tabindex="-1" href="#">HTML</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#">CSS</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#">JavaScript</a></li><li role="presentation" class="divider"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#">About Us</a></li></ul></div>'

$('#div-dropdowns').append(dropdowns);

$(document).ready(function() {
  //alert("hello");
  $('#div-jquery').append("Hello from jQuery inside of $(document).ready()");
});
