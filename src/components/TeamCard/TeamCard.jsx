import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import fbLogo from '../../shared/image/fb_blue_logo.png';
import instaLogo from '../../shared/image/insta_color_logo.png';

export default function TeamCard(props) {
  return (
    <>
      <Container>
        <Row className='vl_container my-4 box_shadow_light p-2'>
          <Col xs={12} md={5} className='mt-3'>
            <div>
              <Image
                src={props.picture}
                roundedCircle
                style={{ maxWidth: '150px', maxHeight: '150px' }}
              />
              <div className='text-center'>
                <a
                  href={props.fbLink}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Image
                    src={fbLogo}
                    roundedCircle
                    className='social_media_fb'
                  />
                </a>
                <a
                  href={props.instaLink}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Image
                    src={instaLogo}
                    roundedCircle
                    className='social_media_insta ml-2'
                  />
                </a>
              </div>
            </div>
          </Col>
          <Col xs={12} md={7}>
            <div>
              <h4 className='text-center text-md-left my-3 text-dark font-weight-bold'>
                {props.name}
              </h4>
              <h5 className='text-center text-md-left font-italic my-3'>
                {props.profession}
              </h5>
              <p className='px-4 text_fs_medium text-dark hyphentation'>
                {props.description}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
