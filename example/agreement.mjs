import { z, params } from 'agreeable'

const api = { 
  role: 'testthisout', 
  version: '1.0.0',
  description: 'a simple example api',
  routes: {}
}
export default api 

api.routes.addTwo = params({a: z.number(), b: z.number()}).returns(z.number())
api.routes.randomName = params().returns(z.string().describe('a random name'))
