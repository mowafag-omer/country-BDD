const MongoClient = require('mongodb').MongoClient
const fetch = require('node-fetch')

async function myFuncntion(){
  const client  = new MongoClient('mongodb://127.0.0.1:27017/', {useNewUrlParser: true, useUnifiedTopology: true})
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