// async function main() {
//   // We get the contract to deploy
//   const Box = await ethers.getContractFactory("Box");
//   console.log("Deploying Box .......................");
//   const box = await Box.deploy();
//   await box.deployed();
//   console.log("Box deployed to:", box.address);
// }
// //=======================================================
// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });
async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld");

  // Start deployment, returning a promise that resolves to a contract object
  const hello_world = await HelloWorld.deploy("Hello World!");
  console.log("Contract deployed to address:", hello_world.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
