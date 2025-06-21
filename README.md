# React Capstone Project

> [!NOTE]
> Frontend developed using primarily ReactJS, apart from which we will be using third-party services like **React Hook Forms**, **React-Router**, **TinyMCE** etc.
> Backend is developed on a BaaS(Backend as a Service) called **Appwrite**, so no code for backend is written by me, but I take it as an assignment to develop backend for this app myself in the future.

## Initial Setup

1. We installed the following packages:

```
npm i @reduxjs/tookit react-redux react-router-dom appwrite @tinymce/tinymce-react html-react-parser react-hook-form
```

2. We then created a `.env` file, added it to `.gitignore` and since we are using **Vite** we declared the variables as follows:

```
VITE_APPWRITE_URL = "test environment"
VITE_APPWRITE_PROJECT_ID = ""
VITE_APPWRITE_DATABASE_ID = ""
VITE_APPWRITE_COLLECTION_ID = ""
VITE_APPWRITE_BUCKET_ID = ""
```

3. Thereafter, we start setting our project in **Appwrite** and fill the corresponding env variable values.

4. We create a folder inside our `src` folder named `config` and write `conf.js` to do the following:

```
// ensure appwrite URL and all other env variables are always a String, as a safety check lest the app crash

const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default conf;

```
