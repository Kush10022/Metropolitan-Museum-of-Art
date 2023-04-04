/*********************************************************************************
* BTI425 – Assignment 5
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Kush Patel Student ID: 104006218 Date: 22rd March 2023
*
*
********************************************************************************/ 

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Col, Row, Pagination } from 'react-bootstrap';
import useSWR from 'swr';
import ArtworkCard from '../../components/ArtworkCard';
import Error from 'next/error';
import { Card } from 'react-bootstrap';
import validObjectIDList from '@/public/data/validObjectIDList.json'

const PER_PAGE = 12;

const Artwork = () => {
  const [artworkList, setArtworkList] = useState(null);
  const [page, setPage] = useState(1);
  const router = useRouter();
  let finalQuery = router.asPath.split('?')[1];
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);
  useEffect(() => {
    if (data) {
      let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));
      const results = [];
      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
       }       
      setArtworkList(results);
      setPage(1);
    }
  }, [data]);

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (page < artworkList.length) {
      setPage(page + 1);
    }
  };

  if (error) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      {artworkList ? (
        <>
          <Row className="gy-4">
            {artworkList.length > 0 ? (
              artworkList[page - 1].map((currentObjectID) => (
                <Col lg={3} key={currentObjectID}>
                  <ArtworkCard objectID={currentObjectID} />
                </Col>
              ))
            ) : (
              <Col>
                <Card>
                  <Card.Body>
                    <h4>Nothing Here</h4>
                    Try searching for something else.
                  </Card.Body>
                </Card>
              </Col>
            )}
          </Row>
          {artworkList.length > 0 && (
            <Row className="mt-4">
              <Col>
                <Pagination>
                  <Pagination.Prev onClick={previousPage} />
                  <Pagination.Item active>{page}</Pagination.Item>
                  <Pagination.Next onClick={nextPage} />
                </Pagination>
              </Col>
            </Row>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Artwork;
