// Data is stored in the model
let model = {
    NAVHEIGHT: '100px',
    bookmarked: []

}

// The octopus is the link between the model and the view
let octopus = {
    init: function() {
        view.init();
    },
    getNavbarHeight: function() {
        return model.NAVHEIGHT;
    }
}

let view = {
    init: function() {
        this.mainContentScrollHandlers(100);
        this.scrollMeUp();
        this.addEventListeners();
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
            const animatedScrolling = function() {
                const c = mainContainer.scrollTop;
                if (c > 0) {
                    window.requestAnimationFrame(animatedScrolling);
                    mainContainer.scrollTo(0, c - c / 8);
                }
            }
            window.requestAnimationFrame(animatedScrolling);
        });
    },

    addEventListeners: function() {
        const searchButton = document.querySelector('.search');
        searchButton.addEventListener('click', function() {
            this.nextElementSibling.classList.toggle('d-none');
        });
        
        // Fill/Unfill bookmarks on click
        const bookmarks = document.querySelectorAll('.fa-bookmark');
        for (bookmark of bookmarks) {
            bookmark.addEventListener('click', function() {
                this.classList.toggle('bookmark-empty');
            });
        }
    }
}

octopus.init();




