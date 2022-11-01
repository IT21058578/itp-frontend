import React from "react";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { ReactSession } from "react-client-session";

function InvoiceList() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/invoice`, {
        params: { email: ReactSession.get("email") },
      })
      .then((response) => setInvoices(response.data))
      .catch((err) => console.log(err))
      .then(() => console.log("function run"));
  }, []);

  return (
    <div className="flex flex-col mr-16 h-full">
      <Table>
        <Table.Head>
          <Table.HeadCell>First Name</Table.HeadCell>
          <Table.HeadCell>Expire Date</Table.HeadCell>
          <Table.HeadCell>Total</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">More</span>
          </Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {invoices == null
            ? ""
            : invoices?.map((invoice) => (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={invoice?.id}
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {invoice?.firstName}
                  </Table.Cell>
                  <Table.Cell>{invoice?.invoiceExpireDate}</Table.Cell>
                  <Table.Cell>{invoice?.invoiceTotal}</Table.Cell>
                  <Table.Cell>
                    {invoice?.paymentStatus ? "Paid" : "Due"}
                  </Table.Cell>
                  <Table.Cell>
                    <a
                      href="/tables"
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      More
                    </a>
                  </Table.Cell>
                  <Table.Cell>
                    <a
                      href="/tables"
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      {invoice?.paymentStatus ? "" : "Pay"}
                    </a>
                  </Table.Cell>
                </Table.Row>
              ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default InvoiceList;

//TODO: 1. Get the Saved invoices for the logged in users email address & show as a table
