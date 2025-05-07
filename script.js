// uses Unsplash API (https://unsplash.com/) for searching images

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://imagesearch-brown.vercel.app/api/search-images?query=${keyword}&page=${page}`; // Replace with your actual Vercel URL

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        
        // Log the response to debug
        console.log('Response data:', data);

        if (page === 1) {
            searchResult.innerHTML = "";
        }

        // Check if data.results exists
        if (!data.results) {
            console.error('No results found in response:', data);
            showMoreBtn.style.display = "none";
            return;
        }

        const results = data.results;

        results.map((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";

            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        });

        if (results.length > 0) {
            showMoreBtn.style.display = "block";
        } else {
            showMoreBtn.style.display = "none";
        }
    } catch (error) {
        console.error('Error fetching images:', error);
        showMoreBtn.style.display = "none";
    }
}


// Add an event listener to hide the "Show More" button when the input is cleared
searchBox.addEventListener("input", () => {
    if (searchBox.value.trim() === "") {
        showMoreBtn.style.display = "none";
    }
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});

// error message for empty search
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    keyword = searchBox.value.trim();
    if (keyword === "") {
        alert("Please enter a search term.");
        showMoreBtn.style.display = "none";
        return;
    }
    page = 1;
    searchImages();
});