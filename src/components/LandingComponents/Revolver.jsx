import React, { useEffect } from 'react';

export default function Revolver({
  handleSetImages,
  allImages,
  updateFeedImageListeners,
}) {
  let timeoutID, timeoutID2;

  useEffect(() => {
    constructRevolver();
    return function cleanup() {
      clearInterval(timeoutID);
      clearInterval(timeoutID2);
    };
  }, []);

  const constructRevolver = () => {
    var rotateSlider = {
      slideHeight: 80,
      slideWidth: 70,
    };

    var revolver = {
      slides: document.querySelectorAll('.slides li'),
    };
    revolver.slides[0].setAttribute('checked', true);

    let svgPath = document.querySelectorAll('.svgPath');
    rotateSlider.slides = document.querySelectorAll(
      '.rotate-slider .slides li'
    );
    rotateSlider.slideCount = rotateSlider.slides.length;
    rotateSlider.slideAngle = 360 / rotateSlider.slideCount;
    rotateSlider.sliderElement = document.querySelector('.rotate-slider');
    rotateSlider.slidesContainer = document.querySelector(
      '.rotate-slider .slides'
    );
    rotateSlider.slideAngle = 360 / rotateSlider.slideCount;
    rotateSlider.halfAngleRad = ((rotateSlider.slideAngle / 2) * Math.PI) / 180;
    rotateSlider.innerRadius =
      ((1 / Math.tan(rotateSlider.halfAngleRad)) * rotateSlider.slideWidth) / 2;
    rotateSlider.outerRadius = Math.sqrt(
      Math.pow(rotateSlider.innerRadius + rotateSlider.slideHeight, 2) +
        Math.pow(rotateSlider.slideWidth / 2, 2)
    );
    rotateSlider.upperArcHeight =
      rotateSlider.outerRadius -
      (rotateSlider.innerRadius + rotateSlider.slideHeight);
    rotateSlider.lowerArcHeight =
      rotateSlider.innerRadius -
      rotateSlider.innerRadius * Math.cos(rotateSlider.halfAngleRad);
    rotateSlider.slideFullWidth =
      Math.sin(rotateSlider.halfAngleRad) * rotateSlider.outerRadius * 2;
    rotateSlider.slideFullHeight =
      rotateSlider.upperArcHeight +
      rotateSlider.slideHeight +
      rotateSlider.lowerArcHeight;
    rotateSlider.slideSidePadding =
      (rotateSlider.slideFullWidth - rotateSlider.slideWidth) / 2;
    rotateSlider.fullArcHeight =
      rotateSlider.outerRadius -
      rotateSlider.outerRadius * Math.cos(rotateSlider.halfAngleRad);
    rotateSlider.lowerArcOffset =
      (rotateSlider.slideFullWidth -
        Math.sin(rotateSlider.halfAngleRad) * rotateSlider.innerRadius * 2) /
      2;

    rotateSlider.sliderElement.style.height = `${rotateSlider.slideHeight}px`;

    rotateSlider.sliderElement.style.width = '100%';

    rotateSlider.slidesContainer.style.height = `${rotateSlider.outerRadius *
      2}px`;
    rotateSlider.slidesContainer.style.width = `${rotateSlider.outerRadius *
      2}px`;
    var pathCoords = 'M 0 ' + rotateSlider.fullArcHeight;
    pathCoords +=
      ' A ' +
      rotateSlider.outerRadius +
      ' ' +
      rotateSlider.outerRadius +
      ' 0 0 1 ' +
      rotateSlider.slideFullWidth +
      ' ' +
      rotateSlider.fullArcHeight;
    pathCoords +=
      ' L ' +
      (rotateSlider.slideFullWidth - rotateSlider.lowerArcOffset) +
      ' ' +
      rotateSlider.slideFullHeight;
    pathCoords +=
      ' A ' +
      rotateSlider.innerRadius +
      ' ' +
      rotateSlider.innerRadius +
      ' 0 0 0 ' +
      rotateSlider.lowerArcOffset +
      ' ' +
      rotateSlider.slideFullHeight +
      ' Z';

    svgPath.forEach((el) => {
      el.firstElementChild.setAttribute('d', pathCoords);
    });

    revolver.slides.forEach((el, index) => {
      el.style.transformOrigin = `center ${rotateSlider.innerRadius +
        rotateSlider.slideHeight}px`;

      el.style.height = `${rotateSlider.slideHeight +
        rotateSlider.upperArcHeight +
        rotateSlider.lowerArcHeight}px`;
      el.style.width = `${rotateSlider.slideWidth +
        rotateSlider.slideSidePadding * 2}px`;

      el.style.top = `${rotateSlider.upperArcHeight}px`;

      el.style.transform = `translateX(-50%) rotate(${rotateSlider.slideAngle *
        index}deg) translateY(-${rotateSlider.upperArcHeight}px)`;
    });

    const arrowR = document.getElementById('arrowR');
    const arrowL = document.getElementById('arrowL');

    arrowR.addEventListener('click', () => {
      rotateRevolver(rotateSlider.slidesContainer, revolver.slides, 'left');
    });
    arrowL.addEventListener('click', () => {
      rotateRevolver(rotateSlider.slidesContainer, revolver.slides, 'right');
    });

    function swipedetect(el, callback) {
      var touchsurface = el,
        swipedir,
        startX,
        startY,
        distX,
        distY,
        threshold = 40,
        restraint = 300,
        allowedTime = 1000,
        elapsedTime,
        startTime,
        handleswipe = callback || function(swipedir) {};

      touchsurface.addEventListener(
        'touchstart',
        function(e) {
          var touchobj = e.changedTouches[0];
          swipedir = 'none';
          startX = touchobj.pageX;
          startY = touchobj.pageY;
          startTime = new Date().getTime();
          e.preventDefault();
        },
        false
      );

      touchsurface.addEventListener(
        'touchmove',
        function(e) {
          e.preventDefault();
        },
        false
      );

      touchsurface.addEventListener(
        'touchend',
        function(e) {
          var touchobj = e.changedTouches[0];
          distX = touchobj.pageX - startX;
          distY = touchobj.pageY - startY;
          elapsedTime = new Date().getTime() - startTime;
          if (elapsedTime <= allowedTime) {
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
              if (distX > 0 || distX < 0) {
                if (distX < 0) {
                  rotateRevolver(
                    rotateSlider.slidesContainer,
                    revolver.slides,
                    'left'
                  );
                } else if (distX > 0) {
                  rotateRevolver(
                    rotateSlider.slidesContainer,
                    revolver.slides,
                    'right'
                  );
                }
              }
            }
          }
          handleswipe(swipedir);
          e.preventDefault();
        },
        false
      );
    }

    var el = document.getElementById('slides');
    swipedetect(el, function(swipedir) {});

    var currentItem = 0,
      rotateDegrees = 180;
    const rotateRevolver = (container, sections, direction) => {
      const userTutorial = document.getElementById('userTutorialRevolver');
      if (userTutorial) userTutorial.remove();
      clearInterval(timeoutID);

      if (direction === 'left') {
        rotateDegrees += rotateSlider.slideAngle;
        if (currentItem === 0) {
          sections[0].removeAttribute('checked');
          sections[sections.length - 1].setAttribute('checked', true);
          currentItem = sections.length - 1;
        } else {
          sections[currentItem].removeAttribute('checked');
          currentItem--;
          sections[currentItem].setAttribute('checked', true);
        }
      } else if (direction === 'right') {
        rotateDegrees -= rotateSlider.slideAngle;
        if (currentItem === sections.length - 1) {
          sections[sections.length - 1].removeAttribute('checked');
          sections[0].setAttribute('checked', true);
          currentItem = 0;
        } else {
          sections[currentItem].removeAttribute('checked');
          currentItem++;
          sections[currentItem].setAttribute('checked', true);
        }
      }

      container.style.transform = 'rotate(' + rotateDegrees + 'deg)';
      timeoutID2 = setTimeout(() => window.navigator.vibrate(50), 600);

      timeoutID = setTimeout(() => {
        swapRevolverImages(
          revolver.slides[currentItem].getAttribute('data-collection-name')
        );
      }, 300);
    };

    const swapRevolverImages = async (whichCollection) => {
      handleSetImages(allImages[whichCollection]);

      updateFeedImageListeners(allImages[whichCollection]);
    };

    swapRevolverImages('todos');
  };
  return <></>;
}
