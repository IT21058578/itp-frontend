import React from "react";
import { Oval } from "react-loader-spinner";


const Loader = () => {
  return (
    <div className="grid h-screen place-items-center">
      <Oval
              height={80}
              width={80}
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#4fa94d"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
    </div>
  );
};

export default Loader;