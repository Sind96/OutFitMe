const baseURL = 'http://localhost:3000';
const weatherAPIkey = import.meta.env.VITE_OPENWEATHER_API_KEY;

interface FormDataProps {
  imgURL : string,
  item: string,
  tempRange: string[],
  rain: boolean
}

interface Error {
  err: string,
}

//After cloudinary send imgURL, post image to database
const addImage = async (formData: FormDataProps) => {
  const { imgURL, item, tempRange, rain } = formData;
  try {
    const image = await fetch(`${baseURL}/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imgURL, item, tempRange, rain }),
    });

    return image;
  } catch (err) {
    console.log(`${err.message} while posting image`);
  }
};

//Get current location weather data form API
const getWeatherData = (lat: number, lon: number) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherAPIkey}&units=metric`;

  const weatherData = fetch(url)
    .then((data) => data.json())
    .catch((err) => {
      console.log(`${err.message} while fetching weather data`);
    });

  return weatherData;
};

//Get random item from database according to passed params
const getRandomItem = async (item : string, tempToday, rainToday: boolean) => {
  console.log("getRandomItem", tempToday)
  const randomItem = await fetch(
    `${baseURL}/getRandomItem/${item}/${tempToday}/${rainToday}`
  )
    .then((res) => res.json())
    .catch((err) => {
      console.log(`${err.message} while fetching random ${item}`);
    });

  return randomItem.imgURL;
};

const getAllItemsFromCat = async (item : string) => {
  const allItems = await fetch(`${baseURL}/getAllItems/${item}`)
    .then((res) => res.json())
    .catch((err) => {
      console.log(`${err.message} while all ${item}`);
    });
  return allItems;
};
export { addImage, getWeatherData, getRandomItem, getAllItemsFromCat };
