import {
  AddCircleRounded,
  DashboardRounded,
  LogoutRounded,
  PersonRounded,
  WorkRounded,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { authServices } from "../../services/api/auth";

const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: <DashboardRounded /> },
  { label: "Jobs", path: "/jobs", icon: <WorkRounded /> },
  {
    label: "Adicionar jobs",
    path: "/jobs/adicionar",
    icon: <AddCircleRounded />,
  },
  { label: "Usuários", path: "/usuarios", icon: <PersonRounded /> },
];

const drawerWidth = 240;

export const MenuLateral = () => {
  const location = useLocation();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  if (smDown) {
    return null;
  }

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
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
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
      <Box>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={authServices.logout}>
              <ListItemIcon>
                <LogoutRounded />
              </ListItemIcon>
              <ListItemText primary="Sair" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};
