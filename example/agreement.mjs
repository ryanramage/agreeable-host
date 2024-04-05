import { z, params } from 'agreeable'

const api = { 
  role: 'testthisout', 
  version: '1.0.0',
  description: 'a simple example api',
  routes: {}
}
export default api 

const userId = z.string().describe('your user id')
const authToken = z.string().describe('your api key for this service')
const headers = { userId, authToken }

api.routes.addTwo = params({a: z.number(), b: z.number()})
  .returns(z.number())
  .headers(headers)

api.routes.randomName = params().returns(z.string().describe('a random name'))
