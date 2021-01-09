import axios from 'axios';
import { APP_KEY} from '../server';
export default class Recipe{
    constructor(id){
        this.id =id
    }
    async getRecipe(){
        try{
            const getRec = await axios(`https://api.spoonacular.com/recipes/${this.id}/information?includeNutrition=false&apiKey=${APP_KEY}`);
            this.title =getRec.data.title;
            this.img = getRec.data.image;
            this.instructions = getRec.data.instructions;
            this.url = getRec.data.sourceUrl;
            this.ingredients = getRec.data.extendedIngredients.map(curr => curr.originalString);
            this.minutes = getRec.data.readyInMinutes;
            this.servings = getRec.data.servings
        //console.log(getRec);
        }catch(err){
            console.log(err);
        }
    }
        makeUnitsSame(){
        //a small part of what is required
        const unitsLong = ['tablespoons', 'tablespoon', 'TBSP', 'tsps', 'tsp.',  'teaspoon',  'teaspoons', 'TPS','ounce', 'ounces', 'ozs',  'cups', 'pounds', 'grams', 'inches', 'mls','gs'];
        const unitsShort = ['tbsp', 'tbsp', 'tbsp', 'tsp', 'tsp', 'tsp', 'tsps', 'tsp', 'oz', 'oz', 'oz', 'cup', 'pound', 'gram', 'inche', 'ml', 'g'];
        let ingObj, unitsIndex, numSum, sum;
        let newIngredients = this.ingredients.map(curr => {
            let ingredient = curr.toLowerCase();
             unitsLong.forEach((unit, i) => {
                 ingredient = ingredient.replace(unit, unitsShort[i])
             });
             // Remove the parentheses around the text
             ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");
             numSum = 0; sum = 0;
             let ingArr = ingredient.split(' ')
             unitsIndex = ingArr.findIndex(el2 => unitsShort.includes(el2));
                    if(unitsIndex === -1){
                            if(parseFloat(ingArr.slice(0, 1))){
                                ingObj = {
                                    num :parseFloat(ingArr.slice(0, 1)),
                                    unit : ' ',
                                    txt : ingArr.slice(1)
                                }
                            }else{
                                ingObj = {
                                    num : 1,
                                    unit : ' ',
                                    txt : ingArr
                                }
                            }
                        }else if(unitsIndex === 1){
                            if(ingArr.slice(0, 1)[0].charAt(1) === '-'){
                                ingObj = {
                                num : (parseInt(ingArr.slice(0, 1)[0]) + parseInt(ingArr.slice(0, 1)[0].charAt(2))) /2,
                                unit : ingArr.slice(unitsIndex, unitsIndex+1),
                                txt : ingArr.slice(unitsIndex + 1)
                                }
                            }else{
                                ingObj = {
                                num : parseFloat(ingArr.slice(0, unitsIndex)),
                                unit : ingArr.slice(unitsIndex, unitsIndex+1),
                                txt : ingArr.slice(unitsIndex + 1)
                                }
                            }
                        }else if(unitsIndex === 2){
                            ingObj = {
                                num :  ingArr.slice(0, unitsIndex),
                                unit : ingArr.slice(unitsIndex, unitsIndex+1),
                                txt : ingArr.slice(unitsIndex + 1)
                            }
                        }else if(!parseFloat(ingredient.slice(unitsIndex-2, unitsIndex))){    
                            ingObj = {
                                num : ingArr.slice(unitsIndex-1, unitsIndex),
                                unit : ingArr.slice(unitsIndex),
                                txt : ingArr.slice(0, unitsIndex - 1)
                            }
                        }else if (unitsIndex === 0){
                            ingObj = {
                                num : 1,
                                unit : ingArr.slice(0, 1),
                                txt : ingArr.slice(1)
                            }  
                        }else {
                            ingObj = {
                                num : ingArr.slice(unitsIndex-2, unitsIndex),
                                unit : ingArr.slice(unitsIndex),
                                txt : ingArr.slice(0, unitsIndex - 2)
                            }   
                        }
                        if(isNaN(ingObj.num)){
                            if(!(ingObj.num.length === 1 && Number(ingObj.num))){
                                
                                for(let el of ingObj.num){
                                    if(el.slice(1,2) === '/'){
                                    el = el.slice(0,1) / el.slice(2)
                                    }  
                                    sum += Number(el);
                                }if(sum){ingObj.num = sum;}
                            }
                        } 
                            numSum += ingObj.num ;
                        
                return {
                            num : numSum === 0 ? '' : numSum,
                            txt: ingObj.txt.join(' '),
                            unit: ingObj.unit.toString(),
                    }


        });// and much more :)     
        this.ingredients = newIngredients;    
        }
        changeServings(minusOrPlus){
            const newServings = minusOrPlus === 'plus' ? this.servings + 1 : this.servings - 1;
            this.ingredients.forEach(curEl => curEl.num *= (newServings / this.servings) );
            this.servings = newServings;
        }
}