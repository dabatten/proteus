//send and receive messages

export default function chat(room) {

	/* UI DOM elements */
	var chatInput = document.querySelector('#chatInput')
	var sendButton = document.querySelector('#sendButton')


	// sendButton.addEventListener('click', () => {
	// 	room.broadcast(chatInput.value)
	// 	chatInput.value = ''
	// })

	/* Knockout View Model */
	var MessengerViewModel = function() {
		var self = this;
		self.messages = ko.observableArray([])
		self.newMessage = ko.observable();

		room.on('peer joined', (peer) => {
			room.sendTo(peer, 'Hello ' + peer + '!')
		})
		room.on('message', (message) => {
			self.messages.push('' + message.from + ': ' + message.data.toString())
		})

		//send a message
		self.sendMessage = function() {
			room.broadcast(self.newMessage())
			self.newMessage('')
		}
	}

	ko.applyBindings(new MessengerViewModel())
}
