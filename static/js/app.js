// Data is stored in the model
let model = {
    NAVHEIGHT: '100px',
    scrollPosition: 0

}

// The octopus is the link between the model and the view
let octopus = {
    init: function() {
        view.init();
    },
    getNavbarHeight: function() {
        return model.NAVHEIGHT;
    },
    getScrollPosition: function() {
        return model.scrollPosition;
    },
    updateScrollPosition: function(pos) {
        return model.scrollPosition = pos;
    }
}

let view = {
    init: function() {
        this.mainContentScrollHandlers(100);
        // this.scrollMeUp();
    },

    mainContentScrollHandlers: function(buffer) {
        const nav = document.getElementsByTagName('nav')[0];
        const mainContainer = document.getElementById('main');
        let prevPosition = mainContainer.scrollTop;
        let firstScroll = true;
        mainContainer.onscroll = function() {
            const currPosition = mainContainer.scrollTop; 

            // Show the take me back to the top button
            const scroller = document.getElementById('scrollMeUp');
            if (currPosition > buffer || currPosition > 100) {
                scroller.classList.remove('d-none');
            }
            else {
                scroller.classList.add('d-none');
            }

            // Hide and show the navbar
            if(firstScroll){
                if (currPosition - prevPosition > 50) {
                    nav.style.top = '-' + octopus.getNavbarHeight();
                    main.style.top = '-50px';
                    // nav.classList.add('nav-hide');
                    // main.classList.add('nav-hide-move-content');
                    prevPosition = currPosition;
                    firstScroll = false;
                } else if (prevPosition - currPosition > 50) {
                    prevPosition = currPosition;
                }
            } else {
                if(prevPosition < currPosition) {
                    prevPosition = currPosition;
                } else {
                    if(prevPosition - currPosition > 50){
                        nav.style.top = '0';
                        main.style.top = '0';
                        // nav.classList.remove('nav-hide');
                        // main.classList.remove('nav-hide-move-content');
                        firstScroll = true;
                        prevPosition = currPosition;
                    }
                }
            }
        }
    },

    scrollMeUp: function() {
        const scroller = document.getElementById('scrollMeUp');
        const mainContainer = document.getElementById('main');
        scroller.addEventListener('click', function(event) {
            mainContainer.scrollTo({top: 0, behavior: 'smooth'})
        })
    }
}

octopus.init();




