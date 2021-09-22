import axios from "axios";

export const getPlacesData = async (type, sw, ne) => {
  try {
    // { data } should be match to the response key
    const {
      data: { data },
    } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        "x-rapidapi-key": "eec096960amsh5f380e3fc9622c5p1d01e5jsn22e8e6acdabd",
      },
    });
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

// * understand response object
