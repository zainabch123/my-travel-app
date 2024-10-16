import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  // const hotels = await createHotels();
  // const attractions = await createAttractions();
  // const activities = await createActivities();

  process.exit(0);
}

async function createHotels() {
  const rawHotels = [
    {
      name: "Hotel Arts Barcelona",
      address: "Carrera de la Marina, 19-21, 08005 Barcelona, Spain",
      city: "Barcelona",
      country: "Spain",
      imageUrl:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/d3/5e/5f/hotel-arts-barcelona.jpg?w=700&h=-1&s=1",
      rating: 4.7,
    },
    {
      name: "W Barcelona",
      address: "Plaça de la Rosa dels Vents, 1, 08039 Barcelona, Spain",
      city: "Barcelona",
      country: "Spain",
      imageUrl:
        "https://cache.marriott.com/is/image/marriotts7prod/wh-bcnwh-w-barcelona-23882:Classic-Hor?output-quality=70&interpolation=progressive-bilinear&downsize=600px:*",
      rating: 4.6,
    },
    {
      name: "Catalonia Barcelona Plaza",
      address: "Plaza Espanya, 6-8, 08014 Barcelona, Spain",
      city: "Barcelona",
      country: "Spain",
      imageUrl:
        "https://ik.imgkit.net/3vlqs5axxjf/external/http://media.iceportal.com/40034/photos/7926450_XL.jpg?tr=w-1200%2Cfo-auto",
      rating: 4.4,
    },
    {
      name: "The Peninsula Tokyo",
      address: "1-8-1 Yurakucho, Chiyoda City, Tokyo 100-0006, Japan",
      city: "Tokyo",
      country: "Japan",
      imageUrl:
        "https://cdn.kiwicollection.com/media/property/PR005510/xl/The-Peninsula-Tokyo-005510-01-The-Lobby-Table-Set-up.jpg?cb=1463609109",
      rating: 4.8,
    },
    {
      name: "Shangri-La Hotel, Tokyo",
      address: "1-8-3 Marunouchi, Chiyoda City, Tokyo 100-8283, Japan",
      city: "Tokyo",
      country: "Japan",
      imageUrl:
        "https://ik.imgkit.net/3vlqs5axxjf/external/ik-seo/http://media.iceportal.com/73945/photos/68950259_XL/Shangri-La-Hotel-Tokyo-Exterior.jpg?tr=w-780%2Ch-437%2Cfo-auto",
      rating: 4.7,
    },
    {
      name: "Park Hyatt Tokyo",
      address: "3-7-1-2 Nishi-Shinjuku, Shinjuku City, Tokyo 163-1055, Japan",
      city: "Tokyo",
      country: "Japan",
      imageUrl:
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/425730246.jpg?k=5ba3aaa43e2f99e1a0b058d6ad3da9013e558be768ad0a0cda878cb91edd2d53&o=&hp=1",
      rating: 4.9,
    },
    {
      name: "The Ritz Paris",
      address: "15 Place Vendôme, 75001 Paris, France",
      city: "Paris",
      country: "France",
      imageUrl:
        "https://www.telegraph.co.uk/content/dam/Travel/hotels/2024/july/ritz-paris-hotel-facade-image-thumbnail.jpg",
      rating: 4.9,
    },
    {
      name: "Le Meurice",
      address: "228 Rue de Rivoli, 75001 Paris, France",
      city: "Paris",
      country: "France",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc9cYMlGrjhigSK795-Qu0BB-xzfYU0nCHTg&s",
      rating: 4.8,
    },
    {
      name: "Hôtel de Crillon",
      address: "10 Place de la Concorde, 75008 Paris, France",
      city: "Paris",
      country: "France",
      imageUrl:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/1b/3f/51/hotel-de-crillon.jpg?w=700&h=-1&s=1",
      rating: 4.7,
    },
    {
      name: "Hotel Hassler Roma",
      address: "Piazza Trinità dei Monti, 6, 00187 Roma RM, Italy",
      city: "Rome",
      country: "Italy",
      imageUrl:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/00/1f/69/villa-medici-penthouse.jpg?w=700&h=-1&s=1",
      rating: 4.9,
    },
    {
      name: "The St. Regis Rome",
      address: "3, via Vittorio Emanuele Orlando, 00185 Roma RM, Italy",
      city: "Rome",
      country: "Italy",
      imageUrl:
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/469174310.jpg?k=22c5a2d3c07f6be45f2e092a7e3b75c0f2d0bb14286e9ca273e8384d9aaa374a&o=&hp=1",
      rating: 4.8,
    },
    {
      name: "Hotel Artemide",
      address: "Via Nazionale, 22, 00184 Roma RM, Italy",
      city: "Rome",
      country: "Italy",
      imageUrl:
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/68721190.jpg?k=40ab70205edfcc5475743b4748a733b8986b828bd7ca53f0d0b157e4baa8175e&o=&hp=1",
      rating: 4.7,
    },
  ];

  const hotels = [];

  for (const rawHotel of rawHotels) {
    const hotel = await prisma.hotels.create({ data: rawHotel });
    hotels.push(hotel);
  }

  console.log("Hotels created", hotels);
  return hotels;
}

