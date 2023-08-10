"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Comment, ProductRequest, Reply, UserData } from '@/types'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import ArrowLeftIcon from '@/public/assets/shared/icon-arrow-left.svg'
import Image from 'next/image'
import UpArrowIcon from '@/public/assets/shared/icon-arrow-up.svg'
import CommentsIcon from '@/public/assets/shared/icon-comments.svg'
import { checklocalData } from '@/components/utils/checklocalData'

export default function FeedBackDetails({params}: Params) {
  const [comment, setComment] = useState<string>('')
  const [reply, setReply] = useState<string>('')
  const [showReply, setShowReply] = useState<boolean>(false)
  const [feedbackDetails, setFeedbackDetails] = useState<ProductRequest>()
  const [data, setData] = useState<UserData>()

  useEffect(() => {
    const data = localStorage.getItem('eqaim')
    if(data != null && data.length != 0){
      try {
        const parsedData = JSON.parse(data);
        console.log(parsedData);
        setData(parsedData)
        const feedback = parsedData.productRequests.find((data: ProductRequest) => data.id == params.feedback) 
        setFeedbackDetails(feedback)
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
  }, [comment.length == 0])


  const handlePostComment = () => {
    if(comment.length < 1){
      return;
    }
    let newCommentObj = {
      id: params.feedback,
      content: comment,
      user: data?.currentUser
    }
    setComment('')
    const result = checklocalData()
    if(result.success){
      if(feedbackDetails?.comments){
        const modifiedFeedback = {
          ...feedbackDetails,
          comments: [...feedbackDetails.comments, newCommentObj]
        }
        const newProductRequests = result.parsedData.productRequests.filter((obj: ProductRequest) => obj.id != params.feedback)
        const modifiedData = {
          currentUser: result.parsedData.currentUser,
          productRequests: [...newProductRequests, modifiedFeedback]
        }
        localStorage.setItem('eqaim', JSON.stringify(modifiedData))
      } else {
        const modifiedFeedback = {
          ...feedbackDetails,
          comments: [newCommentObj]
        }
        const newProductRequests = result.parsedData.productRequests.filter((obj: ProductRequest) => obj.id != params.feedback)
        const modifiedData = {
          currentUser: result.parsedData.currentUser,
          productRequests: [...newProductRequests, modifiedFeedback]
        }
        localStorage.setItem('eqaim', JSON.stringify(modifiedData))
      }
    }
  }

  const handlePostReply = () => {

  }

  return (
    <>
      {feedbackDetails?.id && (
        <main className="relative overflow-hidden min-h-screen padding-x padding-y bg-[#F7F8FD]">

          <div className='flex items-baseline justify-between md:m-0 m-6'>
            <Link href='/' className='flex items-center gap-2'>
              <Image src={ArrowLeftIcon} alt="icon" />
              <div className='text-secondary font-bold text-[14px]'>Go Back</div>
            </Link>
            <Link href={`/edit-feedback/${feedbackDetails.id}`} className="bg-[#4661E6] hover:bg-[#7C91F9] px-6 py-3 text-[#F2F4FE] text-[14px] font-bold rounded-primary whitespace-nowrap">Edit Feedback</Link>
          </div>

          <div key={feedbackDetails.id} className="bg-white flex md:flex-row flex-col items-start md:items-center justify-between rounded-primary px-8 py-7 mt-9 md:mx-0 mx-6">
            <div className="flex gap-10 flex-1">
              <div className="hidden md:flex flex-col items-center gap-2 h-fit bg-[#F2F4FE] hover:bg-[#CFD7FF] cursor-pointer rounded-primary py-2 px-2.5">
                <Image src={UpArrowIcon} alt="icon" className="pt-2"  />
                <div className="text-[13px] text-primary font-bold">{feedbackDetails.upvotes}</div>
              </div>
              <div className="flex-1">
                <div className="text-lg text-primary font-bold">{feedbackDetails.title}</div>
                <div className="text-base text-secondary font-regular">{feedbackDetails.description}</div>
                <button className="font-regular text-[13px] text-active mt-3 px-4 py-1.5 font-semibold bg-[#F2F4FF] rounded-primary hover:">{feedbackDetails.category}</button>
              </div>
            </div>
            <div className="flex w-full md:w-fit  items-center justify-between gap-2 md:mt-0 mt-4">
              <div className="flex md:hidden items-center gap-2 h-fit bg-[#F2F4FE] rounded-primary py-2 px-2.5">
                <Image src={UpArrowIcon} alt="icon" className="md:pt-2"  />
                <div className="text-[13px] text-primary font-bold">{feedbackDetails.upvotes}</div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <Image src={CommentsIcon} alt="icon" className=""  />
                <div className="text-base text-primary font-bold">{!feedbackDetails.comments  ? 0 : feedbackDetails.comments?.length}</div>
              </div>
            </div>
          </div>

          <div className='bg-white flex flex-col items-start  justify-between rounded-primary px-8 py-6 mt-6 md:mx-0 mx-6'>
            <div className="font-bold text-primary text-lg">{!feedbackDetails.comments ? 0 : feedbackDetails.comments?.length} Comments</div>
            <div className='flex flex-col gap-2 mt-6 w-full'>
              {!feedbackDetails.comments ? (
                <div>No comments</div>
              ) : (
                <div className='flex flex-col gap-8'>

                  {feedbackDetails.comments.map((comment: Comment) => {
                    const { content, id, user, replies } = comment
                    return (
                      <div key={id} className='flex items-start gap-8 border-b-[1px] border-[#8C92B3]/25 last:border-none'>
                        <img src={`/${user.image.substring(2)}`} alt='image' className='rounded-full' width={40} height={40} />
                        <div className='flex flex-1 flex-col text-[14px] font-regular text-secondary'>
                          <div className='flex items-center justify-between'>
                            <div className='flex flex-col'>
                              <div className='font-bold text-primary'>{user.name}</div>
                              <div>{user.username}</div>
                            </div>
                            <div onClick={() => setShowReply(true)} className='text-[#4661E6] font-semibold text-[13px] cursor-pointer'>Reply</div>
                          </div>
                          <div className='text-[15px] mt-4'>
                            {content}
                          </div>

                          {showReply && (
                            <div className='flex flex-col gap-4'>
                              <div className='flex items-start gap-8 mt-4 w-full  '>
                                <textarea id='reply' name='reply' onChange={(e) => setComment(e.target.value)} placeholder='reply' className='border w-full rounded-[5px] bg-[#F7F8FD] text-primary px-4 py-3 outline-none' />
                                <div onClick={handlePostReply} className="bg-[#AD1FEA] px-6 py-3 text-[#F2F4FE] text-[14px] font-bold rounded-primary whitespace-nowrap cursor-pointer">Post Reply</div>     
                              </div>
                              <div className={`${(250-reply.length) < 1 ? 'text-red-400' : 'text-secondary'} text-[15px] font-regular `}>{(250 - reply.length) < 1 ? 0 : (250 - reply.length)} characters left</div>
                            </div>
                          )}
                          
                          <div className='flex flex-col gap-6 py-4'>
                            {replies?.length && replies.map((reply: Reply) => (
                              <div key={reply.user.name} className='flex items-start gap-8 '>
                                <img src={`/${reply.user.image.substring(2)}`} alt='image' className='rounded-full' width={40} height={40} />
                                <div className='flex flex-1 flex-col text-[14px] font-regular text-secondary'>
                                    <div className='flex items-center justify-between'>
                                    <div className='flex flex-col'>
                                      <div className='font-bold text-primary'>{reply.user.name}</div>
                                      <div>{reply.user.username}</div>
                                    </div>
                                    {/* <div className='text-[#4661E6] font-semibold text-[13px] cursor-pointer'>Reply</div> */}
                                  </div>
                                  <div className='text-[15px] mt-2'>
                                    <span className='text-[#AD1FEA] text-[15px] font-bold mr-2'>{reply.replyingTo}</span>
                                    {reply.content}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                        </div>
                      </div>
                    )
                  })}

                </div>
              )}
            </div>
          </div>
          
          <div className='bg-white flex flex-col  gap-4 rounded-primary px-8 py-6 mt-6 md:mx-0 mx-6 mb-6'>
            <div className='text-primary font-bold text-lg'>Add Comment</div>
            <textarea id='description' name='comment' onChange={(e) => setComment(e.target.value)} placeholder='comment' className='mt-4 border rounded-[5px] bg-[#F7F8FD] text-primary px-4 py-3 outline-none' />
            <div className='flex items-center justify-between'>
              <div className={`${(250-comment.length) < 1 ? 'text-red-400' : 'text-secondary'} text-[15px] font-regular `}>{(250 - comment.length) < 1 ? 0 : (250 - comment.length)} characters left</div>
              <div onClick={handlePostComment} className="bg-[#AD1FEA] hover:bg-[#C75AF6] px-6 py-3 text-[#F2F4FE] text-[14px] font-bold rounded-primary whitespace-nowrap cursor-pointer">Post Comment</div>     
            </div>
          </div>
        </main>
      )}
    </>
  )
}
