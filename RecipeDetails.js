// RecipeDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './RecipeDetails.css'; // Import CSS file

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const apiKey = 'c749143f3129435bb3462c16b4e9809f';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
          params: {
            apiKey: apiKey,
          },
        });
        setRecipe(response.data);
        setLoaded(true); // Mark as loaded
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    fetchData();
  }, [id, apiKey]);

  if (!recipe) {
    return <div className="recipe-details-container">Loading...</div>;
  }

  return (
    <div className={`recipe-details-container ${loaded ? 'loaded' : ''}`}>
      <div className="recipe-details">
        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
        <div className="recipe-info">
          <h1 className={`recipe-title ${loaded ? 'show' : ''}`}>{recipe.title}</h1>
          <div className="recipe-meta">
            <span className={`recipe-meta-item ${loaded ? 'show' : ''}`}>Prep Time: {recipe.preparationMinutes} min</span>
            <span className={`recipe-meta-item ${loaded ? 'show' : ''}`}>Cook Time: {recipe.cookingMinutes} min</span>
            <span className={`recipe-meta-item ${loaded ? 'show' : ''}`}>Servings: {recipe.servings}</span>
          </div>
          <p className={`recipe-instructions ${loaded ? 'show' : ''}`}>{recipe.instructions}</p>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
