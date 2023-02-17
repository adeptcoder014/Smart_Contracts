pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Baniya.sol";

contract MyNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    Baniya private _baniyaToken;
    uint256 private _price;

    constructor(Baniya baniyaToken, uint256 price) ERC721("MyNFT", "MNFT") {
        _baniyaToken = baniyaToken;
        _price = price;
    }

    function buyNFT(uint256 tokenId) public {
        require(
            baniyaToken.balanceOf(msg.sender) >= price,
            "Insufficient balance"
        );
        baniyaToken.transferFrom(msg.sender, address(this), price);

        _safeMint(msg.sender, tokenId);
    }

    function mintNFT(string memory tokenURI, string memory image) public {
        require(
            _baniyaToken.balanceOf(msg.sender) >= _price,
            "Insufficient balance"
        );

        // Transfer BANIYA tokens from sender to contract
        _baniyaToken.transferFrom(msg.sender, address(this), _price);

        // Mint the NFT
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        // Add the image to the token metadata
        _setTokenImage(newTokenId, image);
    }

    function _setTokenImage(uint256 tokenId, string memory image) internal {
        bytes memory metadata = bytes(tokenURI(tokenId));
        uint256 index = metadata.length - 1;
        require(metadata[index] == "}", "Token metadata invalid");
        bytes memory imageBytes = bytes(image);
        for (uint256 i = 0; i < imageBytes.length; i++) {
            metadata = abi.encodePacked(metadata, imageBytes[i]);
        }
        metadata = abi.encodePacked(metadata, "}");
        _setTokenURI(tokenId, string(metadata));
    }

    function getPrice() public view returns (uint256) {
        return _price;
    }

    function setPrice(uint256 price) public onlyOwner {
        _price = price;
    }

    function withdraw() public onlyOwner {
        uint256 balance = _baniyaToken.balanceOf(address(this));
        _baniyaToken.transfer(owner(), balance);
    }
}
