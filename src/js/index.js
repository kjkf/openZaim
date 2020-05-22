
function formatCurrency(n, currency){
    var s = String(n);
    if (s.length <= 4) return s + currency;
    var k = s.indexOf(".");
    if (k < 0) {
        k = s.length;
    } else {
        s += "00"
    }

    s = s.substr(0, k + 3);
    for (var i = k - 3, j = n < 0 ? 1 : 0; i > j; i -= 3) s = s.substr(0, i) + " " + s.substr(i);

    return s + currency;

}

function formatTerm(n) {
    //console.log(n);
    if (n <= 31) {
        const lastSymbol = parseInt(n.toString().slice(-1));
        if (lastSymbol === 1 && n !== 11) return n + ' день';
        if (n < 5 || (lastSymbol < 5 && n > 20)) return n + ' дня';
        return n + ' дней';
    }

    if (n <= 365) {
        const month = Math.ceil(n / 31);
        if (month === 1) return month + ' месяц';
        if (month < 5) return month + ' месяца';
        return month + ' месяцев';
    }

    const year = parseInt(n / 365);
    const yearRound = Math.round(n / 365 * 10) / 10;
    const yearRes = yearRound - year < 0.5 ? year : year + 0.5;

    if (yearRes === 1) return yearRes + ' год';
    return yearRes + ' года';
}

$(document).ready( function() {
  const header = document.querySelector('header');
  window.addEventListener('scroll', e => {
    header.style.opacity = '.7';
    if (pageYOffset === 0) header.style.opacity = '1';
  });

  const btn_gamburg = document.getElementById('btn_gamburg');
  if (btn_gamburg) {
    const header__menu = document.querySelector('.header__menu');
    btn_gamburg.addEventListener('click', () => {
      header__menu.classList.add('active');
      const btn_close = header__menu.querySelector('#btn_close');
      btn_close.addEventListener('click', e => {
          header__menu.classList.remove('active');
      });
      const links = header__menu.querySelectorAll('.menu-item');
      links.forEach(link => link.addEventListener('click', e => btn_close.click()))
    });
  }
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                const isInvalid = form.querySelectorAll('.is-invalid');
                if ((form.checkValidity() === false) || isInvalid.length > 0){
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });

        $("#phone").mask("+7 (9##) ### ## ##", {
            autoclear: false,
            placeholder: '_'
        });

        const inputList = document.querySelectorAll('.form-control');
        inputList.forEach(input => {
            input.addEventListener('keyup', e => {
                const mask = input.dataset.mask ? input.dataset.mask : '';
                //console.log('keyup =-=-=-=', input.value, );
                //console.log(mask, '=-=', input.value);
                if (input.value !== '' && input.value !== mask) {
                    input.classList.remove('disabled');
                } else {
                    input.classList.add('disabled');

                }
            })
        });

        var whatbrowser=new WhatBrowser;
        if (whatbrowser) {
            const browserSpan = document.getElementById('browserName');
            const osSpan = document.getElementById('osName');
            const deviceSpan = document.getElementById('deviceName');

            if (browserSpan) browserSpan.innerHTML = `${whatbrowser.ua.browser.name} ${whatbrowser.ua.browser.major}`;
            if (osSpan) osSpan.innerHTML = `${whatbrowser.ua.os.name} ${whatbrowser.ua.os.version}`;
            if (deviceSpan) deviceSpan.innerHTML = whatbrowser.ua.device.name ? `${whatbrowser.ua.device.name}` : 'Компьютер';
        }
        const ipSpan = document.getElementById('ipadress');
        if (ipSpan) {
            $.get('https://www.cloudflare.com/cdn-cgi/trace', function(data) {
                const regexp = /\b(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\b/;
                const result = data.match(regexp);

                //console.log(data, result);
                if (result) ipSpan.innerHTML = result[0];
            })
        }

    }, false);

    $("a[id != 'my_offer-tab']").on('click', function (e) {
        $('.offer-bl-wrap').hide();
    });
    $("#my_offer-tab").on('click', function (e) {
        $('.offer-bl-wrap').show();
    });
});
