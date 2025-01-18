/* Soohyun 2025 PortFolio JS */
(function () {
    window.portfolio = window.portfolio || {};

    window.portfolio.parallax = function () {
        let els = {};
        let isWheelBlocked = false;

        const init = function () {
            setElements();
            bindEvents();
        };

        const setElements = function () {
            // bg
            els.bg = document.querySelector('.bg-point');
            
            // section
            els.sectionWrap = document.querySelector('.features');
            els.section = document.querySelectorAll('.feature');

            // scroll
            els.scroll = document.querySelector('.scroll');

            // arrow
            els.arrowPrev = document.querySelector('.prev');
            els.arrowNext = document.querySelector('.next');

            // menu
            els.menuButtons = document.querySelectorAll('.menu');

            // wheelEvent variable
            els.numPage = els.section.length;
            els.pageNow = 0;
            els.pagePrev = 0;
            els.pageNext = 0;
            els.wheelDirection = 0;
            els.wheelTimer = '';
        };

        const bindEvents = function () {
            eventHandler.load();
            eventHandler.resize();
            eventHandler.scroll();
            eventHandler.arrowClick();
            eventHandler.menuClick();
        };

        const eventList = {
            mouseMove: function (e) {

            },
            mouseOver: function (e) {

            },
            mouseLeave: function (e) {

            },
            setPage: function () {
                for (let i = 0; i < els.numPage; i++) {
                    els.section[i].style.top = (i * 100) + '%';
                }
                eventList.showPage(1);
            },
            scroll: function (e) {
                // wheelEvent
                clearTimeout(els.wheelTimer);
                els.wheelTimer = setTimeout(function () {
                    isWheelBlocked = false
                }, 300);

                if (isWheelBlocked === true) return false;
                isWheelBlocked = true;

                if (e.wheelDelta === undefined) {
                    els.direction = e.detail / 3;
                } else {
                    els.direction = e.wheelDelta / -120;
                }
                if (els.direction > 0) { //mousewheel down 
                    if (els.pageNow == els.numPage) {
                        return false;
                    } else {
                        eventList.showPage(els.pageNext);
                    }
                } else { //mousewheel up
                    if (els.pageNow == 1) {
                        return false;
                    } else {
                        eventList.showPage(els.pagePrev);
                    }
                }
            },
            showPage: function (n) {
                clearTimeout(els.wheelTimer);
                if (els.pageNow == 0) {
                    els.sectionWrap.style.transition = 'none';
                    els.bg.classList.add('bg_show');
                } else {
                    els.bg.classList.remove('bg_show');
                    els.sectionWrap.style.transition = 'top 0.7s ease-in-out';
                }

                if (n == els.numPage) {
                    els.scroll.style.opacity = 0;
                } else {
                    els.scroll.style.opacity = 1;
                }

                els.sectionWrap.style.top = -((n - 1) * 100) + '%';

                els.pageNow = n;
                els.pagePrev = (n - 1) < 1 ? 1 : n - 1;
                els.pageNext = (n + 1) > els.numPage ? els.numPage : n + 1;
            },
            setHeight: function () {
                let windowHeight = window.innerHeight;
                document.documentElement.style.height = windowHeight;
            },
            arrowClick: {
                prev: function () {
                    if (els.pageNow == 1) {
                        return false;
                    } else {
                        eventList.showPage(els.pagePrev);
                    }
                },
                next: function () {
                    if (els.pageNow == els.numPage) {
                        return false;
                    } else {
                        eventList.showPage(els.pageNext);
                    }
                }
            },
            menuClick: function () {
                eventList.showPage(this.index);
            },
        };

        const eventHandler = {
            load: function (){
                eventList.setPage();
                eventList.setHeight();
            },
            mouseMove: function () {
                window.addEventListener('mousemove', eventList.mouseMove);
            },
            mouseOver: function () {
                allClickable.addEventListener('mouseover', eventList.mouseOver);
            },
            mouseLeave: function () {
                allClickable.addEventListener('mouseLeave', eventList.mouseLeave);
            },
            scroll: function () {
                window.addEventListener('wheel', eventList.scroll);
            },
            resize: function () {
                window.addEventListener('resize', eventList.setHeight);
            },
            arrowClick: function () {
                els.arrowPrev.addEventListener('click', eventList.arrowClick.prev);
                els.arrowNext.addEventListener('click', eventList.arrowClick.next);
            },
            menuClick: function () {
                for (let i = 0; i < els.menuButtons.length; i++) {
                    els.menuButtons[i].index = i + 1;
                    els.menuButtons[i].addEventListener('click', eventList.menuClick);
                }
            }
        };

        return init();
    }();
})();