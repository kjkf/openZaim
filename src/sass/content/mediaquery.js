$(function() {
    const mql1200 = window.matchMedia("(max-width: 1200px)");
    const mql768 = window.matchMedia("(max-width: 768px)");
    const mql992 = window.matchMedia("(max-width: 992px)");
    const mql576 = window.matchMedia("(max-width: 576px)");

    function handlerForMediaQueries(x) {
        if (mql768.matches) { // If media query matches

        } else {

        }
    }

    function handlerForMediaQueries576(x) {
        if(mql576.matches) {

        } else {

        }
    }

    function handlerForMediaQueries1200(x) {
        if(mql1200.matches) {

        } else {

        }
    }

    //===========================================
   const windowInner = window.visualViewport ? window.visualViewport.width : window.innerWidth;
    //console.log(windowInner, window.innerWidth);
    if (windowInner < 1200 && windowInner > 768) {
        handlerForMediaQueries1200();
    } else if (windowInner <= 768 &&  windowInner > 576) {
        handlerForMediaQueries();
    } else if (windowInner <= 576 ) {
        handlerForMediaQueries576();
    }
    try {
        // Chrome & Firefox
        mql1200.addEventListener("change", () => {
            handlerForMediaQueries1200();
        });
        mql768.addEventListener("change", () => {
            handlerForMediaQueries();
        });
        mql576.addEventListener("change", () => {
            handlerForMediaQueries576();
        });
    } catch (e1) {
        try {
            // Safari
            /*darkMediaQuery.addListener((e) => {
                this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
            });*/
            mql1200.addListener((e) => {
                handlerForMediaQueries1200();
            });
            mql768.addListener((e) => {
                handlerForMediaQueries();
                //alert('inside');
            });
            mql576.addListener( (e) => {
                handlerForMediaQueries576();
            });
        } catch (e2) {
            console.error(e2);
        }
    }
});
