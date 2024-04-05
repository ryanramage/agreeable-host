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

api.routes.addTwo = params({a: z.number(), b: z.number()}).returns(z.number())
api.routes.randomName = params().returns(z.string().describe('a random name'))

```

index.mjs

```
import { loadAgreement, host }  from 'agreeable-host'
host(await loadAgreement('./agreement.mjs', import.meta.url), {
  addTwo: ({a, b}) => a + b,
  randomName: () => 'bob'
})

```

then just run 

```
node index.mjs
listening on: a406ea1579687011e96943d7b9bcde9a3e17809dc3fdb07edc0cb7569329ee3a
```

the services key is output and then connect with the agreeable-ui to test it

```
pear run pear://qrxbzxyqup1egwjnrmp7fcikk31nekecn43xerq65iq3gjxiaury/a406ea1579687011e96943d7b9bcde9a3e17809dc3fdb07edc0cb7569329ee3a
```


To call this host from a client proxy , the current way is as follows (using the same agreement file)

client.mjs
```
import agreement from './agreement.mjs';
import { proxy } from 'agreeable'
import b4a from 'b4a'
import DHT from 'hyperdht'
import Protomux from 'protomux'
import Channel from 'jsonrpc-mux'

const peerKey = process.argv[2] // the service peer key from above

const node = new DHT()
const publicKey = b4a.from(peerKey, 'hex')
const conn = node.connect(publicKey)
const framed = new Channel(new Protomux(conn))


const setHeaders = () => ({  userId: 'bob', authToken: 'test'})
const client = proxy(framed, agreement, setHeaders)
const result = await client.addTwo({a: 3, b: 4})
console.log(result)

node.destroy()

```

then run

```
node client.mjs a406ea1579687011e96943d7b9bcde9a3e17809dc3fdb07edc0cb7569329ee3a
```

