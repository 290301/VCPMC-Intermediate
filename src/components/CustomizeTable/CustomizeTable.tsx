import './CustomizeTable.css';
import { Table, Pagination } from 'antd';
import { useState } from 'react';

type ColumnProps = {
      title: string;
      dataIndex: string;
      key?: string;
};
type CustomizeTableProps = {
      columns: ColumnProps[];
      dataSource: any;
      pageSize: number;
};

export const CustomizeTable = (props: CustomizeTableProps) => {
      const [currentPage, setCurrentPage] = useState<number>(1);
      const getData = (current: number, pageSize: number) => {
            return props.dataSource.slice((current - 1) * pageSize, current * pageSize);
      };
      return (
            <div className="customize-table-wrapper">
                  <Table
                        columns={props.columns}
                        dataSource={getData(currentPage, props.pageSize)}
                        pagination={false}
                        loading={props.dataSource.length ? false : true}
                  />
                  <Pagination
                        total={props.dataSource?.length}
                        current={currentPage}
                        pageSize={props.pageSize}
                        onChange={setCurrentPage}
                  />
            </div>
      );
};
