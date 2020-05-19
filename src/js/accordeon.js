const acc = document.getElementById("accordion");
if (acc !== null){
  var btn_acc = document.getElementsByClassName('btn-accordion');

  for(let i = 0; i < btn_acc.length; i++) {
  btn_acc[i].addEventListener("click", function() {
    accordeonBtn(btn_acc[i]);
    accordionHideAll(btn_acc,i);
  })
  }

  function accordeonBtn(el){
    //e.preventDefault();
    if (el.classList.contains('btn-accordion__show')){
      el.classList.remove('btn-accordion__show');
      el.classList.add('btn-accordion__hide');
    }else if (el.classList.contains('btn-accordion__hide')) {
      el.classList.remove('btn-accordion__hide');
      el.classList.add('btn-accordion__show');
    }
  }

  function accordionHideAll(btn_acc,clicked_i){
    for(let i = 0; i < btn_acc.length; i++) {
      if (i!=clicked_i){
        btn_acc[i].classList.remove('btn-accordion__hide');
        btn_acc[i].classList.add('btn-accordion__show');
      }
    }
  }
}
