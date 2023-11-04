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

  const breedList = await fetch(
    `https://api.thecatapi.com/v1/breeds/?api_key=${API_KEY}`
  );
  const res = await breedList.json();
  res.forEach( (cat) => {
    console.log(cat.name)
    const breed = document.createElement("option");
    breed.setAttribute("value", cat.id);
    breed.innerText = cat.name;
    breedSelect.append(breed);
  });

}

initialLoad();

async function getCatImages(e) {
  carouselInner.innerHTML = null;
  const imageReq = await fetch(
    `https://api.thecatapi.com/v1/images/search?limit=3&breed_ids=${e.target.value}&api_key=${API_KEY}`
  );

  const imageRep = await imageReq.json();
  imageRep.forEach((image) => {
    console.log(image.url)
    const img = document.createElement("img");
    img.src = image.url;
    img.classList.add("carousel-inner", "card");
    carouselInner.append(img);
  });
}



async function infoDumb(e) {
  const infoReq = await fetch(
    `https://api.thecatapi.com/v1/images/search?limit=3&breed_ids=${e.target.value}&api_key=${API_KEY}`
  );
  const infoRes = await infoReq.json();
  const infoDumpText = document.createElement("p");
  const infoDumbTitle = document.createElement("h5");
  infoDumbTitle.classList.add("card-title", "text-center");
  infoDumbTitle.innerText = `${infoRes[0].breeds[0].name}`;
  infoDumpText.classList.add("card-text");
  console.log(infoRes[0].breeds[0].name)
  infoDumpText.innerText = infoRes[0].breeds[0].description;
  infoDump.classList.add("card", "w-75");
  infoDump.append(infoDumbTitle, infoDumpText);
}



breedSelect.addEventListener('change', (e) => {
  e.preventDefault(e)
  infoDump.innerHTML = "";
  infoDumb(e);
  getCatImages(e);
});
