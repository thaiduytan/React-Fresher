import React from "react";
import "./FooterAuth.scss";
import { Col, Row } from "antd";

const FooterAuth = () => {
  return (
    <>
      <footer className="footer-auth">
        <div className="footer-container">
          <Row gutter={16}>
            <Col className="gutter-row footer-col" span={6}>
              <div className="logo">DuyTanz</div>
              <div className="typography">
                DuyTanz Developer Platform (prod) 2021 - 2023 © DuyTanz
                Corporation
              </div>
            </Col>
            <Col className="gutter-row footer-col" span={6}>
              <h4 className="footer-top">DEVELOPER PLATFORM</h4>
              <div className="footer-docs">
                <a href="#">App Console</a>
                <a href="#">Documents</a>
                <a href="#">API References</a>
              </div>
            </Col>
            <Col className="gutter-row footer-col" span={6}>
              <h4 className="footer-top">ABOUT TIKI</h4>
              <div className="footer-docs">
                <a href="#">App Console</a>
                <a href="#">Documents</a>
                <a href="#">API References</a>
              </div>
            </Col>
            <Col className="gutter-row footer-col" span={6}>
              <h4 className="footer-top">GET HELP</h4>
              <div className="footer-docs">
                <a href="#">App Console</a>
                <a href="#">Documents</a>
                <a href="#">API References</a>
              </div>
            </Col>
          </Row>
        </div>
      </footer>
    </>
  );
};

export default FooterAuth;
