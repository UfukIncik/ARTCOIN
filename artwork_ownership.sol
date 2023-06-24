// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract ArtworkOwnership {
    struct Artwork {
        string name;
        address payable owner;
    }

    Artwork[] public artworks;

    function createArtwork(string memory _name) public {
        artworks.push(Artwork(_name, payable(msg.sender)));
    }

    function transferOwnership(
        uint _artworkId,
        address payable _newOwner
    ) public {
        require(
            msg.sender == artworks[_artworkId].owner,
            "You are not the owner of the artwork"
        );
        artworks[_artworkId].owner = _newOwner;
    }
}
