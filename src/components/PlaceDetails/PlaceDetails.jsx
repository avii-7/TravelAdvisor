import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from "@material-ui/core";
import { Phone } from "@material-ui/icons";
import LocationOn from "@material-ui/icons/LocationOn";
import Rating from "@material-ui/lab/Rating";
import useStyles from "./styles";

// elevation => Nice Shadow Effect

export default function PlaceDetails({ place, selected, refProp }) {
  const classes = useStyles();

  if (selected) refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <Card elevation={6}>
      <CardMedia style={{ height: 350 }} image={place.photo ? place.photo.images.large.url : "https://source.unsplash.com/1600x900/?restaurant"} title={place.name} />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {place.name}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Rating value={Number(place.rating)} readOnly />
          <Typography gutterBottom variant="subtitle1">
            Out of {place.num_reviews} review
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.price_level}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.ranking}
          </Typography>
        </Box>
        {place?.awards?.map((key, award) => (
          <Box my={1} display="flex" justifyContent="space-between" alignItems="center" key={key}>
            <img src={award?.images?.small} alt="award.display_name" />
            <Typography variant="subtitle2" color="textSecondary">
              {award.display_name}
            </Typography>
          </Box>
        ))}
        <div>
          {place?.cuisine?.map(({ key, name }) => (
            <Chip key={key} size="small" label={name} className={classes.chip} />
          ))}
        </div>
        {place?.address && (
          <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
            <LocationOn />
            {place.address}
          </Typography>
        )}
        {place.phone && (
          <Typography color="textSecondary" variant="body2" className={classes.spacing}>
            <Phone /> {place.phone}
          </Typography>
        )}
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              window.open(place.web_url, "_blank");
            }}>
            Trip Advisor
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              window.open(place.website, "_blank");
            }}>
            Website
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}

// Address Align Left
