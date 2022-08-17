import * as React from "react";
import { GlobalStyles } from "@mui/system";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";

// Icons import
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import MenuIcon from "@mui/icons-material/Menu";
import NotStartedRoundedIcon from "@mui/icons-material/NotStartedRounded";

// custom
import emailTheme from "./theme";
import Layout from "./components/Layout";
import Navigation from "./components/Navigation";
import Chart from "./components/Chart";
import BaseFeeChart from "./components/BaseFeeChart";
import GasUsedVsLimitRatio from "./components/GasUsedVsLimitRatio";

const ColorSchemeToggle = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="primary" />;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="outlined"
      color="primary"
      onClick={() => {
        if (mode === "light") {
          setMode("dark");
        } else {
          setMode("light");
        }
      }}
    >
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
};

export default function EmailExample() {
  const [chart, setChart] = React.useState(1);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleChart = (number) => {
    console.log(number);
    setChart(number);
  };

  return (
    <CssVarsProvider disableTransitionOnChange theme={emailTheme}>
      <GlobalStyles
        styles={(theme) => ({
          body: {
            margin: 0,
            fontFamily: theme.vars.fontFamily.body,
          },
        })}
      />
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <Navigation toggleChart={toggleChart} />
        </Layout.SideDrawer>
      )}
      <Layout.Root
        sx={{
          ...(drawerOpen && {
            height: "100vh",
            overflow: "hidden",
          }),
        }}
      >
        <Layout.Header>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <IconButton
              variant="outlined"
              size="sm"
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              size="sm"
              variant="solid"
              sx={{ display: { xs: "none", sm: "inline-flex" } }}
            >
              <NotStartedRoundedIcon />
            </IconButton>
            <Typography component="h1" fontWeight="xl">
              Alchemy Playground
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1.5 }}>
            <ColorSchemeToggle />
          </Box>
        </Layout.Header>
        <Layout.SideNav>
          <Navigation toggleChart={toggleChart} />
        </Layout.SideNav>
        <Layout.Main>
          {chart === 1 && <Chart />}
          {chart === 2 && <BaseFeeChart />}
          {chart === 3 && <GasUsedVsLimitRatio />}
        </Layout.Main>
      </Layout.Root>
    </CssVarsProvider>
  );
}
