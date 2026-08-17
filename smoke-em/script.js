/* ==========================================
   PAGE LOAD
========================================== */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});



/* ==========================================
   STORY ELEMENTS
========================================== */

const panels =
    document.querySelectorAll(".story-panel");

const images =
    document.querySelectorAll(".story-image");

const currentNumber =
    document.getElementById("currentNumber");



/* ==========================================
   CHANGE ACTIVE STORY
========================================== */

function activateStory(index) {

    panels.forEach((panel, panelIndex) => {

        panel.classList.toggle(
            "active",
            panelIndex === index
        );

    });


    images.forEach((image, imageIndex) => {

        image.classList.toggle(
            "active",
            imageIndex === index
        );

    });


    if (currentNumber) {

        currentNumber.textContent =
            String(index + 1).padStart(2, "0");

    }

}



/* ==========================================
   SCROLL OBSERVER
========================================== */

const observerOptions = {

    root: null,

    rootMargin:
        "-35% 0px -35% 0px",

    threshold: 0

};



const storyObserver =
    new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const step =
                    Number(
                        entry.target.dataset.step
                    );

                activateStory(step);

            }

        });

    }, observerOptions);



panels.forEach(panel => {

    storyObserver.observe(panel);

});



/* ==========================================
   HERO PARALLAX
========================================== */

const heroBackground =
    document.querySelector(
        ".hero-background"
    );


window.addEventListener(
    "scroll",
    () => {

        if (!heroBackground) return;


        const scrollY =
            window.scrollY;


        if (
            scrollY <
            window.innerHeight * 1.2
        ) {

            heroBackground.style.transform =
                `translateY(${scrollY * 0.12}px) scale(1)`;

        }

    },
    { passive: true }
);



/* ==========================================
   INITIALIZE
========================================== */

activateStory(0);
