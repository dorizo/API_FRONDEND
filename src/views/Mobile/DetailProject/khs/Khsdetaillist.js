import { useMee } from 'contexts/MeContext';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useQuery, useQueryClient } from 'react-query';
import AttachmentIcon from '@mui/icons-material/Attachment';
import {
    DESIGNATOR_VIEW_ALL,
    SEARCH_STOCK_ALL,
    UPDATE_KHS_DESIGNATOR,
    UPDATE_KHS_DESIGNATOR_STOK,
    handleFileUpload
} from 'services/datateknis';

function Khsdetaillist(props) {
    const { data, index, projectid, witelid, project, filemanager } = props;
    const querylagi = useQueryClient();
    const serchingdata = data?.id_project_khs_v2_detail;
    const onButtonClick = (fileget) => () => {
        // console.log(fileget?.fileget);
        filemanager({ open: true, urlfile: fileget });
    };
    const { me, role } = useMee();
    const {
        data: dataselectstok,
        isLoading: loadingselectstok,
        isError: errorselectstok,
        refetch: refachstok
    } = useQuery(['STOK_DATA', { serchingdata, data }], () => SEARCH_STOCK_ALL({ serchingdata, witelid, data }));
    const onImageChange = async (event) => {
        // const resp = await UPDATE_PROJECT_KHSV2_DETAIL(dataalls);
        await UPDATE_KHS_DESIGNATOR({ Khsstatusproject: event.target.value, idprojectkhsv2detail: data?.id_project_khs_v2_detail });
        const x = await querylagi.fetchQuery(['SUB_PROJECT_VIEW', projectid]);
        console.log(event.target.value, data?.id_project_khs_v2_detail);
    };
    const datastokwilayah = async (event) => {
        await UPDATE_KHS_DESIGNATOR_STOK({ Khsstatusproject: event.target.value, idprojectkhsv2detail: data?.id_project_khs_v2_detail });
        const x = await querylagi.fetchQuery(['SUB_PROJECT_VIEW', projectid]);
        console.log(event.target.value, data?.id_project_khs_v2_detail);
    };
    return (
        <>
            <div className="p-2 block-example border border-dark mb-4">
                <h6>{data?.designator_code}</h6>
                <div>{data?.designator_desc}</div>
                <h3>quantity : {data?.totalkebutuhan}</h3>
                <Row>
                    <Col xs={8}>
                        {project?.project_status === 'Survey' && (
                            <>
                                <Form.Check
                                    inline
                                    label="TA"
                                    value="TA"
                                    name={data?.id_project_khs_v2_detail}
                                    type="radio"
                                    checked={data.Khs_status_project === 'TA' ? 'checked' : ''}
                                    onClick={(e) => {
                                        onImageChange(e);
                                    }}
                                />
                                <Form.Check
                                    inline
                                    label="API"
                                    name={data?.id_project_khs_v2_detail}
                                    type="radio"
                                    value="API"
                                    checked={data.Khs_status_project === 'API' ? 'checked' : ''}
                                    onClick={(e) => {
                                        onImageChange(e);
                                    }}
                                />
                                {data?.Khs_status_project === 'API' && (
                                    <>
                                        {data?.id_stok === '0' && (
                                            <Form.Select aria-label="Default select example" onClick={datastokwilayah}>
                                                <option value={0}>Pilih Stock(Stok tidak dapat di rubah)</option>
                                                {data?.stock?.map((e) => (
                                                    <>
                                                        <option value={e.stock_id}>
                                                            Stock : {e.stock_qty} ,Harga {e.stock_price}
                                                        </option>
                                                    </>
                                                ))}
                                            </Form.Select>
                                        )}
                                        {data?.id_stok !== '0' && <p>Stock sudah terisi Mohon hubungin admin jika ada perubahan</p>}
                                    </>
                                )}
                            </>
                        )}
                    </Col>
                    <Col>
                        <div className="p-2 position-relative">
                            <Button
                                onClick={onButtonClick({
                                    fileget: `${project.project_status}/${project.project_id}/${data.id_project_sub}/${data.id_project_khs_v2}/${data.id_project_khs_v2_detail}`
                                })}
                                size="sm"
                                className="position-absolute bottom-0 end-0 mr-2"
                                variant="outline-danger"
                            >
                                <AttachmentIcon /> att
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}
export default Khsdetaillist;
