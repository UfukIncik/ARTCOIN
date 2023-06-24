const {Blockchain,Transaction} = require('./blockchain');

let nitroCoin = new Blockchain();

nitroCoin.createTransaction(new Transaction('address1', 'address2 ', 100));
nitroCoin.createTransaction(new Transaction('address2', 'address1 ', 50));

console.log('\n Starting the miner..');
nitroCoin.minePendingTransactions('aybars-address');

console.log('\nBalance of aybars is', nitroCoin.getBalanceOfAddress('aybars-address'));

console.log('\n Starting the miner again..');
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
