import React from "react";
import { Table, Row, Col, Button } from "antd";
import InputSearch from "./InputSearch";
import { callFetchListUserWithPaginate } from "../../../apiService/api";
import ViewDetailUser from "./ViewDetailUser";
import {
  CloudUploadOutlined,
  ExportOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import ModalCreateUser from "./ModalCreateUser";
import moment from "moment";
import ModalImportDataUser from "./ModalImportDataUser";

// https://stackblitz.com/run?file=demo.tsx
const UserTable = () => {
  const [listUser, setListUser] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);

  const [total, setTotal] = React.useState(1);

  const [current, setCurrent] = React.useState(1);

  const [pageSize, setPageSize] = React.useState(5);

  const [dataSearch, setDataSearch] = React.useState({});

  const [dataSort, setDataSort] = React.useState("");

  const [openDetailUser, setOpenDetailUser] = React.useState(false);

  const [dataDetailUser, setDataDetailUser] = React.useState({});

  const [openModalCreateUser, setOpenModalCreateUser] = React.useState(false);

  const [openModalImportUser, setOpenModalImportUser] = React.useState(false);

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
            <a onClick={() => handleOpenDetailUser(record)} href="#">
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
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
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

  const handleOpenDetailUser = (data) => {
    setOpenDetailUser(true);
    setDataDetailUser(data);
  };

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

  // text node Jsx, yêu cầu từ mã nguồn thư viện
  const RenderHeader = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "15px 10px",
        }}
      >
        <span>Bảng danh sách người dùng</span>
        <span style={{ display: "flex", gap: 15 }}>
          <Button type="primary" icon={<ExportOutlined />}>
            Export
          </Button>
          <Button
            type="primary"
            icon={<CloudUploadOutlined />}
            onClick={() => setOpenModalImportUser(true)}
          >
            Import
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpenModalCreateUser(true)}
          >
            Thêm mới
          </Button>
          <Button
            type="ghost"
            icon={<ReloadOutlined />}
            onClick={() => {
              setDataSearch("");
              setDataSort("");
            }}
          ></Button>
        </span>
      </div>
    );
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
            caption={<RenderHeader />}
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
              showTotal: (total, range) => {
                return (
                  <div>
                    {range[0]} - {range[1]} / {total} dòng
                  </div>
                );
              },
            }}
          />
        </Col>
      </Row>
      <ViewDetailUser
        show={openDetailUser}
        setShow={setOpenDetailUser}
        data={dataDetailUser}
      />
      <ModalCreateUser
        show={openModalCreateUser}
        setShow={setOpenModalCreateUser}
        fetchUser={fetchUser}
      />
      <ModalImportDataUser
        show={openModalImportUser}
        setShow={setOpenModalImportUser}
        fetchUser={fetchUser}
      />
    </>
  );
};

export default UserTable;
