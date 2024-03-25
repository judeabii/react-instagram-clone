import {create} from "zustand"

const useAuthStore = create((set) => ({
    userLoggedIn : JSON.parse(localStorage.getItem("user-info")),
    login: (user) => set(() => ({userLoggedIn: user})),
    logout: () => set(() => ({userLoggedIn:null})),
}));

export default useAuthStore