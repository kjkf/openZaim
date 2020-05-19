const menu_links = document.querySelectorAll(".smooth_scroll");

if (menu_links!== null){
  const urlHash = location.hash;
  window.addEventListener('DOMContentLoaded', (event) => {
    if (urlHash) {
      setTimeout(() => { window.scrollTo(0, 0) }, 0)

      const anchors = document.querySelectorAll('a[href^="#"]');
      const header = document.querySelector('header').offsetHeight;
      const startPosition = window.pageYOffset;
      const duration = 1500;
      const urlTarget = document.getElementById(urlHash.replace('#', ''));
      const urlPosition = window.pageYOffset + urlTarget.getBoundingClientRect().top - header;
      let start = null;

      window.requestAnimationFrame(step);

      function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        window.scrollTo(0, easeInOutCubic(progress, startPosition, urlPosition, duration));
        if (progress < duration) window.requestAnimationFrame(step);
      }
    }
  });

  for(let i=0; i<menu_links.length; i++) {
    menu_links[i].addEventListener("click", menuLinkClick);
  }

  function menuLinkClick(event) {
    //removeActive();
    event.currentTarget.classList.add('selected_link');
    smoothScroll(event);
  }

  function smoothScroll(event) {
    event.preventDefault();
    const target = event.currentTarget.getAttribute("href")
    const anotherPage = target.substring(0,target.search("#"));
    const currloc = window.location.pathname
    console.log('target = '+ target);
    if (anotherPage == "" || currloc.search(anotherPage)>=0){
    //console.log("event.currentTarget.getAttribute('href') = "+event.currentTarget.getAttribute("href"));
      const targetId = target === "#" ? "header" : target.substring(target.search("#"), target.length);
      const duration = 1500;
      const targetPosition = document.querySelector(targetId).offsetTop;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition - 80;
      let start = null;

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

function easeInOutCubic(t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t + b;
	t -= 2;
	return c/2*(t*t*t + 2) + b;
};
}
