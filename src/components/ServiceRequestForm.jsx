import React from 'react'

function ServiceRequestForm() {
  return (
    <div classNAme=" transition-all relative justify-center items-center">
        <div className="border-2 border-gray-200 shadow-md m-40 text-center p-10 w-9/12">
            <p className=" text-2xl p-6">Request new Service</p>
            <div className=""></div>
            <label class="block text-sm font-medium text-gray-500 dark:text-gray-400" for="inline-full-name">
             Service Name  
            </label>
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white      focus:border-purple-500" id="updatedName" type="text" placeholder="Service Name" onChange={0}/><br/>
            <br/>

            <label for="inline-full-name" className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400" >
             Why you need this Service  
            </label>
            <textarea rows="4" cols="50" className="p-2.5 text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="updatedDesc" placeholder="Tell about that service" onChange={0}></textarea><br/>


            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={0}>Send Request</button>
        </div>
      
    </div>
  )
}

export default ServiceRequestForm
