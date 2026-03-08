import { Image, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './Message.css';

function TextImageMessage({ text, images }) {
  return (
    <div className="message-text-image">
      {text && <div className="message-text">{text}</div>}
      {images && images.length > 0 && (
        <div className="message-images">
          {images.map((img, index) => (
            img.loading ? (
              <div key={index} className="message-image-loading">
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
              </div>
            ) : (
              <Image
                key={index}
                src={img.url}
                alt={img.alt || `图片${index + 1}`}
                className="message-image"
                preview
              />
            )
          ))}
        </div>
      )}
    </div>
  );
}

export default TextImageMessage;
