export default function chat(room) {

	/* UI DOM elements */
	var chatInput = document.querySelector('#chatInput')
	var sendButton = document.querySelector('#sendButton')



	//send and receive messages

	room.on('peer joined', (peer) => {
		room.sendTo(peer, 'Hello ' + peer + '!')
	})
	room.on('message', (message) => {
		console.log('' + message.from + ': ' + message.data.toString())
	})

	sendButton.addEventListener('click', () => {
		room.broadcast(chatInput.value)
		chatInput.value = ''
	})

	// var MessengerViewModel = function(room) {
	// 	this.messages = ko.observableArray([]);
	// }

}
