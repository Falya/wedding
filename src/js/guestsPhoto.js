export default function guestsPhoto() {
	let slider = document.querySelector('.slick-slider'),
			slide = slider.getElementsByClassName('slick-slide'),
			imgBox = [slider.getElementsByClassName('image-box-1')];
			imgBox.push(slider.getElementsByClassName('image-box-2'));
			imgBox.push(slider.getElementsByClassName('image-box-3'));

		let leftArow = document.createElement('button'),
				rightArow = document.createElement('button'),
				arrows = document.createElement('div');

				arrows.classList.add('div-arrow');
				arrows.style.width = `${slider.parentNode.parentNode.clientWidth}px`;
				arrows.style.height = `${slider.parentNode.parentNode.clientHeight}px`;

				slider.parentNode.parentNode.insertBefore(arrows, slider.parentNode);

				leftArow.classList.add('slider-albumguest-arrow','slider-albumguest-arrow-left');
				rightArow.classList.add('slider-albumguest-arrow','slider-albumguest-arrow-right');
				arrows.appendChild(leftArow);
				arrows.appendChild(rightArow);

				let slideIndex = 1;

				leftArow.addEventListener('click', () => {
					minusSlide(1);
				});

				rightArow.addEventListener('click', () => {
					plusSlide(1);
				});

							

			for (let i = 0; i < imgBox.length; i++) {

				for (let j = 0; j < imgBox[i].length; j++) {
					if (imgBox[i][j].classList.contains('image-box-3')) {
					imgBox[i-1][j].before(imgBox[i][j]);
				}
				}

			}

			showSlide (slideIndex)

			function showSlide (n) {
				if (n > slide.length) {
			slideIndex = 1;
		}
		if (n < 1) {
			slideIndex = slide.length;
		}

		for (let i = 0; i < slide.length; i++) {
			slide[i].style.display = 'none';
			slide[i].classList.remove('animated', 'fadeIn');

		}

		slide[slideIndex - 1].classList.add('animated', 'fadeIn');
		slide[slideIndex - 1].style.display = 'flex';

			}

			function plusSlide (n) {
		showSlide(slideIndex +=n); 
	}

	function minusSlide (n) {
		showSlide(slideIndex -=n);
	}

			
}