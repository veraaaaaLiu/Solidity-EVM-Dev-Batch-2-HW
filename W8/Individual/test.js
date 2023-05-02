// 1. Copy sample code from https://hardhat.org/tutorial/testing-contracts.html
// 2. Install ethers plugin: https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html
// 3. Add the tests and run `npx hardhat test`
// 4. Install coverage plugin: https://www.npmjs.com/package/solidity-coverage
// 5. Run `npx hardhat coverage`
// 6. When testing revert, fix errors in https://github.com/OpenZeppelin/openzeppelin-test-helpers/issues/155#issuecomment-886127598

const { expect } = require("chai");

describe("Quiz 2 test", async function () {
  // A Signer in ethers.js is an object that represents an Ethereum account.
  // It's used to send transactions to contracts and other accounts.
  const [owner, acc1, acc2] = await ethers.getSigners();
  let token;

  before(async function () {
    // 編譯完的大寫
    const Contract = await ethers.getContractFactory("MyToken");
    // 部署完的小寫
    contract = await Contract.deploy();
  });
  it("Name should be as expected", async function () {
    expect(await contract.name()).to.equal("MyToken");
  });

  // 第三個參數在你給他多少錢的情況下
  // 當給他的 value 是 0 的時候
  it("mint reverted when not enough funds", async function () {
    expect(contract.mint(owner.address, 0, {value: ethers.utils.parseEther("0")})).to.be.revertedWith(
      "Not enough funds to mint."
    )
  });

  it("batchMint reverted when not enough funds", async function () {
    expect(contract.batchMint(owner.address, [0,1], {value: ethers.utils.parseEther("0")})).to.be.revertedWith(
      "Not enough funds to mint."
    )
  });

  // 測試給他一定的錢，mint的數量
  it("Should be able to mint to specific account", async function () {
    await contract.mint(owner.address, 0, {value: ethers.utils.parseEther("0.1")})
    expect(await contract.ownerOf(0)).to.equal(owner.address);
  });

  it("Should be able to batchMint to specific account", async function () {
    await contract.batchMint(owner.address, [1,2,3], {value: ethers.utils.parseEther("0.3")})
    expect(await contract.ownerOf(1)).to.equal(owner.address);
    expect(await contract.ownerOf(2)).to.equal(owner.address);
    expect(await contract.ownerOf(3)).to.equal(owner.address);
  });

  it("Should support interface", async function () {
    // 需傳入 bytes4
    expect(await contract.supportsInterface("0x12345678"), false);
  });

});
