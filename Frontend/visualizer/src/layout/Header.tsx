import { Box, IconButton, IconButtonProps, Typography } from "@mui/material";
import { useAppContext } from "src/contexts/app-context";
import { MoonIcon, SunIcon } from "src/icons";

function ToggleThemeButton(props: IconButtonProps) {
  const { mode, toggleThemeMode } = useAppContext();

  return (
    <IconButton size="small" {...props} onClick={() => toggleThemeMode()}>
      {mode === "dark" ? (
        <SunIcon fontSize="large" />
      ) : (
        <MoonIcon fontSize="large" />
      )}
    </IconButton>
  );
}

export default function Header() {
  return (
    <Box
      component="header"
      id="header"
      sx={{
        height: 55,
        width: "100%",
        position: { xsm: "fixed" },
        top: 0,
        left: 0,
        bgcolor: "background.paper",
        px: 2,
        borderBottomWidth: 1,
        borderBottomColor: "divider",
        borderBottomStyle: "solid",
        zIndex: 1201,
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            variant="h2"
            style={{
              fontSize: "25px",
            }}
          >
            BigData
          </Typography>
          <ToggleThemeButton />
        </Box>
      </Box>
    </Box>
  );
}
