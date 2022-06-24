import DHT from '@hyperswarm/dht'

const node = new DHT()
const server = node.createServer()

server.on('connection', (socket) => {
  console.log('connection')
  process.stdin.pipe(socket).pipe(process.stdout)
})

const keyPair = DHT.keyPair()
await server.listen(keyPair)

console.log(keyPair.publicKey.toString('hex'))
console.log(keyPair)
