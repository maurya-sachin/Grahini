// Create a new XMLHttpRequest object
var xhr = new XMLHttpRequest();

// Define the request
xhr.open('GET', '/assets/json/menu.json', true);

// Set up a callback function to handle the response
xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
        // Parse the JSON response
        var data = JSON.parse(xhr.responseText);

        // Process the retrieved data
        processData(data);
    } else {
        console.error('Request failed with status:', xhr.status);
    }
};

// Set up a callback function to handle errors
xhr.onerror = function () {
    console.error('Request failed');
};

// Send the request
xhr.send();

// Function to process the retrieved data
function processData(menuData) {
    // Use the retrieved data as needed
    console.log(menuData);

    // Function to create a horizontal section
    function createHorizontalSection(category, items, toRight) {
        const horizontalSection = document.createElement('section');
        horizontalSection.className = 'horizontal';

        const pinWrap = document.createElement('div');
        pinWrap.className = 'pin-wrap';

        const animationWrap = document.createElement('div');
        animationWrap.className = `animation-wrap ${toRight ? 'to-right' : 'to-left'}`;

        // Check if items is an array before using forEach
        if (Array.isArray(items)) {
            items.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'item';

                // Set the background image for each item
                if (item.image) {
                    itemDiv.style.backgroundImage = `url(${item.image})`;
                } else {
                    console.error(`Missing 'image' property for item in category: ${category}`);
                }

                // Set the dish name in item::before
                const beforeDiv = document.createElement('div');
                beforeDiv.className = 'before';
                beforeDiv.textContent = item.name;
                itemDiv.appendChild(beforeDiv);

                // Set the description in the item
                const descriptionDiv = document.createElement('div');
                descriptionDiv.textContent = item.description;
                itemDiv.appendChild(descriptionDiv);

                animationWrap.appendChild(itemDiv);
            });
        } else {
            console.error(`Invalid data structure for category: ${category}`);
        }

        pinWrap.appendChild(animationWrap);
        horizontalSection.appendChild(pinWrap);

        return horizontalSection;
    }

    // Function to create a blank section
    function createBlankSection(category) {
        const blankSection = document.createElement('section');
        blankSection.className = 'blank';
        blankSection.innerHTML = `<h1>${category}</h1><p>...</p>`;
        return blankSection;
    }

    // Get the content container
    const contentContainer = document.querySelector('.content-container');

    // Iterate through each category in the menu
    for (const category in menuData) {
        if (menuData.hasOwnProperty(category)) {
            const items = menuData[category];

            // Create horizontal section with wrap to right
            const horizontalSectionRight = createHorizontalSection(category, items, true);
            contentContainer.appendChild(horizontalSectionRight);

            // Create blank section
            const blankSection = createBlankSection(category);
            contentContainer.appendChild(blankSection);

            // Create horizontal section with wrap to left
            const horizontalSectionLeft = createHorizontalSection(category, items, false);
            contentContainer.appendChild(horizontalSectionLeft);

            // Create blank section
            const blankSectionAfterLeft = createBlankSection(category);
            contentContainer.appendChild(blankSectionAfterLeft);
        }
    }
}