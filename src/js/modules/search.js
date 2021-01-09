import axios from "axios";
import { APP_KEY, proxy } from '../server';

export default class Search{
    constructor(query){
        this.query = query;
    }
        async getResult(){
        
        try{
            const res = await axios(`https://api.spoonacular.com/recipes/complexSearch?query=${this.query}&apiKey=${APP_KEY}`);
            this.recipes = res.data.results
           // console.log(res, this.recipes);
        }
        catch (err){
            console.log(err)
        }
    }
}

