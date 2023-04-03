import React, { useEffect, useState } from "react";


const API_KEY = import.meta.env.VITE_APP_API_KEY;


const FoodInfo = ({ id }) => {
  const [recipe, setRecipe] = useState(null);


  useEffect(() => {
    const getRecipe = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=a411c186ba92426888b5b7e21c6c6b6ec`
        );
        const json = await response.json();
        setRecipe(json);
      } catch (error) {
        console.error(error);
      }
    };
    console.log(id);


    getRecipe();
  }, [id]);


  return (
    <div>
    {recipe && (
      <div>
        <p>{recipe.title}</p>
        {/* <img src={recipe.image} alt={recipe.title} /> */}
        <p>Ready in {recipe.readyInMinutes} minutes</p>
      </div>
    )}
  </div>
);
};


export default FoodInfo;
