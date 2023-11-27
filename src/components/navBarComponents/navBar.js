import React, { useState, useEffect } from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar() {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;

            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 200);

            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);

    const scrollToTop = () => {
        scroll.scrollToTop();
    };

    return (
        <nav className={`navbar navbar-expand-lg navbar-dark bg-dark ${visible ? 'fixed-top' : 'fixed-top-hidden'}`}>
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="home" spy={true} smooth={true} duration={100} onClick={scrollToTop}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="skills" spy={true} smooth={true} duration={100}>Skills</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="experiences" spy={true} smooth={true} duration={100}>Experiences</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="educations" spy={true} smooth={true} duration={100}>Educations</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="projects" spy={true} smooth={true} duration={100}>Projects</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="certificates" spy={true} smooth={true} duration={100}>Certificates</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
