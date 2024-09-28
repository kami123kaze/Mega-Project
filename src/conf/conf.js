const conf = {
    appwriteUrl           : String(import.meta.env.VITE_APPWRITE_URL),               // Correct
    appwriteProjectId     : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),       // Corrected this line
    appwriteCollectionId  : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),    // Corrected this line
    appwriteDatabaseId    : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),      // Correct
    appwriteBucketId      : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),        // Correct
}

export default conf;
