// RecipeList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './RecipeList.css'; // Import CSS file

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const apiKey = 'c749143f3129435bb3462c16b4e9809f';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
          params: {
            apiKey: apiKey,
            number: 12,
            query: searchTerm,
            type: selectedCategory,
          },
        });
        setRecipes(response.data.results);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchData();
  }, [searchTerm, selectedCategory, apiKey]);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = event => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="recipe-list-container">
      <h1 className="title">Recipe List</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name or ingredients"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <select value={selectedCategory} onChange={handleCategoryChange} className="category-select">
          <option value="">All Categories</option>
          <option value="main course">Main Course</option>
          <option value="dessert">Dessert</option>
          <option value="side dish">Side Dish</option>
          <option value="appetizer">Appetizer</option>
          <option value="salad">Salad</option>
          <option value="soup">Soup</option>
          <option value="bread">Bread</option>
          <option value="breakfast">Breakfast</option>
          <option value="beverage">Beverage</option>
          <option value="sauce">Sauce</option>
          <option value="marinade">Marinade</option>
          <option value="fingerfood">Finger Food</option>
          <option value="snack">Snack</option>
          <option value="drink">Drink</option>
        </select>
      </div>
      <div className="recipe-list">
        {recipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <Link to={`/recipe/${recipe.id}`} className="recipe-link">
              <img src={recipe.image} alt={recipe.title} className="recipe-image" />
              <h3 className="recipe-title">{recipe.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;
