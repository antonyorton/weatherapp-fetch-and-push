# weatherapp-fetch-and-push
An AWS lambda function setup that can be uploaded to AWS Lambda as a .zip file.  
It has been tested and appears to work
## purpose
The function:
* Fetches .json files from an S3 bucket
* Appends data from weatherapi.com
* Pushes the .json files back to S3

Due to the tiny size and simple nature of the files they can be read and processed by an external app 
