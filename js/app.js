document.getElementById('main').style.backgroundImage ='url(images/bg.jpeg)';

const loadCocktail = () => {
    const searchValue = document.getElementById('search-box').value;
    document.getElementById('cocktails-container').innerHTML = '';
    document.getElementById('details').innerHTML = '';
    
    if (isNaN(searchValue)) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`;
    fetch(url)
        .then(response => response.json())
        .then(data => showCocktail(data.drinks));

        document.getElementById('error').innerHTML = '';
        document.getElementById('spinner').style.display = 'block';
    } else if (searchValue.length === 0 || searchValue === '') {
        document.getElementById('error').innerHTML = '<h3 class="text-danger">Please enter a valid search term</h3>';
        document.getElementById('search-box').value='';
    }
}

const showCocktail = (cocktails) => {
    const cocktailContainer = document.getElementById('cocktails-container');

    cocktails.forEach(cocktail => {
        if (cocktail) {
            document.getElementById('spinner').style.display = 'none';
        }        
        const div = document.createElement('div');
        div.classList.add('col-md-4');
        div.innerHTML = `
        <div class="card mb-3 bg-info" style="width: 18rem;">
  <img src="${cocktail.strDrinkThumb}" class="card-img-top" alt="...">
  <div class="card-body bg-primary">
    <h5 class="card-title text-white">${cocktail.strDrink}</h5>
    <p class="card-text">${cocktail.strInstructions.slice(0, 75)}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Catagory: ${cocktail.strCategory}</li>
    <li class="list-group-item">Alcolic: ${cocktail.strAlcoholic}</li>
    <li class="list-group-item">Ingradient: ${cocktail.strIngredient2}</li>
  </ul>
  <div class="card-body">
    <a href="#" class="card-link btn btn-danger">Remove item</a>
    <a onclick="setDetails('${cocktail.idDrink}')" href="#" class="card-link btn btn-success">Show details</a>
  </div>
</div>
        `;
    cocktailContainer.appendChild(div);
    });
    document.getElementById('search-box').value='';
    
}

const setDetails = (id) => {
    document.getElementById('details').innerHTML = '';

    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.drinks === null) {
                document.getElementById('spinner').style.display = 'block';
            }
            else {            
                showDetails(data.drinks[0]);            
            }
        });


}

const showDetails = (cocktail) => {
    const details = document.getElementById('details');
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card mb-2">
    <img height="500px" src="${cocktail.strDrinkThumb}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${cocktail.strDrink}</h5>
      <p class="card-text">${cocktail.strInstructions.slice(0, 250)}</p>
      <p class="card-text"><h2 class="text-muted">${cocktail.strCategory}, ${cocktail.strAlcoholic}, ${cocktail.strIngredient2}</h2ll></p>
    </div>
  </div>
    `;
    details.appendChild(div);
}