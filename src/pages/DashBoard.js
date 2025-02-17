import React, { useState , useEffect} from 'react'
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch , useSelector } from 'react-redux'
import { setSection } from '../redux/Slices/dateSlice'
import {
  BarChart3,
  Package,
  ClipboardList,
  ChefHat,
  Truck,
  Target,
  FileText,
  PlusIcon,
  Container,
} from "lucide-react";

const menuItems = [
  { icon: ClipboardList, label: "Filling", path:"Create-Data-Filling", section:"Filling" },
  { icon: ChefHat, label: "Kitchen", path:"Create-Data-Kitchen", section:"Kitchen"},
  { icon: Truck, label: "Dispatch", path:"Create-Data-Dispatch", section:"Dispatch"},
  { icon: Target, label: "Production Goal", path:"Production" },
  { icon: Container, label: "Exports", path:"Create-Exports"},
];

const cards = [
  { icon: FileText, label: "View Data" },
  { icon: BarChart3, label: "View Analytics" },
  { icon: Package, label: "View Inventory" },
];

const items = [
  [
    {name: "Filling Data", path: "Month", section:"Filling"},
    {name: "Kitchen Data", path: "Month", section:"Kitchen"},
    {name: "Dispatch Data", path: "Month", section:"Dispatch"},
    {name: "Daily Wastage", path: "Daily-List"},
    {name: "Production Goals", path: "Production-Goal"}
  ],
  [
    {name: "Monthly Report", path: "Monthly-Data"},
    {name: "Buyer Data", path: "Product-Data"},
    {name: "Export Data", path: "Container-List"},
    {name: "Graph Report", path: "Graph"},
    {name: "Day Vs Night", path: "Day-Night"}
  ],
  [
    {name: "Pouch Stock", path: "Pouch"},
    {name: "Dispatch Stock", path: "Dispatched"},
    {name: "Product List", path: "ProductData"},
    {name: "Packed List", path: "Left"},
    {name: "Inventory Record", path: "Inventory"}
  ]
]

export const Dashboard = () => {

  const [isOpen, setIsOpen] = useState(false);

  const {userinfo} = useSelector(state => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
   
    if(!userinfo){
      navigate("/Login")
    }
  }, [userinfo,navigate]);

  return (
    <div className="flex justify-center">
  
  <div className="fixed left-0 h-[calc(100vh-64px)] w-24 hover:w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 p-4 transition-all duration-[600ms] group/sidebar overflow-hidden">
        <div className="space-y-6">
          <div className="absolute top-2 right-3 bg-black m-4 opacity-100 group-hover/sidebar:opacity-0 transition-opacity">
            <PlusIcon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-white/80 text-2xl font-medium mt-4 mb-12 opacity-0 group-hover/sidebar:opacity-100 transition-opacity whitespace-nowrap">Create Data</h2>
          {menuItems.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="w-full flex items-center space-x-10 p-4 hover:space-x-14 rounded-lg bg-white/5 hover:bg-white/10 transition-all group"
              onClick={() => navigate(`/admin/${item.path}`)}
            >
              <item.icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform absolute" />
              <span className="text-white/90 text-md opacity-0 group-hover/sidebar:opacity-100 transition-opacity whitespace-nowrap">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 md:gap-12 my-12 md:my-24 mx-4 md:ml-28">
        {cards.map((card, index) => {
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                height: isOpen === card.label ? "32rem" : "20rem"
              }}
              transition={{ 
                delay: index * 0.3,
                height: {
                  duration: 0.2,
                }
              }}
              onClick={() => setIsOpen(isOpen === card.label ? null : card.label)}
              className="w-full md:w-[22rem] rounded-2xl bg-secondary/30 backdrop-blur-lg p-4 md:p-8 flex flex-col items-center hover:bg-secondary/50 transition-all group cursor-pointer overflow-hidden"
              style={{
                justifyContent: isOpen === card.label ? "flex-start" : "center",
                paddingTop: isOpen === card.label ? "2rem" : "4rem",
              }}
            >
              <card.icon className="w-12 h-12 md:w-16 md:h-16 text-primary mb-4 md:mb-6 group-hover:scale-110 transition-transform" />
              <span className={`${ isOpen === card.label ? "text-primary" : "text-white"} text-lg md:text-xl font-medium mb-4`}>{card.label}</span>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpen === card.label ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-white/80 text-center w-full"
              >
                {isOpen === card.label && (
                  <div className="pt-4 md:pt-6 space-y-3 md:space-y-4">
                    {items[index].map((item, i) => (
                      <div key={i} className="p-2 text-base md:text-lg font-semibold hover:bg-white/10 rounded-lg transition-colors"
                        onClick={(e) => {
                         e.stopPropagation();
                         if (item.section) {
                           dispatch(setSection(item.section));
                         }
                         navigate(`/admin/${item.path}`);
                       }}>
                        {item.name}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};