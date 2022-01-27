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
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.ORBIT_API_KEY}`
        },
        
      };
      
      fetch('https://app.orbit.love/api/v1/bryan-personal/members/brob-e55bf8/identities', options)
        .then(response => response.json())
        .then(response => console.log(response.data))
        .catch(err => console.error(err));
    
}

// getMembers().then(res => console.log(res))
getMembers()