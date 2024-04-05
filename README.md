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

### Technologies Used
* User
* React
* Chakra UI
* Firebase
    * Firebase Realtime Database
    * Firebase Authentication
    * Firebase Storage



