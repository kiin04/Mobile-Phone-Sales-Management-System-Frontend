import { Button, ConfigProvider, Table } from "antd";
import React, { useRef } from "react";
import Loading from "../LoadingComponent/Loading";
import { CSVLink } from "react-csv";

const TableComponent = (props) => {
  const {
    selectionType = "checkbox",
    data = [],
    isLoading = false,
    columns = [],
    headers = [],
    filename = "EXEL",
  } = props;

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRows}`);
    },
  };
 
  
  return (
    <Loading isPending={isLoading}>
      <div style={{ padding: "10px" }}>
        <Button type="primary">
          <CSVLink
            style={{ textDecoration: "none" }}
            filename={filename}
            headers={headers}
            data={data}
          >
            Xuất file
          </CSVLink>
        </Button>
      </div>
      <Table
        rowSelection={{ type: selectionType, ...rowSelection }}
        columns={columns}
        dataSource={data}
        {...props}
      />
    </Loading>
  );
};

export default TableComponent;
