const loadCocktail = () => {
    const searchValue = document.getElementById('search-box').value;
    
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`;
    fetch(url)
        .then(response => response.json())
        .then(data => showCocktail(data.drinks));
}

const showCocktail = (cocktails) => {
    const cocktailContainer = document.getElementById('cocktails-container');
    cocktails.forEach(cocktail => {
        console.log(cocktail);
        const div = document.createElement('div');
        div.classList.add('col-md-4');
        div.innerHTML = `
        <div class="card mb-3" style="width: 18rem;">
  <img src="${cocktail.strDrinkThumb}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${cocktail.strDrink}</h5>
    <p class="card-text">${cocktail.strInstructions.slice(0, 75)}.</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Catagory: ${cocktail.strCategory}</li>
    <li class="list-group-item">Alcolic: ${cocktail.strAlcoholic}</li>
    <li class="list-group-item">Ingradient: ${cocktail.strIngredient2}</li>
  </ul>
  <div class="card-body">
    <a href="#" class="card-link btn btn-danger">Remove item</a>
    <a onclick="setDetails("${cocktail.idDrink}")" href="#" class="card-link btn btn-success">Show details</a>
  </div>
</div>
        `;
    cocktailContainer.appendChild(div);
    });
    
}

const setDetails = (id) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    console.log(url);

}