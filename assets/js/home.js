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
    document.querySelectorAll(
        ".testimonial-video"
    );


testimonialVideos.forEach(video => {

    const frame =
        video.closest(
            ".visual-frame"
        );


    if (!frame) {
        return;
    }


    const testimonialObserver =
        new MutationObserver(() => {

            if (
                frame.classList.contains(
                    "active"
                )
            ) {

                video.currentTime = 0;

                video.muted = false;

                video.play()
                    .catch(() => {

                        /*
                        Browser may temporarily block
                        audible autoplay.
                        Keep playing muted if necessary.
                        */

                        video.muted = true;

                        video.play()
                            .catch(() => {});

                    });

            }

            else {

                video.pause();

                video.currentTime = 0;

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
