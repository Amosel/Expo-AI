import axios from 'axios'
import { Params } from './types'

// TODO: axios interceptors:
// //Log
// process.env.NODE_ENV === 'development' && console.log("API: Message Send", { uri, params });

// TODO: pass this var
// const uri = 'https://convo-q2ifyofooa-uc.a.run.app'
// const uri = "http://127.0.0.1:5001/aiexpert-yes/us-central1/convo";   //Simulated

// Note: Assuming you've configured Axios instance elsewhere with interceptors, that will add the BEARER and the apiKey in the parameters
// Note: Assuming you've configured Axios instance elsewhere with interceptors

export async function sendGPTMessages(params: Params, uri: string) {
  return axios
    .post(uri, {
      ...params,
      messages: JSON.stringify(params.messages),
    })
    .then(response => response.data)
}
