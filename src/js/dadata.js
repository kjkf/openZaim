$(document).ready( function() {
// ============ DADATA ==================
   /* const applForm = document.querySelector('form[name=applForm]');
    const loginForm = document.querySelector('.login-form__form');
    const feedbackForm = document.querySelector('#form_feedback');

    const token = "19d220bd37bd3ed2856f17882140bbbde39ead9d";

    if (applForm) {
        console.log('=== DADATA start === 7777');

//Емеил
        $("#email").suggestions({
            token: token,
            type: "EMAIL",
            //!* Вызывается, когда пользователь выбирает одну из подсказок *!/
            onSelect: function(suggestion) {
                console.log(suggestion);
            }
        });

//фио
        $("#fio").suggestions({
            token: token,
            type: "NAME",
            onSelect: showSelected,
            onSelectNothing: clearSelected
        });

//Кем выдан паспорт
        $("#p_code").suggestions({
            token: token,
            type: "fms_unit",
            formatResult: formatResult,
            onSelect: showSuggestion,
            onSelectNothing: clearSuggestion
        });
//Место работы
        var sgt = $("#place_work").suggestions({
            token: token,
            type: "PARTY",
            noSuggestionsHint: "Ну, бывает... Оставьте тогда поле пустым!"
        }).suggestions();

//Кем выдан паспорт 19d220bd37bd3ed2856f17882140bbbde39ead9d

        var type  = "ADDRESS";
        var $regionL = $("#region_l");
        var $cityL   = $("#city_l");
        var $streetL = $("#st_l");

// регион и район по паспорту
        $regionL.suggestions({
            token: token,
            type: type,
            hint: false,
            bounds: "region"
        });

// город и населенный пункт по паспорту
        $cityL.suggestions({
            token: token,
            type: type,
            hint: false,
            bounds: "city-settlement",
            constraints: $regionL,
            formatSelected: formatCity
        });

// улица по паспорту
        $streetL.suggestions({
            token: token,
            type: type,
            hint: false,
            bounds: "street",
            constraints: $cityL,
            count: 15
        });

        var $regionR = $("#region_r");
        var $cityR   = $("#city_r");
        var $streetR = $("#st_r");

// регион и район проживания
        $regionR.suggestions({
            token: token,
            type: type,
            hint: false,
            bounds: "region"
        });

// город и населенный пункт проживания
        $cityR.suggestions({
            token: token,
            type: type,
            hint: false,
            bounds: "city-settlement",
            constraints: $regionR,
            formatSelected: formatCity
        });

// улица проживания
        $streetR.suggestions({
            token: token,
            type: type,
            hint: false,
            bounds: "street",
            constraints: $cityR,
            count: 15
        });
    }

    if (loginForm) {
//фио
        $("#fio").suggestions({
            token: token,
            type: "NAME",
            onSelect: showSelected,
            onSelectNothing: clearSelected
        });
    }
    if (feedbackForm) {
//фио
        $("#fio").suggestions({
            token: token,
            type: "NAME",
            onSelect: showSelected,
            onSelectNothing: clearSelected
        });
//Емеил
        $("#email").suggestions({
            token: token,
            type: "EMAIL",
            //!* Вызывается, когда пользователь выбирает одну из подсказок *!/
            onSelect: function(suggestion) {
                console.log(suggestion);
            }
        });

        $("#email").blur(e => {
            if ($("#email").val().slice(-9).toLowerCase() === '@gmail.ru') {
                $("#email").addClass('is-invalid');
            } else {
                $("#email").removeClass('is-invalid');
            }
        });
    }

    function formatResult(value, currentValue, suggestion) {
        suggestion.value = suggestion.data.code;
        return suggestion.data.code + " — " + suggestion.data.name;
    }

    function showSuggestion(suggestion) {
        console.log(suggestion);
        $("#p_place").val(suggestion.data.name);
    }

    function clearSuggestion() {
        $("#p_place").val("");
    }


    function ruGender(gender) {
        return gender === "MALE" ? "мужской" :
            gender === "FEMALE" ? "женский" :
                "не определен";
    }

    function showSelected(suggestion) {
        var fio = suggestion.data;
        $("#surname").val(fio.surname);
        $("#name").val(fio.name);
        $("#patronymic").val(fio.patronymic);
        $("#gender").val(ruGender(fio.gender));
        const gender = fio.gender.toLowerCase();
        const classList = 'male female';
        const removeCLass = classList.replace(gender, '').trim(gender);
        //$("#fio").siblings('.form-control-img').addClass(gender).removeClass(removeCLass);
        $("#fio").addClass(gender).removeClass(removeCLass);
        //console.log(fio.gender, '*****', gender,'===', removeCLass);
    }

    function clearSelected() {
        $("#surname").val("");
        $("#name").val("");
        $("#patronymic").val("");
        $("#gender").val("");
    }

    function join(arr) {
        var separator = arguments.length > 1 ? arguments[1] : ", ";
        return arr.filter(function(n){return n}).join(separator);
    }

    function formatCity(suggestion) {
        var address = suggestion.data;
        if (address.city_with_type === address.region_with_type) {
            return address.settlement_with_type || "";
        } else {
            return join([
                address.city_with_type,
                address.settlement_with_type]);
        }
    }
*/});