async function createAttractions() {
  const rawAttractions = [
    {
      name: "Sagrada Família",
      address: "Carrer de Mallorca, 401, 08013 Barcelona, Spain",
      city: "Barcelona",
      country: "Spain",
      imageUrl:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.viator.com%2Fen-GB%2FBarcelona-attractions%2FSagrada-Familia%2Foverview%2Fd562-a845&psig=AOvVaw0heD39YfUJc8omZEV4Uuot&ust=1727978596122000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMjSuoWk8IgDFQAAAAAdAAAAABAS",
      rating: 4.8,
    },
    {
      name: "Park Güell",
      address: "Carrer d'Olot, 5, 08024 Barcelona, Spain",
      city: "Barcelona",
      country: "Spain",
      imageUrl:
        "https://cdn1.matadornetwork.com/blogs/1/2023/05/Park-Guell-Barcelona-Spain.jpg",
      rating: 4.6,
    },
    {
      name: "Casa Batlló",
      address: "Passeig de Gràcia, 43, 08007 Barcelona, Spain",
      city: "Barcelona",
      country: "Spain",
      imageUrl:
        "https://www.danflyingsolo.com/wp-content/uploads/2023/09/Casa-Batllo.jpg",
      rating: 4.5,
    },
    {
      name: "Tokyo Tower",
      address: "4 Chome-2-8 Shibakoen, Minato City, Tokyo 105-0011, Japan",
      city: "Tokyo",
      country: "Japan",
      imageUrl:
        "https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/27/61/f1.jpg",
      rating: 4.5,
    },
    {
      name: "Senso-ji Temple",
      address: "2 Chome-3-1 Asakusa, Taito City, Tokyo 111-0032, Japan",
      city: "Tokyo",
      country: "Japan",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIu8qvs5EhLLic2aPdFFARoWNm1xAy6MK9JQ&s",
      rating: 4.7,
    },
    {
      name: "Meiji Shrine",
      address: "1-1 Yoyogikamizonocho, Shibuya City, Tokyo 151-8557, Japan",
      city: "Tokyo",
      country: "Japan",
      imageUrl:
        "https://loving-tokyo.com/en/wp-content/uploads/2020/02/meiji-jingu-shrine-main-complex-200210134821003.jpg",
      rating: 4.6,
    },
    {
      name: "Eiffel Tower",
      address: "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",
      city: "Paris",
      country: "France",
      imageUrl:
        "https://media.cntraveler.com/photos/58de89946c3567139f9b6cca/1:1/w_3633,h_3633,c_limit/GettyImages-468366251.jpg",
      rating: 4.7,
    },
    {
      name: "Louvre Museum",
      address: "Rue de Rivoli, 75001 Paris, France",
      city: "Paris",
      country: "France",
      imageUrl:
        "https://media.architecturaldigest.com/photos/5900cc370638dd3b70018b33/16:9/w_2560%2Cc_limit/Secrets%2520of%2520Louvre%25201.jpg",
      rating: 4.8,
    },
    {
      name: "Notre-Dame Cathedral",
      address: "6 Parvis Notre-Dame - Pl. Jean-Paul II, 75004 Paris, France",
      city: "Paris",
      country: "France",
      imageUrl:
        "https://cdn.britannica.com/29/255529-050-63A22A3C/notre-dame-de-paris-cathedral-paris-france.jpg",
      rating: 4.6,
    },
    {
      name: "Colosseum",
      address: "Piazza del Colosseo, 1, 00184 Roma RM, Italy",
      city: "Rome",
      country: "Italy",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/1200px-Colosseo_2020.jpg",
      rating: 4.7,
    },
    {
      name: "Vatican City",
      address: "Vatican City, 00120, Vatican City",
      city: "Rome",
      country: "Italy",
      imageUrl:
        "https://cdn-imgix.headout.com/microbrands-content-image/image/70c7e9051c3411a0653fa26b23c7bd6c-history%20of%20Vatican%20City.jpeg",
      rating: 4.9,
    },
    {
      name: "Pantheon",
      address: "Piazza della Rotonda, 00186 Roma RM, Italy",
      city: "Rome",
      country: "Italy",
      imageUrl:
        "https://static.wixstatic.com/media/e41b5c_670b7255302d44c498e3a6bc8c3e580f~mv2.jpg/v1/fill/w_700,h_466,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/e41b5c_670b7255302d44c498e3a6bc8c3e580f~mv2.jpg",
      rating: 4.8,
    },
  ];

  const attractions = [];

  for (const rawAttraction of rawAttractions) {
    const attraction = await prisma.attractions.create({ data: rawAttraction });
    attractions.push(attraction);
  }

  console.log("Attractions created", attractions);
  return attractions;
}

