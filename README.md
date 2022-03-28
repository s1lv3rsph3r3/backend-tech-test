# Pre-requisites
You should have the following version of Node available on your system `14.17.6`

Please note that this simple API is NOT containerised.

* Clone the repository
* `npm run test` will install and run tests on project (as long as you have a suitable version of Node)
* `npm run start` will start the API on `localhost` port `3000`.

# Tech test

Thanks for your interest in joining our team! This is a quick little test which is an example of the sort of work we do here at huggg.

## Intro

We have some complex, legacy API functionality and data structures which can be awkward for our API clients and front end applications to consume. This task is to rig up some functionality for our clients.

## Specification

You have a service which returns all relevant information for our brands, which can potentially be a very large amount of information. Occassionally this information is useful (e.g. a mobile app may fetch early and cache) but for most use-cases it is too much to handle at once. Your task is to provide endpoints to access discrete pieces of information at once via HTTP GET endpoints. These should include:

- Get brand by brand-id
- Get all products for brand by brand-id
- Get all stores for a brand by brand-id
- Get all stores for a product by product-id

The data structure your service returns is provided as JSON. You should make a mock service which returns this.

## Top Tips

- Some of our brands and products are "consolidated" which means the product is available at multiple brands + stores. So a single product may belong to multiple brands, as well as its "true" parent. When returning a brand's products, these consolidated products should also be returned.
- There's no need to spend a ton of time on this, there are better things in life. If time is tight, we'd rather see one "finished" endpoint than 4 partially complete ones.
- We will be looking for tests!
- We're looking for this to be done in ES6
- We would like a change history included if possible
- Each endpoint should return as much detail as is likely to be useful for a client
