const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// get dotenv
require('dotenv').config();
// initialize axios
const axios = require('axios');


// initialize the orbit member client
const OrbitMembers = require('@orbit-love/members')
const orbitMembers = new OrbitMembers(process.env.ORBIT_WORKSPACE, process.env.ORBIT_API_KEY)


// get the list of members
async function getMembers() {
    // const query = { source: 'twitter', username: '@brob' }
    // const members = await orbitMembers.findMember(query)
    // return members
    // const options = {
    //     method: 'GET',
    //     headers: {Accept: 'application/json', Authorization: 'Bearer ob_yRuDjKGJUDxzCaqfLZHx'}
    //   };
      
    const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.ORBIT_API_KEY}`
        },
        body: JSON.stringify({
          member: {email: 'bryanlrobinson@gmail.com', title: "King of the world"},
          identity: {source: 'twitter', username: '@brob'},
          identity: {source: 'linkedin', username: 'bryanlrobinson'},
        })
      };
      
      fetch('https://app.orbit.love/api/v1/bryan-personal/members', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
    
}

// getMembers().then(res => console.log(res))
getMembers()