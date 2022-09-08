"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//button
var btn = document.querySelector('.buy__button');
var image = document.querySelector('.blick');

btn.onmouseover = function (e) {
  image.classList.add('sprint');
};

btn.onmouseout = function (e) {
  image.classList.remove('sprint');
}; // Slider


var counterSlide = 1;
var sliderCount = document.querySelector('.counter');
var prizesLeftArrow = document.querySelector('.controls-left'),
    prizesRightArrow = document.querySelector('.controls-right');
var slider1 = slider('prizes-slider', '.auto__buy-slider-item', prizesLeftArrow, prizesRightArrow, true);

function slider(id, itemSelector, leftArrow, rightArrow, autoplay, config) {
  var AUTOPLAY_INTERVAL = 5000000000000;
  var el = document.getElementById(id);
  el.classList.add('slider');
  var mediaStep = '';
  var activeIndIndex = 0;
  var toogleIndex = 0;
  var items = el.querySelectorAll(itemSelector);
  var timerId;

  function getMediaStep() {
    var width = window.innerWidth;
    var newStep = width > (obj.config.media && obj.config.media.lg) ? 'lg' : width > (obj.config.media && obj.config.media.md) ? 'md' : width > (obj.config.media && obj.config.media.sm) ? 'sm' : 'xs';

    if (mediaStep !== newStep) {
      mediaStep = newStep;
      obj.buildSlider();
    }
  }

  function getItemsQuantity() {
    return obj.config.elemsPerPage[mediaStep];
  }

  function onResize() {
    getMediaStep();
  }

  var obj = {
    activeIndex: 0,
    activeIndIndex: activeIndIndex > 0 ? activeIndIndex : 0,
    toggleIndex: 0,
    init: function init() {
      getMediaStep();
      var startX = 0;
      var touched = false;
      var inner = el.querySelector('.slider-inner');
      var indicators = el.querySelectorAll('.slider-indicator');

      function onMouseDown(e) {
        startX = e.clientX || e.touches[0].clientX;
        touched = true;
        var weekly = document.querySelectorAll('.result__weeks-btn'); // for (const item of weekly) item.addEventListener('touchstart', selectWeek);
      }

      function onMouseMove(e) {
        e.preventDefault();

        if (touched) {
          inner = inner || el.querySelector('.slider-inner');
          var x = e.clientX || e.touches[0].clientX;
          var diff = x - startX;

          if (diff < 0 && activeIndIndex < indicators.length - 1 || diff > 0 && activeIndIndex > 0) {
            inner.style.transform = 'translateX(' + diff + 'px)';
          }
        }
      }

      function onMouseEnd(e) {
        if (touched) {
          var x = e.clientX || e.changedTouches[0].clientX;

          if (x - startX > 30) {
            toggleIndex(activeIndIndex - 1);
          } else if (startX - x > 30) {
            toggleIndex(activeIndIndex + 1);
          }

          inner = inner || el.querySelector('.slider-inner');
          inner.style.transform = '';
        }

        touched = false;
      }

      rightArrow.addEventListener('click', function () {
        toggleIndex(activeIndIndex + 1); // obj.next()

        counterSlide++;
        sliderCount.innerHTML = counterSlide;
      });
      leftArrow.addEventListener('click', function () {
        toggleIndex(activeIndIndex - 1); // obj.prev()

        counterSlide--;
        sliderCount.innerHTML = counterSlide;
      });
      window.removeEventListener('resize', onResize);
      window.addEventListener('resize', onResize);
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('touchstart', onMouseDown);
      el.addEventListener('mousedown', onMouseDown);
      el.addEventListener('touchstart', onMouseDown);
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('touchmove', onMouseMove);
      el.addEventListener('mousemove', onMouseMove); // el.addEventListener('touchmove', onMouseMove);

      window.removeEventListener('mouseup', onMouseEnd);
      window.removeEventListener('touchend', onMouseEnd);
      window.addEventListener('mouseup', onMouseEnd);
      window.addEventListener('touchend', onMouseEnd);

      if (autoplay) {
        timerId = setInterval(function () {
          return toggleIndex((activeIndIndex + 1) % indicators.length);
        }, AUTOPLAY_INTERVAL);
      }

      return obj;
    },
    config: {
      elemsPerPage: _objectSpread(_objectSpread({}, {
        'lg': 1,
        'md': 1,
        'sm': 1,
        'xs': 1
      }), config && config.elemsPerPage || {}),
      media: _objectSpread(_objectSpread({}, {
        'lg': 1160,
        'md': 920,
        'sm': 700
      }), config && config.media || {})
    },
    buildSlider: function buildSlider() {
      obj.removeSlider();
      var wrapper = document.createElement("div");
      wrapper.className = 'slider-wrapper';
      var inner = document.createElement("div");
      inner.className = 'slider-inner';
      wrapper.appendChild(inner);
      el.appendChild(wrapper);

      if (obj.config.elemsPerPage[mediaStep] >= items.length + 1) {
        el.classList.add('not-enough-elems');
        return;
      }

      buildPages();
    },
    //     getMediaStep() {
    //     // var width = window.innerWidth;
    //     // var newStep = width > mediaConfig && mediaConfig.lg !== undefined ? mediaConfig.lg : 1150 ? 'lg'
    //     //     : width > (mediaConfig && mediaConfig.md !== undefined ? mediaConfig.md : 767) ? 'md'
    //     //         : width > (mediaConfig && mediaConfig.sm !== undefined ? mediaConfig.sm : 600) ? 'sm' : 'xs';
    //
    //     if (mediaStep !== newStep) {
    //         mediaStep = newStep;
    //         obj.buildSlider();
    //     }
    // },
    removeSlider: function removeSlider() {
      var wrapper = el.querySelector('.slider-wrapper');
      el.classList.remove('not-enough-elems');
      wrapper && wrapper.remove();

      if (timerId) {
        clearInterval(timerId);
      }
    },
    toggle: toggleIndex
  };

  function buildIndicators() {
    var prevInd = el.querySelector('.slider-indicators');
    prevInd && prevInd.remove();
    var indicators = document.createElement('div');
    indicators.classList.add('slider-indicators');

    var _loop = function _loop(i) {
      var indicator = document.createElement('div');
      indicator.classList.add('slider-indicator');

      if (i === activeIndIndex) {
        indicator.classList.add('active');
      }

      indicator.setAttribute('index', i);
      indicator.addEventListener('click', function () {
        toggleIndex(i);
      });
      indicators.appendChild(indicator);
    };

    for (var i = 0; i < Math.ceil(items.length / getItemsQuantity()); i++) {
      _loop(i);
    }

    var wrapper = el.querySelector('.slider-wrapper');
    wrapper.appendChild(indicators);
  }

  function buildPages(step) {
    step = step || 1;
    var pagePrev = buildPage(obj.activeIndex + items.length - getItemsQuantity() * step);
    var pageCurrent = buildPage(obj.activeIndex);
    var pageNext = buildPage(obj.activeIndex + getItemsQuantity() * step);
    var inner = el.querySelector('.slider-inner');

    if (getItemsQuantity() < items.length) {
      buildIndicators();

      if (!el.querySelector('.slider-indicator.active')) {// toggleIndex(0);
      }
    }

    inner.innerHTML = '';
    inner.appendChild(pagePrev);
    inner.appendChild(pageCurrent);
    inner.appendChild(pageNext);
  }

  function buildPage(index) {
    var page = document.createElement("div");
    page.classList.add('slider-page');

    for (var i = index; i < index + getItemsQuantity(); i++) {
      var item = items[i % items.length];
      var newItem = item.cloneNode(true);
      page.appendChild(newItem);
    }

    return page;
  }

  function toggleIndex(index) {
    var indActive = el.querySelector('.slider-indicator.active');
    var indicators = el.querySelectorAll('.slider-indicator');

    if (!indicators[index]) {
      return;
    }

    leftArrow.classList.remove('arrow-disabled');
    rightArrow.classList.remove('arrow-disabled');

    if (index === 0) {
      leftArrow.classList.add('arrow-disabled');
    }

    if (index === indicators.length - 1) {
      rightArrow.classList.add('arrow-disabled');
    }

    indActive && indActive.classList.remove('active');
    indicators[index] && indicators[index].classList.add('active');

    if (index > activeIndIndex) {
      index - activeIndIndex > 1 && buildPages(index - activeIndIndex);
      obj.next();
    } else if (index < activeIndIndex) {
      activeIndIndex - index > 1 && buildPages(activeIndIndex - index);
      obj.prev();
    }

    activeIndIndex = index; // document.querySelector('.current').textContent = activeIndIndex + 1;
  }

  obj.prev = function () {
    var wrapper = el.querySelector('.slider-wrapper');
    wrapper.classList.add('prev');
    setTimeout(function () {
      wrapper.classList.remove('prev');
      obj.activeIndex = (obj.activeIndex - getItemsQuantity() + items.length) % items.length;
      buildPages();
    }, 300);
  };

  obj.next = function () {
    var wrapper = el.querySelector('.slider-wrapper');
    wrapper.classList.add('next');
    setTimeout(function () {
      wrapper.classList.remove('next');
      obj.activeIndex = (obj.activeIndex + getItemsQuantity() + items.length) % items.length;
      buildPages();
    }, 300);
  };

  return obj.init();
}
"use strict";

