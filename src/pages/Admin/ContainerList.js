import React, {useState, useEffect} from 'react'
import { apiConnector } from '../../redux/Utils/apiConnector';
import { useSelector } from 'react-redux';
import { EXPORT_URL } from '../../redux/Utils/constants';
import Loader from '../../components/Loader'
import { useNavigate} from 'react-router-dom';

const ContainerList = () => {

    const {userinfo} = useSelector(state => state.auth);
    
    const [loading, setLoading] = useState(1);
    const [error, setError] = useState(0);
    const [arr, setArr] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        
        async function getData(){
            try {
            setError(0);
            setLoading(1);
            
            const res = await apiConnector(`${EXPORT_URL}/list`,"GET",null,{Authorization: `Bearer ${userinfo.token}`});
            setArr(res.data.data);
    
            setLoading(0);
            
    
            } catch (e) {
              setError(1);
              console.log(e);
            }
          }

          getData();
    }, [userinfo.token]);

  return (
    <div>
      {
        error ? (<div className='text-center font-bold text-7xl mt-64 text-[#f59e0b]'>No Data Entry Found</div>
        ) : (
            <div>
                {
                    loading ? (<Loader/>
                    ) : (
                        <div className='flex flex-wrap gap-12 sm:max-lg:gap-9 my-4 mx-16'>
                            {
                                arr.map((val,ind)=>(
                                    <div key={ind}
                                         onClick={()=>navigate(`${val._id}`)}
                                         >
                                        <div className='h-40 w-60 flex items-center rounded-lg justify-center font-bold text-3xl my-auto hover:translate-y-3 hover:bg-yellow-800  bg-yellow-600 [ bg-gradient-to-b from-white/35 to-white/5 ]
    [ border-[3px] border-solid border-white border-opacity-30 ]
    [ shadow-black/70 shadow-2xl ]'>{val.name}</div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        )
      }
    </div>
  )
}

export default ContainerList
