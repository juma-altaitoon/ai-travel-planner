import React from "react";
import Axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_API_URL;

const create = async() => {
    await Axios.get(BACKEND_URL+"/chat/create", { withCredentials: true })
        .then((response) =>{
            return response.data.sessionId
        })
        .catch((error) => {
            console.error("Error creating chat session: ", error)
        })
}


export default function ChatPage({ sessionId = null }) {
    return (

    )
}