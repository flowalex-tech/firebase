"use client"

import { useEffect, useState } from 'react';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth/cordova';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
 
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

type Message = {
  id: string
  userName: string,
  text: string,
}
export default function Home() {
  const [user, setUser] = useState<User>();
  const [displayName, setDisplayName] = useState('');
  const [messageText, setMessageText] = useState('');
  const [messageFeed, setMessageFeed] = useState<Message[]>([]);
  const sendMessage = () => {
    const newMessage = {
      userName: displayName,
      text: messageText,
      time: serverTimestamp(),
    };

    addDoc(collection(db, "messages"), newMessage);
  }

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy('time'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessageFeed(querySnapshot.docs.map((doc) => {
        return {
          userName: doc.data().userName,
          text: doc.data().text,
          id: doc.id,
        }
      }));
    })
    return () => unsubscribe();
  }, [])

  const signIn = async () => {
    const response = await signInWithPopup(auth, provider);
    setUser(response.user)
  }

  return (
    <main>
      {user ? <>
        <h1>Serverless MN</h1>
        <input onChange={(e) => setDisplayName(e.target.value)} value={displayName} />
        <input onChange={(e) => setMessageText(e.target.value)} value={messageText} />
        <button onClick={sendMessage}>Send Message</button>
        <ul>
          {messageFeed.map((message) => (<li key={message.text}>
            {message.userName}: {message.text}
          </li>))}
        </ul>
        <p>jenkins k8s</p>
      </> : <>
        <button onClick={signIn}>Sign In</button>
      </>}
    </main>
  )
}