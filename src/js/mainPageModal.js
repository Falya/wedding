export default function mainPageModal(overlayClass, thanksClass = 'popup-form') {
    let overlay = document.querySelector(`.${overlayClass}`),
        form = overlayClass == 'contacts' ? overlay.querySelector('.form-group') : overlay.querySelector('.popup-form_form'),
        input = form.getElementsByTagName('input'),
        progressCont = document.querySelector(`.${thanksClass}`);




    for (let i = 0; i < input.length; i++) {
        if (input[i].getAttribute('type') == 'text') {
            input[i].onkeypress = checkRu;
        }

        if (input[i].getAttribute('type') == 'tel') {

            input[i].setAttribute('pattern', "\\+375 \\([0-9]{2}\\) [0-9]{3}-[0-9]{2}-[0-9]{2}");
            input[i].addEventListener("input", mask, false);
            input[i].addEventListener("focus", mask, false);
            input[i].addEventListener("blur", mask, false);
            input[i].addEventListener("keydown", mask, false);
        }
    }

    //Проверка на русские символы
    function checkRu(e) {
        let evt = e || window.event;
        let code = evt.keyCode;
        if ((code < 1040) || (code > 1103)) {
            if (code == 1105 || code == 32) {
                return true;
            }
            return false;
        }
    }

    //Маска

    function setCursorPosition(pos, elem, event) {
        elem.focus();
        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {
            let range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd("character", pos);
            range.moveStart("character", pos);
            range.select();
        }
    }
    // Сама маска
    function mask(event) {
        let matrix = "+375 (__) ___-__-__",
            i = 0,
            b = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, "");
        if (def.length >= val.length) val = def;

        this.value = matrix.replace(/./g, function(a) {

            // Если есть _ и число и номер символа меньше длинны строки, то возвращаем следующий символ
            // или если номер символа больше длины строки и меньше длины маски, то  (__) ___ __ __
            // Или если нажали на backspace, то возвращаем пустую строчку
            // Иначе просто возвращаем входной сивол
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length && matrix.lengtth >= i ? "(__) ___ __ __" : event.key == "Backspace" && !isNaN(val.charAt(i)) ? '' : a

        });

        if (event.type == "blur") {
            if (this.value.length == 4)
                this.value = "";
            // input[2].value = this.value;
        } else {
            setCursorPosition((this.value.length), this, event);
            // input[2].value = this.value;
        }

    };

    // Ajax
    formSubmit(form);
    let message = new Object();
    message.failure = 'Что-то пошло не так... 404';



    function formSubmit(formName) {

        let close = overlay.querySelector('.popup-close');

        formName.addEventListener('submit', (e) => {
            e.preventDefault();
            let statusMessage = document.createElement('div'),
                divCircle = document.createElement('div'),
                divComplete = document.createElement('div');



            if (thanksClass == 'popup-form') {
                statusMessage.classList.add('status', 'animated');
                progressCont.appendChild(statusMessage);
                statusMessage.style.width = formName.clientWidth + 'px';
            } else {
                let progDiv = progressCont.querySelector('.popup');

                statusMessage.classList.add('status-circle', 'animated');
                progressCont.style.display = 'block';
                statusMessage.style.background = 'none';
                progDiv.style.display = 'none';

                progressCont.appendChild(statusMessage);

            }

            let formData = new FormData();

            for (let i = 0; i < input.length; i++) {
                let name = input[i].getAttribute('type');
                if (name == 'radio') {
                    if (input[i].checked) {

                        formData.append(name, input[i].getAttribute('id'));
                    }

                } else {

                    if (name == 'text') {
                        name = 'name';
                    }
                    formData.append(name, input[i].value);
                }
            }

            if(form.querySelector('textarea')){
                formData.append('message', form.querySelector('textarea').value);
            }

            if (thanksClass != 'popup-form') {
                statusMessage.style.display = 'flex';
            } else {
                statusMessage.style.display = 'block';
            }

            statusMessage.classList.add('fadeIn');
            form.classList.add('blur');
            statusMessage.appendChild(divCircle);
            divCircle.classList.add('circle-loader');

            function postData(data) {
                return new Promise((resolve, reject) => {
                    let request = new XMLHttpRequest();
                    request.open('POST', '../../server.php')
                    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                    request.onreadystatechange = () => {

                        if (request.readyState < 4) {

                            console.log('loading');
                        } else if (request.readyState === 4) {
                            if (request.status == 200 && request.status < 300) {
                                console.log('success');
                                resolve();
                            } else {
                                reject();
                                console.log('fail');
                            }
                        }
                    };
                    request.send(formData);
                });
            }

            function clearInput() {
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }

                if(form.querySelector('textarea')){
                form.querySelector('textarea').value = '';
            }
            }

            postData(formData)

                .then(() => {
                    let progDiv = progressCont.querySelector('.popup');

                    divCircle.appendChild(divComplete);
                    divCircle.classList.add('load-complete');
                    divComplete.classList.add('draw', 'checkmark');
                    setTimeout(() => {
                        statusMessage.classList.remove('fadeIn');
                        statusMessage.classList.add('fadeOut');

                        divCircle.classList.remove('load-complete');
                        divComplete.classList.remove('draw', 'checkmark');
                        setTimeout(() => {
                            statusMessage.style.display = 'none';
                            statusMessage.classList.remove('fadeOut');
                            form.classList.remove('blur');

                            if (thanksClass != 'popup-form') {
                                progDiv.style.display = '';
                                progDiv.classList.add('animated', 'fadeIn');

                                progressCont.addEventListener('click', (e) => {
                                    if (e.target.classList.contains('js-overlay-order') || e.target.classList.contains('popup-close')) {
                                        progressCont.classList.add('animated', 'fadeOut');
                                    }
                                });
                                setTimeout(() => {
                                    progressCont.classList.add('animated', 'fadeOut');

                                    setTimeout(() => {
                                        progressCont.style.display = '';
                                        close.click();
                                    }, 1000)
                                }, 4000);
                            } else {
                                
                            }
                        }, 500);
                    }, 2000);
                })
                .catch(() => {
                    if (thanksClass != 'popup-form') {
                        statusMessage.style.width = '100%';
                        statusMessage.style.left = '0';
                        statusMessage.style.marginLeft = '0';
                    }
                    statusMessage.style.display = 'block';

                    statusMessage.classList.add('fadeIn');
                    statusMessage.cssText = '';
                    statusMessage.innerHTML = message.failure;
                    setTimeout(() => {
                        statusMessage.classList.add('fadeOut');
                        progressCont.classList.add('fadeOut');

                        setTimeout(() => {
                            statusMessage.style.display = 'none';
                            statusMessage.classList.remove('fadeOut');
                            form.classList.remove('blur');

                            if (thanksClass != 'popup-form') {
                                statusMessage.classList.remove('status-circle');
                                statusMessage.style.cssText = '';
                                progressCont.style.display = '';
                            }
                        }, 1000)



                    }, 2000);

                })
                .then(clearInput);
        });
    }

}