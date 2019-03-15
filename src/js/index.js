import "babel-polyfill";
import mainPageSlider from './mainPageSlider.js';
import mainPageOverlay from './mainPageOverlay.js';
import mainPageModal from './mainPageModal.js';
import mainPageSlowScroll from './mainPageSlowScroll.js';
import toSiteBuilder from './toSiteBuilder.js';
import youTubeVideo from './youTubeVideo.js';
import tarifModal from './tarifModal.js';
import siteBuildBackgroun from './siteBuildBackgroun.js';
import activeTab from './activeTab.js';
import invitationRed from './invitationRed.js';
import guestList from "./guestList.js";
import maps from "./maps.js";
import whishBook from "./whishBook.js";
import guestLetter from "./guestLetter.js";
import guestsPhoto from "./guestsPhoto.js";
import videoWidget from "./videoWidget.js";
import mobileMenu from "./mobileMenu.js";


document.addEventListener("DOMContentLoaded", () => {
    let loader = document.querySelector('.loader-div'),
        page = location.pathname.trim();


    loader.classList.add('animated', 'fadeOut');
    if (loader.style.opacity == 0) {
        loader.style.display = 'none';
        document.body.style.overflow = 'visible';
    }


    if (page == '/' || page.match(/index.html/)) {
        mobileMenu('header-nav__link', 'header-nav-menu');
        mainPageSlider('slider', 'a-slide');
        mainPageOverlay();
        mainPageModal('overlay');
        mainPageSlowScroll();
        toSiteBuilder();
        youTubeVideo();
        tarifModal();
        mainPageModal('js-overlay-thank-you', 'js-overlay-order');
        mainPageModal('contacts', 'js-overlay-order');


    } else {
        if (page.match(/site-builder.php/)) {

            siteBuildBackgroun();

        } else if (page.match(/invitation.php/)) {

            invitationRed();

        } else if (page.match(/guest-list.php/)) {
            guestList();

        } else if (page.match(/location.(html|php)/)) {
           maps();
        } else if (page.match(/book-wishes.php/)) {
            mainPageSlider('slider-book', 'a-slide-book', 'slider-book-arrow');
            whishBook();
        } else if (page.match(/letter-guests.php/)) {
            guestLetter();
        } else if (page.match(/photo-guests.php/)) {
            guestsPhoto();
        } else if (page.match(/video-widget.php/)) {
            videoWidget();
        }
    	
    	activeTab();
        mobileMenu('header-main__link', 'header-main-menu');
        
    }



});