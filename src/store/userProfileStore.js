import {create} from "zustand"

const useProfileStore = create((set) => ({
    userProfile : null,
    setUserProfile: (userProfile) => set(() => ({userProfile: userProfile})),
    addPost: (post) => set((state) => ({
        userProfile: {...state.userProfile, posts:[...state.userProfile.posts, post.id]}})),
    deletePost: (postID) => set((state) => ({userProfile: {...state.userProfile,posts: state.userProfile.posts.filter(id => id !== postID)}}))
}));

export default useProfileStore