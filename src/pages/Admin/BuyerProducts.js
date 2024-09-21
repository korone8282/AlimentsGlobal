import React, {useState, useEffect} from 'react'
import Loader from '../../components/Loader';
import { apiConnector } from '../../redux/Utils/apiConnector';
import { useSelector } from 'react-redux';
import { CATEGORIES_URL  } from '../../redux/Utils/constants';
import { DATA_URL } from '../../redux/Utils/constants';
import { PRODUCT_URL } from '../../redux/Utils/constants';

const BuyerProducts = () => {


    const [sectionData, setSectionData] = useState([]);
    const [indexing, setindexing] = useState(-1);
    const [loading, setLoading] = useState(1);
    const [products, setproducts] = useState([]);
    const [error, setError] = useState(0);
    const [categories, setcategories] = useState([]);
    const [info, setInfo] = useState({
        start:"",
        end:"",
        buyer:"",
    });

    const pSize = [0.125,0.13,0.175,0.2,0.22,0.225,0.25,0.3,0.35,0.375,0.4,0.45,0.5,0.6,1];

    const {userinfo} = useSelector(state => state.auth);

      async function getData(){
        try {
        setError(0);
        setLoading(1);
        
          const res = await apiConnector(`${DATA_URL}/List`,"PUT",info,{Authorization: `Bearer ${userinfo.token}`});

         setSectionData(res.data.data.map(e=>e.dataList.filter( buyer => buyer.buyerName === info.buyer)));

        setLoading(0);
        

        } catch (e) {
          setError(1);
          console.log(e);
        }
      }
   
    useEffect(() => {

        async function getCategories(){
          try {
    
        const res = await apiConnector(`${CATEGORIES_URL}/categories`,"GET");
        setcategories(res.data.data);
    
        setLoading(0);
          } catch (e) {
            console.log(e)
          }
          }

          async function getProducts(){
            try {
      
          const res = await apiConnector(`${PRODUCT_URL}/products`,"GET");
          setproducts(res.data.data);
      
          setLoading(0);
            } catch (error) {
              console.log(error);
            }
            }
        
        getProducts();
        getCategories();

      }, []);

    const inputHandler = async(e) =>{
        setInfo((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value
        }));
      }

  return (
    <div>
    <div className='flex justify-center my-8 text-2xl font-bold gap-24 sm:max-lg:gap-10 sm:max-lg:mx-4'>
        <div>
        <select
                 name='buyer'
                 className='hover:border-black hover:border-2 text-xl font-bold h-16 w-[9.6rem] text-center rounded-xl bg-[#f59e0b]'
                 onChange={ e => inputHandler(e) }
            >
            <option className=' bg-[#f59e0b] '>Select</option>
            {
                categories.map((val,index)=>(<option className=' bg-[#f59e0b]' value={val.name} key={index}>{val.name}</option>))
            }
            </select>
        </div>
        <div>
        <label>Start: </label>
            <input type='date'
                   name='start'
                   onChange={ e => inputHandler(e) }
            />
        </div>
        <div>
        <label>End: </label>
            <input type='date'
                   name='end'
                   onChange={ e => inputHandler(e) }
            />
        </div>
        <div className='text-xl select-none font-semibold h-16 w-[9.6rem] text-center hover:bg-black hover:text-white rounded-xl -mt-2 sm:max-lg:mt-0.5 pt-4 bg-[#f59e0b]' 
             onClick={getData}
             >Submit</div>
    </div>

     {
       error ? (<div className='text-center font-bold text-7xl mt-64 text-[#f59e0b]'>No Data Entry Found</div>
       ) : (
         <div>
    {
     loading ? ( <Loader/>
     ) : (
       <div>
       <table className='w-[80rem] mx-auto text-center text-black my-12 sm:max-lg:w-fit sm:max-lg:mx-3'>
       <thead>
         <tr>
           <th rowSpan={2} className='border-4 border-black p-1'>S no.</th>
           <th rowSpan={2} className='border-4 border-black p-8'>Product Name</th>
           <th rowSpan={2} className='border-4 border-black p-1'>No. Of Batches</th>
           <th rowSpan={2} className='border-4 border-black p-4'>Production (kg)</th>
           <th rowSpan={2} className='border-4 border-black p-4'>No. Of Pouch Filled</th>
           <th rowSpan={2} className='border-4 border-black p-4'>No. Of Pouch Packed</th>
           <th rowSpan={2} className='border-4 border-black p-4'>No. Of Unit Rejected</th>
           <th rowSpan={2} className='border-4 border-black p-1'>No. Of Box Packed</th>
         </tr>
       </thead>


             {
              products.filter(product=> product.buyer === info.buyer).map((element,index)=>(
                <tbody key={index}>
      <tr  onClick={()=>setindexing(index)}>
                  <td className='border-4 border-black font-bold p-3'>{index+1}</td>
                  <td className='border-4 border-black font-bold'> {element.name} </td>
                  <td className='border-4 border-black font-bold'>{ sectionData.reduce((acc,obj)=> acc+obj.filter(item=>item.productName === element.name).reduce( (accumulator, object) => accumulator + object.batchQuantity,0),0)}</td>
                  <td className='border-4 border-black font-bold'>{ sectionData.reduce((acc,obj)=> acc+obj.filter(item=>item.productName === element.name).reduce( (accumulator, obj) => accumulator + obj.yield*obj.batchQuantity,0),0).toFixed(2)}</td>
                  <td className='border-4 border-black font-bold'>{ sectionData.reduce((acc,obj)=> acc+obj.filter(item=>item.productName === element.name).reduce( (accumulator, obj) => accumulator + obj.pouchQuantity,0),0)}</td>
                  <td className='border-4 border-black font-bold'>{ sectionData.reduce((acc,obj)=> acc+obj.filter(item=>item.productName === element.name).reduce( (accumulator, obj) => accumulator + obj.pouchPacked,0),0)}</td>
                  <td className='border-4 border-black font-bold'>{ 
                    sectionData.reduce((acc,obj)=> acc+obj.filter(item=>item.productName === element.name).reduce( (accumulator, obj) => accumulator + obj.leaked,0),0) +
                    sectionData.reduce((acc,obj)=> acc+obj.filter(item=>item.productName === element.name).reduce( (accumulator, obj) => accumulator + obj.foreignMatter,0),0) +
                    sectionData.reduce((acc,obj)=> acc+obj.filter(item=>item.productName === element.name).reduce( (accumulator, obj) => accumulator + obj.empty,0),0)
                    }</td>
                  <td className='border-4 border-black font-bold'>{ sectionData.reduce((acc,obj)=> acc+obj.filter(item=>item.productName === element.name).reduce( (accumulator, obj) => accumulator + obj.box,0),0)}</td>
                  </tr>
                  
                  {
                    pSize.map((ele,i)=>(
                      <tr className={`${indexing !== index ? "hidden" : null} bg-slate-200`} 
                      onClick={()=>setindexing(-1)}>
                  <td className='border-4 border-black font-bold p-3'>•</td>
                  <td className='border-4 border-black font-bold'> {ele} KG </td>
                  <td className='border-4 border-black font-bold'>{ sectionData.reduce((acc,obj)=> acc+obj.filter(item=>item.productName === element.name && ele === item.packSize).reduce( (accumulator, object) => accumulator + object.batchQuantity,0),0)}</td>
                  <td className='border-4 border-black font-bold'>{ sectionData.reduce((acc,obj)=> acc+obj.filter(item=>item.productName === element.name && ele === item.packSize).reduce( (accumulator, obj) => accumulator + obj.yield*obj.batchQuantity,0),0).toFixed(2)}</td>
                  <td className='border-4 border-black font-bold'>{ sectionData.reduce((acc,obj)=> acc+obj.filter(item=>item.productName === element.name && ele === item.packSize).reduce( (accumulator, obj) => accumulator + obj.pouchQuantity,0),0)}</td>
                  <td className='border-4 border-black font-bold'>{ sectionData.reduce((acc,obj)=> acc+obj.filter(item=>item.productName === element.name && ele === item.packSize).reduce( (accumulator, obj) => accumulator + obj.pouchPacked,0),0)}</td>
                  <td className='border-4 border-black font-bold'>{ sectionData.reduce((acc,obj)=> acc+obj.filter(item=>item.productName === element.name && ele === item.packSize).reduce( (accumulator, obj) => accumulator + obj.retortCycle,0),0)}</td>
                  <td className='border-4 border-black font-bold'>{ 
                    sectionData.reduce((acc,obj)=> acc+obj.filter(item=>item.productName === element.name && ele === item.packSize).reduce( (accumulator, obj) => accumulator + obj.leaked,0),0) +
                    sectionData.reduce((acc,obj)=> acc+obj.filter(item=>item.productName === element.name && ele === item.packSize).reduce( (accumulator, obj) => accumulator + obj.foreignMatter,0),0) +
                    sectionData.reduce((acc,obj)=> acc+obj.filter(item=>item.productName === element.name && ele === item.packSize).reduce( (accumulator, obj) => accumulator + obj.empty,0),0)
                    }</td>
                  <td className='border-4 border-black font-bold'>{ sectionData.reduce((acc,obj)=> acc+obj.filter(item=>item.productName === element.name && ele === item.packSize).reduce( (accumulator, obj) => accumulator + obj.box,0),0)}</td>
                  </tr>
                    ))
                  }
                
                  </tbody>
     ))}

                     </table>
     </div>)
    }
    
    </div>
          )
     }
   </div>
  )
}

export default BuyerProducts
