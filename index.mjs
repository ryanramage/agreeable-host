import b4a from 'b4a'
import DHT from 'hyperdht'
import Protomux from 'protomux'
import Channel from 'jsonrpc-mux'
import { enact } from 'agreeable'
export { loadAgreement } from 'agreeable'

export  async function host (implementation, agreement, { seed, validator, dhtOpts } ) {
  const dht = new DHT(dhtOpts)
  const seedBuf =  seed ? b4a.from(seed, 'hex') : null
  const keyPair = DHT.keyPair(seedBuf)
  const connect = c => enact(new Channel(new Protomux(c)), agreement, implementation, validator)
  const server = dht.createServer(connect)

  await server.listen(keyPair)
  console.log('listening on:', b4a.toString(keyPair.publicKey, 'hex'))
  return { dht, keyPair, server }
}

export function seedFromArgv () {
  let seed = null
  if (global.Bare) seed = Bare.argv[2]
  else seed = process.argv[2]
  return seed
}


