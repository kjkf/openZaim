const form = document.querySelector('.form');
//console.log(form);
if (form) {
    const nextBtn = document.getElementById('next');
    const prevBtn = document.getElementById('prev');
    const footer = document.querySelector('.form-footer');
    const stepNumSpan = document.querySelector('.stepNum');
    const amountRange = document.getElementById('amountRange');
    console.log('===', amountRange.value);
    let step = 1;
    nextBtn.addEventListener('click', e => {
        console.log('---', step);
        if (step >= 4) return;
        step = changeStep(step, 'next');
    });

    prevBtn.addEventListener('click', e => {
        if(step <= 1) return;
        e.preventDefault();
        step = changeStep(step, 'prev');
    });

    function changeStep(stepNum, direction) {
        const goalStep = direction === 'next' ? stepNum + 1 : stepNum - 1;
        const currentStepBlock = form.querySelector(`.step[data-step-num="${stepNum}"]`);
        const goalStepBlock = form.querySelector(`.step[data-step-num="${goalStep}"]`);

        const footerStepOne = stepNum === 1 || goalStep === 1 ?  footer.querySelector(`[data-step-num="1"]`) : null;
        const footerStepElse = footer.querySelector(` [data-step-num="2"]`);
        const footerText = footerStepElse.querySelector('.form__footer-text');

        if (goalStepBlock) {

            if (stepNum === 1) {
                const checkBox = footer.querySelector('#accept');
                console.log(checkBox);
                const isAccepts = checkBox && checkBox.checked;
                console.log('isAccepts = ' + isAccepts);
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

}