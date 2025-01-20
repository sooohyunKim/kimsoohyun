/* Soohyun 2025 PortFolio JS */
(function () {
    window.portfolio = window.portfolio || {};

    window.portfolio.motion = function () {
        let els = {};
        let isWheelBlocked = false;

        const init = function () {
            setElements();
            bindEvents();
        };

        const setElements = function () {
            // cursor
            els.cursor = document.querySelector('.cursor');

            // container
            els.container = document.querySelector('.container');

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

            // workList
            els.workListWrap = document.querySelector('.features-experience__list-wrap');
            els.workList = els.workListWrap.querySelectorAll('.features-experience__list');
            els.workListDetailWrap = document.querySelector('.features-experience__detail-wrap');
            els.workListDetail = els.workListDetailWrap.querySelectorAll('.features-experience__detail');
            els.workPageMoveButtons = document.querySelectorAll('.features-experience__detail-title-headline>a');
            els.workProjectList = document.querySelectorAll('.features-experience__project-list');

            // wheelEvent variable
            els.numPage = els.section.length;
            els.pageNow = 0;
            els.pagePrev = 0;
            els.pageNext = 0;
            els.wheelDirection = 0;
            els.wheelTimer = '';

            // clickable els
            allClickableArray = [els.arrowPrev, els.arrowNext, els.menuButtons[0], els.menuButtons[1], els.menuButtons[2], 
                                els.workList[0], els.workList[1], els.workList[2], 
                                els.workPageMoveButtons[0], els.workPageMoveButtons[1],
                                els.workProjectList[0], els.workProjectList[1], els.workProjectList[2], els.workProjectList[3]];
        };

        const bindEvents = function () {
            eventHandler.load();
            eventHandler.resize();
            eventHandler.scroll();
            eventHandler.mouseMove();
            eventHandler.mouseOver();
            eventHandler.mouseLeave();
            eventHandler.arrowClick();
            eventHandler.menuClick();
            eventHandler.workListClick();
        };

        const eventList = {
            mouseMove: function (e) {
                let x = e.clientX;
                let y = e.clientY;
                els.cursor.style.left =  x + 'px';
                els.cursor.style.top = y + 'px';
            },
            mouseOver: function () {
                els.cursor.classList.add('active');
            },
            mouseLeave: function () {
                els.cursor.classList.remove('active');
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
                } else {
                    els.sectionWrap.style.transition = 'top 0.7s ease-in-out';
                }

                if (n == 1 || n == 2) {
                    if (!els.bg.classList.contains('bg_show')) els.bg.classList.add('bg_show');
                    if (els.bg.classList.contains('bg_hide')) els.bg.classList.remove('bg_hide');
                } else {
                    els.bg.classList.remove('bg_show');
                    els.bg.classList.add('bg_hide');
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

                els.menuButtons[n-1].parentElement.querySelector('.on').classList.remove('on');
                els.menuButtons[n-1].classList.add('on');
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
            workListClick: function () {
                els.workListWrap.querySelector('.on').classList.remove('on');
                this.classList.add('on');
                els.workListDetailWrap.querySelector('.on').classList.remove('on');
                els.workListDetail[this.index].classList.add('on');
            }
        };

        const eventHandler = {
            load: function () {
                window.addEventListener('load', function () {
                    eventList.setPage();
                    eventList.setHeight();
                    els.container.classList.add('on');
                });
            },
            mouseMove: function () {
                window.addEventListener('mousemove', eventList.mouseMove);
            },
            mouseOver: function () {
                for (let i = 0; i < allClickableArray.length; i++) {
                    allClickableArray[i].addEventListener('mouseover', eventList.mouseOver);
                }
            },
            mouseLeave: function () {
                for (let i = 0; i < allClickableArray.length; i++) {
                    allClickableArray[i].addEventListener('mouseleave', eventList.mouseLeave);
                }
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
            },
            workListClick: function () {
                for (let i = 0; i < els.workList.length; i++) {
                    els.workList[i].index = i;
                    els.workList[i].addEventListener('click', eventList.workListClick);
                }
            }
        };

        return init();
    }();
})();