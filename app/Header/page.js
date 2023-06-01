import React from "react";
import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search.js";
import { alpha } from "@mui/material/styles";
import { roboto_mono } from "../fonts";

const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        paddingX: { lg: "3vw" },
        backgroundColor: "#321E1E",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h4"
          className={roboto_mono.className}
          sx={{
            fontSize: { xs: "14px", sm: "36px", xl: "40px" },
            margin: { xs: "", sm: 3 },
          }}
        >
          <span style={{ fontStyle: "italic" }}>travel</span>
          <span style={{ fontWeight: "900" }}>PADI</span>
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", width: "35%" }}>
          <Typography
            variant="p"
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              whiteSpace: "nowrap",
            }}
          >
            explore new places
          </Typography>
          {/* <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}> */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              borderRadius: 1,
              backgroundColor: (theme) =>
                alpha(theme.palette.common.white, 0.15),
              ":hover": {
                backgroundColor: (theme) =>
                  alpha(theme.palette.common.white, 0.25),
              },
              px: 1,
              marginLeft: 0,
              width: { xs: "100%", sm: "80%" },
            }}
          >
            <Box
              sx={{
                p: 0.5,
                height: "100%",
                pointerEvents: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SearchIcon />
            </Box>
            <InputBase
              placeholder="search…"
              sx={{
                color: "inherit",
                padding: (theme) => theme.spacing(1, 1, 1, 0),
                pl: 1,
                transition: (theme) => theme.transitions.create("width"),
                width: { xs: "100%", sm: "10vw" },
                fontSize: { xs: "12px", sm: "24px", xl: "36px" },
              }}
              disabled
            />
          </Box>
          {/* </Autocomplete> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
