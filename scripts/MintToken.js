const Web3 = require('web3');
const BoringBananasCo = require('../build/contracts/BoringBananasCo.json');
const secretTestnet = require("../secret.testnet.json");
const { BN } = require("web3-utils");

const mint = async () => {
  const web3 = new Web3(`https://ropsten.infura.io/v3/${secretTestnet.INFURA_API_KEY}`);
  
  const id = await web3.eth.net.getId();
  const deployedNetwork = BoringBananasCo.networks[id];
  const contract = new web3.eth.Contract(
    BoringBananasCo.abi,
    deployedNetwork.address
  );

  const mint = contract.methods.mintBoringBanana(secretTestnet.fromAddress, 10);
  const encodedABI = mint.encodeABI();

  const mintTx = {
    from: secretTestnet.fromAddress,
    to: deployedNetwork.address,
    gas: 250000000000000000,
    data: encodedABI
  };

  web3.eth.accounts.signTransaction(mintTx, secretTestnet.privateKey).then(signed => {
    var tran = web3.eth.sendSignedTransaction(signed.rawTransaction);

    tran.on('confirmation', (confirmationNumber, receipt) => {
      console.log('confirmation: ' + confirmationNumber);
    });

    tran.on('transactionHash', hash => {
      console.log('hash');
      console.log(hash);
    });

    tran.on('receipt', receipt => {
      console.log('reciept');
      console.log(receipt);
    });

    tran.on('error', console.error);
  });


  // await contract.methods.mint(
  //   secretTestnet.fromAddress,
  //   new BN("1099999989000000000")
  // ).send({from: secretTestnet.fromAddress, gasPrice: 20000000000 });
  const result = await contract.methods.totalSupply().call()
  console.log(result);
}

mint();