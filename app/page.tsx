"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Icon from '@/public/assets/suggestions/icon-suggestions.svg'
import UpArrowIcon from '@/public/assets/shared/icon-arrow-up.svg'
import ArrowDownIcon from '@/public/assets/shared/icon-arrow-down.svg'
import CommentsIcon from '@/public/assets/shared/icon-comments.svg'
import CloseIcon from '@/public/assets/shared/mobile/icon-close.svg'
import HamburgerIcon from '@/public/assets/shared/mobile/icon-hamburger.svg'
import EmptyIllustration from '@/public/assets/suggestions/illustration-empty.svg'
import jsonData from '@/data/data.json'
import { ProductRequest } from "@/types"
import { Categories } from "./constants"
import { checklocalData } from "@/components/utils/checklocalData"
import { Listbox } from "@headlessui/react"


export default function Home() {
  const [sideMenu, setSideMenu] = useState<boolean>(false)
  const usefulData = jsonData.productRequests.filter((data: ProductRequest) => data.status == 'suggestion') 
  const [suggestionData, setSuggestionData] = useState<ProductRequest[]>(usefulData)
  const [displayData, setDisplayData] = useState<ProductRequest[]>(usefulData)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [roadCount, setRoadCount] = useState<{
    planned: number;
    inProgress: number;
    live: number;  
  }>({
    planned: 0,
    inProgress: 0,
    live: 0
  })

  const filter = [
    'Most Upvotes',
    'Least Upvotes',
    'Most Comments',
    'Least Comments'
  ]

  const [selectedCategory, setSelectedCategory] = useState(filter[0])

  useEffect(() => {
    const result = checklocalData()
    if(result?.success){
      const onlysuggestions = result.parsedData.productRequests.filter((data: ProductRequest) => {
        return data.status == 'suggestion'
      }) 
      const nosuggestions = result.parsedData.productRequests.filter((data: ProductRequest) => data.status != 'suggestion') 
      const plannedArr = nosuggestions.filter((obj: ProductRequest) => obj.status === 'planned')
      const inProgressArr = nosuggestions.filter((obj: ProductRequest) => obj.status === 'in-progress')
      const liveArr = nosuggestions.filter((obj: ProductRequest) => obj.status === 'live')
      setRoadCount({
        planned: plannedArr.length,
        inProgress: inProgressArr.length,
        live: liveArr.length
      })
      setSuggestionData(onlysuggestions)
      setDisplayData(onlysuggestions)
      setActiveCategory('all')
    } else {
      console.log(result?.error)
    }
  }, [])


  const handleFilter = (categoryVal: any) => {
    console.log(categoryVal)
    switch(categoryVal){
      case 'Most Upvotes':
        return setDisplayData(
          displayData.sort(function(a, b) {
            return b.upvotes - a.upvotes;
          })
        )
      case "Least Upvotes":
        return setDisplayData(
          displayData.sort(function(a, b) {
            return a.upvotes - b.upvotes;
          })
        )
      case 'Most Comments':
        return setDisplayData(
          displayData.sort(function(a, b) {
            return b.comments?.length! - a.comments?.length!
          })
        )
      case "Least Comments":
        return setDisplayData(
          displayData.sort(function(a, b) {
            return a.comments?.length! - b.comments?.length!
          })
        )
      default:
        return setDisplayData(
          displayData.sort(function(a, b) {
            return a.upvotes - b.upvotes;
          })
        )
    }
  }

  const handleTag = (tag: string) => {
    if(tag != 'all'){
      const filteredArr = suggestionData.filter((obj:ProductRequest)=> obj.category == tag)
      setDisplayData(filteredArr)
      setActiveCategory(tag)
    } else {
      setDisplayData(suggestionData)
      setActiveCategory(tag)
    }
  }

  const tagsBox = () => (
    <div className="min-h-[137px] bg-white rounded-primary p-6 flex flex-wrap gap-x-2 gap-y-3">
      {Categories.map((type: string) => (
        <div 
          key={type} 
          onClick={() => handleTag(type)} 
          className={` text-[13px]  py-1.5 px-4 h-fit cursor-pointer hover:bg-[#CFD7FF] rounded-primary uppercase font-semibold ${activeCategory == type ? 'bg-active text-white' : 'bg-[#F2F4FF] text-active'}`}
        >
          {type}
        </div>
      ))}
    </div>
  )

  const roadmapBox = () => (
    <div className="min-h-[137px] bg-white rounded-primary p-6 flex flex-col text-base font-regular">
      <div className="flex items-center justify-between mb-6">
        <div className="font-bold">Roadmap</div>
        <Link href='/roadmap' className="underline text-active">View</Link>
      </div>
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-2"><span className="w-2 h-2 bg-[#F49F85] rounded-full before:content-['']"></span>Planned</div>
        <div className="font-bold">{roadCount.planned}</div>
      </div>
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-2"><span className="w-2 h-2 bg-[#AD1FEA] rounded-full before:content-['']"></span>In-Progress</div>
        <div className="font-bold">{roadCount.inProgress}</div>
      </div>
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-2"><span className="w-2 h-2 bg-[#62BCFA] rounded-full before:content-['']"></span>Live</div>
        <div className="font-bold">{roadCount.live}</div>
      </div>
    </div>
  )

  const handleUpvote = (idParam: number) => {
    const result = checklocalData()
    if(result.success){
      const modifiedProductRequests = result.parsedData.productRequests.map((obj: ProductRequest) => {
        console.log(obj.id == idParam)
        return obj.id == idParam ? {
          ...obj,
          upvotes: obj.upvotes + 1
        } : obj
      })
      console.log(modifiedProductRequests)
      const modifiedData = {
        currentUser: result.parsedData.currentUser,
        productRequests: modifiedProductRequests
      }
      localStorage.setItem('eqaim', JSON.stringify(modifiedData))
    }
  }

  return (
    <main className="relative overflow-hidden min-h-screen padding-x padding-y bg-[#F7F8FD]">
      {/* main div */}
      <div className="grid grid-cols-12 md:gap-10">

        {/* left */}
        <div className="xl:col-span-3 col-span-12 xl:flex md:grid grid-cols-3 flex-col gap-6">
          {/* first box */}
          <div className="main-gradient md:min-h-[137px] md:rounded-[10px] px-6 py-4 md:p-6 flex md:items-end items-center md:justify-start justify-between">
            <div className=" ">
              <div className="text-white font-bold">Eqaim</div>
              <div className="text-white font-semibold opacity-75">Feedback Board</div>
            </div>
            <div className="block md:hidden cursor-pointer" onClick={() => setSideMenu(!sideMenu)}>
              {!sideMenu ? (
                <Image src={HamburgerIcon} alt="hamburgericon" width={20} height={17} />
              ) : (
                <Image src={CloseIcon} alt="hamburgericon" width={20} height={17} />
              )}
             
            </div>
          </div>
          {/* second box */}
          <div className="md:block hidden">
            {tagsBox()}
          </div>
          {/* third box */}
          <div className="md:block hidden">
            {roadmapBox()}
          </div>
        </div>

        {/* right */}
        <div className="xl:col-span-9 col-span-12">
          {/* nav */}
          <div className="flex items-center justify-between bg-[#373F68] h-[72px] md:rounded-[10px] px-4 py-3.5">
              <div className="flex items-center px-2">
                <Image src={Icon} alt="icon" width={24} height={24} className="md:block hidden" />
                <div className="md:block hidden font-bold text-white text-lg pl-4">{suggestionData.length} Suggestions</div>
                <Listbox value={selectedCategory} onChange={setSelectedCategory} >
                  <div className="relative mt-1">
                    <Listbox.Button className="flex items-center gap-2 text-[#F2F4FE] text-[14px] font-bold md:pl-9 whitespace-nowrap">
                      <span>Sort by : {selectedCategory}</span>
                      <Image src={ArrowDownIcon} alt="icon" />
                    </Listbox.Button>
                    
                      <Listbox.Options className="absolute mt-8 max-h-60 left-0 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filter.map((category) => (
                          <Listbox.Option
                            key={category}
                            onClick={() => handleFilter(category)}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 uppercase font-regular cursor-pointer pl-10 pr-4 ${
                                active ? 'bg-gray-100 text-[#AD1FEA]' : 'text-secondary'
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
                {/* <div className="text-[#F2F4FE] text-[14px] font-bold md:pl-9 whitespace-nowrap">Sort by : Most Upvotes</div> */}
              </div>
              <Link href='/add-feedback' className="bg-[#AD1FEA] hover:bg-[#C75AF6] px-6 py-3 text-[#F2F4FE] rounded-primary whitespace-nowrap">+ Add Feedback</Link>
          </div>

          {displayData.length > 0 ? (
            <div className="flex flex-col gap-5 mt-6 md:px-0 md:py-0 px-6 py-8">
              {/* suggestion card */}
              {displayData.map((productObj: ProductRequest) => {
                const {category, description, id, title, upvotes, comments} = productObj
                return (
                  <Link href={`/${id}`} key={id} className="bg-white flex md:flex-row flex-col items-start md:items-center justify-between rounded-primary px-8 py-7">
                    <div className="flex gap-10 flex-1">
                      <div onClick={() => handleUpvote(id)} className="hidden md:flex flex-col items-center gap-2 h-fit bg-[#F2F4FE] hover:bg-[#CFD7FF] rounded-primary py-2 px-2.5">
                        <Image src={UpArrowIcon} alt="icon" className="pt-2"  />
                        <div className="text-[13px] text-primary font-bold">{upvotes}</div>
                      </div>
                      <div className="flex-1">
                        <div className="text-lg text-primary font-bold">{title}</div>
                        <div className="text-base text-secondary font-regular">{description}</div>
                        <button className="font-regular text-[13px] text-active mt-3 px-4 py-1.5 font-semibold bg-[#F2F4FF] rounded-primary hover:">{category}</button>
                      </div>
                    </div>
                    <div className="flex w-full md:w-fit  items-center justify-between gap-2 md:mt-0 mt-4">
                      <div onClick={() => handleUpvote(id)} className="flex md:hidden items-center gap-2 h-fit bg-[#F2F4FE] hover:bg-[#CFD7FF] rounded-primary py-2 px-2.5">
                        <Image src={UpArrowIcon} alt="icon" className="md:pt-2"  />
                        <div className="text-[13px] text-primary font-bold">{upvotes}</div>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <Image src={CommentsIcon} alt="icon" className=""  />
                        <div className="text-base text-primary font-bold">{!comments  ? 0 : comments?.length}</div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center jsutify-center bg-white rounded-primary h-fit mt-6 px-6 md:py-24 py-20 md:mx-0 m-5">
              <Image src={EmptyIllustration} alt="empty_illustration" className="object-contain" />
              <div className="text-primary text-2xl font-bold mt-12">There is no feedback yet.</div>
              <p className="mt-4 text-secondary text-base font-regular text-center">
                Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.
              </p>              
              <Link href='/add-feedback' className="bg-[#AD1FEA] hover:bg-[#C75AF6] px-6 py-3 text-[#F2F4FE] rounded-primary whitespace-nowrap mt-12">+ Add Feedback</Link>
            </div>
          )}

        </div>
      </div>
     {sideMenu && (
        <div className="absolute md:hidden w-full max-h-screen bg-black/30 mt-[80px] top-0 right-0 bottom-0 z-[10]">

          <div className=" md:hidden flex flex-col gap-6 bg-[#F7F8FD] p-6 max-w-[271px] max-h-screen top-0 right-0 bottom-0 absolute z-[15]">
            {tagsBox()}
            {roadmapBox()}
          </div>
        </div>
     )}
    </main>
  )
}
