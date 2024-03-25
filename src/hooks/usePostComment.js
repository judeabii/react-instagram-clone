import { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from '../store/authStore';
import { collection, getDoc, getDocs, query, setDoc, updateDoc, where, doc, addDoc, arrayUnion } from 'firebase/firestore';
import { firestore } from "../Firebase/firebase";
import postStore from "../store/postStore";

const usePostComment = () => {
	const [isCommenting, setIsCommenting] = useState(false);
	const showToast = useShowToast();
	const authUser = useAuthStore((state) => state.userLoggedIn);
	const addComment = postStore((state) => state.addComment);

	const postComment = async (postId, comment) => {
		if (isCommenting) return;
		if (!authUser) return showToast("Error", "You must be logged in to comment", "error");
		setIsCommenting(true);
		const newComment = {
            id: doc(collection(firestore, "comments")).id,
			comment,
			createdAt: Date.now(),
			createdBy: authUser.uid,
			postId,
		};
		try {
			await updateDoc(doc(firestore, "posts", postId), {
				comments: arrayUnion(newComment),
			});
			addComment(postId, newComment);
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsCommenting(false);
		}
	};

	return { isCommenting, postComment };
};

export default usePostComment;