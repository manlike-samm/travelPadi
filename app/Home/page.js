"use client";
import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@mui/material";
import Header from "../Header/page";
import List from "../List/page";
import Map from "../Map/page";
import useSWR from "swr";

export default function Home() {
  const [places, setPlaces] = useState([]);

  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");

  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);

  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [autocomplete, setAutocomplete] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  let isLoading = false;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });
  };

  const fetcher = (url) =>
    fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      return res.json();
    });

  const { data, error, mutate } = useSWR(
    bounds !== null
      ? `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary?bl_latitude=${bounds?.sw?.lat}&bl_longitude=${bounds?.sw?.lng}&tr_longitude=${bounds?.ne?.lng}&tr_latitude=${bounds?.ne?.lat}&limit=30`
      : null,
    fetcher
  );

  useEffect(() => {
    mutate(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary?bl_latitude=${bounds?.sw?.lat}&bl_longitude=${bounds?.sw?.lng}&tr_longitude=${bounds?.ne?.lng}&tr_latitude=${bounds?.ne?.lat}&limit=30`
    );
  }, [type, bounds]);

  // console.log(bounds);

  useEffect(() => {
    setPlaces(data?.data);
  }, [data]);

  useEffect(() => {
    const filtered = places?.filter((place) => Number(place.rating) > rating);

    setFilteredPlaces(filtered);
  }, [rating]);

  if (!data?.data) {
    isLoading = true;
  }

  return (
    <>
      <CssBaseline />
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
      <Grid container sx={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            isLoading={isLoading}
            childClicked={childClicked}
            places={filteredPlaces?.length ? filteredPlaces : places}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Map
            setChildClicked={setChildClicked}
            setBounds={setBounds}
            setCoords={setCoords}
            coords={coords}
            places={filteredPlaces?.length ? filteredPlaces : places}
          />
        </Grid>
      </Grid>
    </>
  );
}
