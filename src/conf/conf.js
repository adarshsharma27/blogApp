const conf ={
    appwriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
    projectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    databaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    collectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    bookMarkCollectionId:String(import.meta.env.VITE_APPWRITE_BOOKMARKCOLLECTION_ID),
    bucketId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    usersCollectionId:String(import.meta.env.VITE_APPWRITE_USERSCOLLECTION_ID),
    adminUserId:String(import.meta.env.VITE_APPWRITE_ADMINUSER_ID),
    adminUserEmail:String(import.meta.env.VITE_APPWRITE_ADMINUSER_EMAIL),
    guestUserPassword:String(import.meta.env.VITE_APPWRITE_GUESTUSER_PASSWORD),
    guestUserEmail:String(import.meta.env.VITE_APPWRITE_GUESTUSER_EMAIL),
}

export default conf