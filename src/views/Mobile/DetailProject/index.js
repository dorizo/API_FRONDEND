/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useQuery } from 'react-query';
import { Button, Grid, CircularProgress } from '@mui/material';
import { GET_PROJECTSD } from 'services/projectnew';
import { GET_IMAGES } from 'services/upload';
import LoadingPage from 'components/Loading';
import LoadingComponent from 'components/LoadingComponent';
import ProjectProvider, { useProject } from 'hooks/useProjectnew';
import CardDetailProject from '../components/CardDetailProject';
import { useMee } from 'contexts/MeContext';
import TeknisiPart from './TeknisiPart';
import SitaxPart from './SitaxPart';
import { SitaxComponent, TeknisiComponent } from './BottomSheetComponent';
import Datateknis from './Datateknis';
import ListDocumentComponent from '../components/ListDocument';
import { Col, Modal, Row } from 'react-bootstrap';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const radios = [
    { name: 'Teknisi', value: '1' },
    { name: 'Feeder', value: '2' },
    { name: 'Sitax', value: '4' },
    { name: 'Unggah File', value: '5' },
    { name: 'KHS List', value: '6' },
    { name: 'KHS', value: '7' }
];

export default function Index() {
    const params = useParams();
    const location = useLocation();
    const { data, isLoading, refetch } = useQuery(['GET_PROJECTSINGLE', params.idProject], () => GET_PROJECTSD(params.idProject));
    if (isLoading) {
        return <LoadingPage />;
    }
    const project = data.data;
    return (
        <ProjectProvider
            initialValue={{
                project,
                refetch
            }}
        >
            <App />
        </ProjectProvider>
    );
}
function App() {
    const inputFile = useRef(null);
    const {
        openModal,
        handleAddSitax,
        checkPermisionFile,
        setOpen,
        projectSitax,
        projectTechnician,
        radioValue,
        open,
        khsIdSelected,
        SnackBarComponent,
        snackBarOpen,
        project,
        handlekhsv2
    } = useProject();
    const [filemanagerku, setfilenamagerku] = useState({ open: false, urlfile: `project/${project.project_id}/` });
    const [colapse, setColapse] = useState(null);
    const { projectSurvey, SetprojectSurvey } = useState();
    const handleColapse = (id) => {
        if (id === colapse) {
            setColapse(null);
        } else {
            setColapse(id);
        }
    };
    const handlefilemanagerclose = () => {
        setfilenamagerku({ open: false, urlfile: `project/${project.project_id}/` });
    };
    // console.log(filemanagerku.open);
    const navigate = useNavigate();
    const { checkPermision } = useMee();

    // untuk file upload
    const [files, setFiles] = useState();
    const onChangeUpload = (e) => {
        const file = e.target.files[0];
        setFiles(file);
        const reader = new FileReader();
        reader.onload = () => {
            const preview = [reader.result];
        };
        reader.readAsDataURL(file);
    };

    const body = {
        level: filemanagerku?.urlfile?.fileget
    };
    const { data, isLoading, refetch, isFetching } = useQuery(['GET_IMAGES', { body }], () => GET_IMAGES({ body }), {
        keepPreviousData: true,
        select: (response) => response.data.data
    });

    console.log(data, 'iki datane');

    return (
        <div>
            <div className="container mb-4">
                <Button color="error" onClick={() => navigate(-1)}>
                    <ArrowBackIcon /> Kembali
                </Button>
                <CardDetailProject project={project} />
                <Grid sx={{ marginTop: 2, marginBottom: 2 }} container spacing={3}>
                    {radios.map((radio, idx) => {
                        if (radio.value === '1') {
                            if (
                                project.project_status !== 'Pending' &&
                                project.project_status !== 'Decline' &&
                                (checkPermision('CTEC') || checkPermision('UTEC'))
                            ) {
                                return (
                                    <Grid key={idx} item xs={6} sm={6} md={3} sx={{ padding: 1 }}>
                                        <Button
                                            key={idx}
                                            id={`radio-${idx}`}
                                            type="radio"
                                            fullWidth
                                            variant={idx % 1 ? 'outline-success' : 'outline-danger'}
                                            name="radio"
                                            value={radio.value}
                                            onClick={() => openModal(radio.value)}
                                            checked={radioValue === radio.value}
                                            style={{
                                                backgroundColor: '#DB1F1F',
                                                color: 'white',
                                                fontWeight: '700',
                                                width: '100%'
                                            }}
                                        >
                                            {radio.name}
                                        </Button>
                                    </Grid>
                                );
                            }
                            return null;
                        }
                        if (radio.value === '4') {
                            if (project.project_status === 'Survey') {
                                return (
                                    <Grid key={idx} item xs={6} sm={6} md={3} sx={{ padding: 1 }}>
                                        <Button
                                            key={idx}
                                            id={`radio-${idx}`}
                                            type="radio"
                                            fullWidth
                                            variant={idx % 1 ? 'outline-success' : 'outline-danger'}
                                            name="radio"
                                            value={radio.value}
                                            onClick={() => openModal(radio.value)}
                                            checked={radioValue === radio.value}
                                            // disabled={Number(radio.value) <= status ? 0 : 1}
                                            style={{
                                                backgroundColor: '#DB1F1F',
                                                color: 'white',
                                                fontWeight: '700',
                                                width: '100%'
                                            }}
                                        >
                                            {radio.name}
                                        </Button>
                                    </Grid>
                                );
                            }
                            return null;
                        }
                        if (radio.value === '5' && checkPermisionFile()) {
                            return (
                                <Grid key={idx} item xs={6} sm={6} md={3} sx={{ padding: 1 }}>
                                    <Button
                                        key={idx}
                                        id={`radio-${idx}`}
                                        type="radio"
                                        fullWidth
                                        variant={idx % 1 ? 'outline-success' : 'outline-danger'}
                                        name="radio"
                                        value={radio.value}
                                        onClick={() => openModal(radio.value)}
                                        checked={radioValue === radio.value}
                                        // disabled={Number(radio.value) <= status ? 0 : 1}
                                        style={{
                                            backgroundColor: '#DB1F1F',
                                            color: 'white',
                                            fontWeight: '700',
                                            width: '100%'
                                        }}
                                    >
                                        {radio.name}
                                    </Button>
                                </Grid>
                            );
                        }
                        return null;
                    })}
                </Grid>
                <TeknisiPart />
                <SitaxPart />
                <Datateknis witelid={project.witel_id} project={project} filemanager={setfilenamagerku} />
                <ListDocumentComponent idProject={project.project_id} survey={projectSurvey} />
            </div>

            <SnackBarComponent />
            {open && radioValue === '1' && (
                <TeknisiComponent
                    snackBarOpen={snackBarOpen}
                    open={open}
                    onClose={() => setOpen(false)}
                    projectTechnician={projectTechnician}
                />
            )}

            {open && radioValue === '4' && (
                <SitaxComponent
                    open={open}
                    onClose={() => setOpen(false)}
                    item={projectSitax}
                    id={project.project_id}
                    onAdd={handleAddSitax}
                />
            )}
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
                                <input
                                    style={{ display: 'none' }}
                                    ref={inputFile}
                                    // onChange={handleFileUpload({ kodeproject: project?.project_status })}
                                    type="file"
                                />
                                <Button
                                    // onClick={onButtonClick({
                                    //     fileget: `project/${project.project_id}/${data.id_project_sub}/${data.id_project_khs_v2}/${data.id_project_khs_v2_detail}`
                                    // })}
                                    size="small"
                                    variant="contained"
                                    color="success"
                                    component="label"
                                    onChange={onChangeUpload}
                                >
                                    <CircularProgress size={20} thickness={10} style={{ marginRight: 10 }} />
                                    <CloudUploadIcon className="m-1" /> Upload
                                    <input name="imageTrip" type="file" hidden />
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    {/* <h1>{filemanagerku?.urlfile?.fileget}</h1> */}
                    {isLoading || isFetching ? (
                        <div className="p-5">Loading ...</div>
                    ) : (
                        <Grid container spacing={3}>
                            {data?.map((item, key) => (
                                <Grid item sm={3} key={key}>
                                    <img
                                        style={{ width: '100%', height: 300 }}
                                        alt=""
                                        src={process.env.REACT_APP_API_URL + item.file}
                                        className="shadow-lg rounded border-none"
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
}
