// lib/create.ts
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export async function saveUser(
  uid: string,
  fullName: string,
  username: string,
  profilePictureUrl: string, 
  email: string
) {
  if (!uid) throw new Error("Invalid user ID");

  const userRef = doc(db, "users", uid);
  await setDoc(userRef, {
    createdDate: serverTimestamp(),
    username: username,
    displayName: fullName,
    email: email,
    followerCount: 0,
    followingCount: 0,
    postsCount: 0,
    commentsCount: 0,
    bio: "",
    profilePicture: profilePictureUrl || null,
  });
}
