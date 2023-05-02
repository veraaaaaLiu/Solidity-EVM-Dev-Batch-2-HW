# 團體作業 - 第三組

MVP：
* 目標做出“一個合約＆一個測試”
* 先for一個活動

待辦清單：
* 把 stract 加進去 code
* 測試再新增一些



ticket.sol
     
```
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract Ticket is Ownable, ERC1155("xxx.json") {

    uint public constant MAX_SUPPLY = 1000; //NFT 的最大發行量
    uint public constant MAX_PER_MINT = 1; //每次最多可以買幾張
    uint public constant PRICE = 0.01 ether; //每張的價格
    using Counters for Counters.Counter; //使用 Counters library
    Counters.Counter private _tokenIds; 
    
    mapping(address => Ticket[]) public ticketsOwned;

    // Ticket struct
    struct Ticket {
        uint expireTime;// the time when the ticket expires
        string name; // the name of the ticket
    }
    
     
    <!-- function -->
     
    // 購買
    function mintNfts(uint _count) public payable {

        uint nextId = _tokenIds.current();

        require(nextId + _count < MAX_SUPPLY, "Not enough NFT tickets left!");
        require(_count > 0 && _count <= MAX_PER_MINT, "Cannot mint specified number of NFT tickets.");
        require(msg.value >= price * _count, "Not enough ether to purchase NFTs.");

        for (uint i = 0; i < _count; i++) {
            string memory metadata = generateMetadata(nextId + i);
            _mintSingleNft(msg.sender, metadata);
        }
    }
    
     // Mint a single NFT ticket
    function _mintSingleNft(address _wAddress, string memory _tokenURI) private {
        // Sanity check for absolute worst case scenario
        require(totalSupply() == _tokenIds.current(), "Indexing has broken down!");
        uint newTokenID = _tokenIds.current();
        _safeMint(_wAddress, newTokenID);
        _setTokenURI(newTokenID, _tokenURI);
        _tokenIds.increment();
    }
    
    
     // Withdraw ether
    function withdraw() public payable onlyOwner {
        uint balance = address(this).balance;
        require(balance > 0, "No ether left to withdraw");

        (bool success, ) = (msg.sender).call{value: balance}("");
        require(success, "Transfer failed.");
    }
    
    // 兌換
    function _burn(uint256 tokenId) internal override(ERC1155) {
        super._burn(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

```



test.js

```
const { expect } = require("chai");

describe("MyTicket", async function () {
  const [owner,] = await ethers.getSigners();
  let token;
   
  beforeEach('Setup Contract', async () => {
        const Ticket = await ethers.getContractFactory('Ticket')
        nft = await Ticket.deploy()
        await nft.deployed()
        nftContractAddress = await nft.address
  })
    
  it("Should support interface", async function () {
    expect(await token.supportsInterface("0x00000001"), false);
  });
});
```
