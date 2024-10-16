import { getTravelDataDb } from "../domains/api.js";

const getTravelData = async (req, res) => {
  const searchQuery = req.query.searchQuery;
  const category = req.query.category;
  const tripAdvisorApiKey = process.env.VITE_TRIPADVISOR_API_KEY;

  try {
    
    const locationsResponse = await fetch(
      `https://api.content.tripadvisor.com/api/v1/location/search?${tripAdvisorApiKey}&language=en&searchQuery=${searchQuery}&category=${category}`
    );
     const data = await locationsResponse.json();
     const locations = data.data;

     const fetchLocationDetails = locations.map(async (location) => {
      const detailsResponse = await fetch(
        `https://api.content.tripadvisor.com/api/v1/location/${location.location_id}/details?${tripAdvisorApiKey}`
      );
      const detailData = await detailsResponse.json();
      const description = detailData.description;
      const rating  = detailData.rating;
      const category = detailData.category;

        const imagesResponse = await fetch(
          `https://api.content.tripadvisor.com/api/v1/location/${location.location_id}/photos?${tripAdvisorApiKey}&language=en`
        );
        const imgData = await imagesResponse.json();
        const images = imgData.data;

        console.log(images)

       // Merge data arrays:
       return { ...location, description, rating, category, images };
     });

       const locationsWithDetails = await Promise.all(fetchLocationDetails);

    return res.status(200).json({
      data: locationsWithDetails,
    });
  } catch (error) {
    console.log("error", error);
     return res.status(500).json({ error: "Unable to fetch travel data." });
  }
};

export { getTravelData };
