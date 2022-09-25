import React from 'react'

import CustomerNavBar from '../components/CustomerNavBar';
import CustomerFooter from '../components/CustomerFooter';

function HomePage(){
  return(
    <div className="flex flex-col h-screen">
      <CustomerNavBar />
      <div className="bg-gray-300 flex-grow"></div>
      <CustomerFooter />
    </div>
  )
}

export default HomePage