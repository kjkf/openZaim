
$(document).ready( function() {
    const form = document.querySelector('form[name=applForm]');
    //console.log(form);
    if (form) {

        const validateList = [
            ['fio', 'dateBirth', 'email', 'phone'],
            ['p_number', 'p_code', 'p_date', 'p_place'],
            ['st_l', 'hse_l', 'city_l']
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

        $("#dateBirth").mask("##.##.####", {
            autoclear: false,
            placeholder: '_',
            completed: function (val) {
                const regexp = /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[.-]([0]?[1-9]|[1][0-2])[.-]([0-9]{4}|[0-9]{2})$/;

                if (!regexp.test($("#dateBirth").val())) {
                    //$("#dateBirth").val('');
                    //$("#dateBirth").blur();

                    $("#dateBirth").addClass('invalid');
                }
                const currentYear = new Date().getFullYear();
                const year = $("#dateBirth").val().slice(-4);
                const diff = currentYear - year;
                //console.log(currentYear, year, '===', diff);
                if (diff < 17 || diff > 100) {
                    $("#dateBirth").addClass('is-invalid');
                } else {
                    $("#dateBirth").removeClass('is-invalid');
                }

            }
        });
        $("#p_date").mask("##.##.####", {
            autoclear: false,
            placeholder: '_'
        });
        $("#p_number").mask("#### #####", {
            autoclear: false,
            placeholder: '_'
        });

        $("#email").blur(e => {
            if ($("#email").val().slice(-9).toLowerCase() === '@gmail.ru') {
                $("#email").addClass('is-invalid');
            } else {
                $("#email").removeClass('is-invalid');
            }
        });

        let step = 1;
        nextBtn.addEventListener('click', e => {
            if (step >= 4) return;
            //step = changeStep(step, 'next');
        });

        prevBtn.addEventListener('click', e => {
            if (step <= 1) return;
            e.preventDefault();
            step = changeStep(step, 'prev');
            prepareValidate(step);
        });

        form.addEventListener('submit', event => {
            const isInvalid = document.querySelectorAll('.is-invalid');
            if (!form.checkValidity() || isInvalid.length > 0) {
                event.preventDefault();
                event.stopPropagation();
                return;
            }
            form.classList.add('was-validated');
            if (step < 4) event.preventDefault();
            step = changeStep(step, 'next');
            prepareValidate(step);
        });
        noBtn.addEventListener('click', e => {
            const factAddress = document.getElementById('factAddress');
            factAddress.classList.remove('d-none');
        });

        function changeStep(stepNum, direction) {
            //console.log('changeStep');
            const goalStep = direction === 'next' ? stepNum + 1 : stepNum - 1;
            const currentStepBlock = form.querySelector(`.step[data-step-num="${stepNum}"]`);
            const goalStepBlock = form.querySelector(`.step[data-step-num="${goalStep}"]`);

            const footerStepOne = stepNum === 1 || goalStep === 1 ? footer.querySelector(`[data-step-num="1"]`) : null;
            const footerStepElse = footer.querySelector(` [data-step-num="2"]`);
            const footerText = footerStepElse.querySelector('.form__footer-text');

            if (goalStepBlock) {

                if (stepNum === 1) {
                    const checkBox = footer.querySelector('#checkbox');
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
                        //btnWrapper.classList.remove('col-xl-1');
                        nextBtn.insertAdjacentElement('beforeBegin', prevBtn);
                        footer.classList.add('laptop');
                    } else {
                        //form.style.paddingTop = '50px';
                        const btnWrapper = footer.querySelector('.prev-btn-wrapper');
                        //btnWrapper.classList.add('col-xl-1');
                        btnWrapper.insertAdjacentElement('afterBegin', prevBtn);
                        footer.classList.remove('laptop');
                    }

                }
                stepProgressbar(goalStep);
                if (goalStep === 4) checkProgress();
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
// эти функции только фикция для отображения функционала прогрессбара
        function checkProgress() {
            const elem = document.querySelector(".green-rect");
            let width = 0;
            const allParams = 1280; //случайное число; общее количество параметров для проверки
            let checkedParams;
            let id = setInterval(frame, 100);
            //subtitle.innerHTML = 'Проверенно 1024 параметра - 20% осталось';
            const paramsWithoutStatus = document.querySelectorAll('.ic-status--loader');
            let paramsWithoutStatusArray = Array.from(paramsWithoutStatus);

            function frame() {
                if (width >= 100) {
                    clearInterval(id);
                } else {
                    width++;
                    checkedParams = Math.round(allParams * width / 100);
                    elem.style.width = width + "%";
                    subtitle.innerHTML = `Проверенно ${checkedParams} параметра - ${100 - width}% осталось`;
                    if (paramsWithoutStatusArray.length > 0 && width % 7 === 0) {
                        const currentParam = paramsWithoutStatusArray.shift();
                        setCheckStatus(currentParam);
                    }
                }
            }
        }
        
        function setCheckStatus(elem) {
            elem.classList.remove('ic-status--loader');
            elem.classList.add('ic-status--valid');
        }
    }
});/**/

