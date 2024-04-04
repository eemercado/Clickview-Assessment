// star used to indicate favourite playlist.

import React, { useState } from "react";
import { Col, Image, Row, Form, Dropdown } from 'react-bootstrap';
import { Video } from '../interfaces/video';
import { FaRegStar, FaStar } from "react-icons/fa";
import { CgPlayButtonR } from 'react-icons/cg';


interface VideoItemProps {
  video: Video;
}

const VideoItem: React.FC<VideoItemProps> = ({ video }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false); 
  {/* Hard coded playlists because of time limit, but would typically fetch from database all the current
      playlists and import them here to allow for a more dynamic nature */}
  const [playlists, setPlaylists] = useState([
    { id: 1, name: 'The Family Law', isChecked: false },
    { id: 2, name: 'Changing Minds', isChecked: false },
  ]);

  const imageStyle = {
    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
    transition: 'transform 0.3s ease-in-out',
    cursor: 'pointer'
  };

  const starStyle = {
    transition: 'transform 0.3s ease-in-out',
    color: 'orange',
    fontSize: '3rem',
    cursor: 'pointer'
  };

  const handleCheckboxChange = (index: number) => {
    const newPlaylists = playlists.map((playlist, i) => {
      if (i === index) {
        return { ...playlist, isChecked: !playlist.isChecked };
      }
      return playlist;
    });
    setPlaylists(newPlaylists);
  };

  const toggleFavorite = () => setIsFavorited(!isFavorited);

  return (
    <Row onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} style={{ borderBottom: '1px solid #ccc', marginTop: '14px' }}>
      {/* adding motion to thumbnails like expanding size and play button hover */}
      <Col xs='12' md='3' className='mb-3 position-relative'>
        <Image 
          fluid 
          rounded 
          src={`${video.thumbnail}?size=small`} 
          alt={video.name} 
          className='w-100'
          style={imageStyle}
        />
        {isHovered && (
          <CgPlayButtonR 
            className="position-absolute top-50 start-50 translate-middle"
            style={starStyle}
          />
        )}
      </Col>
      <Col xs='12' md='9' className='mb-3'>
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h2 className='h3'>
              {/* Clickable star used to indicate favourited videos */}
              {isFavorited ? <FaStar className="me-2" style={starStyle} onClick={toggleFavorite} /> : <FaRegStar className="me-2" onClick={toggleFavorite} />}
              {video.name}
            </h2>
          </div>
          
          {/* Dropbox to show playlist allocation of each video */}
          <Dropdown>
            <Dropdown.Toggle 
              variant="" 
              id="dropdown-basic"
              style={{
                backgroundColor: 'black', 
                color: 'white',
                padding: '6px 20px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              Toggle Playlists
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {playlists.map((playlist, index) => (
                <Dropdown.Item key={playlist.id} as="button">
                  <Form.Check 
                    type="checkbox" 
                    label={playlist.name} 
                    checked={playlist.isChecked} 
                    onChange={() => handleCheckboxChange(index)}
                  />
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <p>{video.description}</p>
        
        

      </Col>
    </Row>
  );
};

export default VideoItem;