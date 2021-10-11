import {expect, use} from 'chai';
import { ethers } from "hardhat";
import { Signer } from "ethers";
import {
    GasCostArrayTest,
    GasCostArrayTest__factory
} from '../typechain'
import { solidity } from 'ethereum-waffle';

use(solidity);

describe("GasCostArrayTest", () => {
    let deployer: Signer
    let other: Signer

    let gasCostTest: GasCostArrayTest
    beforeEach(async () => {
        [deployer, other] = await ethers.getSigners()
        const gasCostTestFactory = (await ethers.getContractFactory("GasCostArrayTest")) as GasCostArrayTest__factory
        gasCostTest = await gasCostTestFactory.deploy()
    })
    describe("addIntoTest1()", () => {
        it("add 10000 addresses", async () => {
            for (let i = 1; i <= 10000; i++) {
                const newWallet = await ethers.Wallet.createRandom()
                const tx = await gasCostTest.addIntoTest1(newWallet.address)
                if (i === 1 || i % 500 === 0) {
                    console.log(`gasUsed by adding ${i} address(es): `, (await tx.wait()).gasUsed.toString())
                }  
            }
            const test1 = await gasCostTest.getTest1()
            expect(test1.length).to.be.equal(10000)
        }).timeout(100000000000000000000)
    })
})