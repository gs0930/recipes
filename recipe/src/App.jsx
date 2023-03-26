import React, { useEffect, useState } from 'react';
import './App.css';
//import FoodInfo from './Components/foodInfo';


function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [diet, setDiet] = useState('');
  const [cuisine, setCuisine] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=a411c186ba92426888b5b7e21c6c6b6e&query=${searchTerm}&diet=${diet}&cuisine=${cuisine}`);//&instructionsRequired=true
        const data = await response.json();
        setRecipes(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [searchTerm, diet, cuisine]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDietChange = (event) => {
    setDiet(event.target.value);
  };

  const handleCuisineChange = (event) => {
    setCuisine(event.target.value);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    return recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
  });


  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const getRecipe = async () => {
      try {
        if (recipe) {
          const response = await fetch(
            `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=a411c186ba92426888b5b7e21c6c6b6ec`
          );
          const json = await response.json();
          setRecipe(json);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    getRecipe();
  }, [recipe]);

  return (
    <div className="App">
      <h3># of Dishes Displayed: {filteredRecipes.length}</h3>
      <h1>Food Finder</h1>
      <div>
        <label htmlFor="searchTerm">Search: </label>
        <input type="text" id="searchTerm" value={searchTerm} onChange={handleSearch} />
      </div>
      <div>
        <label htmlFor="diet">Diet: </label>
        <select id="diet" value={diet} onChange={handleDietChange}>
          <option value="">Any</option>
          <option value="gluten free">Gluten Free</option>
          <option value="ketogenic">Ketogenic</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="paleo">Paleo</option>
          <option value="whole30">Whole30</option>
        </select>
      </div>
      <div>
        <label htmlFor="cuisine">Cuisine: </label>
        <select id="cuisine" value={cuisine} onChange={handleCuisineChange}>
          <option value="">Any</option>
          <option value="african">African</option>
          <option value="american">American</option>
          <option value="british">British</option>
          <option value="cajun">Cajun</option>
          <option value="caribbean">Caribbean</option>
          <option value="chinese">Chinese</option>
          <option value="french">French</option>
          <option value="greek">Greek</option>
          <option value="indian">Indian</option>
          <option value="italian">Italian</option>
          <option value="japanese">Japanese</option>
          <option value="korean">Korean</option>
          <option value="mexican">Mexican</option>
          <option value="middle eastern">Middle Eastern</option>
          <option value="southern">Southern</option>
          <option value="spanish">Spanish</option>
          <option value="thai">Thai</option>
        </select>
      </div>
      <div>
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id}>
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} />
            {/* <p>Ready in {recipe.readyInMinutes} minutes</p> */}
            {/* <FoodInfo
              id={recipe.id}
            /> */}
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
