import React, {useState, useEffect} from 'react'
import Loader from '../../components/Loader';
import Wrapper from '../../components/Wrapper'
import { apiConnector } from '../../redux/Utils/apiConnector';
import { MdArrowDropDownCircle } from "react-icons/md";
import { useSelector } from 'react-redux';
import { GRAPH_URL } from '../../redux/Utils/constants';

const DispGraph = () => {

    const {userinfo} = useSelector(state => state.auth);

    const [val, setVal] = useState(0);
    const [month, setmonth] = useState(1);
    const [loading, setLoading] = useState(1);
    const [error, setError] = useState(0);
    const [arr,setArr] = useState([]);

    const months = React.useMemo(() => [
        {month:"January"},
        {month:"February"},
        {month:"March"},
        {month:"April"},
        {month:"May"},
        {month:"June"},
        {month:"July"},
        {month:"August"},
        {month:"September"},
        {month:"October"},
        {month:"November"},
        {month:"December"}
       ], []);

    useEffect(() => {
                  
        async function getData(){
          try {
          setLoading(1);
            setError(0);

            for(let i=1;i<32;i++){

                const res = await apiConnector(`${GRAPH_URL}/${i}/${month}`,"GET",null,{Authorization: `Bearer ${userinfo.token}`});
  
                const num = res.data.data ? res.data.data.filter(obj => obj.sectionMain === 'Dispatch').reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.pouchPacked,0),0) : 0;

                arr.push({
                  "name":i,
                  "Pouches Packed":num,
                })
  
              }
          setLoading(0);
      
          } catch (e) {
            setError(1);
            console.log(e);
          }
        }

        getData();
       }, [months,userinfo.token,month,arr]);

  return (
    <div>

<div className='flex items-center relative justify-center font-bold text-2xl h-fit rounded-lg gap-1 my-8'
      onClick={()=>setVal( !val  )}>   
         Month 
          <MdArrowDropDownCircle className='mt-1'/>
      <div className='mx-20'>
      {months[month-1].month}
      </div>
          {
          val  ? ( <div className='absolute z-10 bg-black border-2 rounded-xl border-[#f59e0b] text-[#f59e0b] sm:max-lg:right-[11.5rem] sm:max-lg:-top-3 top-10 w-72 h-72 flex gap-3 flex-wrap justify-center items-center'>
              {
            months.map((val,index)=>(
              <div key={index}
              className='text-sm font-bold h-12 w-[4.8rem] bg-black border-2 rounded-lg border-[#f59e0b] text-[#f59e0b] hover:scale-105 text-center cursor-auto pt-2.5 hover:bg-[#f59e0b] hover:text-black'
              onClick={()=>{
                setmonth(index+1)
                setArr([]) 
               }}>
                {val.month}
              </div>
            ))
          }
            </div>) : (<div></div>)
          }
      </div> 
    {
        error ? (
            <div className='sm:max-lg:mt-4 text-3xl font-bold text-center my-96'> No Data Entry Found For {months[month-1].month}</div>
        ):(
<div>
{
    loading ? (
        <Loader/>
    ):( 
        <Wrapper data={arr} dataKey={"Pouches Packed"}/>
    )
}
</div>
        )
    }
    </div>
  )
}

export default DispGraph
