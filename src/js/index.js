import Search from './modules/search';
import Recipe from './modules/recipes';
import ListItem from './modules/sidbarList';
import Likes from './modules/likes';
import '@css/style.css';
import { elements, spinner, clearSpinner } from './veiws/DomEl';
import * as searchView from './veiws/searchView';
import * as recipeView from './veiws/recipeView';
import * as listView from './veiws/sidebarListView';
import * as likesView from './veiws/likesView';
const state = {};
window.state = state
/*SEARCH CONTROLLER */
const controlSearch = async () => {
    //Get query from view
    const query = searchView.getInput();
    if(query){
        //New search object and add to state
        state.search = new Search(query);

        //Preparing UI for result
        searchView.cleanInput();
        searchView.cleanList();
        spinner(elements.result);
        //Search for recipes
        try{
            await state.search.getResult();
        }catch(err){console.log(err);}
        
        
        //Render result on UI
        clearSpinner();
        searchView.recipesList(state.search.recipes);
    }
} 

/*RESULT CONTROLLER */
const controlResult = async () => {
    let ID = window.location.hash.replace('#', '');    
       recipeView.clearRecipeField();
        state.newRecipe = new Recipe(ID);
       
         if(ID){
             searchView.activeCurr(ID);
              //spinner(elements.recipes);
             spinner(elements.recipe);
            try{
                await state.newRecipe.getRecipe();
                state.newRecipe.makeUnitsSame();
                clearSpinner();
                recipeView.recipeRender(state.newRecipe, state.Likes.isLiked(ID));              
            } 
              catch(err){console.log(err)}          
     }

}

/*RECIPE CONTROLLER */
const addCurrRecipe = () => {
    if(!state.newList) state.newList = new ListItem();

   state.newRecipe.ingredients.forEach(el => {
       const item = state.newList.addItem(el.num, el.unit, el.txt);
       listView.renterItems(item)
   })
}
/*LIKES CONTROLLER */
const addRemoveLikes = () => {
    
   if(!state.Likes)state.Likes = new Likes();  
    //recipe has Not yet liked 
    const curId = state.newRecipe.id;
    if(!state.Likes.isLiked(curId)){
        const newLike =  state.Likes.addLikes(curId, state.newRecipe.title, state.newRecipe.img);
        // full heart icon
        likesView.toggleHeartIcon(true);
        //adding liked item into favotite list
        likesView.addFavoriteList(newLike);
        
    }else{
        //recipe Has liked
        state.Likes.deleteLikes(curId);
        //outlined heart icon
       likesView.toggleHeartIcon(false);
       //delete item from UI favorite
       likesView.deleteFromFavorite(curId)
       
    }
    likesView.favoriteHeartVisibility(state.Likes.getLikesCount());
}

window.addEventListener('load', () => {
    state.Likes = new Likes();
    // restor likes
    state.Likes.renderLocalStorage()
    //changing likes length
    likesView.favoriteHeartVisibility(state.Likes.getLikesCount());
    //render the exicting likes
       state.Likes.likeItems.forEach(cur => likesView.addFavoriteList(cur));
    
})
elements.searchForm.addEventListener('submit', e => {e.preventDefault(); controlSearch()});
elements.paginationBlock.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn){
        let gotoPage = parseInt(btn.dataset.goto, 10);
        searchView.cleanList();
        searchView.recipesList(state.search.recipes, gotoPage);
    }
});
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlResult));

//hadeling recipe button clicks 
elements.recipe.addEventListener('click', e => {
   if( e.target.matches('.btn-minus, .btn-minus *')){
       // minus button is clicked
       if(state.newRecipe.servings > 1){
            state.newRecipe.changeServings('minus');
            recipeView.updateServingsAndIngr(state.newRecipe);
        }
    // plus button is clicked
   }else if (e.target.matches('.btn-plus, .btn-plus *')){
        state.newRecipe.changeServings('plus');
        recipeView.updateServingsAndIngr(state.newRecipe);
   }else if(e.target.matches('.data-addbtn, .data-addbtn *, .likes__list, .likes__list *')){
       // add ingredients to shopping list
        addCurrRecipe();

   }else if (e.target.matches('.recipe__love, .recipe__love *')){
       //likes controller
        addRemoveLikes();
   }
})

elements.shoppingList.addEventListener('click', e => {
   let ID =e.target.closest('.shopping__item').dataset.itemsid;
   if(e.target.matches('.shopping__delete, .shopping__delete *')){
       state.newList.deleteItem(ID);
       listView.deleteItems(ID)
   }else if(e.target.matches('.shopping__numbfild')){
        const val = parseFloat(e.target.value, 10);
       state.newList.changeNumb(ID, val);
   }
} )

