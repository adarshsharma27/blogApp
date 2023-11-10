const conf ={
    appwriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
    projectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    databaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    collectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    bookMarkCollectionId:String(import.meta.env.VITE_APPWRITE_BOOKMARKCOLLECTION_ID),
    bucketId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default conf