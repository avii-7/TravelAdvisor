import "./App.css";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlacesData } from "./api";
import { useEffect, useState } from "react";

// CSSBaseLine Fix Some Padding, Margin and BackgroundColor
// if we have two useEffects which will run first?
function App() {
  const [places, setPlaces] = useState(null);
  const [coordinates, setCoordinates] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [bounds, setBounds] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      if (latitude !== undefined && longitude !== undefined) setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    if (bounds) {
      setLoading(true);
      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        setPlaces(data);
        setFilteredPlaces([]);
        setLoading(false);
      });
    }
  }, [type, coordinates, bounds]);

  useEffect(() => {
    const filteredPlaces = places?.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          {places && (
            <List
              loading={loading}
              places={filteredPlaces !== undefined && filteredPlaces.length !== 0 ? filteredPlaces : places}
              childClicked={childClicked}
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating}
            />
          )}
          {/* {console.log(places)} */}
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces !== undefined && filteredPlaces.length !== 0 ? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
