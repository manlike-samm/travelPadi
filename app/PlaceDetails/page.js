"use client";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Rating,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import { createContext, useRef, useLayoutEffect } from "react";

const PlaceDetails = ({ place, selected, refProp, childClicked }) => {
  if (selected && refProp) {
    if (refProp.current) {
      refProp.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={
          place?.photo
            ? place?.photo?.images?.large?.url
            : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
        }
        title={place?.name}
      />
      <CardContent sx={{ color: "#116D6E" }}>
        <Typography gutterBottom variant="h5">
          {place?.name}
        </Typography>
        <Box display="flex" justifyContent="space-between" my={2}>
          <Rating name="read-only" value={Number(place?.rating)} readOnly />
          <Typography component="legend">
            {place?.num_reviews} review{place?.num_reviews > 1 && "s"}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place?.price_level}
          </Typography>
        </Box>
        <Box display="flex" gap={"20%"} justifyContent="space-between">
          <Typography component="legend">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place?.ranking}
          </Typography>
        </Box>
        {place?.awards?.map((award) => (
          <Box
            key={award.display_name}
            display="flex"
            justifyContent="space-between"
            my={1}
            alignItems="center"
          >
            <Typography variant="subtitle2" color="textSecondary">
              {award.display_name}
            </Typography>
          </Box>
        ))}
        {place?.cuisine?.map(({ name }) => (
          <Chip
            key={name}
            size="small"
            label={name}
            sx={{ margin: "5px 5px 5px 0" }}
          />
        ))}
        {place?.address && (
          <Typography
            gutterBottom
            variant="body2"
            color="textSecondary"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "10px",
              gap: "35%",
            }}
          >
            <LocationOnIcon />
            {place?.address}
          </Typography>
        )}
        {place?.phone && (
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <PhoneIcon /> {place?.phone}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          size="small"
          sx={{ color: "#4E3636", ":hover": { backgroundColor: "#C4DFDF" } }}
          onClick={() => window.open(place?.web_url, "_blank")}
        >
          Trip Advisor
        </Button>
        <Button
          size="small"
          sx={{ color: "#4E3636", ":hover": { backgroundColor: "#C4DFDF" } }}
          onClick={() => window.open(place?.website, "_blank")}
        >
          Website
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlaceDetails;
