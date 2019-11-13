// Data is stored in the model
let model = {}

// The octopus is the link between the model and the view
let octopus = {
    init: function() {
        view.init();
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
            if (prevPosition < currPosition) {
                // nav.style.top = '-100px';
                // main.style.top = '-50px';
                nav.classList.add('nav-hide');
                main.classList.add('nav-hide-move-content');

            } else {
                nav.classList.remove('nav-hide');
                main.classList.remove('nav-hide-move-content');
            }
            prevPosition = currPosition;
        }
    }
}

octopus.init();




