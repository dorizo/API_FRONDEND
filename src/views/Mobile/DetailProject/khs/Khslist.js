import { Button } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import React, { useState } from 'react';
import { Card, Col, Form, Modal, Row } from 'react-bootstrap';
import QueuePlayNextIcon from '@mui/icons-material/QueuePlayNext';

function Khslist(props) {
    const [showkhs, setshowkhs] = useState(false);
    const [idprojectsub, Setidprojectsub] = useState(false);
    const handleClosekhs = () => setshowkhs(false);
    const [variable, Setvariable] = useState(props);
    const handleShowkhs = (id) => {
        setshowkhs(true);
        Setidprojectsub(id);
    };
    return (
        <>
            <div className="card">
                <div className="card-header">{variable.data.nama_khs_kategori}</div>
                <div className="card-body position-relative">
                    <h6>Khs List</h6>
                </div>
                <div className="position-absolute bottom-0 end-0">
                    <Button
                        onClick={() => {
                            console.log(variable.data);
                            handleShowkhs(variable.data);
                        }}
                        variant="contained"
                        sx={{ bgcolor: '#f00' }}
                        size="small"
                        value={variable.data.id_project_sub}
                        startIcon={<AddCircleOutlineOutlinedIcon />}
                    >
                        Insert KHS
                    </Button>
                </div>
            </div>
            <Modal show={showkhs} onHide={handleClosekhs} fullscreen>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Data Teknis</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={4}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Select name="kategori">
                                    <option value={0}>Desc</option>
                                    <option value={0}>Kode</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Control type="text" placeholder="Enter email" name="search" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <>
                        <Card>
                            <Row>
                                <Col>{JSON.stringify(idprojectsub.id_project_sub)}</Col>
                                <Col xs={2}>
                                    <QueuePlayNextIcon onClick={handleClosekhs} />
                                </Col>
                            </Row>
                        </Card>
                    </>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default Khslist;
