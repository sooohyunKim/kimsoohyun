/* Soohyun 2025 PortFolio JS */
(function () {
    window.portfolio = window.portfolio || {};

    window.portfolio.parallax = function () {
        let els = {};

        const init = function () {
            setElements();
            bindEvents();
        };

        const setElements = function () {
            els.section = document.querySelectorAll('.section');
        };

        const bindEvents = function () {
            eventHandler.mouseMove();
            eventHandler.parallax();
            eventHandler.overview();
        };

        const eventList = {
            mouseMove : function (e) {

            },
            mouseOver : function (e) {

            },
            mouseLeave : function (e) {

            },
            parallax : function () {
                let numPage = $('section').length,
                    pageNow = 0,
                    pagePrev = 0,
                    pageNext = 0,
                    direction = 0,
                    isWheelBlocked = false,
                    timerId = '',
                    effectTimerId = '';

                
            },
            overview : function () {

            }
        };

        const eventHandler = {
            mouseMove : function () {
                window.addEventListener('mousemove', eventList.mouseMove);
            },
            mouseOver : function () {
                allClickable.addEventListener('mouseover', eventList.mouseOver);
            },
            mouseLeave : function () {
                allClickable.addEventListener('mouseLeave', eventList.mouseLeave);
            },
            parallax : function () {

            },
            overview : function () {
                
            }
        };

        return init();
    };
})();