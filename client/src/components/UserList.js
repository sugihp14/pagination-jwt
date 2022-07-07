import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import Navbar from './Navbar'
import {useNavigate} from 'react-router-dom'
import jwtDecode from 'jwt-decode'
function UserList() {

    const [users,setUsers]=useState([])
    const [page,setPage]=useState(0)
    const [limit,setLimit]=useState(10)
    const [pages,setPages]=useState(0)
    const [rows,setRows]=useState(0)
    const [keyword,setKeyword]=useState("")
    const [msg,setMsg]=useState("")
    const [query,setquery]=useState("")
    const [token,setToken]=useState("")
    const [name,setName]=useState("")
    const [exp,setExp]=useState("")

 

    const history=useNavigate()

    useEffect(()=>{
        getDataUser()
      },[page,keyword])
      
  
  const getDataUser=async()=>{
    refreshToken()
    getUsers()
  }  



    const axiosJwt=axios.create()

    axiosJwt.interceptors.request.use(async(config)=>{
        const currentDate=new Date()
        if (exp*1000<currentDate.getTime()) {
            
                const response=await axios.get('http://localhost:5000/token',{ withCredentials: true })
                config.headers.Authorization='Bearer '+ response.data
                setToken(response.data)
                const decoded=jwtDecode(response.data)
                setName(decoded.name)
                setExp(decoded.exp)
          
        
            
        }
        return config
    },(error)=>{
        return Promise.reject(error)
    })

    const refreshToken=async()=>{
        try {
            const response=await axios.get('http://localhost:5000/token',{ withCredentials: true })
            const decoded=jwtDecode(response.data)
            setName(decoded.name)
            setExp(decoded.exp)
            setToken(response.data)

        } catch (error) {
            if (error.response) {
                history("/login")
            }
        }
    }



    const getUsers=async()=>{
       
        const response=await axiosJwt.get(`http://localhost:5000/users?search_query=${keyword}&page=${page}&limit=${limit}`,{
            headers:{
                Authorization:'Bearer '+ token
            }
        })
            setUsers(response.data.result)
            setPage(response.data.page)
            setPages(response.data.totalPage)
            setRows(response.data.totalRows)
    }

    const searchData=(e)=>{
        e.preventDefault();
        setPage(0)
        setKeyword(query)
    }

    const changePage=({selected})=>{
        setPage(selected)
        if (selected===9) {
            setMsg("Silahkan gunakan fitur pencarian")
        }else{
            setMsg("")
        }
    }

  return (
    <div>
     <Navbar/>
    <div className="container mt-5">
            <div className="columns mt-5">
                <div className="column is-centered">
                    <form onSubmit={searchData}>
                        <div className='field has-addons'>
                            <div className='control is-expanded'>
                                <input className='input'
                                text="text"
                                value={query}
                                onChange={(e)=>setquery(e.target.value)}
                                placeholder='cari'
                                >
                                </input>
                            </div>
                            <div>
                                <button type='submit' className='button is-info'>
                                    search
                                </button>
                            </div>
                        </div>
                    </form>
                    <table className='table is-striped is-bordered is-fullwidth mt-2'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>ID</th> 
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user,index)=>(
                            <tr key={user.id}>
                                <td>{index+1}</td>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.gender}</td>
    
                            </tr>   
                        ))}
                         
                   
                    
                    </tbody>
                  
                </table>
                    <p>Total Rows:{rows} Page :{rows ? page+1:0} of {pages}</p>
                    <p className='has-text-centered has-text-danger'>{msg}</p>
                    <nav 
                    className="nav pagination is-rounded is-centered"
                    role="navigation"
                    key={rows}
                    aria-label="pagination"
                    
                    >
                        <ReactPaginate
                            previousLabel={"< Prev"}
                            nextLabel={" Next >"}
                            pageCount={Math.min(10,pages)}
                            onPageChange={changePage}
                            containerClassName={"pagination-list"}
                            pageLinkClassName={"pagination-link"}
                            previousClassName={"pagination-previous"}
                            nextClassName={"pagination-next"}
                            activeClassName={"pagination-link is-current"}
                            disabledClassName={"pagination-link is-disabled"}
                        >

                        </ReactPaginate>

                    </nav>
               </div>
            </div>
        </div>
        </div>


  )
}

export default UserList