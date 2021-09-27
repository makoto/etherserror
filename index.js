const ethers = require('ethers')
const Contract = ethers.Contract
const abi = [
  "function throwIfNotZero(address owner) pure returns (bool)",
  "error SomeCustomError(address addr, uint256 value)"
];
const address = '0xF51BC8C46A2f04D58D83Cc2D7e08fbd4018aEA60'
const owner = '0x5A384227B65FA093DEC03Ec34e111Db80A040615'

async function main(){
  const url = process.env.PROVIDER_URL
  const provider = new ethers.providers.JsonRpcProvider(url);
  const contract = new Contract(address, abi, provider);
  try {
    const result = await contract.throwIfNotZero(owner);
    console.log("Result:", result);
  } catch (e) {
    console.log(e)
    if (e.code === Logger.errors.CALL_EXCEPTION) {
      // If the error was SomeCustomError(), we can get the args...
      // if (e.errorName === "SomeCustomError") {
      //   // These are both the same; keyword vs positional.
      //   console.log(e.errorArgs.addr);
      //   console.log(e.errorArgs[0]);
      //   // These are both the same; keyword vs positional
      //   console.log(e.errorArgs.value);
      //   console.log(e.errorArgs[1]);
      // }
    }
  }
}

main()
