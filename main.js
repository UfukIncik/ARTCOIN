const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash=''){
        this.index=index;
        this.timestamp=timestamp;
        this.data=data;
        this.previousHash=previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()]; //this.chain  = [this.createGenesisBlock()];
        this.difficulty = 1;
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2023","Genesis Block","0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid(){
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

console.log("Mining block 1...");
nitroCoin.addBlock(new Block(1, "15/01/2023", {amount: 4}));

console.log("Mining block 2...");
nitroCoin.addBlock(new Block(2, "20/01/2023", {amount: 8}));

//console.log("Is blockchain valid? " + nitroCoin.isChainValid());

//nitroCoin.chain[1].data = {amount: 100 };
//nitroCoin.chain[1].hash = nitroCoin.chain[1].calculateHash();

//console.log("Is blockchain valid? " + nitroCoin.isChainValid());


//console.log(JSON.stringify(nitroCoin,null, 4));

//Each represents a work of art and has the attributes creator, creation_date, and owners. 
class Artwork {
    constructor(creator, creation_date, owners) {
        this.creator = creator;
        this.creation_date = creation_date;
        this.owners = owners;
    }
}
