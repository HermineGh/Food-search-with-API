import { elements, spinner } from './DomEl';
export const getInput = () => elements.searchInput.value;
export const cleanInput = () => {elements.searchInput.value = ''};
export const cleanList = () => {
    elements.resultList.innerHTML = '';
    elements.paginationBlock.innerHTML =''
};
export const activeCurr = (Id) =>{
    const hasActive = document.querySelectorAll('.results__link--active');
    Array.from(hasActive).forEach(el => el.classList.remove('results__link--active'))
    document.querySelector(`a[href*="${Id}"]`).classList.add('results__link--active');
}
export const oneLineText = (txt, limit = 17) =>{
    const txtArr = txt.split(' ');
    let newText = [];
    if(txt.length > limit){
        txtArr.reduce((sum, curr) => {
            if(sum + curr.length <= limit){
                newText.push(curr);
            }
            return sum + curr.length;
        }, 0);
        return `${newText.join(' ')} ...`;
    }
    return txt;
}
const recipeRender = (rec) => {
    const content = `<li>
                        <a class="results__link" href="#${rec.id}">
                            <figure class="results__fig">
                                <img src=${rec.image} alt="Test">
                            </figure>
                            <div class="results__data">
                                <h4 class="results__name">${oneLineText(rec.title)}</h4>
                            </div>
                        </a>
                    </li>`
                    //<p class="results__author">add to chart +</p>
   elements.resultList.insertAdjacentHTML('beforeend', content);                 
};

const buttonEl = (page, type) => {return `
    <button class="btn-inline results__btn--${type}" data-goto = ${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type == 'prev' ? page-1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
    `
} 
const renderButton = (page, allRecipes, recipesOnPage) => {
    let pages = Math.ceil(allRecipes/recipesOnPage);
    let button;
    if(page === 1 && pages > 1){
        //render next button
       button =  buttonEl(page, 'next');
    }else if(page == pages && pages > 1){
        //render prev button
       button =  buttonEl(page, 'prev');
    }else if(page < pages){
        // render next and prev buttons
        button = `
            ${buttonEl(page, 'prev')}
            ${buttonEl(page, 'next')}
        `
    };
    elements.paginationBlock.insertAdjacentHTML('afterbegin', button)

};

export const recipesList = (recipies, page = 1, recipesOnPage = 4) =>{
    //render result of current page
    let start = (page - 1) * recipesOnPage;
    let end = page * recipesOnPage;
    recipies.slice(start, end).forEach(recipeRender)// same as recipies.forEach(el => recipeRender(el))
    // render pagination buttons
    renderButton(page, recipies.length, recipesOnPage);
}