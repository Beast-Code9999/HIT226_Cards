"use strict";

function getElemById(id) {
    return document.getElementById(id);
}

const Slider = (function Slider() {
    const _sliderButtons = document.querySelectorAll(".slider-button");
    const _cards = document.querySelector(".cards--trending");
    const _scrollBar = document.querySelector()


    const _scrollLeftRight = function _scrollLeftRight(twoButtons) {
        twoButtons.forEach( button =>  {
            button.addEventListener('click',() => {
                const direction = button.id === "button-next" ? 1 : -1; // if button--next direction = 1 else -1
                const scrollAmount = _cards.clientWidth * direction // if direction = 1, clientWidth is positive else negative 
                // using scrollBy() method to add scroll functionaility
                _cards.scrollBy({
                    left: scrollAmount,
                    behavior: "smooth"
                })
            })
        })
    } 

    // const _maxMinButtonPopup = function _maxMinButtonPopup() {
    //     const prevButton = document.querySelector('.slider-button--previous');
    //     const nextButton = document.querySelector('.slider-button--next');
    //     const maxScrollLeft = _cards.scrollWidth - _cards.clientWidth;

    //     prevButton.style.display = _cards.scrollLeft <= 0 ? "none" : "block"
    //     nextButton.style.display = _cards.scrollLeft >= maxScrollLeft ? "none" : "block"
    // }

    const _scrollThumbPosition = function _scrollThumbPosition() {
        const scrollPosition = _cards.scrollLeft;
        const maxScrollLeft = _cards.scrollWidth - _cards.clientWidth;
        const thumbPosition = (scrollPosition/maxScrollLeft);

        console.log(scrollPosition)
    }

    const _updateSlider = function updateSlider() {
        _scrollLeftRight(_sliderButtons)
        _scrollThumbPosition()
        // _maxMinButtonPopup()
    };

    const init = function init() {
        _updateSlider();
     };
 
     return {
         init: init,
     };
})();

// Turning off users ability to select and drag images or other elements if necessary
const DraggableOff = (function DraggableOff() {
    let _images = document.getElementsByTagName('img');

    const _updateDraggableImg = function _updateDraggableImg() {
        for (let i = 0; i < _images.length; i++) {
            _images[i].setAttribute('draggable', false);
        }
    };

    const init = function init() {
       _updateDraggableImg();
    };

    return {
        init: init,
    };
})();

window.addEventListener('load', function() {
    Slider.init();
    DraggableOff.init();
});