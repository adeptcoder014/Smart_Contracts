const { ethers } = require("hardhat");

async function main() {
  const account = await ethers.provider.listAccounts();
  //   console.log("accounts ---------->", account[5]);

  const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const Box = await ethers.getContractFactory("Box");
  const box = await Box.attach(address);
  await box.store(42);

  console.log("BOX ---------", await box.retrieve());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
