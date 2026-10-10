# ChatWave

A real-time chat application built using React Native, Node.js,
Express.js, Socket.io and MongoDB.

## Features

- Real-time messaging
- Chat history
- Message timestamps
- Username-based login
- Typing indicator
- Online/offline events
- MongoDB message storage
- REST APIs
- Socket.io communication

## Tech Stack

Frontend:
- React Native
- Expo

Backend:
- Node.js
- Express.js
- Socket.io

Database:
- MongoDB

## Project Structure

...

## Backend Setup

cd backend

npm install

Create .env:

PORT=5000
MONGO_URI=your_mongodb_connection_string

Run:

npm run dev

## Frontend Setup

cd frontend

npm install

Update backend IP address in:

services/api.js
services/socket.js

Run:

npx expo start

## REST APIs

GET /api/messages

POST /api/messages

## Socket Events

...

## Design Decisions

REST APIs are used for HTTP-based operations and retrieving
chat history.

Socket.io is used for real-time communication.

MongoDB is used to persist messages so that chat history
remains available after refreshing the application.

## Assumptions

This project uses dummy username-based authentication because
full authentication was not required for the assessment.

The application is designed as a single chat room.

## Future Improvements

- JWT authentication
- Private chats
- Message read receipts
- Message deletion
- Push notifications
- User profiles


##

GET /api/messages

[
  {
    "_id": "123",
    "username": "Simran",
    "text": "Hello",
    "createdAt": "2026-08-09T12:00:00.000Z"
  }
]

POST /api/messages

{
  "username": "Simran",
  "text": "Hello"
}

Client → Server

join
sendMessage
typing
stopTyping


Server → Client

receiveMessage
userTyping
userStopTyping
userOnline
userOffline
messageError

