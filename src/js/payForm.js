
$(document).ready( function() {
    const applForm = document.querySelector('.pay-form');
    if (!applForm) return;
    $("#cardNumber").mask("#### #### #### ####", {
        autoclear: false,
        placeholder: ' '
    });

    const monthSelect = document.getElementById('cardMonth');
    for (let n = 1; n <= 12; n++) {
        let option = document.createElement('option');
        option.innerHTML = n < 10 ? '0' + n : n;
        monthSelect.insertAdjacentElement('beforeend', option);
    }

    const yearSelect = document.getElementById('cardYear');
    const currentYear = new Date().getFullYear();
    for (let n = 0; n < 12; n++) {
        let option = document.createElement('option');
        option.innerHTML = currentYear + n;
        yearSelect.insertAdjacentElement('beforeend', option);
    }

    const cardNumberInput = document.getElementById('cardNumber');
    const cardItem = document.querySelector('.card-item');
    const inputs = document.querySelectorAll('.card-input__input');
    const cardItemTypeImg = document.querySelectorAll('.card-item__typeImg');
    //console.log(cardNumberInput);

    cardNumberInput.addEventListener('keydown', e => {
        const number = e.target.value.trim();
        //console.log(number, e.target.value, number.length);
        if (number.length > 2) return;
        let imgType = "visa.png";
        /*let re = new RegExp("^4");
        if (number.match(re) != null) return "visa";*/

        let re = new RegExp("^5[1-5]");
        if (number.match(re) != null) imgType = "ic-mastercard.svg";
        //console.log(imgType, `images/icons/${imgType}.svg`);
        cardItemTypeImg.forEach(item => {
            item.src = `images/icons/${imgType}`;
        })
    });

    inputs.forEach(input => {
        input.addEventListener('focus', focusInput);
        input.addEventListener('blur', blurInput);
    });

    const focusElement = document.getElementById('focusElement');
    let isInputFocused = false;

    function focusInput (e) {
        const target = e.target;
        const labelId = target.dataset.label;
        if (!labelId) {
            if (e.target.id === 'cardCvv') cardItem.classList.add('-active');
            return;
        }
        const label = document.getElementById(labelId);

        focusElement.classList.add('-active');
        focusElement.style.width = `${label.offsetWidth}px`;
        focusElement.style.height = `${label.offsetHeight}px`;
        focusElement.style.transform = `translateX(${label.offsetLeft}px) translateY(${label.offsetTop}px)`;
    };

    function blurInput(e) {
        if (!isInputFocused) {
            focusElement.classList.remove('-active');
            focusElement.style.height = 0;
        }
        isInputFocused = false;

        if (e.target.id === 'cardCvv') cardItem.classList.remove('-active');
    };

});