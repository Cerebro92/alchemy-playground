import * as React from "react";
import Chart from "react-apexcharts";
import Select from "@mui/joy/Select";
import Sheet from "@mui/joy/Sheet";
import Option from "@mui/joy/Option";
import alchemy from "../alchemyClient";

export default function ChartContent() {
  const [state, setState] = React.useState({
    options: {
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "Volume",
        type: "area",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
    colors: ["#00BAEC"],
  });

  async function fun() {
    console.log("fetching..");
    const [blocks, volumes] = await alchemy.fetchVolume();
    setState({
      options: { xaxis: { categories: blocks } },
      series: [{ ...state.series[0], data: volumes }],
    });
  }

  React.useEffect(() => {
    fun();
    const timer = setInterval(fun, 5000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Sheet variant="outlined" sx={{ borderRadius: "sm", width: "50rem" }}>
      <Select
        size="sm"
        sx={{ m: 2, maxWidth: "200px" }}
        placeholder="Select one.."
      >
        <Option value="LINK">Hello</Option>
      </Select>
      <Chart
        options={state.options}
        series={state.series}
        type="area"
        colors={state.colors}
      />
    </Sheet>
  );
}
