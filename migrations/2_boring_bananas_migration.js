const BoringBananasCo = artifacts.require("BoringBananasCo");

const secret = require("../secret.json");
const secretTestnet = require("../secret.testnet.json");

module.exports = async function (deployer, network) {
    await deployer.deploy(BoringBananasCo);

    bananaInstance = await BoringBananasCo.deployed();

    if (network == "mainnet") {
        await bananaInstance.setBaseURI(
            `https://boringbananasco.vercel.app/api/`,
            { from: secret.fromAddress }
        );
    } else if (network == "rinkeby") {
        await bananaInstance.setBaseURI(
            `https://boringbananasco.vercel.app/api/`,
            { from: secretTestnet.fromAddress }
        );
    }
}