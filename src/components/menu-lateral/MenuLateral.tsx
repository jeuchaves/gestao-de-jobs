import {
  CrisisAlertRounded,
  GridViewRounded,
  GroupRounded,
  LogoutRounded,
  PostAddRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
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
import { UserInfo } from "./components/UserInfo";

const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: <GridViewRounded /> },
  { label: "Jobs", path: "/jobs", icon: <CrisisAlertRounded /> },
  { label: "Usuários", path: "/usuarios", icon: <GroupRounded /> },
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
        <UserInfo />
        <Box sx={{ p: 2 }}>
          <Link to="/jobs/adicionar" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="secondary"
              disableElevation
              startIcon={<PostAddRounded />}
              sx={{ color: "primary.light" }}
              size="large"
              fullWidth
            >
              Adicionar jobs
            </Button>
          </Link>
        </Box>
        <List>
          {menuItems.map((item) => (
            <Link
              to={item.path}
              key={item.label}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem disablePadding>
                <ListItemButton
                  selected={location.pathname === item.path}
                  sx={{
                    position: "relative",
                    "&.Mui-selected": {
                      backgroundColor: "transparent",
                      color: "primary.dark",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        top: "50%",
                        right: 0,
                        transform: "translateY(-50%)",
                        width: "8px",
                        height: "100%",
                        backgroundColor: "primary.main",
                        borderRadius: "4px 0 0 4px",
                      },
                    },
                    "&.Mui-selected .MuiListItemIcon-root": {
                      color: "primary.dark",
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
      <Box>
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
