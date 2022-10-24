import React from "react";
import { Table } from 'flowbite-react';


function Instruments({cards}){
  
  return(
    <Table>
  <Table.Head>
    <Table.HeadCell>
      Card Number
    </Table.HeadCell>
    <Table.HeadCell>
      Expiry Date
    </Table.HeadCell>
    <Table.HeadCell>
      Category
    </Table.HeadCell>
    <Table.HeadCell>

      Type
    </Table.HeadCell>
    <Table.HeadCell>
      <span className="sr-only">
        Edit
      </span>
    </Table.HeadCell>
  </Table.Head>
  <Table.Body className="divide-y">
  
  {cards == null ? console.error("no data") : cards.map( (card, id) => (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={card.card_no}>
    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
    {card.card_no}
    </Table.Cell>
    <Table.Cell>
    {card.exp_date}
    </Table.Cell>
    <Table.Cell>

    {card.card_type}
    </Table.Cell>
    <Table.Cell>
        <a
          href="/tables"
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Edit
        </a>
      </Table.Cell>
    </Table.Row>
))        
  }
  </Table.Body>
</Table>
  );
}

export default Instruments;