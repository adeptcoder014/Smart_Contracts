// const { ethers } = require("hardhat");

// async function main() {
//   const account = await ethers.provider.listAccounts();
//     console.log("accounts ---------->", account);

//   const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
//   const Box = await ethers.getContractFactory("HelloWorld");
//   const box = await Box.attach(address);

// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.log(error);
//     process.exit(1);
//   });

const { ethers } = require("hardhat");



async function main() {
  const account = await ethers.provider.listAccounts();

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("My address:", account);

  const Baniya = await ethers.getContractFactory("Baniya");
  const baniya = await Baniya.deploy("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");

  console.log("Contract address : ------------>", baniya.address); 
}
// 0x89E698ce4D27742905179441937032E9E5c45D70 <--- BANIYA Contract address

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
