import { type HandleClientError } from "@sveltejs/kit";

export const handleError: HandleClientError = async({error, event, status, message}) => {
    console.log(error, event, status, message);
    return {
        message: 'An unexpected client error has occured'
    }
}