import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import currency from 'currency.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import Loading from 'shared/components/Loading';
import BackButton from 'shared/components/BackButton';
import Table from 'shared/components/Table';
import Tooltip from 'shared/components/Tooltip';
import { paymentFormattedDate } from 'shared/utils/date';

import { initialLoadInit } from './actionCreators';
import { getPageLoading, getPaymentHistory } from './reducer';

const SUCCESS = 'success';

const PaymentHistoryPage = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(getPageLoading);
  const paymentHistory = useSelector(getPaymentHistory);

  useEffect(() => {
    dispatch(initialLoadInit());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Date',
        accessor: (row) => paymentFormattedDate(row.date),
      },
      {
        Header: 'Amount',
        accessor: (row) =>
          `$ ${currency(row.amount, {
            symbol: '$',
            precision: 2,
          })}`,
      },
      {
        Header: 'Discount',
        accessor: (row) =>
          `$ ${currency(row.discount, {
            symbol: '$',
            precision: 2,
          })}`,
      },
      {
        Header: 'CC Cash',
        accessor: (row) =>
          `$ ${currency(row.ccCash, {
            symbol: '$',
            precision: 2,
          })}`,
      },
      {
        Header: 'Card',
        accessor: 'last4',
      },
      {
        Header: 'Status',
        accessor: (row) => {
          const isSuccess = row.status === SUCCESS;
          const icon = isSuccess ? faCheckCircle : faTimesCircle;
          const color = isSuccess ? 'green' : 'red';
          return (
            <Tooltip tooltip={row.errorMessage || ''}>
              <FontAwesomeIcon icon={icon} color={color} />
            </Tooltip>
          );
        },
      },
    ],
    []
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="px-4 py-10">
      <BackButton className="my-6 md:mt-0 ml-0" />
      <h2 className="text-center font-shapiro95_super_wide mb-4">PAYMENT HISTORY</h2>
      <Table
        columns={columns}
        data={paymentHistory}
        className="w-full lg:max-w-screen-lg text-center font-bold mx-auto overflow-y-auto"
        headerClassName="bg-cc-black text-white"
      />
    </div>
  );
};

export default PaymentHistoryPage;