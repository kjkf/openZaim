
$(document).ready( function() {
    const form = document.querySelector('.form');
//console.log(form);
    if (form) {
        const validateList = [
            ['fio', 'dateBirth', 'email', 'phoneNum'],
            ['passport', 'departmentCode', 'dateOfIssue', 'issuedBy']
        ];

        const nextBtn = document.getElementById('next');
        const prevBtn = document.getElementById('prev');
        const footer = document.querySelector('.form-footer');
        const stepNumSpan = document.querySelector('.stepNum');
        const amountRange = document.getElementById('amountRange');

        $("#phoneNum").mask("+7 (9##) ### ## ##", {
            autoclear: false,
            placeholder: ' '
        });
        $("#dateBirth").mask("##.##.####", {
            autoclear: false,
            placeholder: ' '
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
            //step = changeStep(step, 'next');
        });

        prevBtn.addEventListener('click', e => {
            if(step <= 1) return;
            e.preventDefault();
            step = changeStep(step, 'prev');
            prepareValidate(step);
        });

        console.log(form);
        form.addEventListener('submit', event => {
            console.log(form.checkValidity());
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

                    form.style.paddingTop = '86px';
                } else {
                    form.style.paddingTop = '50px';
                }

                currentStepBlock.style.display = 'none';
                goalStepBlock.style.display = 'block';
                stepNumSpan.innerHTML = goalStep;
                return goalStep;
            }
        }

        function prepareValidate(step) {
            const valStep = step - 1;
            const currentValidateFields = validateList[valStep];
            console.log(currentValidateFields);
            let required = document.querySelectorAll('[required]');
            console.log(required);
            required.forEach(field => field.removeAttribute('required'));
            currentValidateFields.forEach(id => {
                const field = document.getElementById(id);
                field.setAttribute('required', '')
            });
        }

    }
});