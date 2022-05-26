import { Card, CardContent, CardHeader, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import { useState, useEffect } from 'react';
import { ADD_PROJECT_SUB, SUB_PROJEC_VIEW } from 'services/datateknis';
import { useParams } from 'react-router';
import { useQuery, useQueryClient } from 'react-query';
import { Col, Container, Form, Modal, Row } from 'react-bootstrap';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
}));
export default function Datateknis() {
    const [show, setShow] = useState(false);
    const [Idprojectsub, Setidprojectsub] = useState(null);
    const [showodc, setShowodc] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        Setidprojectsub(id);
    };
    const qc = useQueryClient();
    const params = useParams();
    const { data: datateknisget, isLoading: islodingdatateknis } = useQuery(['SUB_PROJECT_VIEW', params.idProject], () =>
        SUB_PROJEC_VIEW(params.idProject)
    );
    const [datatambah, Setdatatamabah] = useState(0);
    useEffect(() => {
        if (!islodingdatateknis) {
            Setdatatamabah(datateknisget.data.data.length);
            console.log(datateknisget.data.data.length);
        }
    }, [islodingdatateknis]);
    if (islodingdatateknis) {
        return true;
    }
    const tambahdataku = async (fungsi) => {
        if (fungsi === 'plus') {
            Setdatatamabah(datatambah + 1);
            const data = {
                urutan_project: datatambah + 1,
                nm_project_sub: '',
                id_project: params.idProject
            };
            const response = await ADD_PROJECT_SUB(data);
            await qc.fetchQuery(['SUB_PROJECT_VIEW', params.idProject]);
            console.log(response.data);
        } else {
            Setdatatamabah(datatambah - 1);
        }
    };
    // khs change disini
    const khschange = (event, SelectChangeEvent) => {
        console.log(event.target.value);
        if (event.target.value === '3' || event.target.value === '4') {
            if (event.target.value === 4) {
                setShowodc(true);
            } else {
                setShowodc(true);
                console.log(event.target.value);
            }
        } else {
            setShowodc(false);
            console.log('kosong');
        }
    };
    return (
        <>
            <Card sx={{ boxShadow: 2 }}>
                <CardHeader title="Form Survey" />
                <CardContent>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={1}>
                            <Grid item xs>
                                <Item sx={{ bgcolor: 'error.main' }}>
                                    <RemoveCircleOutlineRoundedIcon onClick={() => tambahdataku('minus')} style={{ color: '#FFF' }} />
                                </Item>
                            </Grid>
                            <Grid item xs={6}>
                                <Item>{datatambah}</Item>
                            </Grid>
                            <Grid item xs>
                                <Item sx={{ bgcolor: 'error.main' }}>
                                    <AddCircleOutlineOutlinedIcon onClick={() => tambahdataku('plus')} style={{ color: '#FFF' }} />
                                </Item>
                            </Grid>
                        </Grid>
                    </Box>
                    {datateknisget.data.data.map((i) => (
                        <Box key={i.id_project_sub} sx={{ paddingTop: 3 }}>
                            <h6>Data Teknis {i.urutan_project}</h6>
                            <Card sx={{ boxShadow: 2, marginBottom: 3 }}>
                                <CardContent>sdfasf</CardContent>
                            </Card>
                            <Button
                                onClick={() => {
                                    console.log(i.id_project_sub);
                                    handleShow(i.id_project_sub);
                                }}
                                variant="contained"
                                sx={{ bgcolor: '#f00' }}
                                size="small"
                                value={i.id_project_sub}
                                startIcon={<AddCircleOutlineOutlinedIcon />}
                            >
                                Tambah Data Teknis
                            </Button>
                        </Box>
                    ))}
                </CardContent>
            </Card>

            <Modal show={show} onHide={handleClose} fullscreen>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Data Teknis {Idprojectsub}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Select name="id_khs_kategori" onChange={khschange}>
                                <option value={1}>Feeder</option>
                                <option value={2}>Pengelaran</option>
                                <option value={3}>ODC</option>
                                <option value={4}>ODP</option>
                            </Form.Select>
                        </Form.Group>
                        <div style={{ display: showodc ? 'block' : 'none' }}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>ALAMAT</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>ALAMAT PATOKAN</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Container>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>LATITUDE</Form.Label>
                                            <Form.Control type="email" placeholder="Enter email" />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>LONGITUDE</Form.Label>
                                            <Form.Control type="email" placeholder="Enter email" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
