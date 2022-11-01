import React from "react";
import { Oval } from "react-loader-spinner";


const Loader = () => {
  return (
    <div className="grid h-screen place-items-center">
      <Oval
              height={80}
              width={80}
              color="rgb(79 70 229)"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="rgb(129 140 248)"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
    </div>
  );
};

export default Loader;