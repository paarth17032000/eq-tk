"use client"
import React, { FormEvent, Fragment, useState } from 'react'
import ArrowLeftIcon from '@/public/assets/shared/icon-arrow-left.svg'

import ArrowDownIcon from '@/public/assets/shared/icon-arrow-down.svg'
import PlusIcon from '@/public/assets/shared/icon-plus.svg'
import Image from 'next/image'
import { Listbox } from '@headlessui/react'
import { Categories } from '../constants'
import { checklocalData } from '@/components/utils/checklocalData'

import { useRouter } from 'next/navigation'
import { ProductRequest } from '@/types'

interface FormData { 
  title: string;
  description: string;
}

export default function AddFeedback() {
  const router = useRouter()
  // console.log(router)
  const [selectedCategory, setSelectedCategory] = useState(Categories[0])
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: ''
  })
  const [error, setError] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(formData.title.length == 0 || formData.description.length == 0 ){
      setError('Please fill the input fields')
      return;
    }
    setError('')
    const result = checklocalData()
    if(result.success){
      const id = Math.max(...result.parsedData.productRequests.map((obj: ProductRequest) => obj.id)) + 1
      const formObj = {
        ...formData,
        'category': selectedCategory,
        'status': 'suggestion',
        'upvotes': 0,
        id   
      }
      const modifiedData = {
        currentUser: result.parsedData.currentUser,
        productRequests: [...result.parsedData.productRequests, formObj]
      }
      localStorage.setItem('eqaim', JSON.stringify(modifiedData))
      router.back()
    }
  }

  return (
    <div className="relative overflow-hidden min-h-screen padding-x padding-y bg-[#F7F8FD] flex flex-col items-center justify-center">
      <div className='relative md:max-w-[540px] md:m-0 mx-4 my-10'>
        <div className='flex items-start '>
          <div onClick={() => router.back()} className='flex items-center gap-2'>
            <Image src={ArrowLeftIcon} alt="icon" />
            <div className='text-secondary font-bold text-[14px]'>Go Back</div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="bg-white md:w-[540px] flex flex-col rounded-primary md:px-12 py-10 px-6 mt-12">
          <div className='text-primary text-2xl font-bold mt-2'>Create New Feedback</div>

          <div className='flex flex-col text-primary font-regular mt-6 text-[14px]'>
            <div className='font-bold'>Feedback Title</div>
            <div className='text-secondary'>Add a short, descriptive headline</div>
            <input id='title' name='title' placeholder='Title' onChange={handleChange} className='mt-4 border rounded-[5px] bg-[#F7F8FD] text-primary px-4 py-3 outline-none' />
          </div>

          <div className='flex flex-col text-primary font-regular mt-6 text-[14px]'>
            <div className='font-bold'>Category</div>
            <div className='text-secondary'>Choose a category for your feedback</div>

            
            <Listbox value={selectedCategory} onChange={setSelectedCategory} >
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full flex items-center justify-between mt-4 border rounded-[5px] bg-[#F7F8FD] text-primary px-4 py-3 outline-none text-left uppercase">
                    <span className="block truncate">{selectedCategory}</span>
                    <Image src={ArrowDownIcon} alt="icon" />
                  </Listbox.Button>
                  
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {Categories.map((category) => (
                        <Listbox.Option
                          key={category}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 uppercase font-regular cursor-pointer border-b border-[#3A4374]/15 last:border-none pl-10 pr-4 ${
                              active ? 'bg-gray-100 text-[#AD1FEA]' : 'text-gray-900'
                            }`
                          }
                          value={category}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {category}
                              </span>
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  
                </div>
              </Listbox>      
          </div>

          <div className='flex flex-col text-primary font-regular mt-6 text-[14px]'>
            <div className='font-bold'>Feedback Detail</div>
            <div className='text-secondary'>Include any specific comments on what should be improved, added, etc.</div>
            <textarea id='description' name='description' placeholder='Description' onChange={handleChange} className='mt-4 border rounded-[5px] bg-[#F7F8FD] text-primary px-4 py-3 outline-none' />
          </div>

          {error && (
            <div className='flex flex-col text-red-400 font-bold my-3 text-[14px]'>
              {error}
            </div>
          )}

          <div className='flex w-full md:flex-row flex-col-reverse items-center justify-end mt-8 gap-4 text-[14px] font-bold'>
            <button type='button' onClick={() => router.back()} className="bg-primary hover:bg-[#656EA3] md:w-fit w-full px-6 py-3 text-[#F2F4FE] rounded-primary whitespace-nowrap">Cancel</button>
            <button type='submit' className="bg-[#AD1FEA] hover:bg-[#C75AF6] md:w-fit w-full px-6 py-3 text-[#F2F4FE] rounded-primary whitespace-nowrap">Add Feedback</button>
          </div>
        </form>

        {/* absolute element */}
        <div className='absolute main-gradient w-[56px] h-[56px] before:content-[""] rounded-full top-[6%] left-[7%] flex items-center justify-center'>
            <Image src={PlusIcon} alt='icon' className=' w-[30px] h-[30px] pt-1' />
        </div>
      </div>
    </div>
  )
}
