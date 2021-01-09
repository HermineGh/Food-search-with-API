export default class ListItem{
    constructor(){
        this.items = [];
    }

    addItem(numb, unit, txt){
        const item = {
                Id: Math.floor(Math.random() * 1000000),
                numb,
                unit,
                txt 
            }
        this.items.push(item);
        return item;
    }
    
    deleteItem(Id){
       const idForDelete = this.items.findIndex(el => el.Id === Id);
       this.items.splice(idForDelete, 1);
    }
    changeNumb(Id, newNumb){
            this.items.find(el => el.Id === Id).numb =  newNumb;

    } 
};