(function () {
  var promoStartDate = new Date(Date.UTC(2022, 8, 26));
  var promoCheckpointsCnt = 10;
  var daysPerUpdate = 11;
  var promoCheckPointDates = computePromoCheckpointDates();
  var currentCheckpoint = getCurrentCheckpoint();
  var mainPage = document.querySelector('.fav__page');
  onCheckpointUpdate();

  function computePromoCheckpointDates() {
    var promoCheckpoints = [promoStartDate];

    for (var i = 1; i <= promoCheckpointsCnt; i++) {
      var nextCheckpoint = new Date(promoStartDate.getTime());
      nextCheckpoint.setDate(promoStartDate.getDate() + i * daysPerUpdate);
      promoCheckpoints.push(nextCheckpoint);
    }

    return promoCheckpoints;
  }

  function getCurrentCheckpoint() {
    var currentTimestamp = Date.now();
    var checkpointNum = 0;

    while (currentTimestamp >= promoCheckPointDates[checkpointNum]) {
      checkpointNum++;
    }

    return checkpointNum;
  }

  function onCheckpointUpdate() {
    for (var i = 1; i <= promoCheckpointsCnt; i++) {
      mainPage.classList.remove("car".concat(i));
    }

    mainPage.classList.add("car".concat(currentCheckpoint));
  }
})();

var percent = document.querySelectorAll('.percetn');
var favPage = document.querySelector('.fav__page');
var autoMinNone = document.querySelectorAll('.auto-win');
var autoMinNone2 = document.querySelectorAll('.auto-win-2');

for (var i = 0; i < autoMinNone.length; i++) {
  if (favPage.classList.contains('car1')) {
    autoMinNone[0].classList.remove('load');
    autoMinNone[0].classList.add('done');
    autoMinNone[1].classList.add('load');
    autoMinNone2[0].classList.remove('load');
    autoMinNone2[0].classList.add('done');
    autoMinNone2[1].classList.add('load');
  }

  if (favPage.classList.contains('car2')) {
    autoMinNone[0].classList.remove('load');
    autoMinNone[0].classList.add('done');
    autoMinNone[1].classList.add('done');
    autoMinNone[2].classList.add('load');
    autoMinNone2[0].classList.remove('load');
    autoMinNone2[0].classList.add('done');
    autoMinNone2[1].classList.add('done');
    autoMinNone2[2].classList.add('load');
  }

  if (favPage.classList.contains('car3')) {
    autoMinNone[0].classList.remove('load');
    autoMinNone[0].classList.add('done');
    autoMinNone[1].classList.add('done');
    autoMinNone[2].classList.add('done');
    autoMinNone[3].classList.add('load');
    autoMinNone2[0].classList.remove('load');
    autoMinNone2[0].classList.add('done');
    autoMinNone2[1].classList.add('done');
    autoMinNone2[2].classList.add('done');
    autoMinNone2[3].classList.add('load');
  }

  if (favPage.classList.contains('car4')) {
    autoMinNone[0].classList.remove('load');
    autoMinNone[0].classList.add('done');
    autoMinNone[1].classList.add('done');
    autoMinNone[2].classList.add('done');
    autoMinNone[3].classList.add('done');
    autoMinNone[4].classList.add('load');
    autoMinNone2[0].classList.remove('load');
    autoMinNone2[0].classList.add('done');
    autoMinNone2[1].classList.add('done');
    autoMinNone2[2].classList.add('done');
    autoMinNone2[3].classList.add('done');
    autoMinNone2[4].classList.add('load');
  }

  if (favPage.classList.contains('car5')) {
    autoMinNone[0].classList.remove('load');
    autoMinNone[0].classList.add('done');
    autoMinNone2[0].classList.remove('load');
    autoMinNone2[0].classList.add('done');

    for (var _i = 1; _i <= 4; _i++) {
      autoMinNone[_i].classList.add('done');

      autoMinNone2[_i].classList.add('done');
    }

    autoMinNone[5].classList.add('load');
    autoMinNone2[5].classList.add('load');
  }

  if (favPage.classList.contains('car6')) {
    autoMinNone[0].classList.remove('load');
    autoMinNone[0].classList.add('done');
    autoMinNone2[0].classList.remove('load');
    autoMinNone2[0].classList.add('done');

    for (var _i2 = 1; _i2 <= 5; _i2++) {
      autoMinNone[_i2].classList.add('done');

      autoMinNone2[_i2].classList.add('done');
    }

    autoMinNone[6].classList.add('load');
    autoMinNone2[6].classList.add('load');
  }

  if (favPage.classList.contains('car7')) {
    autoMinNone[0].classList.remove('load');
    autoMinNone[0].classList.add('done');
    autoMinNone2[0].classList.remove('load');
    autoMinNone2[0].classList.add('done');

    for (var _i3 = 1; _i3 <= 6; _i3++) {
      autoMinNone[_i3].classList.add('done');

      autoMinNone2[_i3].classList.add('done');
    }

    autoMinNone[7].classList.add('load');
    autoMinNone2[7].classList.add('load');
  }

  if (favPage.classList.contains('car8')) {
    autoMinNone[0].classList.remove('load');
    autoMinNone[0].classList.add('done');
    autoMinNone2[0].classList.remove('load');
    autoMinNone2[0].classList.add('done');

    for (var _i4 = 1; _i4 <= 7; _i4++) {
      autoMinNone[_i4].classList.add('done');

      autoMinNone2[_i4].classList.add('done');
    }

    autoMinNone[8].classList.add('load');
    autoMinNone2[8].classList.add('load');
  }

  if (favPage.classList.contains('car9')) {
    autoMinNone[0].classList.remove('load');
    autoMinNone[0].classList.add('done');
    autoMinNone2[0].classList.remove('load');
    autoMinNone2[0].classList.add('done');

    for (var _i5 = 1; _i5 <= 8; _i5++) {
      autoMinNone[_i5].classList.add('done');

      autoMinNone2[_i5].classList.add('done');
    }

    autoMinNone[9].classList.add('load');
    autoMinNone2[9].classList.add('load');
  }

  if (favPage.classList.contains('car10')) {
    autoMinNone[0].classList.remove('load');
    autoMinNone[0].classList.add('done');
    autoMinNone2[0].classList.remove('load');
    autoMinNone2[0].classList.add('done');

    for (var _i6 = 1; _i6 <= 9; _i6++) {
      autoMinNone[_i6].classList.add('done');

      autoMinNone2[_i6].classList.add('done');
    }
  }
}

