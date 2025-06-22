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

## Creating Services

Services are created as a class. We are aiming that even if in future we want our project to work without **Appwrite** we can do the same.

### Creating `auth.js`

1. In this file we bring classes like Client, Account and ID from appwrite and we create our own class `AuthService` and **_we export the object created using `AuthService` named `authService`_**, so that, we dont need to create an instance everytime, we want to use it, we create it there and then only once.

2. **Wrapper Classes and Functions** : We are constantly refering to **Appwrite** documentation from creation of this Auth service. We are making changes to that code in order to let our React app be independent of whichever backend we are using. This is the reason why we created our own custom AuthService class while in the documentation example the appwrite classes were directly used.

Appwrite gives a service called `account.create()` to create an account, but we dont want to make our React app depend on appwrite, so to make it future proof we create a wrapper function (generalised) which calls this appwrite specific or any backend-specific function.

> [!NOTE]
> To understand the flow is important here, as after an account is created we are letting the user Login automatically.

> So, to summarize the `auth.js`:
>
> 1. We created a class called `AuthService` which has the properties `client = new Client()` and `account` (uninitialized because when we checked the appwrite documentation we found that to initialize or set the account we need the configured client and our client is not configured yet. So we will do this task with the help of a constructor).
> 2. We Create a constructor and set the properties of client object and also initialize the account object.
> 3. Now we go on creating methods which can be called by the frontend to perform things like createAccount, login, logout, getCurrentUser. These are the 4 major methods and we have created them.
> 4. Every method is an async function and also uses try-catch for error handling. We see things like the use of login function in createAccount function to make the user sign in immediately after creation of the account.
> 5. Finally, we export the `authService` object which the instance of our `AuthService` class.

> We have created the `auth.js` in such a way that we dont need to change a single thing in our frontend if in future we change the backend. We can simply make changes in this `auth.js` file keeping the parameters of the functions in mind.

### Creating `config.js` (don't worry about the name it is basically a database service)

1. We follow similar steps as we did to create `auth.js` to now create `config.js`.

2. We create a class, declare the properties, use a constructor to fill them up and use them in methods of this class which are namely, `createPost`, `updatePost`, `deletePost`, `getPost`, `getPosts`, `uploadFile`, `deleteFile` and `getFilePreview`.

3. The first three methods are similar to that we did in account. For get post we use the appwrite get post function.

4. For `getPosts` we must keep in mind the following thing:
   > In the getPosts method we wont expect the frontend to pass values into this function as they expect to get all the posts so no post id `slug` etc. nothing is required from there side.
   > But we need to ensure that only "active" posts are fetched so, we set default parameters and use **Appwrite** feature called `Query` to get only those posts which are active.

> [!IMPORTANT]
> To use the query feature we must, in our appwrite collection, define indexes, for example, `status` is defined here.

## Setting Up Redux ( State management )

1. Simple `store.js` using `configureStore` and simple `authSlice.js` using `createSlice`.

2. In authslice we have reducers namely, login and logout.

## Creating Components

1.  We create a components folder inside src.
2.  Create 2 folders, namely Header and Footer and a file in each, namely Header.jsx and Footer.jsx respectively.
3.  We create `index.js` file in the components folder so that we can write all our component import statements there export them all and whenever we want to access them we can simply import `index.js` file.
4.  Creation of `Container.jsx`.
    > **_Why?_**
5.  Adding html in `Footer.jsx`. It also contains `<Link/>` from `react-router`.
6.  Creation of `Logo.jsx`
7.  In the `index.js` file of components we import-export the newly created ones.

> [!IMPORTANT]
> I am not getting how the redux reducer call and `authService` function logout() call is happening how we are changing `authStatus`. Basically, I am not understanding the flow of data among redux, authService and appwrite. How is status received from authService is being updated in store of redux.

> Learn about `useNavigate()`

8.  ### Creation of NavBar:

    Inside our Header, we create an array of objects called navItems where have the properties like name, slug(where the button will link, this is used for using useNavigate from react-router) and active status(this is used because we want to render the navbar conditionally, i.e, if the user has active session then we show logout otherwise login).
    We created a navItems array as we can simply apply `map()` and render the buttons.

9.  ### Input Field as a component:

> [!IMPORTANT]
> Use of **_Forward Refs_** in React. Example: We are creating a login form. The input field is a separate component. Here, we will be using the sampe Input component for username and password. But we want the access of state in Login page so we use Forward Refs to forward the refernce of the state to the place where the componentn is used.

```
import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
```

> [!IMPORTANT]
> Didn't understand THe `ref` story

> [!TIP] > `{options?.map()}`: This is used, beacuse, options can be empty and if we apply .map() then app will crash as mentioned by Hitesh Sir, so, we use conditional .map() we can also use if-else etc. but this is a better syntax.

Another Tip:

> [!TIP]
> Instead of wrapping the entire function definition in React.forwardRef() as we did in `Input.jsx` we can simply do this: `export default React.forwardRef(Select);` in the export statement.

> [!CAUTION]
> Sorry but i didnt understand ccompletely lecture 24 of the chai aur react series, i didnt get how react forms etc. are working

10. ### Here's the `Login.jsx` code:

```
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as storeLogin } from "../features/authSlice.js";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth.js";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const disptach = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) disptach(storeLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-slate-300 rounded-xl p-10 border`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign In to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        {/* Form starts here */}
        {/* THe handleSubmit is a function which is coming form react-hook-form */}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
```

Similarly, we created SignUp.jsx which is very similar to Login.jsx infact we copy pasted some code.:

```
import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../features/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

```

11. ### Creation of `AuthLayout.jsx`

```
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    //TODO: make it more easy
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}

```

12. ### Creation of files like RTE.jsx, PostForm.jsx of which I dont have the faintest idea.

## Creating Pages

> [!IMPORTANT] > **Important Hooks** : `useCallback`, `useParams`, `useNavigate`, `useForm`
