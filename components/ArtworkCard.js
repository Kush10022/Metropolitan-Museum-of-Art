import React from 'react'
import Error from 'next/error';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import useSWR from "swr"

export default function ArtworkCard({objectID}) {
    
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)

    if (error) {
        return <Error statusCode={404} />
    }
    if (!data) {
        return null;
    }
    const { primaryImageSmall, title, objectDate, classification, medium } = data // extracting every data and storing them in their respective variable.
    return (
        <Card style={{ width: '18rem' }}>
            
            <Card.Img variant="top" src={primaryImageSmall || 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'} />
            <Card.Body>
                <Card.Title>{title || 'N/A'}</Card.Title>
                <Card.Text>
                    <strong>Date:</strong> {objectDate || 'N/A'}<br />
                    <strong>Classification:</strong> {classification || 'N/A'}<br />
                    <strong>Medium:</strong> {medium || 'N/A'}
                </Card.Text>
            </Card.Body>
            <Link href={`/artwork/${objectID}`} passHref>
                <Button variant="link">{objectID}</Button>
            </Link>
        </Card>
    )
}
