
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
  const header = document.querySelector('.header');
  window.addEventListener('scroll', e => {
    header.style.opacity = '.7';
    if (pageYOffset === 0) header.style.opacity = '1';
  })

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
                if ((form.checkValidity() === false)){
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);

});
