export default function invitationRed() {
    let btn = document.getElementsByClassName('choice__btn'),
        overlay = document.querySelector('.inv-overlay'),
        modal = document.querySelector('.inv-modal'),
        input = modal.getElementsByTagName('input'),
        card = document.getElementsByClassName('invitation-block')[0],
        textArea = modal.getElementsByTagName('textarea')[0],
        oldDiv = [];




    btn[0].addEventListener('click', () => {

        fromCard();

        overlay.style.display = 'block';
        overlay.classList.add('animated', 'fadeIn');
        modal.style.display = 'block';
        modal.classList.add('animated', 'zoomIn');
    });

    document.addEventListener('click', (e) => {

        if (e.target == overlay || e.target.className == 'popup-close') {
            fromModal();
            overlay.classList.remove('fadeIn');
            overlay.classList.add('fadeOut');

            modal.classList.remove('zoomIn');
            modal.classList.add('zoomOut');

            setTimeout(() => {
                overlay.style.display = '';
                modal.style.display = '';
                overlay.classList.remove('fadeOut');
                modal.classList.remove('zoomOut');
            }, 1000);
        }

    });

    btn[3].addEventListener('click', () => {
        for (let i = 0; i < oldDiv.length; i++) {
            card.querySelector(`.${oldDiv[i][0]}`).textContent = oldDiv[i][1];
        }

        fromCard();

    });


    function fromCard() {

        textArea.value = card.querySelector(`.${textArea.className}`).textContent.replace(/\s+/g, ' ').trim();

        if (oldDiv.length == 0) {
            oldDiv.push([textArea.className, card.querySelector(`.${textArea.className}`).textContent]);
        }



        for (let i = 0; i < input.length; i++) {
            input[i].value = card.querySelector(`.${input[i].className}`).textContent.trim();

            if (oldDiv.length < (input.length + 1)) {
                oldDiv.push([input[i].className, card.querySelector(`.${input[i].className}`).textContent]);

            }
        }
    }

    function fromModal() {
        card.querySelector(`.${textArea.className}`).textContent = textArea.value;

        for (let i = 0; i < input.length; i++) {
            card.querySelector(`.${input[i].className}`).textContent = input[i].value;
        }
    }

}