import React from "react";
import { Table, Row, Col } from "antd";
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

  // console.log("UserTable >>> dataSearch:", dataSearch);

  const fetchUser = async (dataSearch) => {
    setIsLoading(true);
    let query = `current=${current}&pageSize=${pageSize}`;

    // search input
    if (dataSearch) {
      console.log("fetchUser >>> dataSearch:", dataSearch);
      if (dataSearch.fullName) {
        query += `&fullName=/${dataSearch.fullName}/i`;
      }
      if (dataSearch.email) {
        query += `&email=/${dataSearch.email}/i`;
      }
      if (dataSearch.phone) {
        query += `&phone=/${dataSearch.phone}/i`;
      }
    }
    
    const res = await callFetchListUserWithPaginate(query);
    // console.log(res);
    if (res && res.statusCode === 200) {
      setListUser(res?.data?.result);
      setTotal(res?.data?.meta?.total);
    }
    // console.log("params", pagination, filters, sorter, extra);

    setIsLoading(false);
  };
  React.useEffect(() => {
    fetchUser(dataSearch);
  }, [current, pageSize, dataSearch]);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
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

  // hàm có sẳn thư viện
  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
    // console.log(sorter);
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
      setPageSize(pagination.pageSize);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
  };

  return (
    <>
      <Row style={{ padding: "0px 15px" }} gutter={[20, 20]}>
        <Col span={24}>
          <InputSearch setDataSearch={setDataSearch} />
        </Col>
        <Col span={24}>
          <Table
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
