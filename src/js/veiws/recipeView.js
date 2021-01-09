import { elements } from '../veiws/DomEl';
import { Fraction } from 'fractional';// name must be Fraction, nothing else
/* gitHub -> https://github.com/ekg/fraction.js/blob/master/index.js
-*-  npm install fractional -*-
 Create a new fraction with the new keyword:
(new Fraction(7,3)).multiply(new Fraction(1,2)).toString() => 1 1/6
(new Fraction(7,3)).divide(new Fraction(1,2)).toString() => 4 2/3
(new Fraction(3,10)).add(new Fraction(5,9)).toString() => 77/90
(new Fraction(0.25)).add(new Fraction(1,6)).toString() => 5/12 
(new Fraction(0.35)).subtract(new Fraction(1,4)).toString() => 1/10
(new Fraction(5, 10)).numerator => 5
(new Fraction(3, 4)).denominator => 4
 */

export const clearRecipeField = () => {elements.recipe.innerHTML = ''};
const makeFractioal = (numb) =>{
    if(numb){
       const [integer, decimal] = numb.toString().split('.').map(cur => parseInt(cur, 10));
        if(decimal){
            if(integer === 0){
                const num = new Fraction(numb);
                return `${num.numerator}/${num.denominator}`
            }else{
                const num = new Fraction(numb - integer);
                return `${integer} ${num.numerator}/${num.denominator}`
            }
        }
        return numb;
    }
    return ''
}

const putIngredients = ingredients => 
        
           ` <li class="recipe__item">
                <svg class="recipe__icon">
                    <use href="img/icons.svg#icon-check"></use>
                </svg>
                <div class="recipe__count"> ${makeFractioal(ingredients.num)}</div>
                <div class="recipe__ingredient">
                    <span class="recipe__unit">${ingredients.unit}</span>
                    ${ingredients.txt}
                </div>
            </li>`
       
    
export const recipeRender = (recFromModule, likedOrNot) => {
    const markup = `
        <figure class="recipe__fig">
                <img src="${recFromModule.img}" alt="${recFromModule.title}" class="recipe__img">
                <h1 class="recipe__title">
                    <span>${recFromModule.title}</span>
                </h1>
            </figure>
            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${recFromModule.minutes}</span>
                    <span class="recipe__info-text"> minutes</span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${recFromModule.servings}</span>
                    <span class="recipe__info-text"> servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn-tiny btn-minus">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button class="btn-tiny btn-plus">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#icon-heart${likedOrNot ? '' : '-outlined'}"></use>
                    </svg>
                </button>
            </div>

            <div class="recipe__ingredients">
                <ul class="recipe__ingredient-list">
                   ${recFromModule.ingredients.map(el => putIngredients(el)).join('')}
                </ul>

                <button class="btn-small recipe__btn data-addbtn">
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-shopping-cart"></use>
                    </svg>
                    <span>Add to shopping list</span>
                </button>
            </div>

            <div class="recipe__directions">
                <h2 class="heading-2">How to cook it</h2>
                <p class="recipe__directions-text">
                    ${recFromModule.instructions}
                </p>
                <a class="btn-small recipe__btn" href="${recFromModule.url}" target="_blank">
                    <span>Directions</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>
    `;
    elements.recipe.insertAdjacentHTML('afterbegin', markup);  
}
export const updateServingsAndIngr = (recipeInf) =>{
     document.querySelector('.recipe__info-data--people').textContent = `${recipeInf.servings}`;
     const ingListNum = document.querySelectorAll('.recipe__count');
     Array.from(ingListNum).forEach((el, i) => {
        el.textContent =  `${makeFractioal(recipeInf.ingredients[i].num)}`;
     })
}