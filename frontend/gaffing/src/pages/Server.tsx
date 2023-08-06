import { useState } from "react";
import useWebSocket from "react-use-websocket";

const socketURL = "ws://localhost:8000/ws/test";

/**
 * Server component establishes a WebSocket connection to handle real-time chat functionalities.
 * Users can send messages and view the list of received messages.
 * 
 * Example usage:
 *    <Server />
 */
export default function Server() {
  const [newMessage, setNewMessage] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  const { sendJsonMessage } = useWebSocket(socketURL, {
    onOpen: () => console.log("WebSocket connection opened successfully!"),
    onClose: () => console.log("WebSocket connection closed."),
    onError: () => console.log("An error occurred with the WebSocket connection."),
    onMessage: handleIncomingMessage,
  });

  /**
   * Handles the incoming messages from the WebSocket server.
   * 
   * @param {Object} msg - The WebSocket message event.
   * 
   * Example:
   *    Given the incoming message:
   *        {"new_message": "Hello World"}
   *    The `newMessage` state will be updated with the new message.
   */
  function handleIncomingMessage(msg: any) {
    const data = JSON.parse(msg.data); 
    setNewMessage((prev_msg) => [...prev_msg, data.new_message]);
  }

  /**
   * Updates the state variable 'message' based on the input field's content.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   * 
   * Example:
   *    If the user types "Hi" in the input field, `message` will be updated to "Hi".
   */
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  /**
   * Send the user's message to the WebSocket server.
   * 
   * Example:
   *    Given the `message` state as "Hi", upon button click, this will send:
   *        {"type": "message", "message": "Hi"} 
   *    to the server.
   */
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault(); 
    sendJsonMessage({ type: "message", message });
    setMessage(""); 
  };

  return (
    <>
      {/* Render each received message */}
      {newMessage.map((msg, index) => (
        <div key={index}>
          <p>{msg}</p>
        </div>
      ))}

      {/* Input field for the user's message */}
      <form onSubmit={handleSendMessage}>
        <label>
          Enter Message:
          <input type="text" value={message} onChange={handleMessageChange} />
        </label>
        <button type="submit">Send Message</button>
      </form>


    </>
  );
}
