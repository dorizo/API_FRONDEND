import { useMee } from 'contexts/MeContext';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useQuery, useQueryClient } from 'react-query';
import { DESIGNATOR_VIEW_ALL, SEARCH_STOCK_ALL, UPDATE_KHS_DESIGNATOR } from 'services/datateknis';

function Khsdetaillist(props) {
    const { data, index, projectid, witelid } = props;
    const querylagi = useQueryClient();
    const serchingdata = data?.id_project_khs_v2_detail;
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
        // const searcingdata = event.target.value;
        // const kode = data?.id_project_khs_v2_detail;
        // // eslint-disable-next-line react-hooks/rules-of-hooks
        // const datastokwilayahku = useQuery(['STOK_DATA', { searcingdata, kode }], SEARCH_STOCK_ALL);
        // console.log(datastokwilayahku);
    };
    return (
        <>
            <div className="p-2 block-example border border-dark mb-4">
                <h6>{data?.designator_code}</h6>
                <div>{data?.designator_desc}</div>
                <h3>quantity : {data?.totalkebutuhan}</h3>
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
                        <Form.Select aria-label="Default select example" onClick={datastokwilayah}>
                            {data?.stock?.map((e) => (
                                <>
                                    <option>
                                        Stock : {e.stock_qty} ,Harga {e.stock_price}
                                    </option>
                                </>
                            ))}
                        </Form.Select>
                    </>
                )}
            </div>
        </>
    );
}
export default Khsdetaillist;
