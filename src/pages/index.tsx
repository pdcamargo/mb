import React from 'react'
import Head from 'next/head'

import MybriefLogo from '../assets/mybrief.svg'

const Home: React.FC = () => {
  return (
    <main>
      <Head>
        <title>Homepage</title>
      </Head>

      <MybriefLogo />
      <h1>ReactJS Structure</h1>
      <p>A ReactJS + Next.js structure made by Rocketseat.</p>
    </main>
  )
}

export default Home
