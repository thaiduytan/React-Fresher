import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Modal, Upload, Table, Button, notification, message } from "antd";
import * as XLSX from "xlsx";
import { callBulkCreateUser } from "../../../../apiService/api";

// https://vitejs.dev/guide/assets.html#explicit-url-imports
import templateFile from "./template.xlsx?url";
const ModalImportDataUser = ({ show, setShow, fetchUser }) => {
  const [dataExcel, setDataExcel] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const handleOk = () => {
    // setIsModalOpen(false);
  };
  const handleCancel = () => {
    // setIsModalOpen(false);
    setShow(false);
    setDataExcel([]);
  };

  const handleBulkCreateUser = async () => {
    const data = dataExcel.map((item) => {
      item.password = "123456";
      return item;
    });
    setLoading(true);
    const res = await callBulkCreateUser(data);
    if (res?.data) {
      notification.success({
        message: "Upload thành công",
        description: `Success: ${res.data?.countSuccess}, Error: ${res.data?.countError}`,
        duration: 3,
      });
      setDataExcel([]);
      setShow(false);
      fetchUser();
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
        duration: 5,
      });
    }
    setLoading(false);
  };

  const { Dragger } = Upload;

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 1000);
    // files[0] = file[0];
  };

  const propsUpload = {
    name: "file",
    multiple: true,
    maxCount: 1,

    //accept: chấp nhận đuôi file excel,
    // gg : https://stackoverflow.com/questions/11832930/html-input-file-accept-attribute-file-type-csv
    accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

    //action sẽ gửi trực tiếp file lên url, tránh tình trạng gửi trực tiếp - ta xử dụng customRequest: dummyRequest,
    //searrch gg : https://stackoverflow.com/questions/51514757/action-function-is-required-with-antd-upload-control-but-i-dont-need-it
    //action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    customRequest: dummyRequest,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded thành công.`);

        // https://stackoverflow.com/questions/66171804/importing-xlsx-and-parsing-to-json
        if (info.fileList && info.fileList.length > 0) {
          const file = info.fileList[0].originFileObj;
          let reader = new FileReader();

          reader.onload = function (e) {
            let data = new Uint8Array(e.target.result);
            let workbook = XLSX.read(data, { type: "array" });
            // find the name of your sheet in the workbook first
            let worksheet = workbook.Sheets[workbook.SheetNames[0]];
            // convert to json format
            const jsonData = XLSX.utils.sheet_to_json(worksheet, {
              header: ["fullName", "email", "phone"],
              range: 1,
            });
            if (jsonData && jsonData.length > 0) {
              setDataExcel(jsonData);
            }
          };
          reader.readAsArrayBuffer(file);
        }
      } else if (status === "error") {
        message.error(`${info.file.name} file upload thất bại.`);
      }
    },
    onDrop(e) {},
  };

  // const dataSource = dataExcel;
  return (
    <>
      <Modal
        title="Import data user"
        open={show}
        onOk={handleOk}
        onCancel={handleCancel}
        width={"50%"}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleBulkCreateUser}
          >
            Import data
          </Button>,
        ]}
        okButtonProps={{
          disabled: dataExcel.length < 1,
        }}
      >
        {/* compornt upload file */}
        <Dragger {...propsUpload}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single upload. Only accept .csv, .xls, .xlsx, or
            &nbsp;
            <a
              onClick={(e) => e.stopPropagation()}
              href={templateFile}
              download
            >
              Dowload Sample File
            </a>
          </p>
        </Dragger>
        <div className="" style={{ paddingTop: 20 }}>
          <Table
            pagination={{
              defaultPageSize: 3,
              // showSizeChanger: true,
              // pageSizeOptions: ["10", "20", "30"],
            }}
            caption={
              <div style={{ width: "100%", textAlign: "left" }}>
                <span style={{ fontWeight: "bold" }}> Dữ liệu upaload:</span>
              </div>
            }
            dataSource={dataExcel}
            columns={[
              {
                title: "Tên hiển thị",
                dataIndex: "fullName",
                key: "fullname",
              },
              {
                title: "Email",
                dataIndex: "email",
                key: "email",
              },
              {
                title: "Số điện thoại",
                dataIndex: "phone",
                key: "phone",
              },
            ]}
          />
        </div>
      </Modal>
    </>
  );
};

export default ModalImportDataUser;
