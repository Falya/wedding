export default function mainPageSlowScroll() {
	let menuLink = document.querySelector('header'),
        button = document.createElement('div'),
        header = document.querySelector('header');
        document.body.appendChild(button);

    button.classList.add('to-top-btn', 'fa', 'fa-angle-double-up', 'animated');
    button.setAttribute('title', 'Вверх');

    function buttonPosition () {
        if (header.getBoundingClientRect().bottom <= 0) {
            button.style.display = 'block';
            button.classList.remove('fadeOutRight');
            button.classList.add('fadeInRight');

        } else {
            button.classList.remove('fadeInRight');
            button.classList.add('fadeOutRight');
        }
    }

    window.addEventListener('scroll', () => {
        buttonPosition();   
    });

    button.addEventListener('click', () => {
        let pos = document.documentElement.scrollTop,
            targ = header.getBoundingClientRect().top;
        scrollingAll(draw, pos, targ, 1000);
    });


	menuLink.addEventListener('click', (e)=> {
		e.preventDefault();
		let target = e.target,
				browser = navigator.userAgent;
		if (target.hasAttribute('href') && target.getAttribute('id') != 'touch-menu') {

			let linkedDiv = document.getElementById(target.getAttribute('href').slice(1));

			if (browser.search(/Edge/) > 0) {
                scrollingEdge(function(timePassed) {
                    window.scrollBy(0, linkedDiv.getBoundingClientRect().top / 20 - 3);
                }, 1200);
            } else {
                let targ = linkedDiv.getBoundingClientRect().top + 30,
                    pos = document.documentElement.scrollTop;
                scrollingAll(draw, pos, targ, 1200);
            }

			// scrolling(function(timePassed) {
   //                  window.scrollBy(0, linkedDiv.getBoundingClientRect().top / 30 +5);
   //              }, 1200);
		}
		
	});

	 function scrollingAll(draw, brPosition, trPosition, duration) {
        let start = Date.now();

        let scroll = requestAnimationFrame(function scrollingAll() {
            let timePassed = Date.now() - start,
                timeFraction = timePassed / duration;

            if (timePassed > duration) {
                timePassed = duration;
            }

            if (timeFraction > 1) {
                timeFraction = 1;
            }

            let timing = function(timeFraction) {
                return (1 - Math.sin(Math.acos(timeFraction)));
            };

            let progress = timing(timeFraction),
                r = 0;

            if (trPosition > 0) {
                r = Math.min((brPosition + progress * 10000), (brPosition + trPosition));
            } else {
                r = Math.max((brPosition - progress * 10000), (brPosition + trPosition));
            }
            draw(r);

            if (r != (brPosition + trPosition)) {
                requestAnimationFrame(scrollingAll);
            }

        });
    }

    function draw(r) {
        window.scrollTo(0, r);
    }

	function scrollingEdge(draw, duration) {
        let start = Date.now();

        let scroll = requestAnimationFrame(function scrollingEdge() {
            let timePassed = Date.now() - start;


            if (timePassed > duration) {
                timePassed = duration;
            }

            draw(timePassed);

            if (timePassed < duration) {
                requestAnimationFrame(scrollingEdge);
            }

        });
    };
}