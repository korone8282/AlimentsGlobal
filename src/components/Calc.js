import React, { useState} from 'react';
import { toast } from 'react-toastify';
import { FaMicrophone } from "react-icons/fa6";

const Calc = () => {

  const [position, setPosition] = useState({ x: 650, y: 300 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [val, setVal] = useState();

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  function calc(){
    try {
      setVal(eval(val));
    } catch (error) {
      toast("Enter Correctly")
    }

  }

  function editHandle(e){
    if(e.key==="Enter"){
      calc();
    }
  }

  function speak(){

             var speech = true;
            const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.interimResults = true;
    
                recognition.addEventListener('result', e=>{
                        const transcript = Array.from(e.results).map(result =>result[0]).map(result => result.transcript)
                        setVal(val+transcript[0]);
                })
    
        if(speech === true){
            recognition.start();
            }
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        backgroundColor: 'black',
        cursor: 'move'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="bg-gray-700 rounded-3xl select-none p-4">

<div className="bg-gray-800 border-2 h-[17.5rem] border-gray-900 shadow-2xl rounded-3xl">

  <div className="border-b-2 border-gray-900 flex gap-2 items-center p-2 mt-5">
    <input type="text" className="bg-slate-700 p-8 rounded-t-lg outline-none focus:bg-gray-700 text-3xl text-right text-white font-mono" 
           onChange={(e)=> setVal(e.target.value) }
           onKeyDown={(e)=> editHandle(e)}
           autoComplete='off'
           name='val'
           value={val}
    />
  <FaMicrophone size={32} onClick={speak}
  />
  </div>

  <div className="p-6 text-gray-800 flex justify-evenly text-xl ">
    <button className="font-mono bg-blue-500 hover:bg-blue-400 rounded-full px-16 p-5"
            onClick={()=>setVal("")}
            >Clear</button>
    <button className="font-mono bg-purple-500 hover:bg-purple-400 rounded-full px-20"
            onClick={calc}
            >=</button>
  </div>
</div>

</div>
    </div>
  );
};

export default Calc;
