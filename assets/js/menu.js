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

                const layerDiv = document.createElement('div');
                layerDiv.className = 'layer';
                itemDiv.appendChild(layerDiv);

                // Set the dish name in item::before
                const beforeDiv = document.createElement('div');
                beforeDiv.className = 'before';
                beforeDiv.textContent = item.name;
                layerDiv.appendChild(beforeDiv);

                // Set the description and price in the item
                const descriptionDiv = document.createElement('div');
                descriptionDiv.textContent = `${item.description}`;
                layerDiv.appendChild(descriptionDiv);

                // Set the description and price in the item
                const priceDiv = document.createElement('div');
                priceDiv.className = 'priceDiv';
                priceDiv.textContent = `$${item.price.toFixed(2)}`;
                layerDiv.appendChild(priceDiv);

                // Set the description and price in the item
                const buttonDiv = document.createElement('div');
                buttonDiv.className = 'buttonDiv';
                layerDiv.appendChild(buttonDiv);

                // Add to cart button
                const addToCartButton = document.createElement('button');
                addToCartButton.textContent = 'Add to Cart';
                buttonDiv.appendChild(addToCartButton);

                // Add a button to delete the item from the cart
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Remove from Cart';
                deleteButton.style.display = 'none';
                buttonDiv.appendChild(deleteButton);

                // Add a quantity selector
                const quantitySelector = document.createElement('input');
                quantitySelector.type = 'number';
                quantitySelector.value = 0;
                quantitySelector.min = 1;
                quantitySelector.className = 'quantity-selector';
                quantitySelector.style.display = 'none';
                buttonDiv.appendChild(quantitySelector);


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

    // Get an array of category names
    const categories = Object.keys(menuData);

    // Iterate through every other category in the menu
    for (let i = 0; i < categories.length; i += 2) {
        const category = categories[i];
        const items = menuData[category];

        // Create blank section
        const blankSection = createBlankSection(category);
        contentContainer.appendChild(blankSection);

        // Create horizontal section with wrap to right
        const horizontalSectionRight = createHorizontalSection(category, items, true);
        contentContainer.appendChild(horizontalSectionRight);

        // Move to the next category (if available)
        const nextCategoryIndex = i + 1;
        if (nextCategoryIndex < categories.length) {
            const nextCategory = categories[nextCategoryIndex];

            // Create blank section of the next category
            const blankSectionAfterRight = createBlankSection(nextCategory);
            contentContainer.appendChild(blankSectionAfterRight);

            // Create horizontal section with wrap to left
            const horizontalSectionLeft = createHorizontalSection(nextCategory, menuData[nextCategory], false);
            contentContainer.appendChild(horizontalSectionLeft);
        }
    }

    // Custom blank section after the loop
    const customBlankSection = document.createElement('section');
    customBlankSection.className = 'blank';
    customBlankSection.innerHTML = '<h1>Please Visit Us Again</h1><p>...</p>';
    contentContainer.appendChild(customBlankSection);
}