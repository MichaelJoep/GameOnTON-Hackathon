import {io} from "socket.io-client";
import axios from "../services/api";


const socket = io(axios);

socket.on("update-score", (data) => {
    console.log("Score updated:", data);
    
});

socket.on("game-progress", (data) => {
    console.log("Game progress:", data);
});