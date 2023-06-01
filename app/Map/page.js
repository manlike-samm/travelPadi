import Image from "next/image";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery, Box, Rating } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useState } from "react";

const Map = ({ coords, places, setCoords, setBounds, setChildClicked }) => {
  const matches = useMediaQuery("(min-width:600px)");

  const codd = { lat: 0, lng: 0 };
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      height={"85vh"}
      width={"60%"}
      marginX={2}
      marginBottom={2}
      sx={{
        marginTop: { xs: "14vw", md: "10vw" },
        height: { xs: "50vh", md: "80vh" },
        position: { md: "fixed" },
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }}
        defaultCenter={codd}
        center={coords}
        defaultZoom={15}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
        }}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
      >
        {places?.length &&
          places.map((place, i) => (
            <div
              style={{
                position: "absolute",
                transform: "translate(-50%, -70%)",
              }}
              onMouseDown={() => setChildClicked(i)}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={i}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <LocationOnIcon
                sx={{
                  color: "#321E1E",
                  ":hover": { cursor: "pointer", color: "green" },
                }}
                fontSize="large"
              />
              {/* 
              {!matches && isHovered && (
                <Paper
                  elevation={3}
                  sx={{
                    p: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "100px",
                    background: "transparent",
                    ":hover": {
                      scale: "130%",
                      cursor: "pointer",
                      background: "white",
                      zIndex: 2147483647,
                    },
                  }}
                >
                  <Typography variant="subtitle2" gutterBottom>
                    {" "}
                    {place.name}
                  </Typography>
                  <Image
                    style={{ cursor: "pointer" }}
                    src={
                      place.photo
                        ? place.photo.images.large.url
                        : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                    }
                    alt=""
                    width={80}
                    height={80}
                  />
                  <Rating
                    name="read-only"
                    size="small"
                    value={Number(place.rating)}
                    readOnly
                  />
                </Paper>
              )} */}
            </div>
          ))}
      </GoogleMapReact>
    </Box>
  );
};

export default Map;
