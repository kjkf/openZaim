const feedback = document.getElementsByClassName("feedback-block");
if (feedback!== null){
  var textAreas = document.getElementsByTagName('textarea');
  Array.prototype.forEach.call(textAreas, function(elem) {
      elem.placeholder = elem.placeholder.replace(/\\n/g, '\n');
  });
}
