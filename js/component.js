/* Soohyun 2025 PortFolio JS */
(function () {
    window.portfolio = window.portfolio || {};

    window.portfolio.motion = function () {
        let els = {};
        let isWheelBlocked = false;
        let isLoadEnd = false;

        const init = function () {
            setElements();
            bindEvents();
        };

        const setElements = function () {
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

            els.projectSection = document.querySelector('.features-project');

            // projectList
            els.projectListWrap = document.querySelector('.features-project__list-wrap');
            els.projectList = els.projectListWrap.querySelectorAll('.features-project__list');

            // projectView
            els.projectViewWrap = document.querySelector('.features-project__view-wrap');
            els.projectView = els.projectViewWrap.querySelectorAll('.features-project__view');

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
            eventHandler.projectListClick();
        };

        const eventList = {
            setPage: function () {
                for (let i = 0; i < els.numPage; i++) {
                    els.section[i].style.top = (i * 100) + '%';
                }
                eventList.showPage(1);
                isLoadEnd = true;
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

                if (n == 1) {
                    els.container.classList.add('dark');
                    if (!els.bg.classList.contains('bg_show')) els.bg.classList.add('bg_show');
                    if (els.bg.classList.contains('bg_hide')) els.bg.classList.remove('bg_hide');
                } else {
                    els.container.classList.remove('dark');
                    els.bg.classList.remove('bg_show');
                    els.bg.classList.add('bg_hide');
                }

                if (n == els.numPage) {
                    els.scroll.style.opacity = 0;
                    els.scroll.setAttribute('aria-hidden', true);
                    els.scroll.setAttribute('tabindex', -1);
                } else {
                    els.scroll.style.opacity = 1;
                    els.scroll.removeAttribute('aria-hidden', true);
                    els.scroll.removeAttribute('tabindex', -1);
                }

                els.sectionWrap.style.top = -((n - 1) * 100) + '%';

                els.pageNow = n;
                els.pagePrev = (n - 1) < 1 ? 1 : n - 1;
                els.pageNext = (n + 1) > els.numPage ? els.numPage : n + 1;

                els.menuButtons[n-1].parentElement.querySelector('.on').classList.remove('on');
                els.menuButtons[n-1].classList.add('on');

                // Accessibility
                if (!!isLoadEnd) {
                    for (let i = 0; i < els.menuButtons.length; i++) {
                        if (i == (n-1)) {
                            els.menuButtons[n-1].setAttribute('aria-selected', true);
                            els.section[n-1].removeAttribute('aria-hidden');
                            els.section[n-1].removeAttribute('tabindex');
                        } else {
                            els.menuButtons[i].setAttribute('aria-selected', false);
                            els.section[i].setAttribute('aria-hidden', true);
                            els.section[i].setAttribute('tabindex', -1);
                        }
                    }
                }  
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
            projectListClick: function () {
                let isSectionRight = els.projectSection.classList.contains('right'); 
                if (!isSectionRight) {
                    els.projectSection.classList.add('right');
                }

                if (els.projectListWrap.querySelector('.on')) els.projectListWrap.querySelector('.on').classList.remove('on');
                if (els.projectViewWrap.querySelector('.on')) els.projectViewWrap.querySelector('.on').classList.remove('on');
                els.projectList[this.index].classList.add('on');
                els.projectView[this.index].classList.add('on');
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
            projectListClick: function () {
                for (let i = 0; i < els.projectList.length; i++) {
                    els.projectList[i].index = i;
                    els.projectList[i].addEventListener('click', eventList.projectListClick);
                }
            }
        };

        return init();
    }();
})();