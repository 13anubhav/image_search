

const apiKey = '5e937b4952msh0cd60cae124352dp1bd119jsna9ca7300a732';
let searchTerm = '';
let currentPage = 1;
let totalPages = 0;

const searchForm = document.querySelector('#search-form');
const searchTermInput = document.querySelector('#search-term');
const imageContainer = document.querySelector('#image-container');
const prevPageBtn = document.querySelector('#prev-page-btn');
const nextPageBtn = document.querySelector('#next-page-btn');

// Event listener for search form submission
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  searchTerm = searchTermInput.value;
  currentPage = 1;
  searchImages();
});

// Event listener for "Next Page" button click
nextPageBtn.addEventListener('click', () => {
  currentPage++;
  searchImages();
});

// Event listener for "Previous Page" button click
prevPageBtn.addEventListener('click', () => {
  currentPage--;
  searchImages();
});

// Function to perform the image search
async function searchImages() {
  // Clear previous search results
  imageContainer.innerHTML = '';

  // Disable pagination buttons while search is in progress
  prevPageBtn.disabled = true;
  nextPageBtn.disabled = true;

  // Perform search using Bing Image Search API
  const response = await fetch(
    `https://bing-image-search1.p.rapidapi.com/images/search?q=${searchTerm}&count=20&offset=${(currentPage -
      1) *
      20}`,
    {
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'bing-image-search1.p.rapidapi.com',
      },
    }
  );

  const data = await response.json();

  // Update total number of pages based on search results
  totalPages = Math.ceil(data.totalEstimatedMatches / 20);

  // Enable/disable pagination buttons based on current page and total pages
  if (currentPage === 1) {
    prevPageBtn.disabled = true;
  } else {
    prevPageBtn.disabled = false;
  }

  if (currentPage === totalPages) {
    nextPageBtn.disabled = true;
  } else {
    nextPageBtn.disabled = false;
  }

  // Render search results
  data.value.forEach(result => {
    const img = document.createElement('img');
    img.src = result.thumbnailUrl;
    img.alt = result.name;
    imageContainer.appendChild(img);
  });
}

// Initialize the app by performing a search for "nature" images
searchTerm = 'nature';
searchImages();
