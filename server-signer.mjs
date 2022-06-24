import DHT from '@hyperswarm/dht'
import SerialSigner from 'serial-signer'
import { NS } from '@hyperswarm/dht/lib/constants.js'
import Persistent from '@hyperswarm/dht/lib/persistent.js'
import  NoiseWrap from '@hyperswarm/dht/lib/noise-wrap.js'
import { generateKeyPair, dh } from 'noise-curve-ed'

const signer = new SerialSigner('/dev/ttyUSB0')
await signer.ready()

const createHandshake = (keyPair, remotePublicKey) => {
	const curve = {
          dh: (pk, seck) => seck ? dh(pk, seck) : signer.dh(pk),
	  PKLEN: 32,
          ALG: 'Ed25519',
          name: 'Ed25519',
	  generateKeyPair
	}
	return new NoiseWrap(keyPair, remotePublicKey, { curve })
}

const node = new DHT()
const server = node.createServer({ createHandshake })

server.on('connection', (socket) => {
  console.log('connection')
  process.stdin.pipe(socket).pipe(process.stdout)
})

const signAnnounce = async (target, token, id, ann, sk) => {
	const signable = Persistent.annSignable(target, token, id, ann, NS.ANNOUNCE)
	const signature = await signer.sign(signable)
	return signature
}

const signUnannounce = async (target, token, id, ann) => {
	const signable = Persistent.annSignable(target, token, id, ann, NS.UNANNOUNCE)
	const signature = await signer.sign(signable)
	return signature
}


const publicKey = await signer.publicKey()
const keyPair = { publicKey }

await server.listen(keyPair, { signAnnounce, signUnannounce })
console.log(keyPair.publicKey.toString('hex'))
console.log(keyPair)
