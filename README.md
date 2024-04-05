# react-instagram-clone
Instagram Clone: A React-based web app with Chakra UI &amp; Firebase. Explore modern web development with React's components, Chakra UI's styling, and Firebase's real-time database &amp; authentication.

### To utilize the app and its features, users are required to sign up with new credentials, safeguarded by Google's Firebase authentication. 
### Please note that there is no integration with Instagram, and users cannot log in using their actual Instagram accounts.

### Prerequisites
Create a Vite project:
```
npm create vite@latest
```
Install all dependencies listed in the `package.json` file of your project:
```
npm install
```
To start a development server and run the project in a development environment:
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



