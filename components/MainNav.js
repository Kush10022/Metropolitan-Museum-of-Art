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
import { addToHistory } from '@/lib/userData';
import { readToken, removeToken } from '@/lib/authenticate';

export default function MainNav() {
    const router = useRouter();
    const [searchField, setSearchField] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    async function Submit(event){
        event.preventDefault();
        router.push(`/artwork?title=true&q=${searchField}`);
        setSearchField('');
        setIsExpanded(false);
        setSearchHistory(await addToHistory(`title=true&q=${searchField}`))
    };

    const navtoggle = () => {
        setIsExpanded(!isExpanded);
    }

    const onclickbutton = () => {
        setIsExpanded(false);
    }
    let token = readToken();
    function logout() {
    removeToken();
    router.push('/login');
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
                            {token &&<Link href="/search" passHref legacyBehavior>
                            <Nav.Link active={router.pathname === "/search"}>Advanced Search</Nav.Link>
                            </Link>}
                        </Nav>
                        {token && (<form onSubmit={Submit} className="d-flex">
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                value={searchField}
                                onChange={(e) => setSearchField(e.target.value)}
                            />
                            <Button type="submit" variant="contained">Submit</Button>
                        </form>)}
                        {token ? (<Nav>
                            <NavDropdown title="User Name" id="basic-nav-dropdown">
                            <Link href="/favourites" passHref legacyBehavior>
                                <NavDropdown.Item active={router.pathname === "/favourites"}>Favourites</NavDropdown.Item>
                            </Link> 
                            <Link href="/history" passHref legacyBehavior>
                                <NavDropdown.Item active={router.pathname === "/history"} >Search History</NavDropdown.Item>
                            </Link>
                            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                           </NavDropdown>
                        </Nav>)
                        :
                        (<Nav className="ms-auto">
                <Link href="/register" passHref legacyBehavior><Nav.Link  active={router.pathname === "/register"}>Register</Nav.Link></Link>
                <Link href="/login" passHref legacyBehavior><Nav.Link active={router.pathname === "/login"}>Login</Nav.Link></Link>
              </Nav>)}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br /><br />
        </div >
    )
}
