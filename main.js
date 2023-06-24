class Block{
    constructor(index, timestamp, data, previousHash=''){
        this.index=index;
        this.timestamp=timestamp;
        this.data=data;
        this.previousHash=previousHash;
        this.hash = '';
    }

    
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [];
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2023","Genesis Block","0");
    }

    getLatestBlock(){
        return this.chain(this.chain.length - 1);
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
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
