/*Скролл*/
const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
  smoothLink.addEventListener('click', function (e) {
    e.preventDefault();
    const id = smoothLink.getAttribute('href');

    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
}

/*Добавление подкастов*/
if (window.matchMedia('(max-width: 320px)').matches) {
  $('.podcasts__item').slice(0, 4).show();
} else {
  $('.podcasts__item').slice(0, 8).show();
}
$(function () {
  $('.podcasts__button-more').on('click', function (e) {
    e.preventDefault();
    $('.podcasts__item:hidden').slice(0, 4).slideDown();
    if ($('.podcasts__item:hidden').length == 0) {
      $('#load').fadeOut('slow');
    }
  });
});

/*Поиск*/
let search = document.querySelector('.header__search');
let closeBtn = document.querySelector('.header__button-search-close');
let searchBtn = document.querySelector('.header__button-search');

searchBtn.addEventListener('click', function () {
  search.classList.toggle('v-is-active');
  closeBtn.classList.toggle('v-is-active');
});

closeBtn.addEventListener('click', function () {
  search.classList.remove('v-is-active');
  closeBtn.classList.remove('v-is-active');
});

/*Виджет*/
let playBtn = document.querySelectorAll('.header__widget-button');

playBtn.forEach(function (btn) {
  let iconBtnPlay = btn.querySelector('.header__widget-button-icon-play');
  let iconBtnPause = btn.querySelector('.header__widget-button-icon-pause');
  btn.addEventListener('click', function () {
    if (iconBtnPlay.classList.contains('is-active')) {
      iconBtnPlay.classList.remove('is-active');
      iconBtnPause.classList.toggle('is-active');
    } else {
      iconBtnPlay.classList.toggle('is-active');
      iconBtnPause.classList.remove('is-active');
    }
  });
});

/*Селектор*/
const element = document.querySelector('.broadcasts__select');
const choices = new Choices(element, {
  placholder: true,
  searchEnabled: false,
  itemSelectText: '',
  shouldSort: false,
});

/*Аккордион*/
$('.accordion').accordion({
  collapsible: true,
  active: false,
  heightStyle: 'content',
});

let tabLink = document.querySelectorAll('.guests__accord-item-link');
let tabItem = document.querySelectorAll('.guests__card');

tabLink.forEach(function (tabLink) {
  tabLink.addEventListener('click', function (el) {
    const path = el.currentTarget.dataset.path;

    document
      .querySelectorAll('.guests__accord-item-link')
      .forEach(function (btn) {
        btn.classList.remove('link-active');
      });

    el.currentTarget.classList.add('link-active');

    tabItem.forEach(function (tab) {
      tab.classList.remove('is-active');
    });

    let tab = document.querySelector(`[data-target="${path}"]`);
    tab.classList.add('is-active');

    if (window.innerWidth <= 768) {
      tab.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/*Модальное формы*/
let btnMessageClose = document.querySelector('.modal-form__button');
let formModal = document.querySelector('.modal-form');

btnMessageClose.addEventListener('click', function () {
  formModal.classList.remove('is-active');
  document.body.classList.remove('stop-scroll');
});

/*Валидация*/
const validation = new JustValidate('.about__form', {
  errorFieldCssClass: 'is-invalid',
  errorLabelCssClass: 'is-label-invalid',
  errorLabelStyle: {
    color: '#FF6F6F',
    fontSize: '12px',
  },
});

validation
  .addField('#textarea', [
    {
      rule: 'required',
      errorMessage: 'Введите сообщение',
    },
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Минимальная длина имени - 2',
    },
  ])
  .addField('#name', [
    {
      rule: 'required',
      errorMessage: 'Введите имя',
    },
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Минимальная длина имени - 2',
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Максимальная длина имени - 30',
    },
  ])
  .addField('#email', [
    {
      rule: 'required',
      errorMessage: 'Введите  email',
    },
    {
      rule: 'email',
      errorMessage: 'Email введен некорректно',
    },
  ])
  .addField('#check', [
    {
      rule: 'required',
      errorMessage: 'Необходимо согласие на обработку',
    },
  ])
  .onSuccess((event) => {
    console.log('Validation passes and form submitted', event);

    let formData = new FormData(event.target);

    console.log(...formData);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 405) {
          formModal.classList.toggle('is-active');
          document.body.classList.toggle('stop-scroll');
        }
      }
    };

    xhr.open('POST', 'mail.php', true);
    xhr.send(formData);

    event.target.reset();
  });

/*Бургер*/
let burger = document.querySelector('.header__burger');
let menu = document.querySelector('.header__t-nav');
let link = document.querySelectorAll('.header__t-link');
let bottomMenu = document.querySelector('.header__b-list');

burger.addEventListener('click', function () {
  burger.classList.toggle('burger-active');
  menu.classList.toggle('t-nav-active');
  document.body.classList.toggle('stop-scroll');
  bottomMenu.classList.toggle('b-list-active');
});
link.forEach(function (el) {
  el.addEventListener('click', function () {
    burger.classList.remove('burger-active');
    menu.classList.remove('t-nav-active');
    bottomMenu.classList.remove('b-list-active');
    document.body.classList.remove('stop-scroll');
  });
});

/*Мобильный виджет*/
let widget = document.querySelector('.header__widget');
let widgetMobile = document.querySelector('.header__b-container');
let btnWidgetMobile = document.querySelector('.header__widget-mobile-button');

btnWidgetMobile.addEventListener('click', function () {
  widget.classList.toggle('widget_active');
  widgetMobile.classList.toggle('widget-mobile_active');
  btnWidgetMobile.classList.toggle('mobile-button_active');
});

/*Кнопки подкастов*/
let podcastsBtn = document.querySelectorAll('.podcasts__button');

podcastsBtn.forEach(function (btn) {
  let podcastsPlayBtn = btn.querySelector('.podcasts__button-icon-play');
  let podcastsPauseBtn = btn.querySelector('.podcasts__button-icon-pause');
  btn.addEventListener('click', function () {
    if (podcastsPlayBtn.classList.contains('is-active')) {
      podcastsPlayBtn.classList.remove('is-active');
      podcastsPauseBtn.classList.toggle('is-active');
    } else {
      podcastsPlayBtn.classList.toggle('is-active');
      podcastsPauseBtn.classList.remove('is-active');
    }
  });
});

/*Модальное логин*/
let btnLogin = document.querySelector('.header__button-login');
let btnLoginClose = document.querySelector('.modal-login__button-close');
let headerModal = document.querySelector('.modal-login');

btnLogin.addEventListener('click', function () {
  headerModal.classList.toggle('is-active');
  document.body.classList.toggle('stop-scroll');
});

btnLoginClose.addEventListener('click', function () {
  headerModal.classList.remove('is-active');
  document.body.classList.remove('stop-scroll');
});
