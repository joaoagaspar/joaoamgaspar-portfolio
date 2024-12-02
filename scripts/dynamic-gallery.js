document.addEventListener('DOMContentLoaded', () => {
    // Extract the page name from the file name
    const fileName = window.location.pathname.split('/').pop().split('.html')[0];

    // Define the number of images for each page (you can also fetch dynamically)
    const imageCounts = {
        slovenia: 6, // Number of images for Slovenia
        iceland: 4, // Number of images for Iceland
    };

    const totalImages = imageCounts[fileName] || 0;
    const container = document.querySelector('.masonry-grid');

    if (container) {
        for (let i = 1; i <= totalImages; i++) {
            const paddedNumber = String(i).padStart(3, '0'); // Format number as 001, 002, etc.
            const div = document.createElement('div');
            div.classList.add('masonry-item');
            div.innerHTML = `
                <img src="images/${fileName}-${paddedNumber}.jpg" 
                     alt="${fileName}" 
                     data-large="images/${fileName}-${paddedNumber}.jpg">
            `;
            container.appendChild(div);
        }
    } else {
        console.error("Masonry grid container not found!");
    }
});
