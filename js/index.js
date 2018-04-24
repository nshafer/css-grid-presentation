/* index.js - The main presentation driver */

const slides = [
    { slide: "intro.html", notes: "intro.html", title: "Modern Responsive Layout" },
    { slide: "whoami.html", notes: "whoami.html", title: "Who am I?" },
    { slide: "grid_preview.html", notes: "grid_preview.html", title: "What is the problem that CSS Grid solves?" },
    { slide: "css_basics.html", notes: "css_basics.html", title: "Basics of HTML / CSS" },
    { slide: "media_queries.html", notes: "media_queries.html", title: "Making CSS Responsive" },
    { slide: "layout/linear_page.html", notes: "layout/linear_page.html", title: "HTML is for documents" },
    { slide: "layout/table_layout.html", notes: "layout/table_layout.html", title: "Using Tables for layout" },
    { slide: "layout/float_layout.html", notes: "layout/float_layout.html", title: "Using Floats for layout" },
    { slide: "layout/float_layout_2.html", notes: "layout/float_layout.html", title: "Floats and clearfixes" },
    { slide: "layout/float_layout_3.html", notes: "layout/float_layout.html", title: "Floats are responsive" },
    { slide: "layout/flexbox_layout.html", notes: "layout/flexbox_layout.html", title: "Layout with flexbox" },
    { slide: "layout/flexbox_layout_2.html", notes: "layout/flexbox_layout.html", title: "Proportional sizing" },
    { slide: "layout/flexbox_layout_3.html", notes: "layout/flexbox_layout.html", title: "Aligning child elements" },
    { slide: "layout/flexbox_layout_4.html", notes: "layout/flexbox_layout.html", title: "Changing order of children." },
    { slide: "layout/flexbox_layout_5.html", notes: "layout/flexbox_layout_5.html", title: "Layout with flexbox" },
    { slide: "layout/flexbox_layout_6.html", notes: "layout/flexbox_layout_6.html", title: "Flexbox is one dimensional" },
    { slide: "layout/grid_layout.html", notes: "layout/grid_layout.html", title: "Grid to save the day!" },
    { slide: "grid_terms/container.html", notes: "grid_terms/container.html", title: "Grid terminology: Grid Container" },
    { slide: "grid_terms/item.html", notes: "grid_terms/item.html", title: "Grid terminology: Grid Item" },
    { slide: "grid_terms/line.html", notes: "grid_terms/line.html", title: "Grid terminology: Grid Line" },
    { slide: "grid_terms/track.html", notes: "grid_terms/track.html", title: "Grid terminology: Grid Track" },
    { slide: "grid_terms/track_2.html", notes: "grid_terms/track_2.html", title: "Grid terminology: Grid Track" },
    { slide: "grid_terms/cell.html", notes: "grid_terms/cell.html", title: "Grid terminology: Grid Cell" },
    { slide: "grid_terms/area.html", notes: "grid_terms/area.html", title: "Grid terminology: Grid Area" },
    { slide: "grid_basics/template_columns.html", notes: "grid_basics/template_columns.html", title: "Grid basics: Template Columns" },
    { slide: "grid_basics/template_columns_fr.html", notes: "grid_basics/template_columns_fr.html", title: "Grid basics: Fractional units (fr)" },
    { slide: "grid_basics/template_rows.html", notes: "grid_basics/template_rows.html", title: "Grid basics: Template Rows" },
    { slide: "grid_basics/repeat.html", notes: "grid_basics/repeat.html", title: "Grid basics: Repeat Function" },
    { slide: "grid_basics/grid_line_placement.html", notes: "grid_basics/grid_line_placement.html", title: "Grid basics: Placing Items by Line" },
    { slide: "grid_basics/grid_area_placement.html", notes: "grid_basics/grid_area_placement.html", title: "Grid basics: Placing Items by Area" },
    { slide: "grid_basics/grid_area_responsive.html", notes: "grid_basics/grid_area_responsive.html", title: "Grid basics: Responsive Template Areas" },
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
