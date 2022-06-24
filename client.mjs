import DHT from '@hyperswarm/dht'

const pk = Buffer.from(process.argv[2], 'hex')

const node = new DHT()
const socket = node.connect(pk)

socket.on('open', function () {
  process.stdin.pipe(socket).pipe(process.stdout)
})

