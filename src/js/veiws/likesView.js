import { elements } from '../veiws/DomEl';
import { oneLineText } from '../veiws/searchView';
export const toggleHeartIcon = likedOrNot =>{
    const heartBtn = likedOrNot ? 'icon-heart' :'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${heartBtn}`);
}

export const favoriteHeartVisibility = likesCount =>{
    elements.likeField.style.visibility = likesCount > 0 ? 'visible' : 'hidden'; 
}

 export const addFavoriteList = liked => {
    let markup = `
        <li>
            <a class="likes__link" href="#${liked.Id}">
                <figure class="likes__fig">
                    <img src="${liked.img}" alt="${liked.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${oneLineText(liked.title)}</h4>
                </div>
            </a>
        </li>
     `
    elements.likeList.insertAdjacentHTML('beforeend', markup);
 }

 export const deleteFromFavorite = Id => {
    const elForDel = document.querySelector(`.likes__list a[href *= "${Id}"]`).parentElement;
    elForDel.parentElement.removeChild(elForDel)
 }
