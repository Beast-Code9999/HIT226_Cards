"use strict";

function getElemById(id) {
    return document.getElementById(id);
}

// Allow user to use the scroll function through clicking previous or next buttons
// Allow user to use the scroll function when dragging scrollbar thumb
const Slider = (function Slider() {
    const _sliderButtons = document.querySelectorAll(".slider-button");
    const _cards = getElemById("cards--trending");
    const _scrollBar = getElemById("scrollbar");
    const _scrollBarTrack = getElemById("scrollbar__track")
    const _maxScrollLeft = _cards.scrollWidth - _cards.clientWidth;
    const _scrollBarThumb = getElemById("scrollbar__thumb");
    let _startX;
    let _thumbPosition

    const _scrollLeftRight = function _scrollLeftRight( twoButtons ) { // scroll left or right depending on button clicked
        twoButtons.forEach( button =>  {
            button.addEventListener('click',() => {
                const direction = button.id === "button-next" ? 1 : -1; // if button--next direction = 1 else -1
                const scrollAmount = _cards.clientWidth * direction; // if direction = 1, clientWidth is positive else negative 
                // using scrollBy() method to add scroll functionaility
                _cards.scrollBy({
                    left: scrollAmount,
                    behavior: "smooth",
                })  
            })
        })
    } 

    const _updateScrollThumbUsingButtons = function _updateScrollThumbUsingButtons() { // update thumb position by clicking buttons
        const scrollPosition = _cards.scrollLeft;
        const thumbPosition = (scrollPosition/_maxScrollLeft) * (_scrollBar.clientWidth - _scrollBarThumb.offsetWidth);
        _scrollBarThumb.style.left = `${thumbPosition}px`;
    }

    const _setMouseTracking = function _setMouseTracking(elem, callback) { // tracks mouse movement
        elem.addEventListener('mousedown', function(event) {
            _startX = event.clientX
             _thumbPosition = _scrollBarThumb.offsetLeft; 
            callback(event);
            document.addEventListener('mousemove', callback);
        });
        document.addEventListener('mouseup', function(event) {
            document.removeEventListener('mousemove', callback);
        });
    };

    const _updateSliderPosition = function _updateSliderPosition( left ) { // update slider thumb
        _scrollBarThumb.style.left = Math.max( left, -1 ) + 'px';
    };

    const _updateCardsScroll = function _updateCardsScroll( position ) {
        _cards.scrollLeft = position;
    }

    const _updateSliderx = function _updateSliderx( event ) {
        let thumbWidth = _scrollBarThumb.clientWidth
        let scrollbarWidth = _scrollBarTrack.clientWidth;  
        const deltaX = event.clientX - _startX; 
        /* 
            startX represents the position of cursor (clientX) when event = mousedown
            deltaX represents the position of cursor (clientX) when event = mousemove minus the previously defined clientX during mousedown event

            This essentially tracks the amount of px to the left (negative) or to the right (positive) of cursor when mouse is moving relative to its original mousedown position
        */

        const maxChangingPosition = scrollbarWidth - thumbWidth;
        const newThumbsPostition = _thumbPosition + deltaX

        const x = Math.max(0, Math.min(maxChangingPosition, newThumbsPostition )) // x position in px for scrollBarThumb
                
        const position = (x / maxChangingPosition) * _maxScrollLeft;
       
        _updateCardsScroll( position )
        _updateSliderPosition( x );
    };

    const _updateSlider = function updateSlider() {
        _scrollLeftRight( _sliderButtons );
        _setMouseTracking(  _scrollBarThumb, _updateSliderx );

       _cards.addEventListener("scroll", ()=> {
            _updateScrollThumbUsingButtons();
       })
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