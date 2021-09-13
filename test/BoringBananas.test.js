const BoringBananasCo = artifacts.require("BoringBananasCo");

const { BN } = require("web3-utils");

contract("BoringBananasCo", (accounts) => {
    var banana_contract;

    before(async () => {
        await BoringBananasCo.new(
            { from: accounts[0] }
        ).then((instance) => {
            banana_contract = instance;
        });

        await banana_contract.flipSaleState(
            { from: accounts[0] }
        );
    });

    describe("Mint", () => {
        it("Mint works successfully", async () => {
            await banana_contract.mintBoringBanana(
                10,
                {
                    from: accounts[0],
                    value: new BN('250000000000000000')
                }
            );
        });
    });

    describe("URI ", () => {
        let URI;
        it("Get Token URI", async () => {

            await banana_contract.setBaseURI(
                `https://boringbananasco.vercel.app/api/`,
                { from: accounts[0] }
            );
            
            for(let i = 0; i < 10; i ++) {
                URI = await banana_contract.tokenURI(
                    i,
                    { from: accounts[1] }
                );
                console.log(URI);
            }
        });
    })
})