import React from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import { Button, Grid, CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function ModalUpload({ loading, isLoading, data, filemanagerku, handlefilemanagerclose, onChangeUpload, url }) {
    return (
        <Modal show={filemanagerku.open} onHide={handlefilemanagerclose} fullscreen dialogClassName="custom-modal">
            <Modal.Header closeButton>
                <Modal.Title>
                    <h6>FILE MANAGER</h6>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col xs={8}>
                        <h6>FILE MANAGER</h6>
                    </Col>
                    <Col xs={4} className="position-relative">
                        <div className="position-absolute end-0">
                            {/* <input
                                style={{ display: 'none' }}
                                ref={inputFile}
                                // onChange={handleFileUpload({ kodeproject: project?.project_status })}
                                type="file"
                            /> */}
                            <Button size="small" variant="contained" color="success" component="label" onChange={onChangeUpload}>
                                {loading && <CircularProgress size={20} thickness={10} style={{ marginRight: 10 }} />}
                                <CloudUploadIcon className="m-1" /> Upload
                                <input name="imageTrip" type="file" hidden />
                            </Button>
                        </div>
                    </Col>
                </Row>
                {isLoading ? (
                    <div className="p-5">Loading ...</div>
                ) : (
                    <Grid container spacing={3} pt={5}>
                        {data?.map((item, key) => (
                            <Grid item sm={6} md={3} xs={12} key={key}>
                                <img
                                    style={{ width: '100%', height: 300 }}
                                    src={`${url}/${item.file.split('/')[filemanagerku.index].slice(1, 100)}`}
                                    alt=""
                                    className="shadow-lg rounded border-none"
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Modal.Body>
        </Modal>
    );
}

export default ModalUpload;
