const IPFS = require('ipfs')
const PubSub = require('ipfs-pubsub-room')

import Chat from './chat.js';

/* Setup IPFS node */
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

	Chat(room);
}))

function repo() {
	return 'ipfs/proteus/' + Math.random()
}
