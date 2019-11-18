// Data is stored in the model
let model = {
    NAVHEIGHT: '100px',
    bookmarked: [],
    posts: [
        {
            id: "31ac8038-79a7-4470-9820-b6080017c16f",
            title: "How the best pizza is cooked",
            image: "./static/assets/img/_MG_2589.JPG",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing \
                      elit, sed do eiusmod tempor incididunt ut labore \
                      et dolore magna aliqua. Mauris vitae ultricies \
                      leo integer malesuada nunc vel risus.",
            authorId: "0599a05c-5363-4663-b482-9307ec9088f4",
            length: "Oct 19 - 5 min read",
            ratings: []
        },
        {
            id: "963a9b9b-5682-46fc-a0a5-c4b1638979a3",
            title: "How to get started with the mother yeast",
            image: "./static/assets/img/lievito_madre.jpg",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing \
                      elit, sed do eiusmod tempor incididunt ut labore \
                      et dolore magna aliqua. Mauris vitae ultricies \
                      leo integer malesuada nunc vel risus.",
            authorId: "e1a2990a-f4ee-4589-b49d-98a3723ea243",
            length: "Aug 15 - 5 min read",
            ratings: []
        },
        {
            id: "a2dc2967-2f8e-439a-bd97-bd8ee9423149",
            title: "How to prepare the perfect dough",
            image: "./static/assets/img/DoughJPG.JPG",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing \
                      elit, sed do eiusmod tempor incididunt ut labore \
                      et dolore magna aliqua. Mauris vitae ultricies \
                      leo integer malesuada nunc vel risus.",
            author: "33550a9b-6da6-43d6-8587-80f24bc0a49b",
            length: "Aug 3 - 8 min read",
            ratings: []
        },
        {
            id: "4f1d1eb5-a44e-4290-9e1d-08508cb060c7",
            title: "The origins of crudaiola",
            image: "./static/assets/img/crudaiola.jpg",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing \
                      elit, sed do eiusmod tempor incididunt ut labore \
                      et dolore magna aliqua. Mauris vitae ultricies \
                      leo integer malesuada nunc vel risus.",
            author: "e1a2990a-f4ee-4589-b49d-98a3723ea243",
            length: "Oct 5 - 7 min read",
            ratings: []
        },
        {
            id: "15f78953-6298-4f03-9059-37ef83e7aa23",
            title: "All the secrets behind the bread",
            image: ".static/assets/img/Bread.jpg",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing \
                      elit, sed do eiusmod tempor incididunt ut labore \
                      et dolore magna aliqua. Mauris vitae ultricies \
                      leo integer malesuada nunc vel risus.",
            author: "0599a05c-5363-4663-b482-9307ec9088f4",
            length: "Sep 27 - 4 min read",
            ratings: []
        }
    ],
    authors: [
        {
            id: "0599a05c-5363-4663-b482-9307ec9088f4",
            name: "Piervalerio Vignola",
            memberSince: "2017-06-16T10:18:52+0000",
            avatar: "./static/assets/img/avatar.jpg"
        },
        {
            id: "33550a9b-6da6-43d6-8587-80f24bc0a49b",
            name: "Giovanni Verdi",
            memberSince: "2017-10-12T22:40:08+0000",
            avatar: "./static/assets/img/avatar_general.png"
        },
        {
            id: "e1a2990a-f4ee-4589-b49d-98a3723ea243",
            name: "Bruno Rossi",
            memberSince: "2018-03-04T07:34:52+0000",
            avatar: "./static/assets/img/avatar_general.png"
        }
    ]
}

// The octopus is the link between the model and the view
let octopus = {
    init: function () {
        view.init();
    },
    getNavbarHeight: function () {
        return model.NAVHEIGHT;
    },

    addToBookmarked: function (id) {
        const isThere = model.bookmarked.includes(id);
        if (!isThere) {
            model.bookmarked.push(id);
        }
    },

    removeFromBookmarked: function (id) {
        model.bookmarked = model.bookmarked.filter(function (elem) {
            return elem != id;
        });
    },

    getBookmarked: function (lim) {
        // use the optional lim to get a defined number of bookmarked posts
        let bookmarked = [];
        let count = 0;

        for (bookmark of model.bookmarked) {
            if (lim && count === lim) {
                return bookmarked;
            }
            for (post of model.posts) {
                if (bookmark === post.id) {
                    bookmarked.push(post);
                    count++;
                }
            }
        }
        return bookmarked;
    },

    getAuthor: function (authorId) {
        for (author of model.authors) {
            if (author.id === authorId) {
                return author;
            }
        }
    }

}

