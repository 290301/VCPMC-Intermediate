import './CustomizeTable.css';
import { Table, Pagination } from 'antd';
import { useState } from 'react';
import { TableRowSelection } from 'antd/es/table/interface';
type ColumnProps = {
      title: string;
      dataIndex: string;
      key?: string;
};
export type RowSelection = {
      isShowRowSelection?: boolean;
      onChange?: (selectedRowKeys: React.Key[], selectedRows: any[]) => void;
      selectedRowKeys: string[];
};
type CustomizeTableProps = {
      columns: ColumnProps[];
      dataSource: any;
      pageSize: number;
      rowSelection: RowSelection;
};

export const CustomizeTable = ({ columns, dataSource, pageSize, rowSelection }: CustomizeTableProps) => {
      const [currentPage, setCurrentPage] = useState<number>(1);
      const getData = (current: number, pageSize: number) => {
            return dataSource.slice((current - 1) * pageSize, current * pageSize);
      };

      const rowSelectionOption: TableRowSelection<any> | undefined = {
            onChange: rowSelection.onChange,
            selectedRowKeys: rowSelection.selectedRowKeys,
      };

      return (
            <div className="customize-table-wrapper">
                  <Table
                        rowSelection={rowSelection.isShowRowSelection ? rowSelectionOption : undefined}
                        columns={columns}
                        dataSource={getData(currentPage, pageSize)}
                        pagination={false}
                        loading={dataSource.length ? false : true}
                  />
                  <div
                        style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginTop: '10px',
                        }}
                  >
                        <div style={{ color: 'var(--color-text-stroke)', fontSize: '14px', opacity: '0.7' }}>
                              Hiển thị
                              <span
                                    style={{
                                          padding: '6px 18px',
                                          border: '1px solid var(--color-orange)',
                                          borderRadius: '4px',
                                          margin: '0px 10px',
                                          color: '#fff',
                                          fontWeight: '600',
                                    }}
                              >
                                    {pageSize}
                              </span>
                              hàng trong mỗi trang
                        </div>
                        <Pagination
                              total={dataSource?.length}
                              current={currentPage}
                              pageSize={pageSize}
                              onChange={setCurrentPage}
                        />
                  </div>
            </div>
      );
};
