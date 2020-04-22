import axios from 'axios';

let _singleton = Symbol();
let LOCAL_URL = 'https://dbms-cs5200-final-server.herokuapp.com';


//Run server first


if(process.env.REACT_APP_DEVELOPMENT_ENV === 'DEVELOPMENT') {
    LOCAL_URL = 'http://localhost:2000'
}
else if(process.env.REACT_APP_DEVELOPMENT_ENV === 'HEROKU') {
    LOCAL_URL = 'https://dbms-cs5200-final-server.herokuapp.com';
}




class RecipeServices {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new RecipeServices(_singleton);
        return this[_singleton]
    }

    recipeSearch(key) {

        if (key === undefined) {
            key = 'burger'
        }
        return  fetch(LOCAL_URL + '/api/search?search=key'.replace('key', key),{
        }).then((res) =>  res.json());
    }

    addRecipe(recipe) {
        return fetch(LOCAL_URL + '/api/recipe',{
            method:'post',
            body: JSON.stringify(recipe),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then((res) => res.json());
    }

    getRecipesForUser() {
        return fetch(LOCAL_URL + '/api/user/recipe',{
            method:'post',
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then((res) => res.json());

    }

    deleteRecipeById (id) {
        const recipe = {
            id: id
        }
        return fetch(LOCAL_URL + '/api/user/recipe',{
            method: 'delete',
            body:JSON.stringify(recipe),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then((res) => res.json())
    }

    getRecipeDetail(id) {
        return  fetch(LOCAL_URL + '/api/recipe/ID'.replace('ID', id),{
        }).then((res) =>  res.json());
    }


}


export default RecipeServices;