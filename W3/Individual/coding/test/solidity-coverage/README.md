### 測試與資安審計
[solidity coverage](https://github.com/sc-forks/solidity-coverage/blob/master/HARDHAT_README.md)

hardhat提供了一個查看當前我们編寫的測試代碼的功能覆蓋率的插件，叫做solidity-coverage，專門用於可靠性測試的代碼覆蓋率。

<--- start --->

Install
```
npm install --save-dev solidity-coverage
```
新增 hardhat.config.ts 檔案
```
import "solidity-coverage"
```
![](https://i.imgur.com/49SUxQn.png)

到 [etherscan](https://etherscan.io/address/0x4f3083bf6bBA8B0482406B47d19cC26e8a23319d#code) 抓一個合約來做測試

![](https://i.imgur.com/eRy1Dm2.png)

下指令

```
npx hardhat coverage  
```
![](https://i.imgur.com/Xu9KE6B.png)