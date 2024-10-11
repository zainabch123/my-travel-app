import { getTravelDataDb } from "../domains/api.js";

const getTravelData = async (req, res) => {
  const searchQuery = req.query.searchQuery;
  const tripAdvisorApiKey = process.env.VITE_TRIPADVISOR_API_KEY;

  try {
    const locationsResponse = await fetch(
      `https://api.content.tripadvisor.com/api/v1/location/search?${tripAdvisorApiKey}&language=en&searchQuery=${searchQuery}`
    );
     const data = await locationsResponse.json();
     const locations = data.data;

     console.log("locations", locations);

     const fetchLocationDetails = locations.map(async (location) => {
        const imagesResponse = await fetch(
          `https://api.content.tripadvisor.com/api/v1/location/${location.location_id}/photos?${tripAdvisorApiKey}&language=en`
        );
        const imgData = await imagesResponse.json();
        const images = imgData.data;

       const detailsResponse = await fetch(
         `https://api.content.tripadvisor.com/api/v1/location/${location.location_id}/details?${tripAdvisorApiKey}`
       );
       const detailData = await detailsResponse.json();
       const details = detailData;

       console.log("details", details)
       // Merge data arrays:
       return { ...location, images, details };
     });

       const locationsWithDetails = await Promise.all(fetchLocationDetails);

    return res.status(200).json({
      data: locationsWithDetails,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export { getTravelData };
