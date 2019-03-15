export default function mainPageSlider(sliderClass, slidesClass, arrowClass = null) {
	let slider = document.getElementsByClassName(sliderClass)[0],
			slides = slider.getElementsByClassName(slidesClass),
			sliderDots = document.querySelector('.slick-dots'),
			slideIndex = 1;



for (let i = 0; i < slides.length; i++) {
	let dots = document.createElement('li');
	sliderDots.appendChild(dots);
}

let dot = sliderDots.getElementsByTagName('li');

if (arrowClass != null) {
	let arrows = slider.getElementsByClassName(arrowClass);

	arrows[0].addEventListener('click', () => {
		plusSlide(1)
	});

	arrows[1].addEventListener('click', () => {
			minusSlide(1);
	});
}



showSlides(slideIndex);

	function showSlides (n) {
		if (n > slides.length) {
			slideIndex = 1;
		}
		if (n < 1) {
			slideIndex = slides.length;
		}

		for (let i = 0; i < slides.length; i++) {
			slides[i].style.display = 'none';
			slides[i].classList.remove('animated', 'fadeIn');

		}

		for (let i = 0; i < dot.length; i++) {
			dot[i].classList.remove('slick-active');
		}
		slides[slideIndex - 1].classList.add('animated', 'fadeIn');
		slides[slideIndex - 1].style.display = '';

		dot[slideIndex - 1].classList.add('slick-active');
	}

	function plusSlide (n) {
		showSlides(slideIndex +=n); 
	}

	function minusSlide (n) {
		showSlides(slideIndex -=n);
	}

	function currentSlide (n) {
		showSlides(slideIndex = n);
	}

	let autoSlide = setInterval(() => {
		plusSlide(1);
	}, 3000);

	sliderDots.addEventListener('click', (e) => {
		let target = e.target;

		for (let i = 0; i <= dot.length; i++) {
			if (target.tagName == 'LI' && target == dot[i - 1]) {
				currentSlide(i);
			}
		}
	});

}