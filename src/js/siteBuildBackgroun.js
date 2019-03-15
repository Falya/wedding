export default function siteBuildBackgroun() {
	
	let imgBlock = document.getElementsByClassName('minimized');

	for (let i = 0; i < imgBlock.length; i++) {
		imgBlock[i].addEventListener('click', function (e) {
			showModal(this.getAttribute('src'), this.offsetWidth, this.offsetHeight);

		});
	}

function showModal (src, clWidth, clHeight) {
let overlay = document.createElement('div'),
		magnify = document.createElement('div'),
		img = document.createElement('img'),
		close = document.createElement('div'),
		i = document.createElement('i');

			document.body.appendChild(overlay); 
			document.body.appendChild(magnify);
			magnify.appendChild(img);
			magnify.appendChild(close);
			close.appendChild(i);

			overlay.setAttribute('id', 'overlay');
			overlay.style.display = 'block';
			overlay.classList.add('animated');
			overlay.classList.toggle('fadeIn');

			close.setAttribute('id', 'close-popup');

			magnify.setAttribute('id', 'magnify');
			magnify.style.display = 'block';
			magnify.classList.add('animated');
			magnify.classList.toggle('zoomInLeft');
			magnify.style.width = `${clWidth * 2}px`;
			magnify.style.marginLeft = `-${clWidth}px`;
			magnify.style.marginTop = `-${clHeight}px`;

			img.setAttribute('src', src);

			window.addEventListener('click', (e)=>{
				let target = e.target,
					id = target.getAttribute('id');

				if (id == 'overlay' || target.tagName == 'I') {
					overlay.classList.toggle('fadeIn');
					overlay.classList.toggle('fadeOut');
					magnify.classList.toggle('zoomInLeft');
					magnify.classList.toggle('zoomOutRight');
					

					setTimeout(() => {
						overlay.style.display = '';
						magnify.style.display = '';
					} ,500)
				}
			});
}

}