import React, { useEffect, useState } from 'react'
import { apiConnector } from '../../redux/Utils/apiConnector'
import { USERINFO_URL } from '../../redux/Utils/constants';
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const UserList = () => {

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  async function displayUsers() {
    try {
      const res = await apiConnector(USERINFO_URL,"GET");
      setUsers(res.data.users);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    displayUsers();
  }, []);

  function userHandler(id){
    navigate(`/user/Profile/${id}`);
  }
 
  return (
    <div className='text-3xl flex justify-center mt-12'>

<table className=' border-2 border-black'>
<thead>
<tr className='border-2 text-start'>
   <th className='border-2 w-48 p-2'>S No.</th>
   <th className='border-2 w-96'>ID</th>
   <th className='border-2 w-48'>Name</th>
   <th className='border-2 w-96'>Email</th>
   <th className='border-2 w-48'>Edit</th>
  </tr>
</thead>
 
<tbody>
{
          users?.map((element,index)=>(
            <tr key={index} className='border-2 text-center'>
              <td className='border-2 text-lg font-bold p-2'>{index+1}</td>
              <td className='text-lg font-bold border-2'>{element._id}</td>
              <td className='capitalize  border-2 text-lg font-bold'>{element.fname}</td>
              <td className='border-2 text-lg font-bold'>{element.email}  </td>
              <td className='pl-20'>{element.isAdmin?"":<FaRegEdit className="hover:cursor-pointer" onClick={()=>userHandler(element._id)}/>}</td>
            </tr>
          ))
}
</tbody>
     
     

</table>

    </div>

  )
}

export default UserList