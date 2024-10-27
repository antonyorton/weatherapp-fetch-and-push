//a module to fetch the current time from an API and push it to an S3 bucket
//the data will be appended to an existing JSON file in the S3 bucket
//this will be done periodically at a specified interval via AWS Lambda

import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { config } from 'dotenv'
config()
import { fetchWeatherData, cities } from './fetch_weather.js'

const WEATHERAPI_API_KEY = process.env.WEATHERAPI_API_KEY
const OBJECT_KEY_FOLDER = 'weather-data/' //folder in S3 bucket to store weather data eg 'weather-data/'

// create an S3 client
const s3Client = new S3Client({
  region: process.env.MY_AWS_REGION,
  credentials: {
    accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY
  }
})

//function to push data to S3 bucket
async function pushToS3(data, objectKey) {
  try {
    // create a PutObjectCommand to upload data to S3 bucket
    const command = new PutObjectCommand({
      Bucket: process.env.MY_AWS_BUCKET_NAME,
      Key: objectKey,
      Body: JSON.stringify(data, null, 2)
    })

    // execute the command
    const response = await s3Client.send(command)
    // console.log('Data pushed to S3 successfully:', data[data.length - 1])
  } catch (error) {
    console.error('Error pushing data to S3:', error)
  }
}

//fetch data from S3
const fetchFromS3 = async objectKey => {
  try {
    const response = await s3Client.send(
      new GetObjectCommand({
        Bucket: process.env.MY_AWS_BUCKET_NAME,
        Key: objectKey
      })
    )
    const data = JSON.parse(await streamToString(response.Body))
    // console.log('Data fetched from S3:', data[data.length - 1])
    return data
  } catch (error) {
    console.error('Error fetching data from S3:', error)
    return []
  }
}

//async function to fetch data and then, for a given s3 key, to load, append and push back to S3
const fetchAndPush = async city => {
  console.log('updating data for:', city)
  const objectKey = cityToObjectKey(city)
  const data = await fetchWeatherData(WEATHERAPI_API_KEY, city)
  const existingData = await fetchFromS3(objectKey)

  // ****** updated 2024-10-27 with specified number of points to keep
  const number_to_keep = -7 * 24 // must be negative since dates are increasing
  const updatedData = [...existingData.slice(number_to_keep), data]
  // ******

  pushToS3(updatedData, objectKey)
}

//helper function to convert stream to string
function streamToString(stream) {
  return new Promise((resolve, reject) => {
    const chunks = []
    stream.on('data', chunk => chunks.push(chunk))
    stream.on('error', reject)
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
  })
}

//convert city name eg New York to objectKey eg new-york.json
const cityToObjectKey = city => {
  let objectKey = city
    .split(' ')
    .map(word => word.toLowerCase())
    .join('-')
  return OBJECT_KEY_FOLDER + objectKey + '.json'
}

export default fetchAndPush

//fetch and push data for all cities once
// cities.forEach(city => {
//   fetchAndPush(city.name)
// })

//fetch and push once every 15 seconds for all cities
// cities.forEach(city => {
//   fetchAndPush(city.name)
//   setInterval(() => fetchAndPush(city.name), 15000)
// })

// testing of fetch and push function for city='Santiago'
// fetchAndPush('Santiago')

// //test cityToObjectKey function
// console.log(cityToObjectKey('Sydney')) //sydney.json
// console.log(cityToObjectKey('New York')) //new-york.json
