import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router';
import { useQuery } from 'react-query';
import { Button, Grid } from '@mui/material';
import { GET_PROJECTSD } from 'services/projectnew';
import LoadingPage from 'components/Loading';
import ProjectProvider, { useProject } from 'hooks/useProjectnew';
import CardDetailProject from '../components/CardDetailProject';
import { useMee } from 'contexts/MeContext';
import TeknisiPart from './TeknisiPart';
import {
    AddFileComponent,
    DesignatorComponent,
    DistribusiComplete,
    DistribusiComponent,
    DistribusiFinal,
    FeederComplete,
    FeederComponent,
    KhsComponent,
    SitaxComponent,
    TeknisiComponent
} from './BottomSheetComponent';

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
    // console.log(params);
    const { data, isLoading, refetch } = useQuery(['GET_PROJECTSINGLE', params.idProject], () => GET_PROJECTSD(params.idProject));
    if (isLoading) {
        return <LoadingPage />;
    }
    const project = data.data;
    console.log('data', project);
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
    const {
        handelMinDT,
        openModal,
        handelPlusDT,
        handleAddDistribusi,
        handleAddFeeder,
        handleAddKhs,
        handleAddKhsList,
        handleAddSitax,
        handleChangeKhsL,
        handleDeleteKhsList,
        handleDistribusiComplete,
        handleDistribusiFinal,
        handleKhsSource,
        handleUpdateFeeder,
        handleUpdateDistribusi,
        handleUpdateKhsList,
        checkPermisionFile,
        handleEditKhsList,
        handleFeederComplete,
        setOpen,
        projectSitax,
        projectSurvey,
        projectTechnician,
        projectKhs,
        radioValue,
        open,
        feederSelected,
        disSelected,
        khsListSelected,
        dataTeknisi,
        expanded,
        expandedKhsL,
        SnackBarComponent,
        snackBarOpen,
        project,
        khsSource,
        refetch,
        handleAddDataTeknisi,
        handleDeleteDataTeknisList,
        handleAddDataTeknisiNext
    } = useProject();
    const navigate = useNavigate();
    const { checkPermision } = useMee();
    console.log('gila', project);
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
                                    <Grid item xs={6} sm={6} md={3} sx={{ padding: 1 }}>
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
                        if (radio.value === '4') {
                            if (project.project_status === 'Survey' && checkPermision('CUSI')) {
                                return (
                                    <Grid item xs={6} sm={6} md={3} sx={{ padding: 1 }}>
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
                                <Grid item xs={6} sm={6} md={3} sx={{ padding: 1 }}>
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
                <SnackBarComponent />
                {open && radioValue === '1' && (
                    <TeknisiComponent
                        snackBarOpen={snackBarOpen}
                        open={open}
                        onClose={() => setOpen(false)}
                        projectTechnician={projectTechnician}
                    />
                )}
            </div>
        </div>
    );
}
