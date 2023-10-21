import { Client, Account,Databases,Storage} from "appwrite";
import conf from "./conf/conf";

export const client = new Client();
client
  .setEndpoint(conf.appwriteUrl)
  .setProject(conf.projectId); // Replace with your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { ID , Query } from "appwrite";
