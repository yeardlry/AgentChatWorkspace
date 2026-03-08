import './Message.css';

function WebLinksMessage({ text, links }) {
  return (
    <div className="message-weblinks">
      {text && <div className="message-text">{text}</div>}
      {links && links.length > 0 && (
        <div className="weblinks-list">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="weblink-card"
            >
              {link.favicon && (
                <img src={link.favicon} alt="" className="weblink-favicon" />
              )}
              <div className="weblink-info">
                <div className="weblink-title">{link.title || link.url}</div>
                {link.description && (
                  <div className="weblink-desc">{link.description}</div>
                )}
                <div className="weblink-url">{link.url}</div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default WebLinksMessage;
