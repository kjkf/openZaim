$(document).ready( function() {
// ============ DADATA ==================
 /*   console.log('=== DADATA start === 7777');
    const token = "19d220bd37bd3ed2856f17882140bbbde39ead9d";
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

//Кем выдан паспорт
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
//var token = "19d220bd37bd3ed2856f17882140bbbde39ead9d";

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

    var type  = "ADDRESS";
    var $region = $("#region_l");
    var $city   = $("#city_l");
    var $street = $("#st_l");

// регион и район
    $region.suggestions({
        token: token,
        type: type,
        hint: false,
        bounds: "region"
    });

// город и населенный пункт
    $city.suggestions({
        token: token,
        type: type,
        hint: false,
        bounds: "city-settlement",
        constraints: $region,
        formatSelected: formatCity
    });

// улица
    $street.suggestions({
        token: token,
        type: type,
        hint: false,
        bounds: "street",
        constraints: $city,
        count: 15
    });

    var type  = "ADDRESS";
    var $region = $("#region_r");
    var $city   = $("#city_r");
    var $street = $("#st_r");

// регион и район
    $region.suggestions({
        token: token,
        type: type,
        hint: false,
        bounds: "region"
    });

// город и населенный пункт
    $city.suggestions({
        token: token,
        type: type,
        hint: false,
        bounds: "city-settlement",
        constraints: $region,
        formatSelected: formatCity
    });

// улица
    $street.suggestions({
        token: token,
        type: type,
        hint: false,
        bounds: "street",
        constraints: $city,
        count: 15
    });*/
});
