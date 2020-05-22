const acc = document.getElementById("accordion");
if (acc !== null){
  var btn_acc = document.getElementsByClassName('btn-accordion');
  // const windowInner = window.visualViewport ? window.visualViewport.width : window.innerWidth;
  // if (windowInner<=1200){
  //   const collapsetab = document.getElementsByClassName('text-block__content show');
  //
  //   $('.show').collapse();
  //   //accordionHideAll(btn_acc);
  // }

  for(let i = 0; i < btn_acc.length; i++) {
    btn_acc[i].addEventListener("click", function() {
      accordeonBtn(btn_acc[i]);
      accordionHideRest(btn_acc,i);
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

  function accordionHideRest(btn_acc,clicked_i){
    for(let i = 0; i < btn_acc.length; i++) {
      if (i!=clicked_i){
        btn_acc[i].classList.remove('btn-accordion__hide');
        btn_acc[i].classList.add('btn-accordion__show');
      }
    }
  }
  function accordionHideAll(btn_acc){
    for(let i = 0; i < btn_acc.length; i++) {
      btn_acc[i].classList.remove('btn-accordion__hide');
      btn_acc[i].classList.add('btn-accordion__show');
    }
  }

  $('.accordion-collapse').on('shown.bs.collapse', function () {
  // do something...
    console.log("etot ot accordion");
    const header = document.querySelector('header').offsetHeight;// + 20;
    const tabName = $(this).attr("aria-labelledby");
    const tab = document.getElementById(tabName);
    const elp = tab.getBoundingClientRect().top
    //console.log("tab.getBoundingClientRect().top - "+tab.getBoundingClientRect().top);
    const duration = 1500;
    //const elPosition = $("#"+tabName).offset().top - 20;
    const startPosition = window.scrollY
    const distance = elp - header;
    console.log("elPosition = "+ elp); //distance = "+distance);
    let start = null;

    window.requestAnimationFrame(step);

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
      if (progress < duration) window.requestAnimationFrame(step);
    }
  })
}


// //scroll to top of shown accordion
// //const targetId = target === "#" ? "header" : target.substring(target.search("#"), target.length);
// const header = document.querySelector('header').offsetHeight;
// const duration = 1500;
// const elPosition = el.offsetTop;
// const startPosition = window.scrollY
// //pageYOffset;
// const distance = elPosition<=startPosition ? startPosition - elPosition - header : elPosition - startPosition - header;
// console.log("startPosition = "+ startPosition+"; elPosition = "+ elPosition+"; distance = "+distance);
// let start = null;
//
// window.requestAnimationFrame(step);
//
// function step(timestamp) {
//   if (!start) start = timestamp;
//   const progress = timestamp - start;
//   window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
//   if (progress < duration) window.requestAnimationFrame(step);
// }

//const collapsetab = document.getElementsByClassName('text-block__content');
// const collapsetab = document.getElementById("aboutService_content");
// console.log("collapsetab = "+ collapsetab.offsetTop);
// collapsetab.addEventListener("shown.bs.collapse", function() {
//   console.log("window.scrollY = "+window.scrollY+" ; collapsetab[i] = "+ collapsetab[i].offsetTop)
// })
// for(let i = 0; i < collapsetab.length; i++) {
// collapsetab[i].addEventListener("shown.bs.collapse", function() {
//   console.log("window.scrollY = "+window.scrollY+" ; collapsetab[i] = "+ collapsetab[i].offsetTop)
// })
// }
//----------------------------------------------------------------------------
// function for smooth scroll
//----------------------------------------------------------------------------
function easeInOutCubic(t, b, c, d) {
  t /= d/2;
  if (t < 1) return c/2*t*t*t + b;
  t -= 2;
  return c/2*(t*t*t + 2) + b;
};
