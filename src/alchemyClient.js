import { Alchemy, Network } from "alchemy-sdk";

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

async function getLast10Blocks() {
  const latest = await alchemy.core.getBlockNumber();
  var blocks = [];
  for (var idx = 9; idx >= 0; idx--) {
    blocks.push(latest - idx);
  }
  return blocks;
}

async function fetchVolume(token) {
  const blocks = await getLast10Blocks();
  const logs = await alchemy.core.getLogs({
    address: token.contractAddress,
    topics: [token.transferAddress],
    fromBlock: blocks[0],
    toBlock: blocks[9],
  });

  var _map = {};

  logs.forEach((log) => (_map[log["blockNumber"]] = parseInt(log["data"], 16)));

  var volumes = [];
  for (const block of blocks) {
    if (_map[block]) {
      volumes.push(parseInt(_map[block] / 10 ** 18));
    } else {
      volumes.push(0);
    }
  }

  return [blocks, volumes];
}

async function getBaseFeePerGas() {
  const blocks = await getLast10Blocks();
  console.log(blocks);
  var baseFees = [];
  for (const block of blocks) {
    console.log(block);
    var detail = await alchemy.core.getBlock(block);
    baseFees.push(detail["baseFeePerGas"].toNumber());
  }
  return [blocks, baseFees];
}

async function getGasUsedVsLimitRatio() {
  const blocks = await getLast10Blocks();
  console.log(blocks);
  var ratios = [];
  for (const block of blocks) {
    console.log(block);
    var detail = await alchemy.core.getBlock(block);
    const ratio = detail["gasUsed"].mul(100).div(detail["gasLimit"]);
    ratios.push(ratio.toNumber());
  }
  return [blocks, ratios];
}
const clientMethods = { fetchVolume, getBaseFeePerGas, getGasUsedVsLimitRatio };

export default clientMethods;
