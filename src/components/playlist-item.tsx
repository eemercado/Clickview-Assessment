import React from "react";
import { Col, Row } from 'react-bootstrap';
import { Playlist } from '../interfaces/playlist';
import { FaStar } from 'react-icons/fa';
import { MdArrowOutward, MdDelete } from "react-icons/md";
import Link from "next/link";
import { IoListCircleOutline } from "react-icons/io5";
import { RiDeleteBin5Fill } from "react-icons/ri";

interface PlaylistItemProps {
  playlist: Playlist;
}

export function PlaylistItem(props: PlaylistItemProps) {
  const { playlist } = props;

  const videoCount = playlist.videoIds.length === 1 ? '1 video' : `${playlist.videoIds.length} videos`;

  const starStyle = {
    transition: 'transform 0.3s ease-in-out',
    color: 'orange',
    fontSize: '25px',
    marginTop: '-5px'
  };

  return (
    <Row className='border rounded p-2 mt-3 mb-2'>
      <Col xs='12' md='12' className='d-flex align-items-center justify-content-between'>
        <div>
          <h2 className='h5 mb-0 me-2'>
          {playlist.name === "Favourites" ? (
            <FaStar className="me-2" style={starStyle} />
          ) : (
            <IoListCircleOutline className="me-2" style={starStyle} />
          )}
          {playlist.name} / {videoCount} / {playlist.description || '...'}
          </h2>
        </div>

        <div>
          <Link 
            href={`/playlists/${playlist.id}`} 
            passHref 
            legacyBehavior
          >
            <a 
              style={{
                backgroundColor: 'orange',
                color: 'white',
                padding: '8px 10px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '15px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '10px',
              }}
            >
              Visit <MdArrowOutward style={{ marginLeft: '5px' }} />
            </a>
          </Link>
          <button 
            style={{
              backgroundColor: 'grey',
              color: 'white',
              padding: '8px 10px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '15px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className="me-3">
            Delete<RiDeleteBin5Fill style={{ marginLeft: '5px' }}/>
          </button>
        </div>
        
      </Col>
    </Row>
  )
}