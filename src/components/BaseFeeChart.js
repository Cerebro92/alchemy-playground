import * as React from "react";
import Chart from "react-apexcharts";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import ListDivider from "@mui/joy/ListDivider";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import alchemy from "../alchemyClient";
import BarChartIcon from "@mui/icons-material/BarChart";

export default function BaseFeeChart() {
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

  async function refreshChart() {
    console.log("fetching..");
    const [blocks, baseFees] = await alchemy.getBaseFeePerGas();
    console.log(baseFees);
    setState({
      chart: {
        type: "area",
        zoom: {
          enabled: false,
        },
        toolbar: { show: false },
      },
      options: { xaxis: { categories: blocks } },
      series: [{ ...state.series[0], data: baseFees }],
    });
  }

  React.useEffect(() => {
    refreshChart();
  }, []);

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
          <Avatar sx={{ borderRadius: "sm" }}>
            <BarChartIcon />
          </Avatar>
          <Box sx={{ ml: 2 }}>
            <Typography level="body2" textColor="text.primary" mb={0.5}>
              {"Base Fees"}
            </Typography>
            <Typography level="body3" textColor="text.tertiary">
              Last 10 blocks transactions
            </Typography>
          </Box>
        </Box>
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
