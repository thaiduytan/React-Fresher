import React from "react";
import InputSearch from "./InputSearch";
import {
  Table,
  Row,
  Col,
  Button,
  Popconfirm,
  message,
  notification,
} from "antd";
import {
  CloudUploadOutlined,
  DeleteTwoTone,
  EditTwoTone,
  ExportOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  callDeleteBook,
  callFetchListBookWithPaginate,
} from "../../../apiService/api";
import * as XLSX from "xlsx";
import moment from "moment";
import BookViewDetail from "./BookViewDetail";
import BookModalCreate from "./BookModalCreate";
import BookModalUpdate from "./BookModalUpdate";

const BookTable = () => {
  const [listBook, setListBook] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [current, setCurrent] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [total, setTotal] = React.useState(1);
  const [dataSort, setDataSort] = React.useState("");
  const [dataSearch, setDataSearch] = React.useState("");

  const [openViewDetailBook, setOpenViewDetailBook] = React.useState(false);
  const [dataDetailBook, setDataDetailBook] = React.useState({});

  const [openCreateBook, setOpenCreateBook] = React.useState(false);

  const [openUpdateBook, setOpenUpdateBook] = React.useState(false);
  const [dataUpdateBook, setDataUpdateBook] = React.useState({});

  const fetchBook = async () => {
    setLoading(true);
    let query = `current=${current}&pageSize=${pageSize}&sort=-updatedAt`;
    // console.log(query);

    // search input - check object đã set rồi (khác rỗng) thì chạy vào hàm if
    if (Object.getOwnPropertyNames(dataSearch).length !== 0) {
      query += dataSearch;
    }
    if (dataSort) {
      query += dataSort;
    }

    const res = await callFetchListBookWithPaginate(query);
    if (res && res.statusCode === 200) {
      setListBook(res?.data?.result);
      setTotal(res?.data?.meta?.total);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    fetchBook();
  }, [current, pageSize, dataSort, dataSearch]);

  const handleSearch = (query) => {
    setDataSearch(query);
  };
  const handleOpenDetailBook = (data) => {
    setOpenViewDetailBook(true);
    setDataDetailBook(data);
  };

  const hanldeDeleteBook = async (_idBook) => {
    const res = await callDeleteBook(_idBook);
    if (res && res.data) {
      message.success("Xóa Book thành công");
      fetchBook();
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
      });
    }
  };

  const hanldeOpenModalUpdateUser = (data) => {
    // console.log(data);
    setOpenUpdateBook(true);
    setDataUpdateBook(data);
  };
  // https://stackoverflow.com/questions/70871254/how-can-i-export-a-json-object-to-excel-using-nextjs-react
  const hanldeExportFileBook = (data) => {
    if (data && data.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
      //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
      XLSX.writeFile(workbook, "OpenpingExportBook.xlsx");
    }
  };

  const onChange = (pagination, filters, sorter, extra) => {
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

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (text, record, index) => {
        return (
          <>
            <a onClick={() => handleOpenDetailBook(record)} href="#">
              {record._id}
            </a>
          </>
        );
      },
    },
    {
      title: "Tên sách",
      dataIndex: "mainText",
      sorter: true,
    },
    {
      title: "Thể loại",
      dataIndex: "category",
      sorter: true,
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      sorter: true,
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      render: (text, record, index) => {
        return (
          <>
            <span>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(record?.price)}
            </span>
          </>
        );
      },
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
      width: 150,
      render: (text, record, index) => {
        return (
          <>
            <Popconfirm
              placement="leftTop"
              title={"Xác nhận xóa Book"}
              description={"Bạn có chắc chắn muốn xóa Book này"}
              onConfirm={() => hanldeDeleteBook(record._id)}
              okText="Xác nhận"
              cancelText="Hủy"
            >
              <span style={{ cursor: "pointer", margin: "0px 20px" }}>
                <DeleteTwoTone twoToneColor="#ff4d4f"></DeleteTwoTone>
              </span>
            </Popconfirm>
            <EditTwoTone
              twoToneColor="#f57800"
              style={{ cursor: "pointer" }}
              onClick={() => hanldeOpenModalUpdateUser(record)}
            ></EditTwoTone>
          </>
        );
      },
    },
  ];
  const RenderHeader = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "15px 10px",
        }}
      >
        <span>Table List Books</span>
        <span style={{ display: "flex", gap: 15 }}>
          <Button
            type="primary"
            icon={<ExportOutlined />}
            onClick={() => hanldeExportFileBook(listBook)}
          >
            Export
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpenCreateBook(true)}
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
            className="def"
            caption={<RenderHeader />}
            columns={columns}
            dataSource={listBook}
            onChange={onChange}
            loading={loading}
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
      <BookViewDetail
        show={openViewDetailBook}
        setShow={setOpenViewDetailBook}
        data={dataDetailBook}
      ></BookViewDetail>
      <BookModalCreate
        show={openCreateBook}
        setShow={setOpenCreateBook}
        fetchBook={fetchBook}
      ></BookModalCreate>
      <BookModalUpdate
        show={openUpdateBook}
        setShow={setOpenUpdateBook}
        dataUpdate={dataUpdateBook}
        setDataUpdate={setDataUpdateBook}
        fetchBook={fetchBook}
      ></BookModalUpdate>
    </>
  );
};

export default BookTable;
