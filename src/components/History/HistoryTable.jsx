import { Space, Table, Tag } from "antd";
import React from "react";
import { callFetchHistoryWithPaginate } from "../../apiService/api";
import moment from "moment";
import ReactJson from "react-json-view";

const HistoryTable = () => {
  const [loading, setLoading] = React.useState(false);
  const [current, setCurrent] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [total, setTotal] = React.useState(1);

  const [listHistory, setListHisotry] = React.useState([]);
  const [dataSort, setDataSort] = React.useState("");

  const fetchListHistory = async () => {
    setLoading(true);
    let query = `current=${current}&pageSize=${pageSize}`;

    if (dataSort) {
      query += dataSort;
    }

    const res = await callFetchHistoryWithPaginate(query);
    if (res && res.data) {
      setListHisotry(res?.data?.result);
      setTotal(res?.data?.meta?.total);
    }
    setLoading(false);
  };
  const getExampleJson = (record) => {
    const result = record?.detail.map((item) => {
      return {
        bookName: `${item?.bookName}`,
        quantity: item?.quantity,
        _id: `${item?._id}`,
      };
    });
    return result;
  };
  React.useEffect(() => {
    fetchListHistory();
  }, [dataSort, current, pageSize]);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Thời gian",
      dataIndex: `updatedAt`,
      key: "updatedAt",
      sorter: true,
      render: (text, record, index) => {
        return (
          <>
            <span>
              {moment(record.updatedAt).format("DD-MM-YYYY HH:mm:ss")}
            </span>
          </>
        );
      },
    },
    {
      title: "Tổng số tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      sorter: true,
      render: (text, record, index) => {
        return (
          <>
            <span>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(record?.totalPrice)}
            </span>
          </>
        );
      },
    },
    {
      title: "Trạng thái",
      key: "status",
      //   dataIndex: "status",
      render: (text, record, index) => {
        return (
          <>
            <span>
              <Tag color={"green"}>Thành công</Tag>
            </span>
          </>
        );
      },
    },
    {
      title: "Chi tiết",
      key: "detail",
      dataIndex: "detail",
      render: (text, record, index) => {
        return (
          <>
            <span>
              <ReactJson
                src={getExampleJson(record)}
                enableClipboard={false}
                displayDataTypes={false}
                displayObjectSize={false}
                collapsed={true}
                name={"Chi tiết đơn mua"}
                theme="bright:inverted"
              />
            </span>
          </>
        );
      },
    },
  ];

  const handleOnChangeTable = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
      setPageSize(pagination.pageSize);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
    // console.log(sorter);
    // // query sort
    if (sorter && sorter.field) {
      setDataSort(
        `&sort=${
          sorter.order === "ascend" ? `${sorter.field}` : `-${sorter.field}`
        }`
      );
    }
  };
  return (
    <>
      <Table
        bordered
        className="history-table"
        columns={columns}
        dataSource={listHistory}
        onChange={handleOnChangeTable}
        loading={loading}
        pagination={{
          current: current,
          defaultCurrent: 1,
          defaultPageSize: pageSize,
          pageSize: pageSize,
          total: total,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10"],
          showTotal: (total, range) => {
            return (
              <div>
                {range[0]} - {range[1]} / {total} dòng
              </div>
            );
          },
        }}
      />
    </>
  );
};

export default HistoryTable;
