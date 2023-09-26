"use client"

import Image from 'next/image'
import { useState } from 'react'

type Message = {
  userName: string
  test: string
}

export default function Home() {
  const [disaplyName, setDisplayName] = useState('');
  const [messageText, setMessageFeed] = useState('');
  const [messageFeed, setMessageText] = useState<Message[]>([])
  const sendMessage = () => {
    const newMessage = {
      userName: disaplyName,
      test: messageText
    };
    // console.log(newMessage);
    setMessageFeed([...messageFeed, newMessage])
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Serverless MN</h1>
      <input onChange={(e) => setDisplayName(e.target.value)} value={disaplyName}/>
      <input onChange={(e) => setMessageText(e.target.value)} value={messageText}/>
      <button onClick={sendMessage}>Send Message</button>
      
      <p>k8s jenkins</p>
    </main>
  )
}
