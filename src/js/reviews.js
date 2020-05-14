//import { tns } from "../plugins/tiny-slider.js"

if (document.querySelector('.reviews')) {
    var slider = tns({
        container: '.reviews',
        items: 1,
        "mouseDrag": true,
        "slideBy": "page",
        "speed": 400,
        nav: false
        /*,
        responsive: {
            640: {
                edgePadding: 20,
                gutter: 20,
                items: 2
            },
            700: {
                gutter: 30
            },
            900: {
                items: 3
            }
        }*/
    });
}
