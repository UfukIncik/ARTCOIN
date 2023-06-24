const SHA256 = require('crypto-js/sha256');

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
        this.chain = [this.createGenesisBlock()]; //this.chain  = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2023","Genesis Block","0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainVlaid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}

let nitroCoin = new Blockchain();
nitroCoin.addBlock(new Block(1, "15/01/2023", {amount: 4}));
nitroCoin.addBlock(new Block(2, "20/01/2023", {amount: 10}));

console.log("Is blockchain valid? " + nitroCoin.isChainVlaid());

//console.log(JSON.stringify(nitroCoin,null, 4));

//Each represents a work of art and has the attributes creator, creation_date, and owners. 
class Artwork {
    constructor(creator, creation_date, owners) {
        this.creator = creator;
        this.creation_date = creation_date;
        this.owners = owners;
    }
}
