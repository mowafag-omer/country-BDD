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
      const rgnCollection = await db.collection(elm)
      await rgnCollection.insertMany(byregion)
    }

    for(let elm of sbrgn){
      const bysubregion = await countryData.find({subregion: elm}).toArray()
      const SubCollection = await db.collection(elm)
      await SubCollection.insertMany(bysubregion)
    }
  } catch(error) {console.log(error)}
  client.close()
}

myFuncntion()