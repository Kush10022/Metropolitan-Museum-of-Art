import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { Navbar, NavDropdown } from 'react-bootstrap'
import { useRouter } from 'next/router';
import { Form } from 'react-bootstrap';
import Link from "next/link"
import { Button } from '@mui/material';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';

export default function MainNav() {
    const router = useRouter();
    const [searchField, setSearchField] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    const Submit = (event) => {
        event.preventDefault();
        router.push(`/artwork?title=true&q=${searchField}`);
        setSearchField('');
        setIsExpanded(false);
        setSearchHistory(current => [...current, `title=true&q=${searchField}`]);
    };

    const navtoggle = () => {
        setIsExpanded(!isExpanded);
    }

    const onclickbutton = () => {
        setIsExpanded(false);
    }
    
    return (
        
        <div>
            
            <Navbar className="fixed-top" variant="dark" bg="dark" expand="lg">
                <Container>
                    <Navbar.Brand>Kush Patel</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" onClick={navtoggle} />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto" onClick={onclickbutton}>
                            <Link href="/" passHref legacyBehavior>
                            <Nav.Link active={router.pathname === "/"}>Home</Nav.Link>
                            </Link>
                            <Link href="/search" passHref legacyBehavior>
                            <Nav.Link active={router.pathname === "/search"}>Advanced Search</Nav.Link>
                            </Link>
                        </Nav>
                        <form onSubmit={Submit} className="d-flex">
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                value={searchField}
                                onChange={(e) => setSearchField(e.target.value)}
                            />
                            <Button type="submit" variant="contained">Submit</Button>
                        </form>
                        <Nav>
                            <NavDropdown title="User Name" id="basic-nav-dropdown">
                            <Link href="/favourites" passHref legacyBehavior>
                                <NavDropdown.Item active={router.pathname === "/favourites"}>Favourites</NavDropdown.Item>
                            </Link> 
                            <Link href="/history" passHref legacyBehavior>
                                <NavDropdown.Item active={router.pathname === "/history"} >Search History</NavDropdown.Item>
                            </Link>
                           </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br /><br />
        </div >
    )
}
