import axios from 'axios';


export const getCategories = async () => {
    try{

        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php")
        if(response && response.data) {
            //console.log("cat : " , response.data)
            return response.data.categories
        } else {
            return [];
        }

    } catch(err) {
        console.log("Error : "+ err.message)
        return [];
    }
}

export const getRecipes = async (category) => {
    try{

        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        if(response && response.data) {
            //console.log("cat : " , response.data)
            return response.data.meals
        } else {
            return [];
        }

    } catch(err) {
        console.log("Error Recipe: "+ err.message)
        return [];
    }
}

export const getRecipeDetails = async (idMeal) => {
    try{

        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
        if(response && response.data) {
            return response.data.meals[0]
        } else {
            return null;
        }

    } catch(err) {
        console.log("Error Recipe: "+ err.message)
        return null;
    }
}