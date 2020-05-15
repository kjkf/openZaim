const form = document.querySelector('.form');
//console.log(form);
if (form) {
    const nextBtn = document.getElementById('next');
    const prevBtn = document.getElementById('prev');
    const footer = document.querySelector('.form-footer');
    const stepNumSpan = document.querySelector('.stepNum');
    let step = 1;
    nextBtn.addEventListener('click', e => {
        if (step >= 4) return;
        step = changeStep(step, 'next');
    });

    prevBtn.addEventListener('click', e => {
        if(step <= 1) return;
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
                const checkBox = footerStepOne.querySelector('#accept');
                const isAccepts = checkBox && checkBox.checked;
                if (!isAccepts) {
                    return stepNum;
                }

                footerStepOne.style.display = 'none';
                footerStepElse.classList.add('d-flex');
            }

            if (goalStep > 2) {
                footerText.style.display = 'none';
            } else if (goalStep === 2) {
                footerText.style.display = 'block';
            }

            if (goalStep === 1) {
                footerStepOne.style.display = 'block';
                footerStepElse.classList.remove('d-flex');
            }

            currentStepBlock.style.display = 'none';
            goalStepBlock.style.display = 'block';
            stepNumSpan.innerHTML = goalStep;
            return goalStep;
        }
    }

}