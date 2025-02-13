import React, { useEffect, useState } from 'react'
import { apiConnector } from '../../redux/Utils/apiConnector'
import { USERINFO_URL } from '../../redux/Utils/constants';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader';

const UserList = () => {

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(1);

  const {userinfo} = useSelector(state=>state.auth);
  
  useEffect(() => {

    async function displayUsers() {
      try {
        const res = await apiConnector(USERINFO_URL,"GET",null,{Authorization: `Bearer ${userinfo.token}`});
        setUsers(res.data.users);

        setLoading(0);
      } catch (error) {
        console.log(error);
      }
    }

    displayUsers();
  }, [userinfo.token]);
 
  return (
    <div className='text-3xl '>
  {
    loading ? (<Loader/>
    ) : (
      <table className=' border-2 mx-auto  border-black my-12 sm:max-lg:mx-4'>
<thead>
<tr className='border-2 border-black text-start'>
   <th className='border-2 border-black w-48 p-2'>S No.</th>
   <th className='border-2 border-black w-48'>Name</th>
   <th className='border-2 border-black w-96'>Email</th>
   <th className='border-2 border-black w-48'>Edit</th>
  </tr>
</thead>
 
<tbody>
{
          users?.map((element,index)=>(
            <tr key={index} className='border-2 text-center'>
              <td className='border-2 text-lg font-bold p-2 border-black'>{index+1}</td>
              <td className='capitalize  border-2 text-lg font-bold border-black'>{element.fname}</td>
              <td className='border-2 text-lg font-bold border-black'>{element.email}  </td>
              <td className=' border-black border-2 font-bold text-lg'>{element.isAdmin?"Admin":"User"}</td>
            </tr>
          ))
}
</tbody>
     
     

</table>

    ) 
  }

    </div>

  )
}

export default UserList