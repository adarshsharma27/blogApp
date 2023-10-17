import { Client, Account } from "appwrite";

export const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6522d5121baf4b3c7fad"); // Replace with your project ID

export const account = new Account(client);
export { ID } from "appwrite";
