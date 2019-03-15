export default function tarifModal() {
    let pricing = document.querySelector('.pricing'),
        overlay = document.querySelector('.js-overlay-thank-you'),
        close = overlay.querySelector('.popup-close'),
        radio = document.getElementsByName('use-choice');

    pricing.addEventListener('click', (e) => {
        let target = e.target;
        if (target.tagName == 'BUTTON' && target.classList.contains('pricing-block__button')) {
            for (let i = 0; i < radio.length; i++) {
                if (target.className.match(radio[i].getAttribute('id'))) {
                    radio[i].checked = true;
                }
            }

            showModal(overlay.querySelector('.js-overlay-popup'));
        }
    });

    overlay.addEventListener('click', (e) => {
        let target = e.target;
        if (target.classList.contains('js-overlay-thank-you') || target.classList.contains('popup-close') || target.classList.contains('popup-form__btn_2')) {
            hideModal(overlay.querySelector('.js-overlay-popup'));
        }
    });

    function showModal(modal) {
        overlay.style.display = 'block';
        overlay.classList.add('animated', 'fadeIn');

        resizing(modal);

        modal.classList.add('animated', 'swing');
    }

    function hideModal(modal) {
        modal.classList.remove('animated', 'swing');
        modal.classList.add('animated', 'flipOutX');
        overlay.classList.remove('animated', 'fadeIn');
        overlay.classList.add('animated', 'fadeOut');
        setTimeout(() => {
            overlay.style.display = '';
            overlay.classList.remove('animated', 'fadeOut');
            modal.classList.remove('animated', 'flipOutX');
        }, 1000)
    }

    function resizing(modal) {
        let browserWidth = document.documentElement.clientWidth,
            modalWidth = modal.offsetWidth,
            margin = (browserWidth - modalWidth) / 2;

        modal.style.left = `${margin}px`;
    }
}