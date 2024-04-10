"use strict";

function getElemById(id) {
    return document.getElementById(id);
}

const Slider = (function Slider() {
    const _sliderButtons = document.querySelectorAll(".slider-button");
    const _cards = getElemById("cards--trending");
    const _scrollBar = getElemById("scrollbar");
    const _maxScrollLeft = _cards.scrollWidth - _cards.clientWidth;
    const _scrollBarThumb = getElemById("scrollbar__thumb");


    const _scrollLeftRight = function _scrollLeftRight( twoButtons ) {
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

    const _scrollThumbPosition = function _scrollThumbPosition() {
        const scrollPosition = _cards.scrollLeft;
        const thumbPosition = (scrollPosition/_maxScrollLeft) * (_scrollBar.clientWidth - _scrollBarThumb.offsetWidth);
        _scrollBarThumb.style.left = `${thumbPosition}px`;
    }

    const _dragSlider = function _dragSlider() {

        _scrollBarThumb.addEventListener("mousedown", updateThumb);

        function updateThumb( event ) {
            const startX = event.clientX;
            const thumbPosition = _scrollBarThumb.offsetLeft;

            const mouseMove = event => {
                const deltaX = event.cleintX - startX;
                const newThumbspostition = thumbPosition + deltaX
                _scrollBarThumb.style.left = `${newThumbspostition}px`
            }



            const handleMouseUp = () => {
                document.removeEventListener("mousemove", mouseMove)
                document.removeEventListener("mouseup", handleMouseUp)
            }
            
            document.addEventListener("mousemove", mouseMove);
            document.addEventListener("mouseup", handleMouseUp)
            console.log(startX)
        }
    } 

    const _updateSlider = function updateSlider() {
        _scrollLeftRight( _sliderButtons );
        _dragSlider();
       
       _cards.addEventListener("scroll", ()=> {
            _scrollThumbPosition();
       })
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