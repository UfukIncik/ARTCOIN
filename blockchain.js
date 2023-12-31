const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1'); //instance

class Transaction{
    constructor(fromAddress, toAddress, amount,productID){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.productID = productID;  // Unique identifier for luxury product or artwork

    }

    calculateHash(){
        return SHA256(this.fromAddress + this.toAddress + this.amount +this.productID).toString();
    }
    
    signTransaction(signingKey){
        // Check if the signing key corresponds to the wallet's public key
        if(signingKey.getPublic('hex') !== this.fromAddress){
            throw new Error("You can't sign transactions for other wallets");

        }

        
        const hashTx = this.calculateHash(); // Calculate the hash of the transaction
        const sig= signingKey.sign(hashTx, 'base64'); // Sign the hash using the signing key
        this.signature = sig.toDER('hex');    // Convert the signature to a hex-encoded string

    }

    isValid(){
        if(this.fromAddress === null) return true;
        
        if(!this.signature || this.signature.length === 0 ){
            throw new Error('No signature in this transaction');
        }

        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);
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

    hasValidTransactions(){
        for(const tx of this.transactions){
            if (!tx.isValid()) {
                return false;
            }
        }

        return true;
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
        return new Block("01/01/2023","Genesis Block","0"); // first block of the blokchain
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

    addTransaction(transaction){
        if(!transaction.fromAddress || !transaction.toAddress){
            throw new Error('Transaction must include from and to the address');
        }

        if (!transaction.isValid()) {
            throw new Error('Cannot add invalid transaction to blokchain');
        }

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

            if(!currentBlock.hasValidTransactions()){
                return false;
            }

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

module.exports.Blockchain = Blockchain;
module.exports.Transaction = Transaction;