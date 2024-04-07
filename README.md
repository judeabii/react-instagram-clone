# react-instagram-clone
Instagram Clone: A React-based web app with Chakra UI &amp; Firebase. Explore modern web development with React's components, Chakra UI's styling, and Firebase's real-time database &amp; authentication.

### To utilize the app and its features, users are required to sign up with new credentials, safeguarded by Google's Firebase authentication. 
### Please note that there is no integration with Instagram, and users cannot log in using their actual Instagram accounts.

# Application demo
https://github.com/judeabii/react-instagram-clone/assets/54803360/cffde733-6dff-44fa-8888-1b556a2044e1

### Prerequisites
Create a Vite project:
```
npm create vite@latest
```
Install all dependencies listed in the `package.json` file of your project:
```
npm install
```
To start a development server and run the given project in a development environment:
```
npm run dev
```
Install Chakra UI
```
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
```
Next, wrap your entire application with ```Chakra Provider``` You can find more info on the Chakra UI docs page.
```
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
    </Router>
  </React.StrictMode>,
)
```
### Install Firebase and its dependencies:
```
npm install firebase
```
#### Firebase Configuration
* Set Up Firebase:
    * Create a Firebase project at Firebase Console.
    * Set up Firebase Authentication with the necessary providers (e.g., email/password).
    * Set up Firebase Realtime Database or Firestore according to your preferences.
    * Obtain your Firebase configuration details.
* Configure Firebase:
```
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: MESSENGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID
};
```
### Features
The Instagram Clone project covers all basic Instagram features, including:
* **Posting pictures**: Users can upload and share images with captions.
* **Following users**: Users can follow other users to see their posts in their feed.
* **Liking posts**: Users can like posts to show appreciation.
* **Commenting on posts**: Users can leave comments on posts to interact with other users.
* **User profiles**: Each user has a profile page displaying their posts and follower/following count.
* **Feed**: Users have a personalized feed displaying posts from users they follow.
* **Search Users**: Search for users using their username.

Additional features such as notifications, the ability to change user profile pictures, and more will be added in due time, enhancing the overall user experience and functionality of the application. 

### Technologies Used
* User
* React
* Chakra UI
* Firebase
    * Firebase Realtime Database
    * Firebase Authentication
    * Firebase Storage

### Deployment 
The project is deployed on Vercel. With GitHub integration, every push to the GitHub repository triggers an automatic deployment, ensuring that the latest changes are reflected in the live application without manual intervention. This streamlined deployment process allows for rapid iterations and updates to the application.



