const IPFS = require('ipfs')
const PubSub = require('ipfs-pubsub-room')

const node = new IPFS({
	repo: repo(),
	EXPERIMENTAL: {
		pubsub: true
	},
	config: {
		Addresses: {
			Swarm: [
				'/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
			]
		}
	}
})

node.once('ready', () => node.id((err, info) => {
	if (err) {
		throw err
	}
	console.log('IPFS node ready with address', info.id)

	const room = PubSub(node, 'proteus')

	room.on('peer joined', (peer) => {
		console.log('Peer joined the room:', peer)
	})
	room.on('peer left', (peer) => {
		console.log('Peer left the room:', peer)
	})

	//send and receive messages

	room.on('peer joined', (peer) => {
		room.sendTo(peer, 'Hello ' + peer + '!')
	})
	room.on('message', (message) => {
		console.log('' + message.from + ': ' + message.data.toString())
	})

	//testing -> broadcast message every 3 seconds
	setInterval(() => {
		room.broadcast('hey everyone')
	}, 3000)
}))


function repo() {
	return 'ipfs/proteus/' + Math.random()
}
