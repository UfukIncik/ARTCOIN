// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ArtworkOwnership {
    struct Artwork {
        string name;
        address payable owner;
        uint productId; // id of the valuables
    }

    Artwork[] public artworks;

    function createArtwork(string memory _name,uint _productId) public {
        artworks.push(Artwork(_name, payable(msg.sender), _productId));
    }

    function transferOwnership(
        uint _artworkId,
        address payable _newOwner,
        uint _productId
    ) public {
        require(
            msg.sender == artworks[_artworkId].owner,
            "You are not the owner of the artwork"
        );
        artworks[_artworkId].owner = _newOwner;
        artworks[_artworkId].productId = _productId;
}
}
