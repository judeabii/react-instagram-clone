import { create } from "zustand";

const postStore = create((set) => ({
	posts: [],
	createPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
	deletePost: (id) => set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),
	setPosts: (posts) => set({ posts }),
	addComment: (postId, comment) =>
		set((state) => ({
			posts: state.posts.map((post) => {
				if (post.id === postId) {
                    console.log("comment added")
                    console.log(comment)
					return {
						...post,
						comments: [...post.comments, comment],
					};
				}
				return post;
			}),
		})),
    addLikes: (postId, userLiked) => set((state) => ({
        posts: state.posts.map((post) => {
            if (post.id === postId){
                console.log("liked")
                return{
                    ...post,
                    likes: [...post.likes, userLiked]
                };
            }
            return post;
        })
    })),
    removeLikes: (postId, userLiked) => set((state) => ({
        posts: state.posts.map((post) => {
            if (post.id === postId){
                console.log("Unliked")
                return{
                    ...post,
                    likes: post.likes.filter((like) => like !== userLiked)
                };
            }
            return post;
        })
    })),
}));

export default postStore;