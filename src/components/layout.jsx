import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Container, Tabs, Tab, Button, ButtonGroup } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown/with-html'

import ReactMap from './map/map';
import RainfallDownloader from './sidebar/downloader'
import LegacyRealtimeRainfallPage from './sidebar/legacy/legacyRealtime'
import ThinkingOverlay from './thinking/thinkingOverlay'

import { RAINFALL_TYPES } from '../store/config'

import './layout.scss'

/**
* Layout Component. Everything on the page under the Nav: Controls and Map.
*/
class Layout extends React.Component {
  render() {

    return (

      <div className="fill no-gutters">

        <ThinkingOverlay />

        <Row>
          <Col>
            {/* <ProgressBar /> */}
          </Col>
        </Row>

        <Row className="fill no-gutters">
          <Col sm={6} className="scrolling-column">
            <Container className="sidebar">
              <Tabs
                defaultActiveKey="tab-legacy-realtime"
                id="rainfall-data-type-tabs"
                mountOnEnter={true}
              >
                <Tab eventKey="tab-legacy-realtime" title="Real-Time Rainfall">                  
                  <LegacyRealtimeRainfallPage/>
                </Tab>
                <Tab eventKey="tab-legacy-gauge" title="Historical Rain Gauge">
                  Select the rain gauges and time span for output. A map of the rain gauge locations is below.
              </Tab>
                <Tab eventKey="tab-legacy-garr" title="Calibrated Radar Rainfall">
                Calibrated Radar Rainfall
              </Tab>
                {/* <Tab eventKey="tab-realtime" title="Real-Time (provisional)">
                  <RainfallDownloader rainfallDataType={RAINFALL_TYPES.realtime} />
                </Tab> */}
                <Tab eventKey="tab-historic" title="Explorer (new)" >
                  <h1>Make it Rain</h1>
                  <p>Visualize and download rainfall data from anytime for any location and get the best available data back. Then animate it, compare time periods and geographies, and download it.</p>
                  <RainfallDownloader rainfallDataType={RAINFALL_TYPES.historic} />
                </Tab>
              </Tabs>
            </Container>
            {/* <Container>
              <Row>
                <Col>
                  <h4>Events</h4>
                </Col>
                <Col>
                  <EventFilterControls/>
                </Col>                
              </Row>
              <EventsList />
            </Container> */}
          </Col>

          <Col sm={6} className="map-column">
            <ReactMap
              token={this.props.token}
              styleUrl={this.props.styleId}
              latitude={this.props.latitude}
              longitude={this.props.longitude}
              zoom={this.props.zoom}
            />
          </Col>
        </Row>
      </div>
      // </Container>
    )
  }
}

function mapStateToProps(state) {
  return { ...state.initMap }
}

export default connect(mapStateToProps)(Layout);