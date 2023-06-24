const Web3 = require('web3');
const web3 = new Web3("http://127.0.0.1:9545");

// Rest of your code...

async function main() {
    const ArtworkOwnership = artifacts.require("ArtworkOwnership");
  
    // Contract instance'ını al
    const artworkOwnershipInstance = await ArtworkOwnership.deployed();
  
    // Artwork oluştur
    await artworkOwnershipInstance.createArtwork("Sanat Eseri", 1);
  
    // Sahipliği aktar
    await artworkOwnershipInstance.transferOwnership(0, "0x1234567890abcdef", 2);
  }
  
  // main işlevini çağır
  main();
  