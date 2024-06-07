# weatherapp-fetch-and-push
An AWS lambda function setup that can be uploaded to AWS Lambda as a .zip file
## purpose
The function fetches .json files from an S3 bucket and then appends  
data from weatherapi.com and pushes the .json files back to S3  
Due to the tiny size and simple nature of the files  
they can be read and processed by an external app
