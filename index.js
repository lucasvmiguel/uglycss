var read = require('read-file');
var fs = require('fs');

//get files
var bufferCss = read.sync('files_tests/main.css',  {encoding: 'utf8'});
var bufferHtml = read.sync('files_tests/index.html',  {encoding: 'utf8'});

var arrayClasses = [];

var classes = bufferCss.match(/\.(.*)\{/g);

var numClasses = classes.length;

//fill array of classes from main.css
for(var i = 0; i < numClasses; i++){
  var nameClass = classes[i].replace(/[\.|\{|\ ]+/g, '');
  arrayClasses[i] = nameClass;
}

//generate html
var generateHtml = bufferHtml.replace(new RegExp(arrayClasses.join('|'), 'g'), function(i) {
    return 'c' + (arrayClasses.indexOf(i) + 1);
});

//generate css
var generateCss = bufferCss.replace(new RegExp(arrayClasses.join('|'), 'g'), function(i) {
    return 'c' + (arrayClasses.indexOf(i) + 1);
});

//create file html
fs.writeFile('files_tests/generate.html', generateHtml, function () {
  console.log('It\'s saved! in same location.');
});

//create file css
fs.writeFile('files_tests/generate.css', generateCss, function () {
  console.log('It\'s saved! in same location.');
});
