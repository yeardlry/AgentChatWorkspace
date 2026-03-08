import { Statistic, Row, Col } from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  UserOutlined,
  DollarOutlined,
  RiseOutlined,
  FallOutlined
} from '@ant-design/icons';
import './Message.css';

const iconMap = {
  ArrowUpOutlined,
  ArrowDownOutlined,
  UserOutlined,
  DollarOutlined,
  RiseOutlined,
  FallOutlined
};

function StatisticMessage({ text, statistics }) {
  return (
    <div className="message-statistic">
      {text && <div className="message-text">{text}</div>}
      {statistics && statistics.length > 0 && (
        <div className="statistics-container">
          <Row gutter={[16, 16]}>
            {statistics.map((stat, index) => {
              const TrendIcon = stat.trendIcon ? iconMap[stat.trendIcon] : null;
              return (
                <Col key={index} span={stat.span || 12}>
                  <div className="statistic-card">
                    <Statistic
                      title={stat.title}
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      styles={{ content: stat.valueStyle || { color: '#333' } }}
                      formatter={stat.formatter}
                    />
                    {stat.trend !== undefined && (
                      <div className={`statistic-trend ${stat.trend >= 0 ? 'trend-up' : 'trend-down'}`}>
                        {stat.trend >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                        <span>{Math.abs(stat.trend)}%</span>
                      </div>
                    )}
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      )}
    </div>
  );
}

export default StatisticMessage;
