"use strict";





window.addEventListener('click', ()=> {

})

const DraggableOff = (function DraggableOff() {
    let _images = document.getElementsByTagName('img');

    const _updateDraggableImg = function _updateDraggableImg() {
        for (let i = 0; i < _images.length; i++) {
            _images[i].setAttribute('draggable', false);
        }
    }

    const init = function init() {
       _updateDraggableImg();
    };

    return {
        init: init,
    };
})();

window.addEventListener('load', function() {
    DraggableOff.init();
});