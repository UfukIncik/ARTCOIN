const fs = require('fs');
const solc = require('solc');

// Read the Solidity contract source code
const contractCode = fs.readFileSync('ArtworkOwnership.sol', 'utf8');

// Compile the contract
const input = {
  language: 'Solidity',
  sources: {
    'ArtworkOwnership.sol': {
      content: contractCode
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['abi']
      }
    }
  }
};

const compiledContract = JSON.parse(solc.compile(JSON.stringify(input)));
const contractABI = compiledContract.contracts['ArtworkOwnership.sol']['ArtworkOwnership'].abi;

// Save the contract ABI to a file
fs.writeFileSync('ArtworkOwnershipABI.json', JSON.stringify(contractABI));
