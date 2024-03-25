  import {Routes, Route, Navigate} from 'react-router-dom'
  import Home from './pages/Home/Home'
  import Auth from './pages/Authentication/Auth'
  import PageLayout from './Layouts/PageLayout/PageLayout'
  import useAuthStore from './store/authStore'
import ProfilePage from './pages/ProfilePage/ProfilePage'
  function App() {

    const user = useAuthStore((state)=>state.userLoggedIn)

    return (
      <>
        <PageLayout>
        <Routes>
          <Route path='/' element={user?<Home/>:<Navigate to={'/auth'}/>}/>
          <Route path='/auth' element={!user?<Auth/>:<Navigate to={'/'}/>}/>
          <Route path='/:username' element={<ProfilePage/>}/>
        </Routes>
        </PageLayout>
      </>
    )
  }

export default App
