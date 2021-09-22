import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import { LocationOnOutlined } from "@material-ui/icons";
import Rating from "@material-ui/lab/Rating";
import GoogleMapReact from "google-map-react";
import useStyles from "./styles";
//Paper = div with paper backgrouondColor
// elevation -> box shadow
export default function Map({ setCoordinates, setBounds, coordinates, places, setChildClicked }) {
  const classes = useStyles();
  //if width is greater than 600px isMobile will become false.
  const isDesktop = useMediaQuery("(min-width:600px)");
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBQwiFtHvDwNbWZYZshSKT9TUXGyV2w6nE" }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={""}
        //when you click on restaurant/hotel on map
        onChildClick={(child) => {
          setChildClicked(child);
        }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}>
        {places?.map((place, i) => (
          <div className={classes.markerContainer} lat={Number(place.latitude)} lng={Number(place.longitude)} key={i}>
            {isDesktop ? (
              <Paper elevation={3} className={classes.paper}>
                <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                  {place.name}
                </Typography>
                <img className={classes.pointer} src={place.photo ? place.photo.images.large.url : "https://source.unsplash.com/1600x900/?restaurant"} alt={place.name} />
                <Rating size="small" value={Number(place.rating)} readOnly />
              </Paper>
            ) : (
              <LocationOnOutlined color="primary" fontSize="large" />
            )}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
}

// Default Coorinaties => defaultCenter
