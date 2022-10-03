import type { InferGetStaticPropsType, NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import { createContext, FC } from 'react'
import { FeedDisplay } from "../components/feedDisplay"
import { CreateFeed } from "../components/createFeed"
import React from 'react'
import { CreateUpdateModal } from "../components/createUpdateModal"
import axios from 'axios'

const Home: NextPage = ({ feeds, api_url }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [open, setOpen] = React.useState(false);
  const reload = () => {
    window.location.reload()
  }
  return (
    <div className='flex flex-col items-center '>
      <div className='bg-white w-full h-14 flex mb-5  justify-center'>
        <span onClick={reload} className='self-center' style={{ fontFamily: 'monospace', fontSize: 20, fontWeight: 'revert-layer', cursor: "pointer" }}>Activity Feeds</span>
      </div>
      <div className='flex flex-col w-9/12  max-w-2xl'>

        <div className=' border border-blue-700 rounded-3xl'><CreateFeed setState={setOpen} /></div>
        <div>
          {
            feeds.map((iteam: any, index: number) => {
              // console.log(api_url)
              return (
                <Api_context.Provider value={api_url}>
                  <FeedDisplay key={index} id={iteam.id} image={iteam.image} textContent={iteam.textContent} updated_at={iteam.updated_at} />
                </Api_context.Provider>
              )
            })
          }
        </div>
        <CreateUpdateModal setState={setOpen} state={open} />
      </div>
    </div>
  )
}

export const Api_context = createContext("");

export const getStaticProps: GetStaticProps = async () => {
  const api_url = process.env.NEXT_PUBLIC_API_URL
  const res = axios.get(api_url + "/" as string)
  // const res = await fetch(api_url + "/" as string)
  // const Feeds = await res.json()
  const Feeds = (await res).data
  console.log(Feeds)
  return {
    props: {
      feeds: Feeds,
      api_url: api_url
    }
  }
}

export default Home
