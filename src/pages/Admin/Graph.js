import React from 'react'
import { useNavigate} from 'react-router-dom';

const Graph = () => {

    const arr = ["Dispatch-Graph","Filling-Graph","Kitchen-Graph","Monthly-Dispatch",
      "Monthly-Filling","Monthly-Kitchen"];

    const navigate = useNavigate();

  return (
    <div>

                        <div className='flex flex-wrap gap-20 sm:max-lg:gap-9 my-16 justify-center mx-22 sm:max-lg:mx-1 '>
                            {
                                arr.map((val,ind)=>(
                                    <div key={ind}
                                         onClick={()=>navigate(val)}
                                         >
                                        <div className=' text-3xl h-60 w-80 sm:max-lg:h-40 sm:max-lg:w-60 sm:max-lg:text-xl  flex items-center rounded-lg justify-center font-bold my-auto hover:translate-y-3 hover:bg-yellow-800  bg-yellow-600 [ bg-gradient-to-b from-white/35 to-white/5 ]
    [ border-[3px] border-solid border-white border-opacity-30 ]
    [ shadow-black/70 shadow-2xl ]'>{val}</div>
                                    </div>
                                ))
                            }
                        </div>
    </div>
  )
}

export default Graph