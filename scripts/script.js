function navigateToPage(gridItem) {
    // Get the target link from the data-link attribute
    const link = gridItem.getAttribute("data-link");

    if (link) {
        window.location.href = link; // Navigate to the specified URL
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.querySelector(".modal");
    const modalImage = document.getElementById("modal-image");
    const closeBtn = document.querySelector(".close");
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");
    const images = document.querySelectorAll(".masonry-item img");

    let currentIndex = -1; // Track the current photo index

    // Open modal and set the image
    images.forEach((image, index) => {
        image.addEventListener("click", () => {
            modal.style.display = "block";
            modalImage.src = image.getAttribute("data-large") || image.src;
            currentIndex = index; // Update the current index
        });
    });

    // Close modal
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close modal when clicking outside the image
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Navigate to the next photo (right arrow click)
    rightArrow.addEventListener("click", () => {
        if (currentIndex !== -1) {
            currentIndex = (currentIndex + 1) % images.length; // Loop back to the first image
            modalImage.src = images[currentIndex].getAttribute("data-large") || images[currentIndex].src;
        }
    });

    // Navigate to the previous photo (left arrow click)
    leftArrow.addEventListener("click", () => {
        if (currentIndex !== -1) {
            currentIndex = (currentIndex - 1 + images.length) % images.length; // Loop back to the last image
            modalImage.src = images[currentIndex].getAttribute("data-large") || images[currentIndex].src;
        }
    });

    // Navigate with keyboard arrows
    document.addEventListener("keydown", (e) => {
        if (modal.style.display === "block") {
            if (e.key === "ArrowRight") {
                // Right arrow key
                rightArrow.click();
            }
            if (e.key === "ArrowLeft") {
                // Left arrow key
                leftArrow.click();
            }
        }
    });
});

// Select all grid items
const gridItems = document.querySelectorAll('.photo-grid-placeholder .grid-item');

// Touch functionality
gridItems.forEach((item) => {
    item.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent default scrolling or tap behavior

        // Remove the 'touch-active' class from other items
        gridItems.forEach((otherItem) => {
            if (otherItem !== item) {
                otherItem.classList.remove('touch-active');
            }
        });

        // Toggle the 'touch-active' class for the touched item
        if (item.classList.contains('touch-active')) {
            item.classList.remove('touch-active');
        } else {
            item.classList.add('touch-active');
        }
    });
});

// Optional: Close overlays when tapping outside
document.addEventListener('touchstart', (e) => {
    if (!e.target.closest('.grid-item')) {
        gridItems.forEach((item) => item.classList.remove('touch-active'));
    }
});
