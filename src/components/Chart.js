import * as React from "react";
import Chart from "react-apexcharts";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import ListDivider from "@mui/joy/ListDivider";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import alchemy from "../alchemyClient";

const tokens = [
  {
    id: 1,
    name: "Chainlink",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1975.png",
    contractAddress: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    transferAddress:
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
  },
  {
    id: 2,
    name: "Tether",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
    contractAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    transferAddress:
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
  },
  {
    id: 3,
    name: "OMG Network",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1808.png",
    contractAddress: "0xd26114cd6EE289AccF82350c8d8487fedB8A0C07",
    transferAddress:
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
  },
  {
    id: 4,
    name: "0x",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1896.png",
    contractAddress: "0xe41d2489571d322189246dafa5ebde1f4699f498",
    transferAddress:
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
  },
];

export default function ChartContent() {
  const [state, setState] = React.useState({
    chart: {
      type: "area",
      zoom: {
        enabled: false,
      },
    },
    options: {
      xaxis: {
        categories: [],
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    series: [
      {
        name: "Volume",
        type: "area",
        data: [],
      },
    ],
  });

  const [selectedToken, setSelectedToken] = React.useState(tokens[0]);

  function handleSelectToken(tokenId) {
    console.log(tokenId);
    setSelectedToken(tokens[tokenId - 1]);
  }

  async function refreshChart(selectedToken) {
    console.log("fetching..");
    const [blocks, volumes] = await alchemy.fetchVolume(selectedToken);
    setState({
      chart: {
        type: "area",
        zoom: {
          enabled: false,
        },
        toolbar: { show: false },
      },
      options: { xaxis: { categories: blocks } },
      series: [{ ...state.series[0], data: volumes }],
    });
  }

  React.useEffect(() => {
    refreshChart(selectedToken);
    const timer = setInterval(() => refreshChart(selectedToken), 5000);
    return () => {
      clearInterval(timer);
    };
  }, [selectedToken]);

  return (
    <Sheet
      variant="outlined"
      sx={{
        borderRadius: "sm",
        minWidth: 850,
        mb: 2,
        p: 2,
        bgcolor: "background.componentBg",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Avatar srcSet={selectedToken.image} sx={{ borderRadius: "sm" }} />
          <Box sx={{ ml: 2 }}>
            <Typography level="body2" textColor="text.primary" mb={0.5}>
              {selectedToken.name}
            </Typography>
            <Typography level="body3" textColor="text.tertiary">
              Last 10 blocks transactions
            </Typography>
          </Box>
        </Box>
        <Select
          size="sm"
          sx={{ width: 200 }}
          placeholder="Select token"
          onChange={handleSelectToken}
          size="sm"
          defaultValue={1}
        >
          {tokens.map((token) => (
            <Option key={token.id} value={token.id}>
              {token.name}
            </Option>
          ))}
        </Select>
      </Box>
      <ListDivider component="hr" sx={{ mt: 2 }} />

      <Chart
        options={state.options}
        series={state.series}
        type="area"
        colors={state.colors}
      />
    </Sheet>
  );
}
