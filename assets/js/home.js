/* =====================================================
   STORY SCROLL SYSTEM
===================================================== */

const storyPanels =
    document.querySelectorAll(
        ".story-panel"
    );


/* =====================================================
   ACTIVATE THE CORRECT VISUAL
===================================================== */

function activatePanel(panel) {

    const group =
        panel.dataset.group;

    const step =
        panel.dataset.step;


    if (
        group === undefined ||
        step === undefined
    ) {
        return;
    }


    /* FIND CURRENT SECTION */

    const section =
        panel.closest(
            ".story-section"
        );


    if (!section) {
        return;
    }


    /* ACTIVATE STORY PANEL */

    section
        .querySelectorAll(
            ".story-panel"
        )
        .forEach(item => {

            item.classList.remove(
                "active"
            );

        });


    panel.classList.add(
        "active"
    );


    /* ACTIVATE MATCHING VISUAL */

    section
        .querySelectorAll(
            ".visual-frame"
        )
        .forEach(
            (visual, index) => {

                visual.classList.toggle(
                    "active",
                    index === Number(step)
                );

            }
        );

}



/* =====================================================
   INTERSECTION OBSERVER
===================================================== */

const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        activatePanel(
                            entry.target
                        );

                    }

                }
            );

        },

        {

            root: null,

            rootMargin:
                "-38% 0px -38% 0px",

            threshold: 0

        }

    );



storyPanels.forEach(
    panel => {

        observer.observe(
            panel
        );

    }
);



/* =====================================================
   INITIAL SECTION STATES
===================================================== */

document
    .querySelectorAll(
        ".story-section"
    )
    .forEach(section => {

        const firstPanel =
            section.querySelector(
                ".story-panel"
            );

        const firstVisual =
            section.querySelector(
                ".visual-frame"
            );


        if (firstPanel) {

            firstPanel.classList.add(
                "active"
            );

        }


        if (firstVisual) {

            firstVisual.classList.add(
                "active"
            );

        }

    });



/* =====================================================
   PAUSE HERO VIDEOS WHEN OFFSCREEN
===================================================== */

const hero =
    document.querySelector(
        ".hero"
    );


const heroVideos =
    document.querySelectorAll(
        ".hero video"
    );


if (hero) {

    const heroObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        heroVideos.forEach(
                            video => {

                                if (
                                    entry.isIntersecting
                                ) {

                                    video.play()
                                        .catch(() => {});

                                }

                                else {

                                    video.pause();

                                }

                            }
                        );

                    }
                );

            },

            {
                threshold: 0.08
            }

        );


    heroObserver.observe(
        hero
    );

}
/* =====================================================
   TESTIMONIAL VIDEO PLAYBACK
===================================================== */

const testimonialVideos =
    document.querySelectorAll(".testimonial-video");


function playTestimonial(video) {

    video.pause();
    video.currentTime = 0;
    video.muted = false;

    video.play()
        .catch(() => {

            /*
            Browser has blocked audible autoplay.
            DO NOT fall back to muted playback.
            */

            video.pause();

        });

}


function stopTestimonial(video) {

    video.pause();
    video.currentTime = 0;

}


testimonialVideos.forEach(video => {

    const frame =
        video.closest(".visual-frame");

    if (!frame) return;


    const testimonialObserver =
        new MutationObserver(() => {

            if (frame.classList.contains("active")) {

                playTestimonial(video);

            }

            else {

                stopTestimonial(video);

            }

        });


    testimonialObserver.observe(
        frame,
        {
            attributes: true,
            attributeFilter: ["class"]
        }
    );

});


/* =====================================================
   UNLOCK AUDIO AFTER FIRST USER INTERACTION
===================================================== */

function unlockTestimonials() {

    testimonialVideos.forEach(video => {

        const frame =
            video.closest(".visual-frame");

        if (
            frame &&
            frame.classList.contains("active")
        ) {

            video.muted = false;

            video.play()
                .catch(() => {});

        }

    });

}


document.addEventListener(
    "pointerdown",
    unlockTestimonials,
    { once: true }
);

document.addEventListener(
    "touchstart",
    unlockTestimonials,
    { once: true }
);

document.addEventListener(
    "keydown",
    unlockTestimonials,
    { once: true }
);

