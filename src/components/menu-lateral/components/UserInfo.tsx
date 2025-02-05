import { Avatar, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { IUser } from "../../../types/users";
import { sectors } from "../../../constants/sectors";

//localStorage.setItem(AUTH_USER, JSON.stringify(usuario));

export const UserInfo = () => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("usuario");
    if (!user) {
      return;
    }
    setUser(JSON.parse(user));
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        p: 2,
      }}
    >
      <Avatar sx={{ bgcolor: "primary.main", color: "white" }}>
        {user?.nomeCompleto[0] || ""}
      </Avatar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0,
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            lineHeight: "1em",
          }}
        >
          {user?.nomeCompleto}
        </Typography>
        <Typography variant="caption" sx={{ lineHeight: "1em" }}>
          {sectors.find((sector) => sector.key === user?.sector)?.name}
        </Typography>
      </Box>
    </Box>
  );
};
