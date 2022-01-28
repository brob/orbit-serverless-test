require('dotenv').config()
const fetch = require('node-fetch').default

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event) => {
  try {
    const subject = event.queryStringParameters.subject || "world";
    const { url } = event.queryStringParameters
    const urlFragments = url.split('https://twitter.com/')
    
    if (urlFragments && urlFragments.length == 1) return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Not a valid Twitter URL'
      })
    }
    

    const username = `@${urlFragments[1]}`
    console.log(username)

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.ORBIT_API_KEY}`
      },
      body: JSON.stringify({
        identity: {
          source: 'twitter',
          username: `${username}`
        },
        member: {
          tags_to_add: ['added:follow-up']
        }
      })
    };
    // TODO Send a request to the Orbit API to create or update member
    const response = await fetch(`https://app.orbit.love/api/v1/bryan-personal/members`, options)
    const json = await response.json()
    const member = json.data
    const { id, attributes } = member
    const { name } = attributes
    console.log(json)
    const successMessage = `Successfully added ${name} to the Orbit member list with id of ${id}`
      

    return {
      statusCode: 200,
      body: successMessage,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
