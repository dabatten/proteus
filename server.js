const IPFS = require('ipfs')
const async = require('async')
const node = new IPFS()

async.series([
	(cb) => node.on('ready', cb),
	(cb) => node.version((err, version) => {
		if (err) {
			return cb(err)
		}
		console.log('\nVersion:', version.version)
		cb()
	}),
	(cb) => node.files.add({
		path: 'hello.txt',
		content: Buffer.from('Hello world!')
	}, (err, filesAdded) => {
		if (err) {
			return cb(err)
		}
		console.log('\nAdded file:', filesAdded[0].path, filesAdded[0].hash)
		fileMultihash = filesAdded[0].hash
		cb()
	}),
	(cb) => node.files.cat(fileMultihash, (err, data) => {
		if (err) {
			return cb(err)
		}
		console.log('\nFile contents:')
		process.stdout.write(data)
	})
])
