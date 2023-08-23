import React from "react";
import { Table, Row, Col, Button } from "antd";
import InputSearch from "./InputSearch";
import { callFetchListUserWithPaginate } from "../../../apiService/api";

// https://stackblitz.com/run?file=demo.tsx
const UserTable = () => {
  const [listUser, setListUser] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [total, setTotal] = React.useState(1);
  const [current, setCurrent] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [dataSearch, setDataSearch] = React.useState({});
  const [dataSort, setDataSort] = React.useState("");

  const fetchUser = async () => {
    setIsLoading(true);
    let query = `current=${current}&pageSize=${pageSize}`;

    // search input - check object đã set rồi (khác rỗng) thì chạy vào hàm if
    if (Object.getOwnPropertyNames(dataSearch).length !== 0) {
      query += dataSearch;
    }
    // sort click
    if (dataSort) {
      query += dataSort;
    }

    const res = await callFetchListUserWithPaginate(query);
    if (res && res.statusCode === 200) {
      setListUser(res?.data?.result);
      setTotal(res?.data?.meta?.total);
    }
    setIsLoading(false);
  };
  React.useEffect(() => {
    fetchUser();
  }, [current, pageSize, dataSearch, dataSort]);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (text, record, index) => {
        return (
          <>
            <a onClick={() => console.log(record)} href="#">
              {record._id}
            </a>
          </>
        );
      },
    },
    {
      title: "Tên hiển thị",
      dataIndex: "fullName",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
    },
    {
      title: "Số diện thoại",
      dataIndex: "phone",
      sorter: true,
    },
    {
      title: "Action",
      render: (text, record, index) => {
        return (
          <>
            <button>Delete</button>
          </>
        );
      },
    },
  ];

  // const data = [
  //   {
  //     key: "1",
  //     _id: "207480201057",
  //     fullName: "Duytan",
  //     email: "thaiduytan77@gmail.com",
  //     phone: 123123123,
  //   },
  // ];

  const handleSearch = (dataQuerySearch) => {
    setDataSearch(dataQuerySearch);
  };

  // hàm có sẳn thư viện
  const onChange = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
      setPageSize(pagination.pageSize);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }

    // query sort
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
      <Row style={{ padding: "0px 15px" }} gutter={[20, 20]}>
        <Col span={24}>
          <InputSearch handleSearch={handleSearch} />
        </Col>
        <Col span={24}>
          <Table
            // onRow={(record, recordIndex) => ({
            //   onClick: (event) => {
            //     console.log(
            //       "onRow onClick",
            //       event.target,
            //       event.target.className,
            //       record,
            //       recordIndex
            //     );
            //   },
            // })}
            className="def"
            columns={columns}
            dataSource={listUser}
            onChange={onChange}
            loading={isLoading}
            pagination={{
              current: current,
              defaultCurrent: 1,
              defaultPageSize: pageSize,
              pageSize: pageSize,
              total: total,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20", "30"],
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default UserTable;
