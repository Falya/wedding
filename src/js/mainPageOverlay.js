export default function mainPageOverlay() {

    let headerButton = document.getElementsByClassName('header-login__button')[0],
        footerButton = document.getElementsByClassName('footer-login__button')[0],
        overlay = document.querySelector('.overlay'),
        modal = document.querySelector('.popup'),
        close = document.querySelector('.popup-close');

    function showModal() {

        overlay.style.display = 'block';
        overlay.classList.add('animated', 'fadeIn');


        resizing();

        modal.classList.add('animated', 'flipInX');

    }

    function hideModal() {
        modal.classList.remove('animated', 'flipInX');
        modal.classList.add('animated', 'flipOutX');
        overlay.classList.remove('animated', 'fadeIn');
        overlay.classList.add('animated', 'fadeOut');
        setTimeout(() => {
            overlay.style.display = '';
            overlay.classList.remove('animated', 'fadeOut');
            modal.classList.remove('animated', 'flipOutX');
        }, 1000)
    }

    function resizing() {
        let browserWidth = document.documentElement.clientWidth,
            modalWidth = modal.offsetWidth,
            margin = (browserWidth - modalWidth) / 2;
        modal.style.left = `${margin}px`;
    }

    headerButton.addEventListener('click', () => {
        showModal();
    });

    footerButton.addEventListener('click', () => {
        showModal();
    });

    close.addEventListener('click', hideModal);
    overlay.addEventListener('click', (e) => {
        let target = e.target;
        if (target.classList.contains('overlay')) {
            hideModal();
        }
    });

    window.addEventListener('resize', resizing);

}