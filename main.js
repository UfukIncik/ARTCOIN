class Block{
    constructor(index, timestamp, data, previousHash=''){
        this.index=index;
        this.timestamp=timestamp;
        this.data=data;
        this.previousHash=previousHash;
        this.hash = '';
    }

    
    calculateHash(){
        
    }
}

//Each represents a work of art and has the attributes creator, creation_date, and owners. 
class Artwork {
    constructor(creator, creation_date, owners) {
        this.creator = creator;
        this.creation_date = creation_date;
        this.owners = owners;
    }
}
