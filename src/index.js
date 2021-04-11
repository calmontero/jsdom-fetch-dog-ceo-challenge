console.log('%c HI', 'color: firebrick')
let breedList = [];
/* Call function dogImages to load images */
document.addEventListener("DOMContentLoaded", function() {
    imgDogs();
    breedDogs();
  });

function imgDogs() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    fetch(imgUrl)
    .then(res=> res.json())
    .then(results => {
    results.message.forEach(image => renderDogs(image))
    });
}

function renderDogs(dogImg) {
    let container = document.querySelector('#dog-image-container');
    let newImage = document.createElement('img');
    newImage.src = dogImg;
    newImage.width = "300";
    container.appendChild(newImage);
}

function breedDogs() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all';
    fetch(breedUrl)
    .then(res=> res.json())
    .then(results => { 
        breedList = Object.keys(results.message);
        breedDogsList(breedList);
        breedDropSelect(breedList);
    });
}

function breedDogsList(breeds) {
    const ulBreeds = document.querySelector('#dog-breeds');
    breedListRemove();
    for (const key in breeds) {
        const breedName = breeds[key];
        let li = document.createElement("li");
        li.innerHTML = breedName;
        ulBreeds.appendChild(li);
        li.style.cursor = 'pointer';
    }

    let listItems = document.querySelectorAll('#dog-breeds li');
    // iterate over the <li> elements
    listItems.forEach(function (listItem) {
      // this function is called for each <li> element
      listItem.addEventListener('click', function () {
        // as soon as the list item is clicked, change its color to red
        this.style.color = 'red';
      });
    });    
}

function breedDropSelect(breeds) {
    let breedDropdown = document.querySelector('#breed-dropdown');
      breedDropdown.addEventListener('change', function (event) {
          console.log(event.target.value);
          breedDogsList(breedList.filter(breed => breed.startsWith(event.target.value)));
    });
}

function breedListRemove() {
    let ul = document.querySelector('#dog-breeds');
    let child = ul.lastElementChild;
    while (child) {
        ul.removeChild(child);
        child = ul.lastElementChild;
    }
}