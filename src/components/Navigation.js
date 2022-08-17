import * as React from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemContent from "@mui/joy/ListItemContent";

// Icons import
import InboxRoundedIcon from "@mui/icons-material/InboxRounded";
import OutboxRoundedIcon from "@mui/icons-material/OutboxRounded";
import DraftsRoundedIcon from "@mui/icons-material/DraftsRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

export default function Navigation(props) {
  const [chartId, setChartId] = React.useState(1);
  const handleClick = (chartId) => {
    props.toggleChart(chartId);
    setChartId(chartId);
  };

  return (
    <List size="sm" sx={{ "--List-item-radius": "8px" }}>
      <ListItem nested sx={{ p: 0 }}>
        <Box
          sx={{
            mb: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            id="nav-list-browse"
            textColor="neutral.500"
            fontWeight={700}
            sx={{
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: ".1rem",
            }}
          >
            Browse
          </Typography>
          <IconButton
            size="sm"
            variant="plain"
            color="primary"
            sx={{ "--IconButton-size": "24px" }}
          >
            <KeyboardArrowDownRoundedIcon fontSize="small" color="primary" />
          </IconButton>
        </Box>
        <List
          aria-labelledby="nav-list-browse"
          sx={{
            "& .JoyListItemButton-root": { p: "8px" },
          }}
        >
          <ListItem>
            <ListItemButton
              variant={chartId === 1 ? "soft" : undefined}
              color={chartId === 1 ? "primary" : undefined}
              onClick={() => handleClick(1)}
            >
              <ListItemDecorator sx={{ color: "inherit" }}>
                <InboxRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Transactions Volume</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              variant={chartId === 2 ? "soft" : undefined}
              color={chartId === 2 ? "primary" : undefined}
              onClick={() => handleClick(2)}
            >
              <ListItemDecorator sx={{ color: "neutral.500" }}>
                <OutboxRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Base Fees</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              variant={chartId === 3 ? "soft" : undefined}
              color={chartId === 3 ? "primary" : undefined}
              onClick={() => handleClick(3)}
            >
              <ListItemDecorator sx={{ color: "neutral.500" }}>
                <DraftsRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Gas Used vs Limit</ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </ListItem>
    </List>
  );
}
