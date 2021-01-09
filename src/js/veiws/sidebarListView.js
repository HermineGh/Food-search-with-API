import {elements} from '../veiws/DomEl';
export const renterItems = item =>{
    const markup = `
         <li class="shopping__item" data-itemsid = "${item.Id}">
            <div class="shopping__count">
                <input type="number" value="${item.numb}" step="${item.numb}" class = "shopping__numbfild">
                <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${item.txt}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `
    elements.shoppingList.insertAdjacentHTML('beforeend', markup);
}
export const deleteItems = Id =>{
   const itemDel = document.querySelector(`[data-itemsid = "${Id}"]`);
   if(Id){itemDel.parentElement.removeChild(itemDel)};
}