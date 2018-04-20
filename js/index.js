/* index.js - The main presentation driver */

const slides = [
    { slide: "intro.html", notes: "intro.html", title: "Modern Responsive Layout" },
    { slide: "whoami.html", notes: "whoami.html", title: "Who am I?" },
    { slide: "grid_preview.html", notes: "grid_preview.html", title: "What is the problem that CSS Grid solves?" },
    { slide: "css_basics.html", notes: "css_basics.html", title: "Basics of HTML / CSS" },
    { slide: "media_queries.html", notes: "media_queries.html", title: "Making CSS Responsive" },
    { slide: "linear_page.html", notes: "linear_page.html", title: "HTML is for documents" },
    { slide: "table_layout.html", notes: "table_layout.html", title: "Using Tables for layout" },
    { slide: "float_layout.html", notes: "float_layout.html", title: "Using Floats for layout" },
    { slide: "float_layout_2.html", notes: "float_layout.html", title: "Floats and clearfixes" },
    { slide: "float_layout_3.html", notes: "float_layout.html", title: "Floats are responsive" },
    { slide: "flexbox_layout.html", notes: "flexbox_layout.html", title: "Layout with flexbox" },
    { slide: "flexbox_layout_2.html", notes: "flexbox_layout.html", title: "Proportional sizing" },
    { slide: "flexbox_layout_3.html", notes: "flexbox_layout.html", title: "Aligning child elements" },
    { slide: "flexbox_layout_4.html", notes: "flexbox_layout.html", title: "Changing order of children." },
    { slide: "flexbox_layout_5.html", notes: "flexbox_layout_5.html", title: "Layout with flexbox" },
    { slide: "flexbox_layout_6.html", notes: "flexbox_layout_6.html", title: "Flexbox is one dimensional" },
    { slide: "grid_layout.html", notes: "grid_layout.html", title: "Grid to save the day!" },
];

const app = new Vue({
    el: '#app',
    data() {
        return {
            current_slide_index: 0,
            slides: slides,
            show_notes: true,
        };
    },

    computed: {
        currentSlideNumber() {
            return this.current_slide_index + 1;
        },

        slideCount() {
            return this.slides.length;
        },

        currentSlide() {
            return this.slides[this.current_slide_index];
        },

        currentSlideURL() {
            return `slides/${this.currentSlide.slide}`;
        },

        currentNotesURL() {
            if (this.currentSlide.notes) {
                return `notes/${this.currentSlide.notes}`;
            } else {
                return "notes/blank.html";
            }
        }
    },

    methods: {
        loadSlide() {
            if (history.state) {
                this.current_slide_index = history.state.slide_index;
            } else if (window.location.hash) {
                slide_number = window.location.hash.substr(1);
                this.current_slide_index = slide_number - 1;
            } else {
                this.current_slide_index = 0;
            }
            this.current_slide_index = Math.max(0, Math.min(this.slides.length - 1, this.current_slide_index));

            this.updateNotesPopup();
        },

        goToSlide(i) {
            if (i < 0) {
                return;
            } else if (i > this.slideCount - 1) {
                return;
            }

            this.current_slide_index = i;

            history.pushState({slide_index: this.current_slide_index}, this.currentSlide.title, `#${i + 1}`);

            this.updateNotesPopup();
        },

        previousSlide() {
            this.goToSlide(this.current_slide_index - 1);
        },

        nextSlide() {
            this.goToSlide(this.current_slide_index + 1);
        },

        openNotesPopup() {
            this._popup = window.open(this.currentNotesURL, 'notes_popup',
                "width=800,height=600&chrome=no&alwaysLowered=yes");
        },

        closeNotesPopup() {
            this._popup.close();
            this._popup = null;
        },

        updateNotesPopup() {
            if (!this._popup) return;
            this._popup.window.location.href = this.currentNotesURL;
            this._popup.document.getElementById('main').classList.add('popup');
        },

        keyPress(key) {
            if (key === "ArrowLeft" || key === "Backspace") {
                this.previousSlide();
            } else if (key === "ArrowRight" || key === " " ) {
                this.nextSlide();
            } else if (key === "n") {
                this.show_notes = !this.show_notes;
            } else if (key === "p") {
                if (this._popup) {
                    this.closeNotesPopup();
                    this.show_notes = true;
                } else {
                    this.openNotesPopup();
                    this.show_notes = false;
                }
            }
        }
    },

    created() {
        this.loadSlide();
    },

    mounted() {
        // Local key events
        window.addEventListener('keyup', (e) => {
            this.keyPress(e.key);
        });

        // Key events from child frames and opened windows
        window.addEventListener('message', (e) => {
            if (e.data.key) {
                this.keyPress(e.data.key);
            }
        });

        window.addEventListener('popstate', (e) => {
            this.loadSlide();
        });
    }
});