percent.forEach(function (item) {
  if (favPage.classList.contains('car1')) item.innerHTML = '13%';
  if (favPage.classList.contains('car2')) item.innerHTML = '22%';
  if (favPage.classList.contains('car3')) item.innerHTML = '34%';
  if (favPage.classList.contains('car4')) item.innerHTML = '41%';
  if (favPage.classList.contains('car5')) item.innerHTML = '56%';
  if (favPage.classList.contains('car6')) item.innerHTML = '63%';
  if (favPage.classList.contains('car7')) item.innerHTML = '72%';
  if (favPage.classList.contains('car8')) item.innerHTML = '84%';

  if (favPage.classList.contains('car9')) {
    item.innerHTML = '92%'; //тут перемещаем стрелочки влево, когда процент больше 88

    var arrowsProgress = document.querySelector('.buy__info-progress .myProgress .arrow-right');
    arrowsProgress.classList.add('_bigPercent');
  }

  if (favPage.classList.contains('car10')) {
    item.innerHTML = '99%';
    var secondProgress = document.querySelector('.fav__page .buy__info-progress .myProgress');
    secondProgress.classList.add('_bigPercent');
  }

  ;
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJzZWNvbmQuanMiXSwibmFtZXMiOlsiYnRuIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiaW1hZ2UiLCJvbm1vdXNlb3ZlciIsImUiLCJjbGFzc0xpc3QiLCJhZGQiLCJvbm1vdXNlb3V0IiwicmVtb3ZlIiwiY291bnRlclNsaWRlIiwic2xpZGVyQ291bnQiLCJwcml6ZXNMZWZ0QXJyb3ciLCJwcml6ZXNSaWdodEFycm93Iiwic2xpZGVyMSIsInNsaWRlciIsImlkIiwiaXRlbVNlbGVjdG9yIiwibGVmdEFycm93IiwicmlnaHRBcnJvdyIsImF1dG9wbGF5IiwiY29uZmlnIiwiQVVUT1BMQVlfSU5URVJWQUwiLCJlbCIsImdldEVsZW1lbnRCeUlkIiwibWVkaWFTdGVwIiwiYWN0aXZlSW5kSW5kZXgiLCJ0b29nbGVJbmRleCIsIml0ZW1zIiwicXVlcnlTZWxlY3RvckFsbCIsInRpbWVySWQiLCJnZXRNZWRpYVN0ZXAiLCJ3aWR0aCIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJuZXdTdGVwIiwib2JqIiwibWVkaWEiLCJsZyIsIm1kIiwic20iLCJidWlsZFNsaWRlciIsImdldEl0ZW1zUXVhbnRpdHkiLCJlbGVtc1BlclBhZ2UiLCJvblJlc2l6ZSIsImFjdGl2ZUluZGV4IiwidG9nZ2xlSW5kZXgiLCJpbml0Iiwic3RhcnRYIiwidG91Y2hlZCIsImlubmVyIiwiaW5kaWNhdG9ycyIsIm9uTW91c2VEb3duIiwiY2xpZW50WCIsInRvdWNoZXMiLCJ3ZWVrbHkiLCJvbk1vdXNlTW92ZSIsInByZXZlbnREZWZhdWx0IiwieCIsImRpZmYiLCJsZW5ndGgiLCJzdHlsZSIsInRyYW5zZm9ybSIsIm9uTW91c2VFbmQiLCJjaGFuZ2VkVG91Y2hlcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJpbm5lckhUTUwiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic2V0SW50ZXJ2YWwiLCJyZW1vdmVTbGlkZXIiLCJ3cmFwcGVyIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImFwcGVuZENoaWxkIiwiYnVpbGRQYWdlcyIsImNsZWFySW50ZXJ2YWwiLCJ0b2dnbGUiLCJidWlsZEluZGljYXRvcnMiLCJwcmV2SW5kIiwiaSIsImluZGljYXRvciIsInNldEF0dHJpYnV0ZSIsIk1hdGgiLCJjZWlsIiwic3RlcCIsInBhZ2VQcmV2IiwiYnVpbGRQYWdlIiwicGFnZUN1cnJlbnQiLCJwYWdlTmV4dCIsImluZGV4IiwicGFnZSIsIml0ZW0iLCJuZXdJdGVtIiwiY2xvbmVOb2RlIiwiaW5kQWN0aXZlIiwibmV4dCIsInByZXYiLCJzZXRUaW1lb3V0IiwicHJvbW9TdGFydERhdGUiLCJEYXRlIiwiVVRDIiwicHJvbW9DaGVja3BvaW50c0NudCIsImRheXNQZXJVcGRhdGUiLCJwcm9tb0NoZWNrUG9pbnREYXRlcyIsImNvbXB1dGVQcm9tb0NoZWNrcG9pbnREYXRlcyIsImN1cnJlbnRDaGVja3BvaW50IiwiZ2V0Q3VycmVudENoZWNrcG9pbnQiLCJtYWluUGFnZSIsIm9uQ2hlY2twb2ludFVwZGF0ZSIsInByb21vQ2hlY2twb2ludHMiLCJuZXh0Q2hlY2twb2ludCIsImdldFRpbWUiLCJzZXREYXRlIiwiZ2V0RGF0ZSIsInB1c2giLCJjdXJyZW50VGltZXN0YW1wIiwibm93IiwiY2hlY2twb2ludE51bSIsInBlcmNlbnQiLCJmYXZQYWdlIiwiYXV0b01pbk5vbmUiLCJhdXRvTWluTm9uZTIiLCJjb250YWlucyIsImZvckVhY2giLCJhcnJvd3NQcm9ncmVzcyIsInNlY29uZFByb2dyZXNzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0EsSUFBTUEsR0FBRyxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsY0FBdkIsQ0FBWjtBQUNBLElBQU1DLEtBQUssR0FBR0YsUUFBUSxDQUFDQyxhQUFULENBQXVCLFFBQXZCLENBQWQ7O0FBQ0FGLEdBQUcsQ0FBQ0ksV0FBSixHQUFrQixVQUFVQyxDQUFWLEVBQVk7RUFDMUJGLEtBQUssQ0FBQ0csU0FBTixDQUFnQkMsR0FB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Q0FBQ3pCLFNBQUwsR0FBaUIsS0FBakIsQ0FEbUMsQ0FFbkM7O0lBRUEsSUFBTTBELGNBQWMsR0FBRzNILFFBQVEsQ0FBQ0MsYUFBVCxDQUF1Qiw4Q0FBdkIsQ0FBdkI7SUFDQTBILGNBQWMsQ0FBQ3RILFNBQWYsQ0FBeUJDLEdBQXpCLENBQTZCLGFBQTdCO0VBR0g7O0VBQ0QsSUFBR2dILE9BQU8sQ0FBQ2pILFNBQVIsQ0FBa0JvSCxRQUFsQixDQUEyQixPQUEzQixDQUFILEVBQXVDO0lBQ25DL0IsSUFBSSxDQUFDekIsU0FBTCxHQUFpQixLQUFqQjtJQUNBLElBQU0yRCxjQUFjLEdBQUc1SCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsNENBQXZCLENBQXZCO0lBQ0EySCxjQUFjLENBQUN2SCxTQUFmLENBQXlCQyxHQUF6QixDQUE2QixhQUE3QjtFQUdIOztFQUFBO0FBR0osQ0EzQkQiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vYnV0dG9uXG5jb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnV5X19idXR0b24nKTtcbmNvbnN0IGltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJsaWNrJylcbmJ0bi5vbm1vdXNlb3ZlciA9IGZ1bmN0aW9uIChlKXtcbiAgICBpbWFnZS5jbGFzc0xpc3QuYWRkKCdzcHJpbnQnKVxufVxuXG5idG4ub25tb3VzZW91dCA9IGZ1bmN0aW9uIChlKXtcbiAgICBpbWFnZS5jbGFzc0xpc3QucmVtb3ZlKCdzcHJpbnQnKVxufVxuXG5cbi8vIFNsaWRlclxuXG5sZXQgY291bnRlclNsaWRlID0gMTtcbmxldCBzbGlkZXJDb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb3VudGVyJyk7XG5cblxubGV0IHByaXplc0xlZnRBcnJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9scy1sZWZ0JyksXG4gICAgcHJpemVzUmlnaHRBcnJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9scy1yaWdodCcpO1xuXG52YXIgc2xpZGVyMSA9IHNsaWRlcihcbiAgICAncHJpemVzLXNsaWRlcicsXG4gICAgJy5hdXRvX19idXktc2xpZGVyLWl0ZW0nLFxuICAgIHByaXplc0xlZnRBcnJvdywgcHJpemVzUmlnaHRBcnJvdywgdHJ1ZSk7XG5cbmZ1bmN0aW9uIHNsaWRlcihpZCwgaXRlbVNlbGVjdG9yLCBsZWZ0QXJyb3csIHJpZ2h0QXJyb3csIGF1dG9wbGF5LCBjb25maWcpIHtcbiAgICBjb25zdCBBVVRPUExBWV9JTlRFUlZBTCA9IDUwMDAwMDAwMDAwMDA7XG5cbiAgICB2YXIgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgZWwuY2xhc3NMaXN0LmFkZCgnc2xpZGVyJylcbiAgICB2YXIgbWVkaWFTdGVwID0gJyc7XG4gICAgdmFyIGFjdGl2ZUluZEluZGV4ID0gMDtcbiAgICB2YXIgdG9vZ2xlSW5kZXggPSAwO1xuICAgIHZhciBpdGVtcyA9IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoaXRlbVNlbGVjdG9yKTtcbiAgICB2YXIgdGltZXJJZDtcblxuICAgIGZ1bmN0aW9uIGdldE1lZGlhU3RlcCgpIHtcbiAgICAgICAgdmFyIHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIHZhciBuZXdTdGVwID0gd2lkdGggPiAob2JqLmNvbmZpZy5tZWRpYSAmJiBvYmouY29uZmlnLm1lZGlhLmxnKSA/ICdsZydcbiAgICAgICAgICAgIDogd2lkdGggPiAob2JqLmNvbmZpZy5tZWRpYSAmJiBvYmouY29uZmlnLm1lZGlhLm1kKSA/ICdtZCdcbiAgICAgICAgICAgICAgICA6IHdpZHRoID4gKG9iai5jb25maWcubWVkaWEgJiYgb2JqLmNvbmZpZy5tZWRpYS5zbSkgPyAnc20nIDogJ3hzJztcblxuICAgICAgICBpZiAobWVkaWFTdGVwICE9PSBuZXdTdGVwKSB7XG4gICAgICAgICAgICBtZWRpYVN0ZXAgPSBuZXdTdGVwO1xuICAgICAgICAgICAgb2JqLmJ1aWxkU2xpZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIGdldEl0ZW1zUXVhbnRpdHkoKSB7XG4gICAgICAgIHJldHVybiBvYmouY29uZmlnLmVsZW1zUGVyUGFnZVttZWRpYVN0ZXBdXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25SZXNpemUoKSB7XG4gICAgICAgIGdldE1lZGlhU3RlcCgpXG4gICAgfVxuXG4gICAgdmFyIG9iaiA9IHtcbiAgICAgICAgYWN0aXZlSW5kZXg6IDAsXG4gICAgICAgIGFjdGl2ZUluZEluZGV4OiBhY3RpdmVJbmRJbmRleCA+IDAgPyBhY3RpdmVJbmRJbmRleCA6IDAsXG4gICAgICAgIHRvZ2dsZUluZGV4OiAwLFxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBnZXRNZWRpYVN0ZXAoKTtcblxuICAgICAgICAgICAgdmFyIHN0YXJ0WCA9IDBcbiAgICAgICAgICAgIHZhciB0b3VjaGVkID0gZmFsc2VcblxuICAgICAgICAgICAgdmFyIGlubmVyID0gZWwucXVlcnlTZWxlY3RvcignLnNsaWRlci1pbm5lcicpO1xuICAgICAgICAgICAgdmFyIGluZGljYXRvcnMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCcuc2xpZGVyLWluZGljYXRvcicpO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBvbk1vdXNlRG93bihlKSB7XG4gICAgICAgICAgICAgICAgc3RhcnRYID0gZS5jbGllbnRYIHx8IGUudG91Y2hlc1swXS5jbGllbnRYO1xuICAgICAgICAgICAgICAgIHRvdWNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHdlZWtseSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZXN1bHRfX3dlZWtzLWJ0bicpO1xuICAgICAgICAgICAgICAgIC8vIGZvciAoY29uc3QgaXRlbSBvZiB3ZWVrbHkpIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHNlbGVjdFdlZWspO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBvbk1vdXNlTW92ZShlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgaWYgKHRvdWNoZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5uZXIgPSBpbm5lciB8fCBlbC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLWlubmVyJylcbiAgICAgICAgICAgICAgICAgICAgdmFyIHggPSBlLmNsaWVudFggfHwgZS50b3VjaGVzWzBdLmNsaWVudFg7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkaWZmID0geCAtIHN0YXJ0WDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChkaWZmIDwgMCAmJiBhY3RpdmVJbmRJbmRleCA8IGluZGljYXRvcnMubGVuZ3RoIC0gMSkgfHwgKGRpZmYgPiAwICYmIGFjdGl2ZUluZEluZGV4ID4gMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKCcgKyBkaWZmICsgJ3B4KSdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gb25Nb3VzZUVuZChlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRvdWNoZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHggPSBlLmNsaWVudFggfHwgZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYO1xuICAgICAgICAgICAgICAgICAgICBpZiAoeCAtIHN0YXJ0WCA+IDMwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVJbmRleChhY3RpdmVJbmRJbmRleCAtIDEpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhcnRYIC0geCA+IDMwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVJbmRleChhY3RpdmVJbmRJbmRleCArIDEpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaW5uZXIgPSBpbm5lciB8fCBlbC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLWlubmVyJylcbiAgICAgICAgICAgICAgICAgICAgaW5uZXIuc3R5bGUudHJhbnNmb3JtID0gJydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdG91Y2hlZCA9IGZhbHNlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJpZ2h0QXJyb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdG9nZ2xlSW5kZXgoYWN0aXZlSW5kSW5kZXggKyAxKVxuICAgICAgICAgICAgICAgIC8vIG9iai5uZXh0KClcbiAgICAgICAgICAgICAgICBjb3VudGVyU2xpZGUrK1xuICAgICAgICAgICAgICAgIHNsaWRlckNvdW50LmlubmVySFRNTCA9IGNvdW50ZXJTbGlkZTtcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGxlZnRBcnJvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0b2dnbGVJbmRleChhY3RpdmVJbmRJbmRleCAtIDEpXG4gICAgICAgICAgICAgICAgLy8gb2JqLnByZXYoKVxuICAgICAgICAgICAgICAgIGNvdW50ZXJTbGlkZS0tXG4gICAgICAgICAgICAgICAgc2xpZGVyQ291bnQuaW5uZXJIVE1MID0gY291bnRlclNsaWRlO1xuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIG9uUmVzaXplKTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBvblJlc2l6ZSk7XG4gICAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBvbk1vdXNlRG93bik7XG4gICAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgb25Nb3VzZURvd24pO1xuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgb25Nb3VzZURvd24pO1xuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIG9uTW91c2VEb3duKTtcbiAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlKTtcbiAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIG9uTW91c2VNb3ZlKTtcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlKTtcbiAgICAgICAgICAgIC8vIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIG9uTW91c2VNb3ZlKTtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25Nb3VzZUVuZCk7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBvbk1vdXNlRW5kKTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25Nb3VzZUVuZCk7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBvbk1vdXNlRW5kKTtcblxuICAgICAgICAgICAgaWYgKGF1dG9wbGF5KSB7XG4gICAgICAgICAgICAgICAgdGltZXJJZCA9IHNldEludGVydmFsKCgpID0+IHRvZ2dsZUluZGV4KChhY3RpdmVJbmRJbmRleCArIDEpICUgaW5kaWNhdG9ycy5sZW5ndGgpLCBBVVRPUExBWV9JTlRFUlZBTCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBvYmpcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICBlbGVtc1BlclBhZ2U6IHtcbiAgICAgICAgICAgICAgICAuLi57XG4gICAgICAgICAgICAgICAgICAgICdsZyc6IDEsXG4gICAgICAgICAgICAgICAgICAgICdtZCc6IDEsXG4gICAgICAgICAgICAgICAgICAgICdzbSc6IDEsXG4gICAgICAgICAgICAgICAgICAgICd4cyc6IDFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIC4uLigoY29uZmlnICYmIGNvbmZpZy5lbGVtc1BlclBhZ2UpIHx8IHt9KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1lZGlhOiB7XG4gICAgICAgICAgICAgICAgLi4ue1xuICAgICAgICAgICAgICAgICAgICAnbGcnOiAxMTYwLFxuICAgICAgICAgICAgICAgICAgICAnbWQnOiA5MjAsXG4gICAgICAgICAgICAgICAgICAgICdzbSc6IDcwMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLi4uKChjb25maWcgJiYgY29uZmlnLm1lZGlhKSB8fCB7fSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYnVpbGRTbGlkZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG9iai5yZW1vdmVTbGlkZXIoKTtcblxuXG4gICAgICAgICAgICB2YXIgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICB3cmFwcGVyLmNsYXNzTmFtZSA9ICdzbGlkZXItd3JhcHBlcic7XG4gICAgICAgICAgICB2YXIgaW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgaW5uZXIuY2xhc3NOYW1lID0gJ3NsaWRlci1pbm5lcic7XG4gICAgICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGlubmVyKTtcbiAgICAgICAgICAgIGVsLmFwcGVuZENoaWxkKHdyYXBwZXIpO1xuXG4gICAgICAgICAgICBpZiAob2JqLmNvbmZpZy5lbGVtc1BlclBhZ2VbbWVkaWFTdGVwXSA+PSBpdGVtcy5sZW5ndGggKyAxKSB7XG4gICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnbm90LWVub3VnaC1lbGVtcycpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJ1aWxkUGFnZXMoKTtcbiAgICAgICAgfSxcbiAgICAgICAgLy8gICAgIGdldE1lZGlhU3RlcCgpIHtcbiAgICAgICAgLy8gICAgIC8vIHZhciB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICAvLyAgICAgLy8gdmFyIG5ld1N0ZXAgPSB3aWR0aCA+IG1lZGlhQ29uZmlnICYmIG1lZGlhQ29uZmlnLmxnICE9PSB1bmRlZmluZWQgPyBtZWRpYUNvbmZpZy5sZyA6IDExNTAgPyAnbGcnXG4gICAgICAgIC8vICAgICAvLyAgICAgOiB3aWR0aCA+IChtZWRpYUNvbmZpZyAmJiBtZWRpYUNvbmZpZy5tZCAhPT0gdW5kZWZpbmVkID8gbWVkaWFDb25maWcubWQgOiA3NjcpID8gJ21kJ1xuICAgICAgICAvLyAgICAgLy8gICAgICAgICA6IHdpZHRoID4gKG1lZGlhQ29uZmlnICYmIG1lZGlhQ29uZmlnLnNtICE9PSB1bmRlZmluZWQgPyBtZWRpYUNvbmZpZy5zbSA6IDYwMCkgPyAnc20nIDogJ3hzJztcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgIGlmIChtZWRpYVN0ZXAgIT09IG5ld1N0ZXApIHtcbiAgICAgICAgLy8gICAgICAgICBtZWRpYVN0ZXAgPSBuZXdTdGVwO1xuICAgICAgICAvLyAgICAgICAgIG9iai5idWlsZFNsaWRlcigpO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9LFxuICAgICAgICByZW1vdmVTbGlkZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB3cmFwcGVyID0gZWwucXVlcnlTZWxlY3RvcignLnNsaWRlci13cmFwcGVyJyk7XG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdub3QtZW5vdWdoLWVsZW1zJylcbiAgICAgICAgICAgIHdyYXBwZXIgJiYgd3JhcHBlci5yZW1vdmUoKTtcbiAgICAgICAgICAgIGlmICh0aW1lcklkKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcklkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdG9nZ2xlOiB0b2dnbGVJbmRleFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJ1aWxkSW5kaWNhdG9ycygpIHtcbiAgICAgICAgdmFyIHByZXZJbmQgPSBlbC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLWluZGljYXRvcnMnKTtcbiAgICAgICAgcHJldkluZCAmJiBwcmV2SW5kLnJlbW92ZSgpO1xuXG4gICAgICAgIHZhciBpbmRpY2F0b3JzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGluZGljYXRvcnMuY2xhc3NMaXN0LmFkZCgnc2xpZGVyLWluZGljYXRvcnMnKVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE1hdGguY2VpbChpdGVtcy5sZW5ndGggLyBnZXRJdGVtc1F1YW50aXR5KCkpOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpbmRpY2F0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGluZGljYXRvci5jbGFzc0xpc3QuYWRkKCdzbGlkZXItaW5kaWNhdG9yJyk7XG4gICAgICAgICAgICBpZiAoaSA9PT0gYWN0aXZlSW5kSW5kZXgpIHtcbiAgICAgICAgICAgICAgICBpbmRpY2F0b3IuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbmRpY2F0b3Iuc2V0QXR0cmlidXRlKCdpbmRleCcsIGkpXG4gICAgICAgICAgICBpbmRpY2F0b3IuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdG9nZ2xlSW5kZXgoaSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBpbmRpY2F0b3JzLmFwcGVuZENoaWxkKGluZGljYXRvcik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgd3JhcHBlciA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItd3JhcHBlcicpXG4gICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoaW5kaWNhdG9ycyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYnVpbGRQYWdlcyhzdGVwKSB7XG4gICAgICAgIHN0ZXAgPSBzdGVwIHx8IDE7XG4gICAgICAgIHZhciBwYWdlUHJldiA9IGJ1aWxkUGFnZShvYmouYWN0aXZlSW5kZXggKyBpdGVtcy5sZW5ndGggLSBnZXRJdGVtc1F1YW50aXR5KCkgKiBzdGVwKTtcbiAgICAgICAgdmFyIHBhZ2VDdXJyZW50ID0gYnVpbGRQYWdlKG9iai5hY3RpdmVJbmRleClcbiAgICAgICAgdmFyIHBhZ2VOZXh0ID0gYnVpbGRQYWdlKG9iai5hY3RpdmVJbmRleCArIGdldEl0ZW1zUXVhbnRpdHkoKSAqIHN0ZXApO1xuICAgICAgICB2YXIgaW5uZXIgPSBlbC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLWlubmVyJyk7XG4gICAgICAgIGlmIChnZXRJdGVtc1F1YW50aXR5KCkgPCBpdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGJ1aWxkSW5kaWNhdG9ycygpO1xuICAgICAgICAgICAgaWYgKCFlbC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLWluZGljYXRvci5hY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgIC8vIHRvZ2dsZUluZGV4KDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlubmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBpbm5lci5hcHBlbmRDaGlsZChwYWdlUHJldilcbiAgICAgICAgaW5uZXIuYXBwZW5kQ2hpbGQocGFnZUN1cnJlbnQpXG4gICAgICAgIGlubmVyLmFwcGVuZENoaWxkKHBhZ2VOZXh0KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJ1aWxkUGFnZShpbmRleCkge1xuICAgICAgICB2YXIgcGFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgcGFnZS5jbGFzc0xpc3QuYWRkKCdzbGlkZXItcGFnZScpXG4gICAgICAgIGZvciAobGV0IGkgPSBpbmRleDsgaSA8IChpbmRleCArIGdldEl0ZW1zUXVhbnRpdHkoKSk7IGkrKykge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBpdGVtc1tpICUgaXRlbXMubGVuZ3RoXTtcbiAgICAgICAgICAgIGxldCBuZXdJdGVtID0gaXRlbS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgICAgICBwYWdlLmFwcGVuZENoaWxkKG5ld0l0ZW0pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhZ2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9nZ2xlSW5kZXgoaW5kZXgpIHtcbiAgICAgICAgdmFyIGluZEFjdGl2ZSA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItaW5kaWNhdG9yLmFjdGl2ZScpXG4gICAgICAgIHZhciBpbmRpY2F0b3JzID0gZWwucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlci1pbmRpY2F0b3InKTtcbiAgICAgICAgaWYgKCFpbmRpY2F0b3JzW2luZGV4XSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBsZWZ0QXJyb3cuY2xhc3NMaXN0LnJlbW92ZSgnYXJyb3ctZGlzYWJsZWQnKTtcbiAgICAgICAgcmlnaHRBcnJvdy5jbGFzc0xpc3QucmVtb3ZlKCdhcnJvdy1kaXNhYmxlZCcpO1xuXG4gICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgbGVmdEFycm93LmNsYXNzTGlzdC5hZGQoJ2Fycm93LWRpc2FibGVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5kZXggPT09IGluZGljYXRvcnMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgcmlnaHRBcnJvdy5jbGFzc0xpc3QuYWRkKCdhcnJvdy1kaXNhYmxlZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5kQWN0aXZlICYmIGluZEFjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgICAgICBpbmRpY2F0b3JzW2luZGV4XSAmJiBpbmRpY2F0b3JzW2luZGV4XS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgICAgICBpZiAoaW5kZXggPiBhY3RpdmVJbmRJbmRleCkge1xuICAgICAgICAgICAgaW5kZXggLSBhY3RpdmVJbmRJbmRleCA+IDEgJiYgYnVpbGRQYWdlcyhpbmRleCAtIGFjdGl2ZUluZEluZGV4KVxuICAgICAgICAgICAgb2JqLm5leHQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChpbmRleCA8IGFjdGl2ZUluZEluZGV4KSB7XG4gICAgICAgICAgICBhY3RpdmVJbmRJbmRleCAtIGluZGV4ID4gMSAmJiBidWlsZFBhZ2VzKGFjdGl2ZUluZEluZGV4IC0gaW5kZXgpXG4gICAgICAgICAgICBvYmoucHJldigpXG4gICAgICAgIH1cbiAgICAgICAgYWN0aXZlSW5kSW5kZXggPSBpbmRleFxuICAgICAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VycmVudCcpLnRleHRDb250ZW50ID0gYWN0aXZlSW5kSW5kZXggKyAxO1xuICAgIH1cblxuICAgIG9iai5wcmV2ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgd3JhcHBlciA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItd3JhcHBlcicpXG4gICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZCgncHJldicpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgncHJldicpXG4gICAgICAgICAgICBvYmouYWN0aXZlSW5kZXggPSAob2JqLmFjdGl2ZUluZGV4IC0gZ2V0SXRlbXNRdWFudGl0eSgpICsgaXRlbXMubGVuZ3RoKSAlIGl0ZW1zLmxlbmd0aDtcbiAgICAgICAgICAgIGJ1aWxkUGFnZXMoKVxuICAgICAgICB9LCAzMDApO1xuICAgIH1cblxuICAgIG9iai5uZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgd3JhcHBlciA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItd3JhcHBlcicpXG4gICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnbmV4dCcpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgnbmV4dCcpXG4gICAgICAgICAgICBvYmouYWN0aXZlSW5kZXggPSAob2JqLmFjdGl2ZUluZGV4ICsgZ2V0SXRlbXNRdWFudGl0eSgpICsgaXRlbXMubGVuZ3RoKSAlIGl0ZW1zLmxlbmd0aDtcbiAgICAgICAgICAgIGJ1aWxkUGFnZXMoKVxuICAgICAgICB9LCAzMDApO1xuICAgIH1cbiAgICByZXR1cm4gb2JqLmluaXQoKTtcbn1cblxuIiwiKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBwcm9tb1N0YXJ0RGF0ZSA9IG5ldyBEYXRlKERhdGUuVVRDKDIwMjIsIDgsIDI2KSk7XG4gICAgY29uc3QgcHJvbW9DaGVja3BvaW50c0NudCA9IDEwO1xuICAgIGNvbnN0IGRheXNQZXJVcGRhdGUgPSAxMTtcbiAgICBjb25zdCBwcm9tb0NoZWNrUG9pbnREYXRlcyA9IGNvbXB1dGVQcm9tb0NoZWNrcG9pbnREYXRlcygpO1xuICAgIGxldCBjdXJyZW50Q2hlY2twb2ludCA9IGdldEN1cnJlbnRDaGVja3BvaW50KCk7XG5cbiAgICBjb25zdCBtYWluUGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mYXZfX3BhZ2UnKTtcblxuICAgIG9uQ2hlY2twb2ludFVwZGF0ZSgpO1xuXG4gICAgZnVuY3Rpb24gY29tcHV0ZVByb21vQ2hlY2twb2ludERhdGVzKCkge1xuICAgICAgICBjb25zdCBwcm9tb0NoZWNrcG9pbnRzID0gW3Byb21vU3RhcnREYXRlXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gcHJvbW9DaGVja3BvaW50c0NudDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0Q2hlY2twb2ludCA9IG5ldyBEYXRlKHByb21vU3RhcnREYXRlLmdldFRpbWUoKSk7XG4gICAgICAgICAgICBuZXh0Q2hlY2twb2ludC5zZXREYXRlKHByb21vU3RhcnREYXRlLmdldERhdGUoKSArIGkgKiBkYXlzUGVyVXBkYXRlKTtcbiAgICAgICAgICAgIHByb21vQ2hlY2twb2ludHMucHVzaChuZXh0Q2hlY2twb2ludCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByb21vQ2hlY2twb2ludHM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Q3VycmVudENoZWNrcG9pbnQoKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lc3RhbXAgPSAgRGF0ZS5ub3coKTtcbiAgICAgICAgbGV0IGNoZWNrcG9pbnROdW0gPSAwO1xuICAgICAgICB3aGlsZShjdXJyZW50VGltZXN0YW1wID49IHByb21vQ2hlY2tQb2ludERhdGVzW2NoZWNrcG9pbnROdW1dKSB7XG4gICAgICAgICAgICBjaGVja3BvaW50TnVtKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNoZWNrcG9pbnROdW07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25DaGVja3BvaW50VXBkYXRlKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBwcm9tb0NoZWNrcG9pbnRzQ250OyBpKyspIHtcbiAgICAgICAgICAgIG1haW5QYWdlLmNsYXNzTGlzdC5yZW1vdmUoYGNhciR7aX1gKVxuICAgICAgICB9XG4gICAgICAgIG1haW5QYWdlLmNsYXNzTGlzdC5hZGQoYGNhciR7Y3VycmVudENoZWNrcG9pbnR9YClcbiAgICB9XG5cbn0pKCk7XG5cbmNvbnN0IHBlcmNlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGVyY2V0bicpO1xuY29uc3QgZmF2UGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mYXZfX3BhZ2UnKTtcbmNvbnN0IGF1dG9NaW5Ob25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmF1dG8td2luJyk7XG5jb25zdCBhdXRvTWluTm9uZTIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYXV0by13aW4tMicpO1xuXG5mb3IobGV0IGk9MDsgaTxhdXRvTWluTm9uZS5sZW5ndGg7IGkrKyl7XG4gICAgaWYoZmF2UGFnZS5jbGFzc0xpc3QuY29udGFpbnMoJ2NhcjEnKSl7XG4gICAgICAgIGF1dG9NaW5Ob25lWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2xvYWQnKTtcbiAgICAgICAgYXV0b01pbk5vbmVbMF0uY2xhc3NMaXN0LmFkZCgnZG9uZScpO1xuICAgICAgICBhdXRvTWluTm9uZVsxXS5jbGFzc0xpc3QuYWRkKCdsb2FkJyk7XG4gICAgICAgIGF1dG9NaW5Ob25lMlswXS5jbGFzc0xpc3QucmVtb3ZlKCdsb2FkJyk7XG4gICAgICAgIGF1dG9NaW5Ob25lMlswXS5jbGFzc0xpc3QuYWRkKCdkb25lJyk7XG4gICAgICAgIGF1dG9NaW5Ob25lMlsxXS5jbGFzc0xpc3QuYWRkKCdsb2FkJyk7XG4gICAgfVxuICAgIGlmKGZhdlBhZ2UuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYXIyJykpe1xuICAgICAgICBhdXRvTWluTm9uZVswXS5jbGFzc0xpc3QucmVtb3ZlKCdsb2FkJyk7XG4gICAgICAgIGF1dG9NaW5Ob25lWzBdLmNsYXNzTGlzdC5hZGQoJ2RvbmUnKTtcbiAgICAgICAgYXV0b01pbk5vbmVbMV0uY2xhc3NMaXN0LmFkZCgnZG9uZScpO1xuICAgICAgICBhdXRvTWluTm9uZVsyXS5jbGFzc0xpc3QuYWRkKCdsb2FkJyk7XG4gICAgICAgIGF1dG9NaW5Ob25lMlswXS5jbGFzc0xpc3QucmVtb3ZlKCdsb2FkJyk7XG4gICAgICAgIGF1dG9NaW5Ob25lMlswXS5jbGFzc0xpc3QuYWRkKCdkb25lJyk7XG4gICAgICAgIGF1dG9NaW5Ob25lMlsxXS5jbGFzc0xpc3QuYWRkKCdkb25lJyk7XG4gICAgICAgIGF1dG9NaW5Ob25lMlsyXS5jbGFzc0xpc3QuYWRkKCdsb2FkJyk7XG4gICAgfVxuICAgIGlmKGZhdlBhZ2UuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYXIzJykpe1xuICAgICAgICBhdXRvTWluTm9uZVswXS5jbGFzc0xpc3QucmVtb3ZlKCdsb2FkJyk7XG4gICAgICAgIGF1dG9NaW5Ob25lWzBdLmNsYXNzTGlzdC5hZGQoJ2RvbmUnKTtcbiAgICAgICAgYXV0b01pbk5vbmVbMV0uY2xhc3NMaXN0LmFkZCgnZG9uZScpO1xuICAgICAgICBhdXRvTWluTm9uZVsyXS5jbGFzc0xpc3QuYWRkKCdkb25lJyk7XG4gICAgICAgIGF1dG9NaW5Ob25lWzNdLmNsYXNzTGlzdC5hZGQoJ2xvYWQnKTtcbiAgICAgICAgYXV0b01pbk5vbmUyWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2xvYWQnKTtcbiAgICAgICAgYXV0b01pbk5vbmUyWzBdLmNsYXNzTGlzdC5hZGQoJ2RvbmUnKTtcbiAgICAgICAgYXV0b01pbk5vbmUyWzFdLmNsYXNzTGlzdC5hZGQoJ2RvbmUnKTtcbiAgICAgICAgYXV0b01pbk5vbmUyWzJdLmNsYXNzTGlzdC5hZGQoJ2RvbmUnKTtcbiAgICAgICAgYXV0b01pbk5vbmUyWzNdLmNsYXNzTGlzdC5hZGQoJ2xvYWQnKTtcbiAgICB9XG4gICAgaWYoZmF2UGFnZS5jbGFzc0xpc3QuY29udGFpbnMoJ2NhcjQnKSl7XG4gICAgICAgIGF1dG9NaW5Ob25lWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2xvYWQnKTtcbiAgICAgICAgYXV0b01pbk5vbmVbMF0uY2xhc3NMaXN0LmFkZCgnZG9uZScpO1xuICAgICAgICBhdXRvTWluTm9uZVsxXS5jbGFzc0xpc3QuYWRkKCdkb25lJyk7XG4gICAgICAgIGF1dG9NaW5Ob25lWzJdLmNsYXNzTGlzdC5hZGQoJ2RvbmUnKTtcbiAgICAgICAgYXV0b01pbk5vbmVbM10uY2xhc3NMaXN0LmFkZCgnZG9uZScpO1xuICAgICAgICBhdXRvTWluTm9uZVs0XS5jbGFzc0xpc3QuYWRkKCdsb2FkJyk7XG4gICAgICAgIGF1dG9NaW5Ob25lMlswXS5jbGFzc0xpc3QucmVtb3ZlKCdsb2FkJyk7XG4gICAgICAgIGF1dG9NaW5Ob25lMlswXS5jbGFzc0xpc3QuYWRkKCdkb25lJyk7XG4gICAgICAgIGF1dG9NaW5Ob25lMlsxXS5jbGFzc0xpc3QuYWRkKCdkb25lJyk7XG4gICAgICAgIGF1dG9NaW5Ob25lMlsyXS5jbGFzc0xpc3QuYWRkKCdkb25lJyk7XG4gICAgICAgIGF1dG9NaW5Ob25lMlszXS5jbGFzc0xpc3QuYWRkKCdkb25lJyk7XG4gICAgICAgIGF1dG9NaW5Ob25lMls0XS5jbGFzc0xpc3QuYWRkKCdsb2FkJyk7XG4gICAgfVxuICAgIGlmKGZhdlBhZ2UuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYXI1Jykpe1xuICAgICAgICBhdXRvTWluTm9uZVswXS5jbGFzc0xpc3QucmVtb3ZlKCdsb2FkJyk7XG4gICAgICAgIGF1dG9NaW5Ob25lWzBdLmNsYXNzTGlzdC5hZGQoJ2RvbmUnKTtcbiAgICAgICAgYXV0b01pbk5vbmUyWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2xvYWQnKTtcbiAgICAgICAgYXV0b01pbk5vbmUyWzBdLmNsYXNzTGlzdC5hZGQoJ2RvbmUnKTtcbiAgICAgICAgZm9yKGxldCBpPTE7IGk8PTQ7IGkrKyl7XG4gICAgICAgICAgICBhdXRvTWluTm9uZVtpXS5jbGFzc0xpc3QuYWRkKCdkb25lJyk7XG4gICAgICAgICAgICBhdXRvTWluTm9uZTJbaV0uY2xhc3NMaXN0LmFkZCgnZG9uZScpO1xuICAgICAgICB9XG4gICAgICAgIGF1dG9NaW5Ob25lWzVdLmNsYXNzTGlzdC5hZGQoJ2xvYWQnKTtcbiAgICAgICAgYXV0b01pbk5vbmUyWzVdLmNsYXNzTGlzdC5hZGQoJ2xvYWQnKTtcbiAgICB9XG4gICAgaWYoZmF2UGFnZS5jbGFzc0xpc3QuY29udGFpbnMoJ2NhcjYnKSl7XG4gICAgICAgIGF1dG9NaW5Ob25lWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2xvYWQnKTtcbiAgICAgICAgYXV0b01pbk5vbmVbMF0uY2xhc3NMaXN0LmFkZCgnZG9uZScpO1xuICAgICAgICBhdXRvTWluTm9uZTJbMF0uY2xhc3NMaXN0LnJlbW92ZSgnbG9hZCcpO1xuICAgICAgICBhdXRvTWluTm9uZTJbMF0uY2xhc3NMaXN0LmFkZCgnZG9uZScpO1xuICAgICAgICBmb3IobGV0IGk9MTsgaTw9NTsgaSsrKXtcbiAgICAgICAgICAgIGF1dG9NaW5Ob25lW2ldLmNsYXNzTGlzdC5hZGQoJ2RvbmUnKTtcbiAgICAgICAgICAgIGF1dG9NaW5Ob25lMltpXS5jbGFzc0xpc3QuYWRkKCdkb25lJyk7XG4gICAgICAgIH1cbiAgICAgICAgYXV0b01pbk5vbmVbNl0uY2xhc3NMaXN0LmFkZCgnbG9hZCcpO1xuICAgICAgICBhdXRvTWluTm9uZTJbNl0uY2xhc3NMaXN0LmFkZCgnbG9hZCcpO1xuICAgIH1cbiAgICBpZihmYXZQYWdlLmNsYXNzTGlzdC5jb250YWlucygnY2FyNycpKXtcbiAgICAgICAgYXV0b01pbk5vbmVbMF0uY2xhc3NMaXN0LnJlbW92ZSgnbG9hZCcpO1xuICAgICAgICBhdXRvTWluTm9uZVswXS5jbGFzc0xpc3QuYWRkKCdkb25lJyk7XG4gICAgICAgIGF1dG9NaW5Ob25lMlswXS5jbGFzc0xpc3QucmVtb3ZlKCdsb2FkJyk7XG4gICAgICAgIGF1dG9NaW5Ob25lMlswXS5jbGFzc0xpc3QuYWRkKCdkb25lJyk7XG4gICAgICAgIGZvcihsZXQgaT0xOyBpPD02OyBpKyspe1xuICAgICAgICAgICAgYXV0b01pbk5vbmVbaV0uY2xhc3NMaXN0LmFkZCgnZG9uZScpO1xuICAgICAgICAgICAgYXV0b01pbk5vbmUyW2ldLmNsYXNzTGlzdC5hZGQoJ2RvbmUnKTtcbiAgICAgICAgfVxuICAgICAgICBhdXRvTWluTm9uZVs3XS5jbGFzc0xpc3QuYWRkKCdsb2FkJyk7XG4gICAgICAgIGF1dG9NaW5Ob25lMls3XS5jbGFzc0xpc3QuYWRkKCdsb2FkJyk7XG4gICAgfVxuICAgIGlmKGZhdlBhZ2UuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYXI4Jykpe1xuICAgICAgICBhdXRvTWluTm9uZVswXS5jbGFzc0xpc3QucmVtb3ZlKCdsb2FkJyk7XG4gICAgICAgIGF1dG9NaW5Ob25lWzBdLmNsYXNzTGlzdC5hZGQoJ2RvbmUnKTtcbiAgICAgICAgYXV0b01pbk5vbmUyWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2xvYWQnKTtcbiAgICAgICAgYXV0b01pbk5vbmUyWzBdLmNsYXNzTGlzdC5hZGQoJ2RvbmUnKTtcbiAgICAgICAgZm9yKGxldCBpPTE7IGk8PTc7IGkrKyl7XG4gICAgICAgICAgICBhdXRvTWluTm9uZVtpXS5jbGFzc0xpc3QuYWRkKCdkb25lJyk7XG4gICAgICAgICAgICBhdXRvTWluTm9uZTJbaV0uY2xhc3NMaXN0LmFkZCgnZG9uZScpO1xuICAgICAgICB9XG4gICAgICAgIGF1dG9NaW5Ob25lWzhdLmNsYXNzTGlzdC5hZGQoJ2xvYWQnKTtcbiAgICAgICAgYXV0b01pbk5vbmUyWzhdLmNsYXNzTGlzdC5hZGQoJ2xvYWQnKTtcbiAgICB9XG4gICAgaWYoZmF2UGFnZS5jbGFzc0xpc3QuY29udGFpbnMoJ2NhcjknKSl7XG4gICAgICAgIGF1dG9NaW5Ob25lWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2xvYWQnKTtcbiAgICAgICAgYXV0b01pbk5vbmVbMF0uY2xhc3NMaXN0LmFkZCgnZG9uZScpO1xuICAgICAgICBhdXRvTWluTm9uZTJbMF0uY2xhc3NMaXN0LnJlbW92ZSgnbG9hZCcpO1xuICAgICAgICBhdXRvTWluTm9uZTJbMF0uY2xhc3NMaXN0LmFkZCgnZG9uZScpO1xuICAgICAgICBmb3IobGV0IGk9MTsgaTw9ODsgaSsrKXtcbiAgICAgICAgICAgIGF1dG9NaW5Ob25lW2ldLmNsYXNzTGlzdC5hZGQoJ2RvbmUnKTtcbiAgICAgICAgICAgIGF1dG9NaW5Ob25lMltpXS5jbGFzc0xpc3QuYWRkKCdkb25lJyk7XG4gICAgICAgIH1cbiAgICAgICAgYXV0b01pbk5vbmVbOV0uY2xhc3NMaXN0LmFkZCgnbG9hZCcpO1xuICAgICAgICBhdXRvTWluTm9uZTJbOV0uY2xhc3NMaXN0LmFkZCgnbG9hZCcpO1xuICAgIH1cbiAgICBpZihmYXZQYWdlLmNsYXNzTGlzdC5jb250YWlucygnY2FyMTAnKSl7XG4gICAgICAgIGF1dG9NaW5Ob25lWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2xvYWQnKTtcbiAgICAgICAgYXV0b01pbk5vbmVbMF0uY2xhc3NMaXN0LmFkZCgnZG9uZScpO1xuICAgICAgICBhdXRvTWluTm9uZTJbMF0uY2xhc3NMaXN0LnJlbW92ZSgnbG9hZCcpO1xuICAgICAgICBhdXRvTWluTm9uZTJbMF0uY2xhc3NMaXN0LmFkZCgnZG9uZScpO1xuICAgICAgICBmb3IobGV0IGk9MTsgaTw9OTsgaSsrKXtcbiAgICAgICAgICAgIGF1dG9NaW5Ob25lW2ldLmNsYXNzTGlzdC5hZGQoJ2RvbmUnKTtcbiAgICAgICAgICAgIGF1dG9NaW5Ob25lMltpXS5jbGFzc0xpc3QuYWRkKCdkb25lJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbnBlcmNlbnQuZm9yRWFjaChpdGVtPT57XG4gICAgaWYoZmF2UGFnZS5jbGFzc0xpc3QuY29udGFpbnMoJ2NhcjEnKSkgaXRlbS5pbm5lckhUTUwgPSAnMTMlJztcbiAgICBpZihmYXZQYWdlLmNsYXNzTGlzdC5jb250YWlucygnY2FyMicpKSBpdGVtLmlubmVySFRNTCA9ICcyMiUnO1xuICAgIGlmKGZhdlBhZ2UuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYXIzJykpIGl0ZW0uaW5uZXJIVE1MID0gJzM0JSc7XG4gICAgaWYoZmF2UGFnZS5jbGFzc0xpc3QuY29udGFpbnMoJ2NhcjQnKSkgaXRlbS5pbm5lckhUTUwgPSAnNDElJztcbiAgICBpZihmYXZQYWdlLmNsYXNzTGlzdC5jb250YWlucygnY2FyNScpKSBpdGVtLmlubmVySFRNTCA9ICc1NiUnO1xuICAgIGlmKGZhdlBhZ2UuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYXI2JykpIGl0ZW0uaW5uZXJIVE1MID0gJzYzJSc7XG4gICAgaWYoZmF2UGFnZS5jbGFzc0xpc3QuY29udGFpbnMoJ2NhcjcnKSkgaXRlbS5pbm5lckhUTUwgPSAnNzIlJztcbiAgICBpZihmYXZQYWdlLmNsYXNzTGlzdC5jb250YWlucygnY2FyOCcpKSBpdGVtLmlubmVySFRNTCA9ICc4NCUnO1xuICAgIGlmKGZhdlBhZ2UuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYXI5JykpIHtcbiAgICAgICAgaXRlbS5pbm5lckhUTUwgPSAnOTIlJ1xuICAgICAgICAvL9GC0YPRgiDQv9C10YDQtdC80LXRidCw0LXQvCDRgdGC0YDQtdC70L7Rh9C60Lgg0LLQu9C10LLQviwg0LrQvtCz0LTQsCDQv9GA0L7RhtC10L3RgiDQsdC+0LvRjNGI0LUgODhcblxuICAgICAgICBjb25zdCBhcnJvd3NQcm9ncmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXlfX2luZm8tcHJvZ3Jlc3MgLm15UHJvZ3Jlc3MgLmFycm93LXJpZ2h0JylcbiAgICAgICAgYXJyb3dzUHJvZ3Jlc3MuY2xhc3NMaXN0LmFkZCgnX2JpZ1BlcmNlbnQnKTtcblxuXG4gICAgfVxuICAgIGlmKGZhdlBhZ2UuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYXIxMCcpKXtcbiAgICAgICAgaXRlbS5pbm5lckhUTUwgPSAnOTklJ1xuICAgICAgICBjb25zdCBzZWNvbmRQcm9ncmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mYXZfX3BhZ2UgLmJ1eV9faW5mby1wcm9ncmVzcyAubXlQcm9ncmVzcycpXG4gICAgICAgIHNlY29uZFByb2dyZXNzLmNsYXNzTGlzdC5hZGQoJ19iaWdQZXJjZW50Jyk7XG5cblxuICAgIH07XG5cblxufSkiXX0=
