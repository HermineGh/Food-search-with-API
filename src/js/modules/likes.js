export default class Likes{
    constructor(){
        this.likeItems = [];
    }
    addLikes(Id, title, img){
        const favotite = {Id, title, img}
        this.likeItems.push(favotite);
        //persist data in localStorage
        this.addLocalStorage();
        return favotite
    }
    deleteLikes(Id){
        const delItemIndex = this.likeItems.findIndex( el => el.Id === Id);
        this.likeItems.splice(delItemIndex, 1);
        //persist data in localStorage
        this.addLocalStorage();
    }
    isLiked(Id){
        return this.likeItems.findIndex(el => el.Id === Id) !== -1
    }
    getLikesCount(){
       return this.likeItems.length
       
    }
    //adding data into localStorage
    addLocalStorage(){
        localStorage.setItem("likes", JSON.stringify(this.likeItems))
    }
    //taking data from lokalStorage
    renderLocalStorage(){
        let storedLikes = JSON.parse(localStorage.getItem("likes"))
        if(storedLikes) this.likeItems = storedLikes;

    }
}