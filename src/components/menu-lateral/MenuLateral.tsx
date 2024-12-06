import {
  AddCircleRounded,
  DashboardRounded,
  WorkRounded,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: <DashboardRounded /> },
  { label: "Jobs", path: "/jobs", icon: <WorkRounded /> },
  {
    label: "Adicionar jobs",
    path: "/jobs/adicionar",
    icon: <AddCircleRounded />,
  },
];

const drawerWidth = 240;

export const MenuLateral = () => {
  const location = useLocation();

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Box role="presentation">
        <List>
          {menuItems.map((item) => (
            <Link
              to={item.path}
              key={item.label}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem disablePadding>
                <ListItemButton selected={location.pathname === item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
