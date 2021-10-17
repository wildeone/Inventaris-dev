import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import BreadCrumb from '../../components/BreadCrumb'
import Dropdown from '../../components/Dropdown'
import { Link } from 'react-router-dom'
import { deleteDepartment, getDepartmentLimit, getSearchDept } from '../../helpers/requestDept'
import { setDepartment, fetchDepartmentFromBackEndToRedux } from '../../redux'
import { AgGridReact, AgGridColumn } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import ButtonCreate from '../../components/ButtonCreate'
import { Breadcrumbs } from '@mui/material';
import SearcBar from '../../components/SearchBar'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import BreadcrumbsComp from '../../components/Breadcrumbs'

// Import MUI Library
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

// Icon
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function DepartmentList(props) {
    const { departmentList, fetchDepartmentFromBackEndToRedux, setDepartment, classes } = props;

    const [searchValue, setSearchValue] = useState('')
    const [entries, setEntries] = useState(10)
    const del = (id) => {
        window.location.reload()
        deleteDepartment({}, id)
    }
    const handleFilter = async (limit) => {
        const params = {
            nama_department: searchValue,
        }
        const res = await getSearchDept(params)
        setDepartment(res)
    }
    const actionButton = (params) => {

    }
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            hide: true,
        },
        {
            field: 'kode_department',
            headerName: 'Kode Department',
            minWidth: 150,
            sortable: true,

        },
        {
            field: 'nama_department',
            headerName: 'Nama Department',
            minWidth: 150,
            sortable: true
        },
        {
            field: 'status',
            headerName: 'Status',
            minWidth: 100,
            sortable: true
        },
        {
            field: 'id',
            headerName: 'Action',
            minWidth: 100,
            cellRendererFramework: (parameter) =>
                <div>
                    <Link to={'/department-edit/edit/' + parameter.value}>
                        <IconButton color="primary">
                            <EditIcon style={{fontSize: '25px'}}/>
                        </IconButton>
                    </Link>

                    <IconButton color="error"
                        onClick={() => del(parameter.value)}>
                        <DeleteForeverIcon style={{ fontSize: '25px' }} />
                    </IconButton>
                </div >
        }
    ]

    const defaultColDef = {
        // filter: true,
        flex: 1,
        resizable: true
    }

    const onFirstDataRendered = (params) => {
        params.api.sizeColumnsToFit();
    };

    const handleChange = (event) => {
        setEntries(event.target.value);
    };

    const styles = (theme) => ({
        input: {
            height: 50
        }
    });

    return (
        <div style={{ width: "100%", height: "100%", position: 'relative' }}>
            <div>
                <BreadcrumbsComp menuBreadcrumbs={
                    [
                        <p>Master</p>,
                        <p>Department</p>
                    ]
                } />
                {/* <ButtonCreate to={'/cabang-create/create'} /> */}
                <Link to={'/department-create/create'}>
                    <Button variant="outlined" startIcon={<AddIcon style={{ fontSize: '20px' }} />}
                        style={{ backgroundColor: '#26a69a', color: 'white', position: 'absolute', top: '10px', right: '25px', width: '90px', height: '30px', fontSize: '13px', marginLeft: '10px' }}>
                        Create
                    </Button>
                </Link>

            </div>

            <div style={{ height: '40px', positon: 'relative' }}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Select
                        value={entries}
                        onChange={handleChange}
                        displayEmpty
                        style={{ height: '30px', backgroundColor: 'white' }}
                    >
                        <MenuItem value={10}>Entries 10</MenuItem>
                        <MenuItem value={20}>Entries 20</MenuItem>
                        <MenuItem value={30}>Entries 30</MenuItem>
                    </Select>
                </FormControl>


                <TextField
                    label="Cari Nama Department"
                    onChange={(ev) => setSearchValue(ev.target.value)}
                    size='small'
                    style={{ height: '30px', position: 'absolute', top: '52px', right: '60px' }}
                    InputProps={{
                        style: {
                            height: '32px',
                            borderWidth: '1px',
                            backgroundColor: 'white',
                            fontSize: 15, //when shrink                
                        }
                    }}
                    InputLabelProps={{
                        style: {
                            fontSize: 15, //placeholder
                            margin: 0
                        }
                    }}
                />

                <IconButton color="primary"
                    onClick={() => handleFilter(entries)}
                    style={{ position: 'absolute', top: '45px', right: '15px' }}>
                    <SearchIcon style={{ fontSize: '30px' }} />
                </IconButton>


                {/* <input onChange={(ev) => setSearchValue(ev.target.value)} type="text" placeholder={'Cari Nama Department'}
                    style={{ textTransform: 'capitalize', position: 'absolute', top: '62px', right: '60px' }} />


                <button onClick={() => handleFilter(entries)} style={{ position: 'absolute', top: '62px', right: '27px' }}>Cari</button> */}
            </div>



            <div id="myGrid"
                style={{ height: "65%", marginLeft: '10px', marginRight: '27px', marginTop: '5px', borderRadius: '20px' }}
                className="ag-theme-alpine" >
                <AgGridReact
                    style={{
                        fontSize: '5px'
                    }}
                    onFirstDataRendered={onFirstDataRendered}
                    columnDefs={columns}
                    rowData={departmentList}
                    pagination={true}
                    paginationPageSize={entries}
                    defaultColDef={defaultColDef}
                    rowHeight={40}
                />
            </div>
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        departmentList: state.generalReducer.department.data
    }
}

export default connect(mapStateToProps, { setDepartment, fetchDepartmentFromBackEndToRedux })(DepartmentList)