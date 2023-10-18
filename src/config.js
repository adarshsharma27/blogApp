import { Client, Account,Databases} from "appwrite";

export const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6522d5121baf4b3c7fad"); // Replace with your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export { ID , Query } from "appwrite";
