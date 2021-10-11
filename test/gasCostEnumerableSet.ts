import {expect, use} from 'chai';
import { ethers } from "hardhat";
import { Signer } from "ethers";
import {
    GasCostEnumerableSet,
    GasCostEnumerableSet__factory
} from '../typechain'
import { solidity } from 'ethereum-waffle';

use(solidity);

describe("GasCostEnumerableSet", () => {
    let deployer: Signer
    let other: Signer

    let gasCostTest: GasCostEnumerableSet
    beforeEach(async () => {
        [deployer, other] = await ethers.getSigners()
        const gasCostTestFactory = (await ethers.getContractFactory("GasCostEnumerableSet")) as GasCostEnumerableSet__factory
        gasCostTest = await gasCostTestFactory.deploy()
    })
    describe("add()", () => {
        it("add 10000 addresses", async () => {
            for (let i = 1; i <= 10000; i++) {
                const newWallet = await ethers.Wallet.createRandom()
                const tx = await gasCostTest.add(newWallet.address)
                if (i === 1 || i % 500 === 0) {
                    console.log(`gasUsed by adding ${i} address(es): `, (await tx.wait()).gasUsed.toString())
                }  
            }
            const arrayLength = await gasCostTest.length()
            expect(arrayLength).to.be.equal(10000)
        }).timeout(100000000000000000000)
    })

    describe("remove", () => {
        let addresses: string[] = []
        it("remove 10000 ", async () => {
            for (let i = 1; i <= 10000; i++) {
                const newWallet = await ethers.Wallet.createRandom()
                addresses.push(newWallet.address)
                const tx = await gasCostTest.add(newWallet.address)
            }
            expect(await gasCostTest.length()).to.be.equal(10000)

            for (let i = 0; i < addresses.length; i++) {
                const tx = await gasCostTest.remove(addresses[i])
                if (i === 1 || i % 500 === 0) {
                    console.log(`gasUsed by adding ${i} address(es): `, (await tx.wait()).gasUsed.toString())
                }  
            }
            expect(await gasCostTest.length()).to.be.equal(0)
        }).timeout(10000000000000000000000000000)
    })
})