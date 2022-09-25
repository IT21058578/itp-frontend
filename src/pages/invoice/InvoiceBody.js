
import React from "react";
function InvoiceBody({services, totalPrice}){

  return(    
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
<th scope="col" className="px-6 py-3">
Service Name
</th>
<th scope="col" className="px-6 py-3">Description</th>
<th scope="col" className="px-6 py-3">Image</th>
<th scope="col" className="px-6 py-3">Price</th>
<th scope="col" className="px-6 py-3">
<span className="sr-only">Edit</span>
</th>
<th scope="col" className="px-6 py-3">
<span className="sr-only">Delete</span>
</th>
      </tr>
    </thead>

    <tbody>
{services.map( (item, id) => (
      <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.name}</th>
        <th className="py-4 px-6 ">{item.desc}</th>
        <th className="py-4 px-6">{item.imgUrl}</th>
        <th className="py-4 px-6 text-right">{item.basicPrice.toLocaleString()}</th>
      </tr>
))
}
  </tbody>
  
  <tfoot>


    <tr className="font-semibold text-gray-900 dark:text-white">
      <th scope="row" className="py-3 px-6 text-base">Total</th>
      <td className="py-3 px-6">{services.length} Items</td>
      <td className="py-3 px-6"></td>
      <td className="py-3 px-6 text-right">{totalPrice.toLocaleString()}</td>
            </tr>
    </tfoot>
 </table>
</div>


  )

}

export default InvoiceBody