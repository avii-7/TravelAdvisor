import { CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import { createRef, useEffect, useState } from "react";
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import useStyles from "./styles";

export default function List({ places, childClicked, loading, type, setType, rating, setRating }) {
  const classes = useStyles();
  const [elRef, setElRef] = useState([]);

  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, i) => elRef[i] || createRef());
    setElRef(refs);
  }, [places]);

  return (
    <div className={classes.container}>
      <Typography variant="h5">Restaurant, Hotels and Attractions around you.</Typography>
      {loading ? (
        <div className={classes.loading}>
          <CircularProgress size={5} />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}>
              <MenuItem value="restaurants">Restaurant</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Rating</InputLabel>
            <Select
              value={rating}
              onChange={(e) => {
                setRating(e.target.value);
              }}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, i) => (
              <Grid item key={i} xs={12}>
                <PlaceDetails place={place} selected={Number(childClicked) === i} refProp={elRef[i]} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
}

// * grid spacing
