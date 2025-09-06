import { useState } from "react";
import "./App.css";

const chatList = [
	{
		id: 1,
		name: "PrimeNest Partners",
		subtitle: "Real Estate Agent",
		unread: 1,
		avatar: "https://randomuser.me/api/portraits/women/44.jpg",
	},
	{
		id: 2,
		name: "TruNest Realty",
		subtitle: "Real Estate Agent",
		unread: 0,
		avatar: "https://randomuser.me/api/portraits/men/45.jpg",
	},
	{
		id: 3,
		name: "OpalStone Realtors",
		subtitle: "Real Estate Agent",
		unread: 3,
		avatar: "https://randomuser.me/api/portraits/men/46.jpg",
	},
	{
		id: 4,
		name: "CozyNest Property",
		subtitle: "Real Estate Agent",
		unread: 8,
		avatar: "https://randomuser.me/api/portraits/women/47.jpg",
	},
	{
		id: 5,
		name: "Verity Homes",
		subtitle: "Real Estate Agent",
		unread: 0,
		avatar: "https://randomuser.me/api/portraits/men/48.jpg",
	},
];

// Initial messages per chat (keyed by chat id)
const initialMessages = {
	1: [
		{
			id: 1,
			sender: "me",
			text: "Hi, I'm looking for a 2-bedroom rental home in a quiet neighborhood. Do you have any available listings?",
			time: "8:30 PM",
			avatar: "https://randomuser.me/api/portraits/women/44.jpg",
		},
		{
			id: 2,
			sender: "agent",
			text: "Hello! Yes, we have several options that might suit you. Are you looking for any specific features like a garden, garage, or proximity to certain areas?",
			time: "8:35 PM",
			avatar: "https://randomuser.me/api/portraits/men/45.jpg",
		},
	],
	2: [],
	3: [],
	4: [],
	5: [],
};

function getCurrentTime() {
	const now = new Date();
	let hours = now.getHours();
	const minutes = now.getMinutes();
	const ampm = hours >= 12 ? "PM" : "AM";
	hours = hours % 12 || 12;
	return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
}

export default function App() {
	const [selectedChat, setSelectedChat] = useState(chatList[0]);
	const [messages, setMessages] = useState(initialMessages);
	const [input, setInput] = useState("");

	const handleSend = (e) => {
		e.preventDefault();
		if (!input.trim()) return;
		const newMsg = {
			id: Date.now(),
			sender: "me",
			text: input,
			time: getCurrentTime(),
			avatar: selectedChat.avatar,
		};
		setMessages((prev) => ({
			...prev,
			[selectedChat.id]: [...(prev[selectedChat.id] || []), newMsg],
		}));
		setInput("");
	};

	return (
		<div className="flex h-screen bg-gray-100">
			{/* Chat List */}
			<div className="w-full max-w-xs bg-white border-r flex flex-col">
				<div className="p-4 border-b flex items-center justify-center font-semibold text-lg">
					Chat
				</div>
				<div className="flex-1 overflow-y-auto">
					{chatList.map((chat) => (
						<div
							key={chat.id}
							className={`flex items-center px-4 py-3 cursor-pointer hover:bg-gray-100 ${
								selectedChat.id === chat.id ? "bg-gray-100" : ""
							}`}
							onClick={() => setSelectedChat(chat)}
						>
							<img
								src={chat.avatar}
								alt={chat.name}
								className="w-10 h-10 rounded-full object-cover"
							/>
							<div className="ml-3 flex-1">
								<div className="font-medium">{chat.name}</div>
								<div className="text-xs text-gray-500">
									{chat.subtitle}
								</div>
							</div>
							{chat.unread > 0 && (
								<span className="ml-2 bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
									{String(chat.unread).padStart(2, "0")}
								</span>
							)}
						</div>
					))}
				</div>
				{/* Bottom Navigation */}
				<div className="flex justify-around items-center border-t p-2 bg-white">
					<button className="flex flex-col items-center text-gray-400 hover:text-blue-500">
						<span className="material-icons">home</span>
						<span className="text-xs">Home</span>
					</button>
					<button className="flex flex-col items-center text-gray-400 hover:text-blue-500">
						<span className="material-icons">location_on</span>
						<span className="text-xs">Locations</span>
					</button>
					<button className="flex flex-col items-center text-blue-500">
						<span className="material-icons">chat</span>
						<span className="text-xs">Chat</span>
					</button>
					<button className="flex flex-col items-center text-gray-400 hover:text-blue-500">
						<span className="material-icons">settings</span>
						<span className="text-xs">Settings</span>
					</button>
				</div>
			</div>

			{/* Chat Window */}
			<div className="flex-1 flex flex-col">
				{/* Header */}
				<div className="flex items-center px-4 py-3 border-b bg-white">
					<button className="mr-3 text-gray-500 hover:text-blue-500">
						<span className="material-icons">arrow_back</span>
					</button>
					<img
						src={selectedChat.avatar}
						alt={selectedChat.name}
						className="w-10 h-10 rounded-full object-cover"
					/>
					<div className="ml-3 flex-1">
						<div className="font-medium">{selectedChat.name}</div>
						<div className="text-xs text-gray-500">
							{selectedChat.subtitle}
						</div>
					</div>
					<button className="text-gray-500 hover:text-blue-500">
						<span className="material-icons">call</span>
					</button>
				</div>
				{/* Messages */}
				<div className="flex-1 overflow-y-auto px-4 py-6 bg-gray-50">
					{(messages[selectedChat.id] || []).map((msg) => (
						<div
							key={msg.id}
							className={`flex mb-4 ${
								msg.sender === "me" ? "justify-end" : "justify-start"
							}`}
						>
							{msg.sender !== "me" && (
								<img
									src={selectedChat.avatar}
									alt=""
									className="w-8 h-8 rounded-full mr-2 self-end"
								/>
							)}
							<div>
								<div
									className={`px-4 py-2 rounded-2xl max-w-xs ${
										msg.sender === "me"
											? "bg-blue-500 text-white rounded-br-none"
											: "bg-white text-gray-800 rounded-bl-none border"
									}`}
								>
									{msg.text}
								</div>
								<div
									className={`text-xs mt-1 ${
										msg.sender === "me"
											? "text-right text-gray-400"
											: "text-left text-gray-400"
									}`}
								>
									{msg.time}
								</div>
							</div>
							{msg.sender === "me" && (
								<img
									src={selectedChat.avatar}
									alt=""
									className="w-8 h-8 rounded-full ml-2 self-end"
								/>
							)}
						</div>
					))}
				</div>
				{/* Input */}
				<form
					className="flex items-center px-4 py-3 border-t bg-white"
					onSubmit={handleSend}
				>
					<input
						className="flex-1 border rounded-full px-4 py-2 mr-2 outline-none focus:ring-2 focus:ring-blue-200"
						type="text"
						placeholder="Type your message..."
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<button
						type="submit"
						className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600"
					>
						<span className="material-icons">send</span>
					</button>
				</form>
			</div>
		</div>
	);
}