let view = {
    init: function () {
        this.mainContentScrollHandlers(100);
        this.scrollMeUp();
        this.addEventListeners();
        this.loadBookmarkedPosts();
    },

    mainContentScrollHandlers: function (buffer) {
        const nav = document.getElementsByTagName('nav')[0];
        const mainContainer = document.getElementById('main');
        let prevPosition = mainContainer.scrollTop;
        let firstScroll = true;
        mainContainer.onscroll = function () {
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
            if (firstScroll) {
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
                if (prevPosition < currPosition) {
                    prevPosition = currPosition;
                } else {
                    if (prevPosition - currPosition > 50) {
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

    scrollMeUp: function () {
        const scroller = document.getElementById('scrollMeUp');
        const mainContainer = document.getElementById('main');
        scroller.addEventListener('click', function (event) {
            const animatedScrolling = function () {
                const c = mainContainer.scrollTop;
                if (c > 0) {
                    window.requestAnimationFrame(animatedScrolling);
                    mainContainer.scrollTo(0, c - c / 8);
                }
            }
            window.requestAnimationFrame(animatedScrolling);
        });
    },

    addEventListeners: function () {
        const searchButton = document.querySelector('.search');
        searchButton.addEventListener('click', function () {
            this.nextElementSibling.classList.toggle('d-none');
        });

        // Fill/Unfill bookmarks on click
        const bookmarks = document.querySelectorAll('.fa-bookmark');
        for (bookmark of bookmarks) {
            bookmark.addEventListener('click', function () {
                const removed = this.classList.toggle('bookmark-empty');
                const id = this.dataset.id;
                if (removed) {
                    octopus.removeFromBookmarked(id);
                } else {
                    octopus.addToBookmarked(id);
                }

            });
        }
    },
    loadBookmarkedPosts: function () {
        const navPage = document.querySelector('.nav-link-active');
        if (navPage) {
            const page = navPage.dataset.page;
            if (page === 'bookmarked') {
                const container = document.querySelector('.container');
                const fragment = document.createDocumentFragment();
                let count = 1;
                const bookmarkedPosts = octopus.getBookmarked();
                if (bookmarkedPosts.length === 0) return;

                for (post of bookmarkedPosts) {
                    const author = octopus.getAuthor(post.authorId);
                    const card = document.createElement('div');
                    card.classList.add('card', 'post-bookmark', 'p-0')
                    card.innerHTML =
                        `<div class="card-sided-small">
                            <div class="small-side">
                            <img src="${post.image}" class="card-img card-sided-small-img-left">
                        </div>
                        <div class="card-side large-side">
                            <div class="card-small-header-group">
                                <a href="#">
                                    <h1 class="header-title" data-id="${post.id}">${post.title}</h1>
                                </a>
                            </div>

                            <div>
                                <div class="row ml-05 mr-05">
                                    <span class="author" data-authorId="${author.id}">${author.name}</span>
                                </div>
                                <div class="card-footer m-0 w-100">
                                    <div class="rating rating-group d-inline-flex text-warning">
                                        <span class="fas fa-star star-empty"></span>
                                        <span class="fas fa-star star-empty"></span>
                                        <span class="fas fa-star star-empty"></span>
                                        <span class="fas fa-star star-empty"></span>
                                        <span class="fas fa-star star-empty"></span>
                                        <div class="text-description font-light ml-05">
                                            <span id="totalReview"></span>
                                        </div>
                                    </div>

                                    <div class="font-light mr-05">
                                        <span class="font-small date">${post.length}</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>`;
                    fragment.appendChild(card);
                }
                container.appendChild(fragment);
                if (count > 10) {
                    setTimeout(this.loadBookmarkedPosts, 0);
                }
            }
        }
        return;
    }
}

octopus.init();




