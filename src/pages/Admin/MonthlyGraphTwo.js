import React, {useState, useEffect} from 'react'
import Loader from '../../components/Loader';
import Wrapper from '../../components/Wrapper'
import { apiConnector } from '../../redux/Utils/apiConnector';
import { useSelector } from 'react-redux';
import {GRAPH_URL } from '../../redux/Utils/constants';

const MonthlyGraphTwo = () => {

    const {userinfo} = useSelector(state => state.auth);


    const [loading, setLoading] = useState(1);
    const [error, setError] = useState(0);
    const [arr] = useState([]);

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

            for(let i=1;i<13;i++){

              const res = await apiConnector(`${GRAPH_URL}/List/${i}`,"GET",null,{Authorization: `Bearer ${userinfo.token}`});

              const num = res.data.data.filter(obj => obj.sectionMain === 'Filling').reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.pouchQuantity,0),0);

              arr.push({
                "name":months[i-1].month,
                "Pouches Filled":num,
              })

            }

          setLoading(0);
      
          } catch (e) {
            setError(1);
            console.log(e);
          }
        }

        getData();
       }, [userinfo.token,months,arr]);

  return (
    <div>

    <div></div>
    {
        error ? (
            <div className='sm:max-lg:mt-4 text-3xl font-bold text-center my-96'> Error Fetching Data</div>
        ):(
<div>
{
    loading ? (
        <Loader/>
    ):( 
        <Wrapper data={arr.slice(0,12)} dataKey={"Pouches Filled"}/>
    )
}
</div>
        )
    }
    </div>
  )
}

export default MonthlyGraphTwo
