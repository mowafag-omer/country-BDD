# country-BDD
![](https://img.shields.io/badge/node.js-gray?logo=node.js)
![](https://img.shields.io/badge/mongodb-gray?logo=mongodb)
<br>
## country-BDD #1
- Reading this file (names_country.json) and enter the names of the countries (wrote in the file) inside a collection named ‘country_names’.

```js
const MongoClient = require('mongodb').MongoClient
const fs = require('fs').promises

async function myFuncntion(){
  const client = new MongoClient('mongodb://127.0.0.1:27017/', {useNewUrlParser: true, useUnifiedTopology: true})
  try {
    await client.connect()
    const collection = client.db('countries').collection('country_names')

    const json = await fs.readFile("country_names.json")
    const jdata = JSON.parse(json)

    for(let i of jdata) await collection.insertOne({name: i})

  } catch(error) {console.log(error)}
  client.close()
}

myFuncntion()
```
- index.js
<br>

## country-BDD #2

- Read ‘couingntry_names’ collection (created in country-BDD #1) and make a research for each country about all the missing information (currency, capital, timezone, region …. Etc) present on https://restcountries.eu/rest/v2/name/{nameOfCountry}. 
Store all this new data (associated with the name of the country) in a new collection named ‘country_full_data’.
```js
const MongoClient = require('mongodb').MongoClient
const fetch = require('node-fetch')

async function myFuncntion(){
  const client  = new MongoClient('mongodb://127.0.0.1:27017/')
  try {
    await client.connect()
    const db = client.db('countries')
    const countryData = await db.collection('country_full_data')
    const countryNames = await db.collection('country_names')
    const cname = await countryNames.find().toArray()

    for(let elm of cname){
      const res =  await fetch('https://restcountries.eu/rest/v2/name/' + elm.name)
      const apiData = await res.json()
      await countryData.insertOne(apiData[0])
    }
  } catch(error) {console.log(error)}
  client.close()
}

myFuncntion()
```
- app2.js
<br>

## country-BDD #3
- Creating new collections (“Europe” “Asia” “Africa” “Northern America” “Central America” “South America” “Caribbean” “Oceania” “Polar”) and store the countries inside the collection with the right continent name. 
(You could find “Europe” “Asia” “Africa” “Oceania” & “Polar” in ‘region’ field. And “Northern America” “South America” “Central America” & “Caribbean” in ‘subregion’ field).
```js
const MongoClient = require('mongodb').MongoClient
const fs = require('fs').promises

async function myFuncntion(){
  const rgn = ['Europe', 'Asia', 'Africa', 'Oceania', 'Polar']
  const sbrgn = ['Northern America', 'South America', 'Central America', 'Caribbean']
  const client  = new MongoClient('mongodb://127.0.0.1:27017/', {useNewUrlParser: true, useUnifiedTopology: true})
  try{
    await client.connect()
    const db = client.db('countries')
    const countryData = await db.collection('country_full_data')

    for(let elm of rgn){
      const byregion = await countryData.find({region: elm}).toArray()
      await db.collection(elm).insertMany(byregion)
    }

    for(let elm of sbrgn){
      const bysubregion = await countryData.find({subregion: elm}).toArray()
      await db.collection(elm).insertMany(bysubregion)
    }
  } catch(error) {console.log(error)}
  client.close()
}

myFuncntion()
```
- app3.js
