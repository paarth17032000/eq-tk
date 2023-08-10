"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import LeftArrowIcon from '@/public/assets/shared/icon-arrow-left.svg'
import { checklocalData } from '@/components/utils/checklocalData'
import { IRoadMapData, ProductRequest } from '@/types'
import RoadmapCardComponent from '@/components/roadmap-card-component'
import UpArrowIcon from '@/public/assets/shared/icon-arrow-up.svg'
import CommentsIcon from '@/public/assets/shared/icon-comments.svg'

interface CurrentStatus {
  name: string;
  color: string;
  description: string;
  arr: {
    upvotes: number;
    arr: ProductRequest[]
  }
}

export default function Roadmap() {
  
  const [roadmapData, setRoadmapData] = useState<IRoadMapData>({
    planned: {
      upvotes: 0,
      arr: []
    },
    inProgress: {
      upvotes: 0,
      arr: []
    },
    live: {
      upvotes: 0,
      arr: []
    },
  })

  const statusArr = [
    {
      name: 'planned',
      color: '#F49F85',
      description: 'Ideas prioritized for research',
      arr: roadmapData.planned
    },
    {
      name: 'in-progress',
      color: '#AD1FEA',
      description: 'Currently being developed',
      arr: roadmapData.inProgress
    },
    {
      name: 'live',
      color: '#62BCFA',
      description: 'Released features',
      arr: roadmapData.live
    }
  ]

  const [currentStatus, setCurrentStatus] = useState<CurrentStatus>(statusArr[1])
  

  const checkPriority = () => {}

  useEffect(() => {
    const result = checklocalData()
    if(result?.success){
      const nosuggestions = result.parsedData.productRequests.filter((data: ProductRequest) => data.status != 'suggestion') 
      const plannedArr = nosuggestions.filter((obj: ProductRequest) => obj.status === 'planned')
      const inProgressArr = nosuggestions.filter((obj: ProductRequest) => obj.status === 'in-progress')
      const liveArr = nosuggestions.filter((obj: ProductRequest) => obj.status === 'live')
      setRoadmapData({
        planned: {
          upvotes: plannedArr.reduce((acc, obj) => acc + obj.upvotes, 0),
          arr: plannedArr
        },
        inProgress: {
          upvotes: inProgressArr.reduce((acc, obj) => acc + obj.upvotes, 0),
          arr: inProgressArr
        }, 
        live: {
          upvotes: liveArr.reduce((acc, obj) => acc + obj.upvotes, 0),
          arr: liveArr
        },         
      })
      console.log(statusArr[1])
      setTimeout(() => {
        setCurrentStatus({
          name: 'in-progress',
          color: '#AD1FEA',
          description: 'Currently being developed',
          arr: {
            upvotes: inProgressArr.reduce((acc, obj) => acc + obj.upvotes, 0),
            arr: inProgressArr
          }, 
        })
        console.log(statusArr[1])
      }, 1000)
      console.log(roadmapData)
    } else {
      console.log(result?.error)
    }
  }, [])

  console.log(roadmapData)
  return (
    <div className="relative overflow-hidden min-h-screen padding-x padding-y bg-[#F7F8FD]">
        <div className="flex items-center justify-between bg-[#373F68] h-[113px] md:rounded-[10px] px-8 py-7">
          <div className="flex flex-col items-center px-2">
            <Link href='/' className='flex items-center justify-start gap-2 w-full '>
                <Image src={LeftArrowIcon} alt="icon" className='text-white' />
                <div className='text-white font-bold text-[14px]'>Go Back</div>
            </Link>
            <div className='text-2xl text-white font-bold'>Roadmap</div>
          </div>
          <Link href='/add-feedback' className="bg-[#AD1FEA] px-6 py-3 text-[#F2F4FE] rounded-primary whitespace-nowrap">+ Add Feedback</Link>
        </div>

        <div className='md:hidden grid grid-cols-3 h-[60px] text-[14px] font-bold  w-full border-b border-[#8C92B3]/25'>
          {statusArr.map((status: CurrentStatus) => {
            const isActive = status.name == currentStatus.name
            const {name, color} = status
            return (
              <div 
                key={name}
                onClick={() => setCurrentStatus(status)} 
                className={`${isActive ? `border-b-[4px] border-[${color}] text-primary` : 'text-[#3A4374]/40'} cursor-pointer flex items-center justify-center capitalize`}
              >
                {name}
              </div>
            )
          })}
        </div>

        {/* status */}
        <div className='hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12 md:mx-0 m-6'>

          <RoadmapCardComponent status={roadmapData.planned} title='Planned' description='Ideas prioritized for research' borderColor='border-[#F49F85]' />
          <RoadmapCardComponent status={roadmapData.inProgress} title='In-Progress' description='Currently being developed' borderColor='border-[#AD1FEA]' />
          <RoadmapCardComponent status={roadmapData.live} title='Live' description='Released features' borderColor='border-[#62BCFA]' />

        </div>

        
        <div className='grid md:hidden grid-cols-1 gap-10 mt-12 md:mx-0 m-6'>
          
          <div className='flex flex-col'>
            <div className='font-bold text-lg text-primary'>{currentStatus.name} {currentStatus.arr.upvotes}</div>
            <div className='font-regular text-base text-secondary mt-1'>{currentStatus.description}</div>
            <div className='flex flex-col gap-6 mt-8'>
              {currentStatus.arr.arr.map((obj:ProductRequest) => (
                  <Link href={`/${obj.id}`} key={obj.id} className={`bg-white flex sm:min-w-[350px] flex-col items-start rounded-primary px-8 py-7 border-t-[8px] border-[${currentStatus.color}]`}>
                    <div className="flex items-center gap-2 "><span className={`w-2 h-2 bg-[${currentStatus.color}] rounded-full before:content-['']`}></span>{currentStatus.name}</div>
                    <div className="flex-1 mt-2">
                        <div className="text-lg text-primary font-bold">{obj.title}</div>
                        <div className="text-base text-secondary font-regular">{obj.description}</div>
                        <button className="font-regular text-[13px] text-active mt-3 px-4 py-1.5 font-semibold bg-[#F2F4FF] rounded-primary hover:">{obj.category}</button>
                    </div>
                    <div className="flex w-full items-center justify-between gap-2 mt-4">
                        <div className="flex items-center gap-2 h-fit bg-[#F2F4FE] rounded-primary py-2 px-2.5">
                        <Image src={UpArrowIcon} alt="icon"   />
                        <div className="text-[13px] text-primary font-bold">{obj.upvotes}</div>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                        <Image src={CommentsIcon} alt="icon" className=""  />
                        <div className="text-base text-primary font-bold">{!obj.comments  ? 0 : obj.comments?.length}</div>
                        </div>
                    </div>
                  </Link>
              ))}
            </div>
          </div>

        </div>

    </div>
  )
}
