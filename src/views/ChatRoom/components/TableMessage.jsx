import { Table } from 'antd';
import './Message.css';

function TableMessage({ text, columns, dataSource, pagination }) {
  return (
    <div className="message-table">
      {text && <div className="message-text">{text}</div>}
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={pagination || false}
        size="small"
        className="message-data-table"
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
}

export default TableMessage;
