const ArtworkOwnership = artifacts.require("ArtworkOwnership");

module.exports = function (deployer) {
  deployer.deploy(ArtworkOwnership);
};

