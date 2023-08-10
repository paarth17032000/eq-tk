import { IRoadMapData, ProductRequest } from '@/types'
import Image from 'next/image';
import React from 'react'
import UpArrowIcon from '@/public/assets/shared/icon-arrow-up.svg'
import CommentsIcon from '@/public/assets/shared/icon-comments.svg'
import Link from 'next/link';

interface IRoadmapCardComponent {
    status: {
        upvotes: number;
        arr: ProductRequest[]
    };
    title: string;
    description: string;
    borderColor: string;
}

export default function RoadmapCardComponent({
    status,
    title, 
    description,
    borderColor
}: IRoadmapCardComponent) {
  return (
    <div className='flex flex-col'>
        <div className='font-bold text-lg text-primary'>{title} {status.upvotes}</div>
        <div className='font-regular text-base text-secondary mt-1'>{description}</div>
        <div className='flex flex-col gap-6 mt-8'>
        {status.arr.map((obj:ProductRequest) => (
            <Link href={`/${obj.id}`} key={obj.id} className={`bg-white flex sm:min-w-[350px] flex-col items-start rounded-primary px-8 py-7 border-t-[8px] ${borderColor}`}>
                <div className="flex items-center gap-2 "><span className={`w-2 h-2 bg-[${borderColor}] rounded-full before:content-['']`}></span>{title}</div>
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
  )
}
