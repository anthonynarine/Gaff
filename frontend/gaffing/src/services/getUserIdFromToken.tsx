export const getUserIdFromToken = (access: string) => {
    const token = access
    // Split the JWT token into its three constituent parts: Header, Payload, and Signature.
    const tokenParts = token.split(".");

    // Extract the Payload part of the token.
    const encodePayLoad = tokenParts[1];

    // Decode the Payload from Base64URL format to a regular string.
    // 'atob' is a built-in function in browsers that decodes a base64 encoded string.
    const decodedPayLoad = atob(encodePayLoad);

    // Parse the decoded payload string into a JavaScript object.
    // Since payload is a JSON string, we use JSON.parse to convert it into an object.
    const payLoadData = JSON.parse(decodedPayLoad);

    // Extract the userId from the payload object.
    const userId = payLoadData.user_id;

    // Return the extracted userId. (This was missing in the original code)
    return userId;
};






{/*                     Explanation
JWT (JSON Web Tokens):

This code is designed to work with JSON Web Tokens
(JWT). JWTs are compact, URL-safe means of representing 
claims to be transferred between two parties. They are 
typically used for authentication and authorization purposes.

JWT Structure:
A JWT typically consists of three parts separated by dots (.), which are:

Header: Contains token type and the algorithm used.
Payload: Contains the claims or the pieces of data you want to store in the token.
Signature: Verifies that the sender of the JWT is who it says it is and 
ensures that the message wasn't changed along the way.

The Function:
The function, getUserIdFromToken, takes a JWT token as an argument 
and aims to extract the user_id from the payload.*/
}