async function createActivities() {
  const rawActivities = [
    {
      name: "Camp Nou Stadium Tour",
      address: "Carrer de Tishchenko, 27, 08028 Barcelona, Spain",
      city: "Barcelona",
      country: "Spain",
      imageUrl:
        "https://www.fcbarcelona.com/photo-resources/2021/08/09/276ad270-e5c6-453d-8d9f-212417ad7cb3/Camp-Nou-3.jpg?width=1200&height=750",
      rating: 4.6,
    },
    {
      name: "Gothic Quarter Walking Tour",
      address: "Gothic Quarter, 08002 Barcelona, Spain",
      city: "Barcelona",
      country: "Spain",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEjqDi-tN2toSxs8fOF_9BcZfrbvhzRU1H6Q&s",
      rating: 4.7,
    },
    {
      name: "Wine Tasting Experience",
      address: "Various locations in Barcelona",
      city: "Barcelona",
      country: "Spain",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7fttvlKStGMi6o3bjpjkMrTtzXViJ5xRTJg&s",
      rating: 4.8,
    },
    {
      name: "Tsukiji Outer Market Tour",
      address: "5 Chome-2-1 Tsukiji, Chuo City, Tokyo 104-0045, Japan",
      city: "Tokyo",
      country: "Japan",
      imageUrl:
        "https://static01.nyt.com/images/2015/11/15/travel/15TOKYO1/15TOKYO1-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
      rating: 4.6,
    },
    {
      name: "Robot Restaurant Show",
      address: "1 Chome-7-1 Kabukicho, Shinjuku City, Tokyo 160-0021, Japan",
      city: "Tokyo",
      country: "Japan",
      imageUrl: "https://www.hot-dinners.com/images/champagnerobot1.jpg",
      rating: 4.4,
    },
    {
      name: "Sumida River Cruise",
      address: "Asakusa, Taito City, Tokyo 111-0032, Japan",
      city: "Tokyo",
      country: "Japan",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmeE3a7hVO3OZ9bg-RBXbkGTfXAEt7R4UWVA&s",
      rating: 4.5,
    },
    {
      name: "Seine River Dinner Cruise",
      address: "Port de la Bourdonnais, 75007 Paris, France",
      city: "Paris",
      country: "France",
      imageUrl: "https://media.timeout.com/images/105347952/image.jpg",
      rating: 4.5,
    },
    {
      name: "Versailles Palace Tour",
      address: "Place d'Armes, 78000 Versailles, France",
      city: "Paris",
      country: "France",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPVCW1MU39TlhfbhfvSUkSX0cCdLOwO4hsQw&s",
      rating: 4.6,
    },
    {
      name: "Montmartre Walking Tour",
      address: "Place du Tertre, 75018 Paris, France",
      city: "Paris",
      country: "France",
      imageUrl:
        "https://blushrougette.com/wp-content/uploads/2021/07/sacre-coeur-basilica-paris.jpg",
      rating: 4.7,
    },
    {
      name: "Rome Walking Tour",
      address: "Various locations in Rome",
      city: "Rome",
      country: "Italy",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0sTQtKKgaiC6HyNGERcADqod-B5Cf9cUr1A&s",
      rating: 4.8,
    },
    {
      name: "Trastevere Food Tour",
      address: "Trastevere, 00153 Roma RM, Italy",
      city: "Rome",
      country: "Italy",
      imageUrl:
        "https://media.tacdn.com/media/attractions-splice-spp-674x446/12/65/4c/6c.jpg",
      rating: 4.9,
    },
    {
      name: "Vatican Museums Tour",
      address: "Viale Vaticano, 00165 Roma RM, Italy",
      city: "Rome",
      country: "Italy",
      imageUrl:
        "https://www.walksofitaly.com/blog/wp-content/uploads/2021/06/7-Rome_Pristine-Sistine-High-Res-0004-1.jpg",
      rating: 4.7,
    },
  ];

  const activities = [];

  for (const rawActivity of rawActivities) {
    const activity = await prisma.activities.create({ data: rawActivity });
    activities.push(activity);
  }

  console.log("Activity created", activities);
  return activities;
}

seed()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  })
  .finally(() => process.exit(1));
