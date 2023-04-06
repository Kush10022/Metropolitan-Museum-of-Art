import { searchHistoryAtom } from '@/store'
import { useAtom } from 'jotai'
import React from 'react'
import { useRouter } from 'next/router'
import styles from '@/styles/History.module.css';
import { Button } from 'react-bootstrap';
import { Card, ListGroup } from 'react-bootstrap';
import { removeFromHistory } from '@/lib/userData';

export default function History() {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
    const router = useRouter();
    if(!searchHistory) return null;
    let parsedHistory = [];
    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    const historyClicked = (e, index) => {
        router.push(`/artwork?${searchHistory[index]}`);
    }

    async function removeHistoryClicked(e, index){
        e.stopPropagation(); // stop the event from trigging other events
        setSearchHistory(await removeFromHistory(searchHistory[index]))
    }
    return (
        <>
      {parsedHistory.length === 0 ?
        <Card>
          <Card.Body>
            <Card.Title>No Search History</Card.Title>
            <Card.Text>Try searching for some artwork</Card.Text>
          </Card.Body>
        </Card>
        :
        <ListGroup className="mt-3">
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item key={index} className={styles.historyListItem} onClick={e => historyClicked(e, index)}>
              {Object.keys(historyItem).map(key => (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>))}
              <Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      }
    </>
    )
}
