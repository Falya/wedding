export default function videoWidget() {

    let tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";

    let firstScriptTag = document.body.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    let playerDiv = document.getElementById('q_th_D4VHC0'),
        videoId = playerDiv.getAttribute('id'),
        form = document.querySelector('.form-location');

    playerDiv.style.backgroundImage = `url('https://img.youtube.com/vi/${videoId}/0.jpg')`;

    let postPlayerDiv = document.createElement('div'),
        loader = document.querySelector('.lds-ring');
    playerDiv.appendChild(postPlayerDiv);

    playerDiv.addEventListener('click', () => {

        loader.style.display = 'block';
        onYouTubeIframeAPIReady();


    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let inputVal = form.querySelector('input').value;

        videoId = inputVal.substring(inputVal.indexOf('=') + 1);

        playerDiv.getElementsByTagName('iframe')[0].remove();
        playerDiv.appendChild(postPlayerDiv);
        playerDiv.classList.toggle('youtube');
        onYouTubeIframeAPIReady();
        playerDiv.style.backgroundImage = `url('https://img.youtube.com/vi/${videoId}/0.jpg')`;

    });


    let player;

    function onYouTubeIframeAPIReady() {
        player = new YT.Player(postPlayerDiv, {
            height: '100%',
            width: '100%',
            videoId: videoId,
            events: {
                'onReady': onPlayerReady
            }
        });
    }

    function onPlayerReady(event) {
        event.target.playVideo();
        loader.style.display = 'none';
        playerDiv.classList.toggle('youtube');
    }

}