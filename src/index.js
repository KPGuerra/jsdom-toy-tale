const toyCollection = document.getElementById("toy-collection");
const toyForm = document.querySelector(".add-toy-form");
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
  function intialize() {
    getAllToys() 
    .then(toyData => toyData.forEach(renderOneToy))
  }
  
  intialize()
  
  function renderOneToy(toy) {
    const card = document.createElement("div")
    card.classList.add("card")
    card.dataset.id = toy.id
    card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
    `
    toyCollection.append(card) 
  }
  
  toyCollection.addEventListener("click", (event) => {
    if (event.target.matches('button.like-btn')) {
      const div = event.target.closest('div')
      const id = div.dataset.id
      const likesDisplay = div.querySelector('p')
      const newLikes = { likes: parseInt(likesDisplay.textContent) + 1 }

      updateToy(id, newLikes)
      .then(response => response.json())
      .then(toy => {
        likesDisplay.textContent = `${toy.likes} Likes`
      })
  }
})
  ////////////////////////////////////////////////////////////////
  toyForm.addEventListener("submit", toyFormSubmit);
  
  function toyFormSubmit(event) {
    event.preventDefault();
    
    const toyObj = {
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0
    };
    
    createAToy(toyObj)
    .then(newToyObj => {
      renderOneToy(newToyObj);
    })
    
    event.target.reset();
  }


  ///////////////////////////////////////////////////////////////
  function getAllToys() {
    return fetch("http://localhost:3000/toys")
    .then(response => response.json())
  }
  
  function createAToy(toyObj) {
    return fetch("http://localhost:3000/toys", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(toyObj)
    })
  }
  
  function updateToy (id, obj) {
    return fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(obj)
    })
  }
  ///////////////////////////////////////////////////////////////
});