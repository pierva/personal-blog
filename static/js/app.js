// Data is stored in the model
let model = {
    NAVHEIGHT: '100px'
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
        this.hideNavBarOnScroll();
    },

    hideNavBarOnScroll: function() {
        const nav = document.getElementsByTagName('nav')[0];
        const mainContainer = document.getElementById('main');
        let prevPosition = mainContainer.scrollTop;
        mainContainer.onscroll = function() {
            const currPosition = mainContainer.scrollTop;
            console.log('current', currPosition);
            console.log('previous', prevPosition)
            if (prevPosition - currPosition < 50) {
                nav.style.top = '-' + octopus.getNavbarHeight();
                main.style.top = '-50px';
                // nav.classList.add('nav-hide');
                // main.classList.add('nav-hide-move-content');

            } else {
                nav.style.top = '0';
                main.style.top = '0';
                // nav.classList.remove('nav-hide');
                // main.classList.remove('nav-hide-move-content');
            }
            if(currPosition - prevPosition > 50) {
                prevPosition = currPosition;
            }
        }
    }
}

octopus.init();




