import React from "react";
import { useEffect } from "react";
import { Table } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function Instruments({ cards }) {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(cards);
  }, [cards]);

  return (
    <div className="flex flex-col mr-16 h-full">
      <Table>
        <Table.Head>
          <Table.HeadCell>Card Number</Table.HeadCell>
          <Table.HeadCell>Expiry Date</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Type</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {cards == null
            ? ""
            : cards?.map((card) => (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={card?.id}
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {card?.cardNumber}
                  </Table.Cell>
                  <Table.Cell>{card?.expiryDate}</Table.Cell>
                  <Table.Cell>{card?.cardType}</Table.Cell>
                  <Table.Cell>
                    <div
                      onClick={() => navigate(`instrument?id=${card.id}`)}
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      More
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default Instruments;
