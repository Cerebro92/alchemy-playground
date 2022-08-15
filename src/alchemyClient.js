import { Alchemy } from "alchemy-sdk";

const alchemy = new Alchemy();

async function fetchVolume(token) {
  const latest = await alchemy.core.getBlockNumber();

  const logs = await alchemy.core.getLogs({
    address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    topics: [
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
    ],
    fromBlock: latest - 20,
    toBlock: latest,
  });

  var _map = {};

  logs.forEach((log) => (_map[log["blockNumber"]] = parseInt(log["data"], 16)));

  //   console.log(_map);

  var blocks = [];
  for (var idx = 10; idx > 0; idx--) {
    blocks.push(latest - idx);
  }
  //   console.log(blocks);

  var volumes = [];
  for (const block of blocks) {
    if (_map[block]) {
      volumes.push(parseInt(_map[block] / 10 ** 18));
    } else {
      volumes.push(0);
    }
  }
  //   console.log(volumes);

  return [blocks, volumes];
}

export default { fetchVolume };
