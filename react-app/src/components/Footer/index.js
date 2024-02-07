import React, { useState, useEffect } from 'react';
import './Footer.css'

function Footer({ isLoaded }) {

    return (
        <div id="footer">
            <h1 id="footer-title">Creator</h1>
            <div id="footer-wrapper">
                <div id="stephen-footer">
                    <div id="link-wrapper">
                        <a target="_blank" href="https://github.com/srsy12">
                            <div className="footer-button">
                                <div className="github-icon">
                                    <i class="fa fa-github"></i>
                                </div>

                            </div>
                        </a>
                        <a target="_blank" href="https://www.linkedin.com/in/srsly12/">
                            <div className="footer-button">
                                <div className="linkedin-icon">
                                    <i class="fa fa-linkedin-square"></i>
                                </div>

                            </div>
                        </a>
                    </div>
                    <p>Stephen Sy</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
