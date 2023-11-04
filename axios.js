
// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

const carouselInner = document.getElementById("carouselInner");

// Step 0: Store your API key here for reference and easy access.
const API_KEY =
  "live_ampad3SdE4oZAJ068jjvXeFLS6VbCGMByQAlxTs5HdA2YB8OtNgjVLEfWa61DEuZ";

async function initialLoad() {
  const breedList = await axios.get(
    `https://api.thecatapi.com/v1/breeds/?api_key=${API_KEY}`
  );
  breedList.data.forEach((cat) => {
    const breed = document.createElement("option");
    breed.setAttribute("value", cat.id);
    breed.innerText = cat.name;
    breedSelect.append(breed);
  });
}

window.addEventListener("load", initialLoad());

breedSelect.addEventListener("change", (e) => {
  e.preventDefault(e);

  async function getCatImages() {
    const imageReq = await axios.get(
      `https://api.thecatapi.com/v1/images/search?limit=3&breed_ids=${e.target.value}&api_key=${API_KEY}`
    );
     carouselInner.innerHTML = null;
    //Carousel.clear()
    imageReq.data.forEach((image) => {
      // const item = Carousel.createCarouselItem(image.url, image.url, image.id);
      // Carousel.appendCarousel(item);
      // Carousel.start();
      const img = document.createElement("img");
      img.src = image.url;
      img.classList.add("carousel-inner", "card");
      carouselInner.append(img);
    });
  }

  async function infoDumb() {
    const infoRes = await axios.get(
      `https://api.thecatapi.com/v1/images/search?limit=3&breed_ids=${e.target.value}&api_key=${API_KEY}`
    );
    infoDump.innerHTML = "";

    const infoDumpText = document.createElement("p");
    const infoDumbTitle = document.createElement("h5");
    infoDumbTitle.classList.add("card-title", "text-center");
    infoDumbTitle.innerText = `${infoRes.data[0].breeds[0].name}`;
    infoDumpText.classList.add("card-text");
    infoDumpText.innerText = infoRes.data[0].breeds[0].description;
    infoDump.classList.add("card", "w-75");
    infoDump.append(infoDumbTitle, infoDumpText);
  }

  infoDumb();
  getCatImages();
});

// axios.interceptors.response.use((response) => {
//   response.data = response.data.map((item) => ({
//     id: item.id,
//     name: item.title
//   }));
//   return response;
// });
