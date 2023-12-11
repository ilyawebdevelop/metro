import * as flsFunctions from "./modules/functions.js";
import "./modules/jquery-3.7.1.min.js";
import "./modules/bootstrap.bundle.min.js";
import "./modules/fslightbox.js";
import AOS from "./../../node_modules/aos/dist/aos.esm.js";
import "./modules/inputmask.min.js";
import './components.js';

flsFunctions.isWebp();

$(document).ready(function () {
  AOS.init();
  let inputs = document.querySelectorAll('input[type="tel"]');
  let im = new Inputmask('+7 (999) 999-99-99');
  im.mask(inputs);
});

// Import swiper
import Swiper, { Navigation, Pagination, Autoplay, Mousewheel, EffectFade, Thumbs, Scrollbar } from 'swiper';
Swiper.use([Navigation, Pagination, Autoplay, Mousewheel, EffectFade, Thumbs, Scrollbar]);

// Инициализация слайдера gallerySlider
const gallerySlider = document.querySelector('.gallerySlider');
var mySwiperGallery = new Swiper(gallerySlider, {
  slidesPerView: 2,
  spaceBetween: 24,
  speed: 800,
  navigation: {
    nextEl: '.gallery .arrowNavNext',
    prevEl: '.gallery .arrowNavPrev',
  },
  breakpoints: {
    0: {
      spaceBetween: 10,
      slidesPerView: 1,
    },
    576: {
      spaceBetween: 10,
      slidesPerView: 2,
    },
    768: {
      spaceBetween: 24,
    },
    992: {
      slidesPerView: 3,
    },
    1400: {
      slidesPerView: 2,
    },
  },
});

// Инициализация слайдера afishaSlider
const afishaSlider = document.querySelector('.afishaSlider');
var mySwiperAfisha = new Swiper(afishaSlider, {
  slidesPerView: 3,
  spaceBetween: 19,
  speed: 800,
  navigation: {
    nextEl: '.afisha .arrowNavNext',
    prevEl: '.afisha .arrowNavPrev',
  },
  breakpoints: {
    0: {
      spaceBetween: 10,
      slidesPerView: 1,
    },
    576: {
      slidesPerView: 2,
    },
    768: {
      spaceBetween: 19,
      slidesPerView: 3,
    },
  },
});

// Инициализация слайдера foodSlider
document.querySelectorAll('.food .tabs__panel').forEach(n => {
  const mySwiperDepartment = new Swiper(n.querySelector('.foodSlider'), {
    slidesPerView: 1,
    spaceBetween: 10,
    speed: 600,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    navigation: {
      nextEl: n.querySelector('.arrowNavNext'),
      prevEl: n.querySelector('.arrowNavPrev'),
    },
    pagination: {
      el: n.querySelector('.swiper-pagination'),
      clickable: true,
      type: 'bullets',
    },
  });
});

// Инициализация слайдера ticker-slider
new Swiper(jQuery('.ticker-slider')[0], {
  slidesPerView: 'auto',
  spaceBetween: 100,
  speed: 8000,
  loop: true,
  autoplay: {
    delay: 1,
    // disableOnInteraction: true
  },
  a11y: false,
  allowTouchMove: false,
  breakpoints: {
    0: {
      spaceBetween: 60,
    },
    992: {
      spaceBetween: 100,
    },
  },
});

// Burger
const btnMenu = document.querySelector('#toggle');
const menu = document.querySelector('.headerNav');
const bodyEl = document.querySelector('body');
const menuLine1 = document.querySelector('.top-bun');
const menuLine2 = document.querySelector('.meat');
const menuLine3 = document.querySelector('.bottom-bun');
let navItemAll = document.querySelectorAll('.headerNavList li a');

const toggleMenu = function () {
  menu.classList.toggle('active');
}
const toggleBurger = function () {
  btnMenu.classList.toggle('active');
}
const toggleMenuLine = function () {
  menuLine1.classList.toggle('active');
  menuLine2.classList.toggle('active');
  menuLine3.classList.toggle('active');
}
const bodyOverflow = function () {
  bodyEl.classList.toggle('hidden');
}

btnMenu?.addEventListener('click', function (e) {
  e.stopPropagation();
  toggleMenu();
  toggleBurger();
  bodyOverflow();
  toggleMenuLine();
});

document.addEventListener('click', function (e) {
  const target = e.target;
  const its_headerBurger = target == btnMenu || btnMenu.contains(target);
  const its_headerNav = target == menu || menu.contains(target);

  if (!its_headerNav && !its_headerBurger) {
    menuLine1.classList.remove('active');
    menuLine2.classList.remove('active');
    menuLine3.classList.remove('active');
    bodyEl.classList.remove('hidden');
    btnMenu.classList.remove('active');
    menu.classList.remove('active');
  }
});

// close menu in Landing page
$(document).on("click", ".headerNavList li a", function (e) {
  $('.headerNav').removeClass('active');
  $('body').removeClass('hidden');
  toggleMenuLine();
  toggleBurger();
});
function getIdYoutube(href) {
  var id = href.split('v=')[1];
  var ampersandPosition = id.indexOf('&');
  if (ampersandPosition != -1) id = id.substring(0, ampersandPosition);
  return id;
}
$('.afishaSlideImgW').not('[data-popup]').click(function () {
  $(".afishaSlideImgW iframe").each(function () {
    $(this).remove();
  });
  $(".afishaSlideImgW").each(function () {
    $(this).removeClass("_loaded");
  });
  if ($(this).hasClass('_loaded')) return false;
  $(this).append('<iframe src="https://www.youtube.com/embed/' + getIdYoutube($(this).attr('data-youtube')) + '?autoplay=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>').addClass('_loaded');
});



let mapEl = document.getElementById('map');
if (mapEl) {
  ymaps.ready(init);
  function init() {
    // Создание карты.

    var myMap = new ymaps.Map("map", {
      // Координаты центра карты.
      // Порядок по умолчанию: «широта, долгота».
      // Чтобы не определять координаты центра карты вручную,
      // воспользуйтесь инструментом Определение координат.
      center: [55.79289702533677, 49.124134961971265],
      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
      zoom: 18
    });
    myMap.behaviors.disable('scrollZoom');
    myMap.behaviors.disable('drag');
    myMap.events.add('click', function () {
      myMap.behaviors.enable('scrollZoom');
      myMap.behaviors.enable('drag');
    });

    document.addEventListener('click', function (e) {
      const target = e.target;

      const its_map = target == mapEl || mapEl.contains(target);

      if (!its_map) {
        myMap.behaviors.disable('scrollZoom');
        myMap.behaviors.disable('drag');
      }
    });
    myMap.geoObjects
      .add(new ymaps.Placemark([55.79289702533677, 49.124134961971265], {

      }, {
        iconLayout: 'default#image',
        iconImageClipRect: [[0, 0], [68, 75]],
        iconImageHref: '../img/icons/marker.svg',
        iconImageSize: [45, 55],
      }));
  }
}
