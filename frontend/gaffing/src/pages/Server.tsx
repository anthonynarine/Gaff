import useWebSocket from "react-use-websocket";

const socketURL = "ws://localhost:8000/ws/test";

export default function Server() {

    const {} = useWebSocket(socketURL, {
        onOpen: () => {
            console.log("Connected!")
        },
        onClose: () => {
            console.log("Closed!")
        },
        onError: () => {
            console.log("Error!")
        }
    });

    return (
        <>
         <h1>Chat server page under construction</h1>
        </>
    );
}

