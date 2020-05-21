const menu_links = document.querySelectorAll(".smooth_scroll");

if (menu_links!== null){
  //----------------------------------------------------------------------------
  const urlHash = location.hash;
  window.addEventListener('DOMContentLoaded', (event) => {
    if (urlHash) {

      setTimeout(() => { window.scrollTo(0, 0) }, 1000)
      const acc = document.getElementById("accordion");
      const windowInner = window.visualViewport ? window.visualViewport.width : window.innerWidth;
      if (acc !== null && windowInner<=1200){
        $('.accordion-collapse').collapse();

        $('.accordion-collapse').on('hidden.bs.collapse', function () {
          console.log("collapsed");
          scrollToBlock();
        })
        //accordionHideAll(btn_acc);
      }else {
        scrollToBlock();
      }

      function scrollToBlock(){
        const anchors = document.querySelectorAll('a[href^="#"]');
        const header = document.querySelector('header').offsetHeight;
        const startPosition = window.pageYOffset;
        const duration = 1500;
        const urlTarget = document.getElementById(urlHash.replace('#', ''));
        const urlPosition = window.pageYOffset + urlTarget.getBoundingClientRect().top - header;
        let start = null;
        console.log("urlhash start pos - urlTarget.getBoundingClientRect().top - "+ urlTarget.getBoundingClientRect().top);
        console.log("urlPosition - "+ urlPosition)

        window.requestAnimationFrame(step);

        function step(timestamp) {
          if (!start) start = timestamp;
          const progress = timestamp - start;
          window.scrollTo(0, easeInOutCubic(progress, startPosition, urlPosition, duration));
          if (progress < duration) window.requestAnimationFrame(step);
        }
      }

    }
  });
  //----------------------------------------------------------------------------
  // menu item click
  //----------------------------------------------------------------------------
  for(let i=0; i<menu_links.length; i++) {
    menu_links[i].addEventListener("click", menuLinkClick);
  }

  function menuLinkClick(event) {
    event.currentTarget.classList.add('selected_link');
    smoothScroll(event);
  }

  function menuBarClose(){
    const header__menu = document.querySelector('.header__menu');
    if (header__menu.classList.contains('active')){header__menu.classList.remove('active');}
  }

  function smoothScroll(event) {
    event.preventDefault();
    var target = event.currentTarget.getAttribute("href")
    if (target.search("#")<0) target = target+"#"
    const page = target.substring(0,target.search("#"));
    const currloc = window.location.pathname
    //console.log('target = '+ target);
    if (page == "" || currloc.search(page)>=0){
      target = target.substring(target.search("#"), target.length);
      //console.log("target = "+ target);
      const targetId = target === "#" ? "header" : target.substring(target.search("#"), target.length);
      const header = document.querySelector('header').offsetHeight;
      const duration = 1500;
      const targetPosition = document.querySelector(targetId).offsetTop;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition - header;
      let start = null;

      menuBarClose();
      window.requestAnimationFrame(step);

      function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
        if (progress < duration) window.requestAnimationFrame(step);
      }
    }else{
      window.location.href = target// window.location(anotherPage)
    }
  }
//----------------------------------------------------------------------------
// function for smooth scroll
//----------------------------------------------------------------------------
function easeInOutCubic(t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t + b;
	t -= 2;
	return c/2*(t*t*t + 2) + b;
};
}
