
$(document).ready( function() {
    const form = document.querySelector('.form');
//console.log(form);
    if (form) {
        var whatbrowser=new WhatBrowser;
        if (whatbrowser) {
            const browserSpan = document.getElementById('browserName');
            const osSpan = document.getElementById('osName');
            const deviceSpan = document.getElementById('deviceName');
            browserSpan.innerHTML = `${whatbrowser.ua.browser.name} ${whatbrowser.ua.browser.major}`;
            osSpan.innerHTML = `${whatbrowser.ua.os.name} ${whatbrowser.ua.os.version}`;
            deviceSpan.innerHTML = whatbrowser.ua.device.name ? `${whatbrowser.ua.device.name}` : 'Компьютер';
            console.log(whatbrowser.ua.browser);
            console.log(whatbrowser.ua.os);
            console.log(whatbrowser.ua.device);
        }

        const validateList = [
            ['fio', 'dateBirth', 'email', 'phoneNum'],
            ['passport', 'departmentCode', 'dateOfIssue', 'issuedBy'],
            ['streetRegistration', 'homeRegistration', 'cityRegistration']
        ];

        const nextBtn = document.getElementById('next');
        const prevBtn = document.getElementById('prev');
        const footer = document.querySelector('.form-footer');
        const stepNumSpan = document.querySelector('.stepNum');
        const amountRange = document.getElementById('amountRange');

        const yesBtn = document.getElementById('yesBtn');
        const noBtn = document.getElementById('noBtn');

        const progressBar = document.querySelector('.green-rect');
        const subtitle = document.querySelector('.subtitle');

        $("#phoneNum").mask("+7 (9##) ### ## ##", {
            autoclear: false,
            placeholder: ' '
        });
        $("#dateBirth").mask("##.##.####", {
            autoclear: false,
            placeholder: '_',
            completed: function() {
                console.log('=-=-=-=-=-=-');
                console.log( $("#dateBirth").val() );
            }
        });
        $("#dateOfIssue").mask("##.##.####", {
            autoclear: false,
            placeholder: ' '
        });
        $("#passport").mask("#### #####", {
            autoclear: false,
            placeholder: ' '
        });

        let step = 1;
        nextBtn.addEventListener('click', e => {
            if (step >= 4) return;
            step = changeStep(step, 'next');
        });

        prevBtn.addEventListener('click', e => {
            if(step <= 1) return;
            e.preventDefault();
            step = changeStep(step, 'prev');
            prepareValidate(step);
        });

        /*form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                console.log('=== invalid');
                event.preventDefault();
                event.stopPropagation();
                return;
            }
            form.classList.add('was-validated');
            if (step < 4) event.preventDefault();
            step = changeStep(step, 'next');
            prepareValidate(step);
        });*/

        noBtn.addEventListener('click', e => {
            const factAddress = document.getElementById('factAddress');
            factAddress.classList.remove('d-none');
        });

        function changeStep(stepNum, direction) {
            console.log('changeStep');
            const goalStep = direction === 'next' ? stepNum + 1 : stepNum - 1;
            const currentStepBlock = form.querySelector(`.step[data-step-num="${stepNum}"]`);
            const goalStepBlock = form.querySelector(`.step[data-step-num="${goalStep}"]`);

            const footerStepOne = stepNum === 1 || goalStep === 1 ?  footer.querySelector(`[data-step-num="1"]`) : null;
            const footerStepElse = footer.querySelector(` [data-step-num="2"]`);
            const footerText = footerStepElse.querySelector('.form__footer-text');

            if (goalStepBlock) {

                if (stepNum === 1) {
                    const checkBox = footer.querySelector('#accept');
                    const isAccepts = checkBox && checkBox.checked;
                    if (!isAccepts) {
                        return stepNum;
                    }

                    footerStepOne.style.display = 'none';
                    footerStepElse.classList.add('d-flex');
                }

                if (goalStep === 2) {
                    footerText.style.display = 'block';
                } else if (goalStep === 3) {
                    footerText.style.display = 'none';
                }

                if (goalStep === 4) {
                    footer.style.display = 'none';
                }

                if (goalStep === 1) {
                    footerStepOne.style.display = 'block';
                    footerStepElse.classList.remove('d-flex');
                    footer.classList.remove('step-2');
                    //form.style.paddingTop = '86px';

                    const btnWrapper = footer.querySelector('.prev-btn-wrapper');
                    btnWrapper.classList.add('col-xl-1');
                    btnWrapper.insertAdjacentElement('afterBegin', prevBtn);
                } else {
                    footer.classList.add('step-2');
                    const windowInner = window.visualViewport ? window.visualViewport.width : window.innerWidth;
                    if (windowInner < 1200) {
                        const btnWrapper = prevBtn.parentNode;
                        btnWrapper.classList.remove('col-xl-1');
                        nextBtn.insertAdjacentElement('beforeBegin', prevBtn);
                        footer.classList.add('laptop');
                    } else {
                        //form.style.paddingTop = '50px';
                        const btnWrapper = footer.querySelector('.prev-btn-wrapper');
                        btnWrapper.classList.add('col-xl-1');
                        btnWrapper.insertAdjacentElement('afterBegin', prevBtn);
                        footer.classList.remove('laptop');
                    }

                }
                stepProgressbar(goalStep);
                currentStepBlock.style.display = 'none';
                goalStepBlock.style.display = 'block';
                stepNumSpan.innerHTML = goalStep;
                form.dataset.step = goalStep;
                return goalStep;
            }
        }

        function stepProgressbar(step) {
            const formWidth = form.getBoundingClientRect().width;
            const progress = formWidth * step / 4;

            progressBar.style.width = `${progress}px`;
            if (step === 4) {
                subtitle.innerHTML = 'Проверенно 1024 параметра - 20% осталось';
            } else {
                subtitle.innerHTML = '+10% к одобрению за добавление номера Вашего мобильного телефона';
            }
        }

        function prepareValidate(step) {
            const valStep = step - 1;
            const currentValidateFields = validateList[valStep];
           // console.log(currentValidateFields);
            let required = document.querySelectorAll('[required]');
           // console.log(required);
            if (!currentValidateFields || !required) return;
            required.forEach(field => field.removeAttribute('required'));
            currentValidateFields.forEach(id => {
                const field = document.getElementById(id);
                field.setAttribute('required', '')
            });
        }

        const inputList = document.querySelectorAll('.form-control');
        //console.log(inputList);
        inputList.forEach(input => {
            input.addEventListener('input', e => {
                if (input.value !== '') {
                    input.classList.remove('disabled');
                } else {
                    input.classList.add('disabled');
                }
            })
        });
// ============ DADATA ==================
     /*   <!-- Емеил -->
        $("#email").suggestions({
            token: "19d220bd37bd3ed2856f17882140bbbde39ead9d",
            type: "EMAIL",
            /!* Вызывается, когда пользователь выбирает одну из подсказок *!/
            onSelect: function(suggestion) {
                console.log(suggestion);
            }
        });
        <!-- фио -->
        $("#fio").suggestions({
            token: "19d220bd37bd3ed2856f17882140bbbde39ead9d",
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
        }

        function clearSelected() {
            $("#surname").val("");
            $("#name").val("");
            $("#patronymic").val("");
            $("#gender").val("");
        }

        <!-- Кем выдан паспорт -->
        var token = "19d220bd37bd3ed2856f17882140bbbde39ead9d";

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
        <!-- Место работы -->
        var sgt = $("#place_work").suggestions({
            token: "19d220bd37bd3ed2856f17882140bbbde39ead9d",
            type: "PARTY",
            noSuggestionsHint: "Ну, бывает... Оставьте тогда поле пустым!"
        }).suggestions();

        <!-- Кем выдан паспорт 19d220bd37bd3ed2856f17882140bbbde39ead9d-->
        var token = "19d220bd37bd3ed2856f17882140bbbde39ead9d";

        function join(arr /!*, separator *!/) {
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

        function join(arr /!*, separator *!/) {
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
        });
*/
    }
});