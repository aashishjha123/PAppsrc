import React from 'react'
import { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarQuickFilter } from "@mui/x-data-grid";
import useAdmin from '../../hooks/useAdmin';
import AdminRepository from 'api/AdminRepository';
import Cookies from "js-cookie";


// const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     // width: 50,
//   };
const DirectApplications = () => {

    const { GetDirectApplicationList, GetCardClicks } = useAdmin();
    const [applyData, setApplyData] = useState([]);
    const [clickData, setClickData] = useState([])
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
  const [pageSize, setPageSize] = useState(100);
  const [pageSize1, setPageSize1] = useState(100);

  const directApplications = () => {
    setLoading(true);
        var getApplications = GetDirectApplicationList();
        getApplications.then((res) => {
            if(res.status === 200){
                setApplyData(res.data.data);
                setLoading(false);
            }
        })
        .catch((err) => {
            console.log(err);
        });
  }

  const getcardClicks = () => {
    setLoading1(true);
    var getCardClick = GetCardClicks();
    getCardClick.then((res) => {
      if(res.status === 200){
        setClickData(res.data.data)
        setLoading1(false)
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }


    const fetchApplications = () => {
        directApplications();
        getcardClicks();
        AdminRepository.checkUserActive()
      .then((res) => {
        if (res.data.data.is_active === "N" ) {
          window.location.href = "/";
          localStorage.clear();
          Cookies.remove("token");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
    // const SSE = () => {
    //   const source = new EventSource('http://localhost:8001/opt/webapp/opportunityCardClicksSSE');
    //     const source2 = new EventSource('http://localhost:8001/opt/webapp/opportunityApplySSE');
    // source.onmessage = (event) => {
    //   // Handle the event here
    //   console.log("click data aaya",JSON.parse(event.data));
    //   if(event.data.length > 0){
    //     const clickdata = JSON.parse(event.data);
    //     if(clickdata.fields){
    //       setClickData(prevObjects => {
    //         // Find the object with the matching id
    //         const objectToUpdate = prevObjects.find(object => object.id === clickdata.id);
    //         // Create a copy of the object with the updated key value
    //         const updatedObject = { ...objectToUpdate, ...clickdata.fields };
    //         // Create a new array with the updated object
    //         const updatedObjects = prevObjects.map(object =>
    //           object.id === clickdata.id ? updatedObject : object
    //         );
    //         return updatedObjects;
    //       });  
    //     }
    //     else{
    //     // add data to the first row
    //     setClickData((old) => [JSON.parse(event.data), ...old]);
    //     }
    //   }
    // }
    // source2.onmessage = (event) => {
    //   // Handle the event here
    //   // console.log("apply like data aaya",JSON.parse(event.data));
    //   if(event.data.length > 0){
    //     const dataa = JSON.parse(event.data);
    //     console.log("dataa",dataa)
    //     if(dataa.fields){
    //       setApplyData(prevObjects => {
    //         // Find the object with the matching id
    //         const objectToUpdate = prevObjects.find(object => object.id === dataa.id);
    //         // Create a copy of the object with the updated key value
    //         const updatedObject = { ...objectToUpdate, ...dataa.fields };
    //         // Create a new array with the updated object
    //         const updatedObjects = prevObjects.map(object =>
    //           object.id === dataa.id ? updatedObject : object
    //         );
    //         return updatedObjects;
    //       });
    //     }
    //     else{
    //       console.log("id not exists")               
    //     setApplyData((old) => [JSON.parse(event.data), ...old]);
    //     console.log("applyData",[...applyData])
    //     }
    //   }
    // }
    // }
    
    useEffect(() => {
        fetchApplications();
    }, []);
            


  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport csvOptions= {{ fileName: 'DirectApplications' }} />
        <GridToolbarQuickFilter style={{ position: "absolute", right: "1%", maxWidth: "150px" }} />
      </GridToolbarContainer>
    );
  }


    const columns = [
        // { field: "id", headerName: "ID", width: 70 },
        { field: "runner_name", headerName: "Name", width: 170 },
        { field: "runner_number", headerName: "Number", width: 130 },
        { field: "email", headerName: "Email", width: 200 },
        { field: "project_name", headerName: "Project", width: 270 },
        { field: "tehsil", headerName: "Tehsil", width: 110 },
        { field: "district", headerName: "District", width: 110 },
        {field: "is_liked", headerName: "Like", width: 50},
        {field: "is_applied", headerName: "Apply", width: 50},
        { field: "applied_at", headerName: "Applied At", width: 180, type: 'date',
        valueFormatter: (params) => {
          // console.log(params)
          return params.value ? new Date(new Date(params.value).getTime() - 19800000).toLocaleString() : "";
        } },
        ];
        const columns1 = [
          // { field: "id", headerName: "ID", width: 70 },
          { field: "project_name", headerName: "Project", width: 280 },
          { field: "runner_number", headerName: "Number", width: 130 },
          { field: "card_clicked_at", headerName: "Card Clicked at", width: 180, type: 'date',
          valueFormatter: (params) => {
            return new Date(new Date(params.value).getTime() - 19800000).toLocaleString();
          }},
          { field: "video_clicked_at", headerName: "Video Clicked at", width: 180, type: 'date',
          valueFormatter: (params) => {
            return params.value ? new Date(new Date(params.value).getTime() - 19800000).toLocaleString() : "";
          }},
          { field: "apply_link_clicked_at", headerName: "Apply Link Clicked at", width: 180, type: 'date',
          valueFormatter: (params) => {
            return params.value ? new Date(new Date(params.value).getTime() - 19800000).toLocaleString() : "";
          }},
          ];
  return (
    <DashboardLayout>
        <DashboardNavbar />
          <h3 style={{margin: "5px"}} >Direct Applications</h3>
        <div style={{ height: 460, width: "100%", marginTop: "10px" }}>
        <DataGrid
          sx={{
            boxShadow: 2,
            border: 2,
            borderColor: "ravi.main",
            "& .MuiDataGrid-cell:hover": {
              color: "ravi.main",
            },
            "& .MuiDataGrid-row:focus": {
              backgroundColor: "#33A2B5",
            },
          }}
          rows={applyData}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[50, 100]}
          loading={loading}
            components={{ 
                Toolbar: column => <CustomToolbar {...column} />,
            }}
        />
      </div>
      <h3 style={{marginTop: "25px"}} >Click Analysis</h3>
      <div style={{ height: 460, width: "100%", marginTop: "10px" }}>
        <DataGrid
          sx={{
            boxShadow: 2,
            border: 2,
            borderColor: "ravi.main",
            "& .MuiDataGrid-cell:hover": {
              color: "ravi.main",
            },
            "& .MuiDataGrid-row:focus": {
              backgroundColor: "#33A2B5",
            },
          }}
          rows={clickData}
          columns={columns1}
          pageSize={pageSize1}
          onPageSizeChange={(newPageSize) => setPageSize1(newPageSize)}
          rowsPerPageOptions={[50, 100]}
          loading={loading1}
            components={{ 
                Toolbar: column => <CustomToolbar {...column} />,
            }}
        />
      </div>
    </DashboardLayout>
  )
}

export default DirectApplications