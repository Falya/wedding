export default function youTubeVideo() {
    let youtube = document.querySelector('.youtube'),
        iframe = youtube.querySelector('iframe'),
        curUrl = iframe.getAttribute('src');
    youtube.style.backgroundImage = "url('../img/video/video-bg.jpeg')";
    iframe.style.opacity = 0;


    youtube.addEventListener('click', (e) => {

        iframe.setAttribute('src', `${curUrl}?autoplay=1`);
        let loader = document.querySelector('.lds-ring');
        console.log("loader", loader);
        loader.style.display = 'block';

        setTimeout(() => {
            iframe.style.opacity = 1;
            loader.style.display = '';
            youtube.classList.toggle('youtube');
        }, 1500)

    });


}