export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    resultList: document.querySelector('.results__list'),
    result: document.querySelector('.results'),
    paginationBlock: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shoppingList: document.querySelector('.shopping__list'),
    shopItemDel: document.querySelector('.shopping__delete'),
    shopItem: document.querySelector('.shopping__item'),
    likeBtn:document.querySelector('.recipe__love'),
    recipeDetails: document.querySelector('.recipe__details'),
    likeField: document.querySelector('.likes__field'),
    likeList: document.querySelector('.likes__list')
}
export const elementString ={
    loader: 'loader'
};

export const spinner = (parent) => {
    const loader = `
        <div class = "${elementString.loader}">
            <svg>
                <use href = "img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};
export const clearSpinner = () => {
    const loader = document.querySelector(`.${elementString.loader}`);
    if(loader){
        loader.parentElement.removeChild(loader);
    }
}