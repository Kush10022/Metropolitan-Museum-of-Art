import React, { useEffect } from 'react'
import { useState } from 'react';
import Error from 'next/error';
import { Card, Button } from 'react-bootstrap';
import useSWR from "swr"
import Link from 'next/link';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { addToFavourites, removeFromFavourites } from "../lib/userData";

export default function ArtworkCardDetail({objectID}) {
    //const fetcher = (url) => fetch(url).then((res) => res.json());
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded, setShowAdded] = useState(false);
    const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null)

    console.log(showAdded)
    useEffect(()=>{
        setShowAdded(favouritesList?.includes(objectID))
       }, [favouritesList])       
    // useEffect(() => {
    //     if(favouritesList.includes(objectID)){
    //         setShowAdded(true);  
    //         console.log("here")
    //     }else{
    //         setShowAdded(false);
    //         console.log("else")
    //     }
    // }, [favouritesList, objectID])
    if (error) {
        return <Error statusCode={404} />
    }
    if (!data) {
        return null;
    }
    async function favouritesClicked(){
        if (showAdded) {
            setFavouritesList(await removeFromFavourites(objectID));
            setShowAdded(false);
        } else {
            setFavouritesList(await addToFavourites(objectID));
            setShowAdded(true);
        }
    }
   // console.log(favouritesList);
    const { primaryImage, title, objectDate, classification, medium, artistDisplayName, creditLine, dimensions, artistWikidata_URL } = data // extracting every data and storing them in their respective variable.
    return (
        <Card>

            {primaryImage && <Card.Img variant="top" src={primaryImage} />}
            {!primaryImage && (
                <Card.Img
                    variant="top"
                    src="https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
                />
            )}
            <Card.Body>
                <Card.Title>{title || 'N/A'}</Card.Title>
                <Card.Text>
                    <strong>Date:</strong> {objectDate || 'N/A'}
                    <br />
                    <strong>Classification:</strong> {classification || 'N/A'}
                    <br />
                    <strong>Medium:</strong> {medium || 'N/A'}
                    <br />
                    <br />
                    <strong>Artist:</strong>{' '}
                    {artistDisplayName ? (
                        <>
                            {artistDisplayName}{' '}
                            {artistWikidata_URL && (
                                <a href={artistWikidata_URL} target="_blank" rel="noreferrer">wiki</a>
                            )}
                        </>) : ('N/A')}
                    <br />
                    <strong>Credit Line:</strong> {creditLine || 'N/A'}
                    <br />
                    <strong>Dimensions:</strong> {dimensions || 'N/A'}
                </Card.Text>
                <Button variant={showAdded ? 'primary' : 'outline-primary'} onClick = {favouritesClicked}>
                {showAdded ? '+ Favourite (added)' : '+ Favourite'}
            </Button>
            </Card.Body>
            <Link href={`/artwork/${objectID}`} passHref>
                <Button variant="link">{objectID}</Button>
            </Link>
            
        </Card>
    )
}
