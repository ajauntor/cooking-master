//get document by id and variable......!
const searchBar = document.getElementById("search-bar");
const foodContainer = document.getElementById("foods-page");
const warningMsg = document.getElementById("Error-show");

//Event Listener for Input Field Validation...........!
searchBar.addEventListener("click", () => {
  const foodInput = document.getElementById(`food-input`).value;
  foodContainer.innerHTML = "";
  if (foodInput === "") {
    warningMsg.style.display = "block";
  } else {
    showFood(foodInput);
    warningMsg.style.display = "none";
  }
});

//Ingredients Information for Display Food............!
const displayFoodInformation = (Name) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${Name}`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      foodInfo(data.meals[0]);
    });
};

//Food Ingredients Information:
const foodInfo = (food) => {
  const foodIngredients = document.getElementById(`foodInformation`);
  foodIngredients.innerHTML = `
  <img src="${food.strMealThumb}" alt="Food Details">
  <h4>Food Name: ${food.strMeal}</h4>
  <h5>♀ Ingredients :</h5>
  <ul class="listIngredients" style="list-style: disc">
    <li>${food.strMeasure1}, ${food.strIngredient1}</li>
    <li>${food.strMeasure2}, ${food.strIngredient2}</li>
    <li>${food.strMeasure3}, ${food.strIngredient3}</li>
    <li>${food.strMeasure4}, ${food.strIngredient4}</li>
    <li>${food.strMeasure5}, ${food.strIngredient5}</li>
    </ul>
  `;
};

//Show Food List Function:
function showFood(foodId) {
  const foodAPI = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodId}`;
  //API Fetching:
  fetch(foodAPI)
    .then((res) => res.json())
    .then((data) => {
      foodShowcase(data.meals);
    });

  const foodShowcase = (foods) => {
    const foodPage = document.getElementById(`foods-page`);
    if (foods !== null) {
      foods.map((food) => {
        const singleFoodDiv = document.createElement(`div`);
        singleFoodDiv.className = `single-food`;
        const foodDetails = `
        <div onclick="displayFoodInformation('${food.idMeal}')" class="foodMeal" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <img class="img-fluid"  src="${food.strMealThumb}" alt="Food-Image">
        <h3 class="foodName">${food.strMeal}</h3>
        </div>
        `;
        singleFoodDiv.innerHTML = foodDetails;
        foodPage.appendChild(singleFoodDiv);
      });
    } else {
      warningMsg.style.display = "block";
    }
  };
}
