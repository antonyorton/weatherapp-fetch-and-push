import fetchAndPush from './s3_fetch_and_push.js'
import { cities } from './fetch_weather.js'

export const handler = async event => {
  // fetch and push data for each city
  await Promise.all(cities.map(city => fetchAndPush(city.name)))

  // console.log(`Successful fetch and push to S3 on ${new Date()}`)
  const response = {
    statusCode: 200,
    body: JSON.stringify(`Successful fetch and push to S3 on ${new Date()}`)
  }
  return response
}

handler()
