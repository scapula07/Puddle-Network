import {AiFillHome,AiFillSetting} from "react-icons/ai"
import {BsPersonFill} from "react-icons/bs"
import {MdPeople,MdEvent,MdGroups2,MdMessage} from "react-icons/md"
import {RiShoppingBagFill} from "react-icons/ri"
import {FaGraduationCap} from "react-icons/fa"
import {RiLogoutBoxRLine} from "react-icons/ri"

export const navs=[
    {
      icon:<AiFillHome />,
      navName:"Home",
      link:"/"
     },
     {
        icon:<BsPersonFill />,
        navName:"Shows",
        link:"/"
     },
     {
        icon:<MdPeople />,
        navName:"Authors",
        link:"/"
      },
      {
        icon:<MdEvent />,
        navName:"Events",
        link:"/"
      },
      {
        icon:<MdEvent />,
        navName:"Dashboard",
        link:"/dashboard"
       },
       {
        icon:<AiFillSetting />,
        navName:"Settings",
        link:"/"
       },
       {
        icon:<AiFillSetting />,
        navName:"Billing",
        link:"/"
       },
      
  ]