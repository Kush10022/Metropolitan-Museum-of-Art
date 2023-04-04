import { searchHistoryAtom } from '@/store'
import { useAtom } from 'jotai'
import React from 'react'
import { useRouter } from 'next/router'
import styles from '@/styles/History.module.css';
import { Button } from 'react-bootstrap';
import { Card, ListGroup } from 'react-bootstrap';

export default function history() {
    const [searchHistory, setsearchHistory] = useAtom(searchHistoryAtom)
    const router = useRouter();

    let parsedHistory = [];
    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    const historyClicked = (e, index) => {
        router.push(`/artwork?${searchHistory[index]}`);
    }

    const removeHistoryClicked = (e, index) => {
        e.stopPropagation(); // stop the event from trigging other events
        setsearchHistory(current => {
            let x = [...current];
            x.splice(index, 1)
            return x;
        });
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
