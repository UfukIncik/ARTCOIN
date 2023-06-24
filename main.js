const SHA256 = require('crypto-js/sha256');

class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;

    }
}
class Block{
    constructor(timestamp, transactions, previousHash=''){
        this.timestamp=timestamp;
        this.transactions=transactions;
        this.previousHash=previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    //proof of work
    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()]; //this.chain  = [this.createGenesisBlock()];
        this.difficulty =2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock(){
        return new Block("01/01/2023","Genesis Block","0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions); //In real world cryptos adding all the pendingTransactions to a block is not possible.
        block.mineBlock(this.difficulty);

        console.log('Block mined successfully');
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress,this.miningReward)
        ];
        
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address){
        let balance = 0;

        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance -=trans.amount;
                }
                
                if(trans.toAddress === address ){
                    balance += trans.amount

                }
                

            }
        }
        return balance;
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

nitroCoin.createTransaction(new Transaction('address1', 'address2 ', 100));
nitroCoin.createTransaction(new Transaction('address2', 'address1 ', 50));

console.log('\n Starting the miner..');
nitroCoin.minePendingTransactions('aybars-address');

console.log('\nBalance of aybars is', nitroCoin.getBalanceOfAddress('aybars-address'));

console.log('\n Starting the miner agaşin..');
nitroCoin.minePendingTransactions('aybars-address');

console.log('\nBalance of aybars is', nitroCoin.getBalanceOfAddress('aybars-address'));





//console.log("Mining block 1...");
//nitroCoin.addBlock(new Block(1, "15/01/2023", {amount: 4}));

//console.log("Mining block 2...");
//nitroCoin.addBlock(new Block(2, "20/01/2023", {amount: 8}));

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
