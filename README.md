Create a simple p2p server in a few lines

```npm i agreeable-host agreeable```

agreement.mjs
```
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

```

index.mjs

```
import { loadAgreement, host }  from 'agreeable-host'
const agreement = await loadAgreement('./agreement.mjs', import.meta.url)

const impl = {}
impl.addTwo = ({a, b}) => a + b
impl.randomName = () => 'bob'

host(agreement, impl)


```

then just run 

node index.mjs


then connect with the agreeable-ui to test it

```
pear run pear://qrxbzxyqup1egwjnrmp7fcikk31nekecn43xerq65iq3gjxiaury
```


