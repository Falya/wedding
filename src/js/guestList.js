export default function guestList() {

    let form = document.querySelector('.form-addguest'),
        input = form.getElementsByTagName('input'),
        button = form.querySelector('.form-button__add'),
        guests = document.getElementsByClassName('builder3-block'),
        clear = document.querySelector('.choice__btn-4');

    button.disabled = true;
    button.style.opacity = '0.2';


    for (let i = 0; i < input.length; i++) {

        input[i].onkeypress = checkRu;
        input[i].value[0]
    }

    form.addEventListener('keyup', () => {

        let isFull = 0;

        for (let i = 0; i < input.length; i++) {

            if (input[i].value != '') {

                isFull++;
                input[i].value = input[i].value.charAt(0).toUpperCase() + input[i].value.substr(1);

            } else {

                isFull = 0;
            }

        }

        if (isFull == input.length) {

            button.disabled = false;
            button.style.opacity = '';

        } else {

            button.disabled = true;
            button.style.opacity = '0.2';

        }
    });

    form.addEventListener('submit', (e) => {

        e.preventDefault();

        let guest = document.createElement('p');
        guest.classList.add('builder3-block__text');

        guest.textContent = `${input[1].value} ${input[0].value}`;

        let m = guests[0].childNodes.length,
            n = guests[0];

        for (let i = 0; i < guests.length; i++) {

            if (guests[i].childNodes.length < m) {

                m = guests[i].childNodes.length;
                n = guests[i];

            }

            n.appendChild(guest);

        }

    });

    clear.addEventListener('click', () => {

        for (let i = 0; i < guests.length; i++) {

            guests[i].textContent = '';

        }
    });

    function checkRu(e) {

        let evt = e || window.event,
            code = evt.keyCode;

        if ((code < 1040) || (code > 1103)) {

            if (code == 1105) {

                return true;
            }
            return false;
        }
    }

}