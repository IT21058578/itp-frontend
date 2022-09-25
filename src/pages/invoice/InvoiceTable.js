
import React from "react";

function InvoiceTable({services}){
  services.map(item => {
    return(
      <tr key={item.key}>
        <th>{item.name}</th>
      </tr>
    )
  })

}

export default InvoiceTable;