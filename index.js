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