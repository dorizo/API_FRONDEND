import { Card, CardContent, CardHeader, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import { useProject } from 'hooks/useProjectnew';
import { useState, useEffect } from 'react';
import { ADD_PROJECT_SUB, SUB_PROJEC_VIEW } from 'services/datateknis';
import { useParams } from 'react-router';
import { useQuery, useQueryClient } from 'react-query';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
}));
export default function Datateknis() {
    const qc = useQueryClient();
    const params = useParams();
    const {
        project,
        openModal,
        projectFeeder,
        handleChange,
        handleEditFeeder,
        handleComplateF,
        handleChange2,
        handleEditDistribusi,
        handleDeleteDistribusi,
        handleComplateD,
        handleFinal,
        expanded,
        expanded2
    } = useProject();
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
                                onClick={() => openModal('6')}
                                variant="contained"
                                sx={{ bgcolor: '#f00' }}
                                size="small"
                                startIcon={<AddCircleOutlineOutlinedIcon />}
                            >
                                Tambah Data Teknis
                            </Button>
                        </Box>
                    ))}
                </CardContent>
            </Card>
        </>
    );
}
