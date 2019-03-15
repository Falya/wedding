export default function guestLetter() {
    let upload = document.querySelector('.form-album__btn'),
        hiddenInput = document.getElementById('file'),
        uploadField = document.getElementById('signature'),
        form = document.querySelector('.form-signature'),
        uploadField2 = document.getElementById('signature-photo'),
        base64;

    upload.addEventListener('click', () => {
        hiddenInput.click();
    });

    uploadField.readOnly = true;

    hiddenInput.addEventListener('change', function(e) {
        uploadField.value += `${this.files[0].name}; `;
        uploadField2.value += `${this.files[0].name}; `;
        var file = this.files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
            console.log(reader.result);
            base64 = reader.result;
        }
        reader.readAsDataURL(file);

    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let message = new Object();
        message.failure = 'Что-то пошло не так... 404';

        let textarea = form.getElementsByTagName('textarea');

        let statusMessage = document.createElement('div'),
            divCircle = document.createElement('div'),
            divComplete = document.createElement('div');
        statusMessage.classList.add('stat9', 'animated');
        form.querySelector('.form-album-box').appendChild(statusMessage);
        statusMessage.style.width = `${form.offsetWidth / 2}px`;
        statusMessage.style.height = `${form.offsetHeight - 50}px`;

        let formData = new FormData();

        formData.append('photoName', uploadField.value);
        formData.append('imgBase64', base64);
        formData.append('title', textarea[0].value);
        formData.append('description', textarea[1].value);

        statusMessage.style.display = 'block';
        statusMessage.classList.add('fadeIn');
        statusMessage.appendChild(divCircle);
        divCircle.classList.add('circle-loader');

        for (let i = 0; i < textarea.length; i++) {
            textarea[i].classList.add('blur');
        }

        uploadField.classList.add('blur');
        uploadField2.classList.add('blur');

        function postData(data) {
            return new Promise((resolve, reject) => {
                let request = new XMLHttpRequest();

                request.open('POST', '../../server.php');
                request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                request.onreadystatechange = () => {

                    if (request.readyState < 4) {
                        console.log('loading...')
                    } else if (request.readyState === 4) {
                        if (request.status == 200 && request.status < 300) {
                            console.log('success!');
                            resolve();
                        } else {
                            reject();
                            console.log('fail...');
                        }
                    }
                };
                request.send(formData);
            });
        }

        function clearInput() {
            let input = form.getElementsByTagName('input');
            for (let i = 0; i < textarea.length; i++) {
                textarea[i].value = '';
            }

            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }

        }

        postData(formData)
            .then(() => {
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

                        for (let i = 0; i < textarea.length; i++) {
                            textarea[i].classList.remove('blur');
                        }

                        uploadField.classList.remove('blur');
                        uploadField2.classList.remove('blur');
                        statusMessage.remove();
                    }, 500);
                }, 500);


            })
            .catch(() => {
                statusMessage.style.paddingTop = '5%';
                statusMessage.style.display = 'block';
                statusMessage.classList.add('fadeIn');
                statusMessage.cssText = '';
                statusMessage.innerHTML = message.failure;
                setTimeout(() => {
                    statusMessage.classList.add('fadeOut');

                    setTimeout(() => {
                        statusMessage.style.display = 'none';
                        statusMessage.classList.remove('fadeOut');

                        for (let i = 0; i < textarea.length; i++) {
                            textarea[i].classList.remove('blur');
                        }
                        uploadField.classList.remove('blur');
                        uploadField2.classList.remove('blur');
                        statusMessage.remove();
                    }, 500);
                }, 1500);
            })
            .then(clearInput);

    });
}