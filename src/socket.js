import { io } from 'socket.io-client';
const apiUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:7070'

export const socket = io(apiUrl,{
    autoConnect: false,
}) 