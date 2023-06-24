const fs = require('fs');

// Read the contract artifact file
const contractData = fs.readFileSync('build/contracts/ArtworkOwnership.json', 'utf8');

// Parse the JSON data
const contractJson = JSON.parse(contractData);

// Retrieve the contract ABI
const contractABI = contractJson.abi;

console.log(contractABI);
