export default function whishBook() {
    let tabs = document.querySelector('.location-button'),
        tab = tabs.getElementsByTagName('button'),
        first = document.getElementById('first'),
        second = document.getElementById('second');


    tabs.parentNode.addEventListener('click', (e) => {
        let target = e.target;

        if (target.getAttribute('id') == 'tab1' && !target.classList.contains('book-active-tab')) {

            second.classList.add('animated', 'fadeOutRight');

            setTimeout(() => {
                second.style.display = '';
                first.style.display = '';
                first.classList.remove('animated', 'fadeOutLeft');
                first.classList.add('animated', 'fadeInLeft');
            }, 300);
        } else if (target.getAttribute('id') == 'tab2' && !target.classList.contains('book-active-tab')) {
            first.classList.add('animated', 'fadeOutLeft');
            setTimeout(() => {
                    first.style.display = 'none';
                    second.style.display = 'block';
                    second.classList.remove('animated', 'fadeOutRight');
                    second.classList.add('animated', 'fadeInRight');
                }

                , 300)


        }
        for (let i = 0; i < tab.length; i++) {
            tab[i].classList.remove('book-active-tab');
        }
        target.classList.add('book-active-tab');
    });



    //редактирование карточек

    let title = document.getElementsByClassName('book-block__title'),
        subtitle = document.getElementsByClassName('book-block__subtitle'),
        fromH = [null, null],
        form = document.getElementsByClassName('form-book'),
        originWishes = [
            [],
            []
        ],
        clear = document.querySelector('.choice__btn-4');
    console.log("originWishes", originWishes);


    for (let i = 0; i < form.length; i++) {

        originWishes[i][0] = title[i].textContent;
        originWishes[i][1] = subtitle[i].textContent;

        console.log("originWishes[i]", originWishes[i]);

        form[i].addEventListener('submit', (e) => {
            e.preventDefault();

            let input = form[i].getElementsByTagName('input'),
                textarea = form[i].getElementsByTagName('textarea')[0];
            title[i].textContent = input[1].value;
            subtitle[i].textContent = textarea.value;

            if (fromH[i] == null) {
                fromH[i] = document.createElement('div');
                title[i].parentNode.appendChild(fromH[i]);
                fromH[i].classList.add('book-block__fromH');
                fromH[i].textContent = input[0].value;
            } else {
                fromH[i].textContent = input[0].value;
            }

        });
    }

    clear.addEventListener('click', () => {

        first.classList.add('animated', 'fadeOut');
        second.classList.add('animated', 'fadeOut');
        setTimeout(() => {

            for (let i = 0; i < originWishes.length; i++) {
                title[i].textContent = originWishes[i][0];
                subtitle[i].textContent = originWishes[i][1];

                if (fromH[i]) {
                    fromH[i].remove();

                }
            }

            first.classList.remove('animated', 'fadeOut');
            second.classList.remove('animated', 'fadeOut');

            first.classList.add('animated', 'fadeIn');
            second.classList.add('animated', 'fadeIn');

            setTimeout(() => {
                first.classList.remove('animated', 'fadeIn');
                second.classList.remove('animated', 'fadeIn');
            }, 400);
        }, 400);



    });

}