"use client";
import { useState, useEffect, createRef } from "react";
import {
  CircularProgress,
  Box,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

import PlaceDetails from "../PlaceDetails/page";

const List = ({
  places,
  type,
  setType,
  rating,
  setRating,
  childClicked,
  isLoading,
}) => {
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    setElRefs((refs) =>
      Array(places?.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [places]);

  return (
    <Box
      sx={{
        p: "25px",
        color: "#116D6E",
        marginTop: { xs: "14vw", md: "10vw" },
        marginX: { xs: 0, sm: "3vw", md: 0 },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontFamily: "monospace",
          fontSize: { xs: "14px", sm: "32px", xl: "40px" },
          textAlign: "center",
        }}
      >
        Food & Dining around you
      </Typography>
      {isLoading ? (
        <Box
          sx={{
            height: "600px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size="5rem" />
        </Box>
      ) : (
        <>
          <FormControl sx={{ m: 2, minWidth: 120, mb: "30px" }}>
            <InputLabel id="type">Type</InputLabel>
            <Select
              id="type"
              value={type}
              label="Type"
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 2, minWidth: 120, mb: "30px" }}>
            <InputLabel id="rating">Rating</InputLabel>
            <Select
              id="rating"
              value={rating}
              label="Rating"
              onChange={(e) => setRating(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="3">Above 3.0</MenuItem>
              <MenuItem value="4">Above 4.0</MenuItem>
              <MenuItem value="4.5">Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid
            container
            spacing={3}
            sx={{
              height: "75vh",
              overflow: "auto",
            }}
          >
            {places?.map((place, i) => (
              <Grid ref={elRefs[i]} key={i} item xs={12} sx={{ margin: 2 }}>
                <PlaceDetails
                  selected={childClicked === i}
                  refProp={elRefs[i]}
                  place={place}
                  childClicked={childClicked}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default List;
