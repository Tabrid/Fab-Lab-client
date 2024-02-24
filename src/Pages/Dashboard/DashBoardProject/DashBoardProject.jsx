import  { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import swal from 'sweetalert';

const DashBoardProject = () => {
    const [project, setProject] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://fab-lab-server-production.up.railway.app/api/project/projects')
            .then(res => res.json())
            .then(data => {
                setProject(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching project data:', error);
                setLoading(false); 
            });
    }, []);

   
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredProject = project.filter(person =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const navigate = useNavigate();
    const handleEdit = (id) => {
        navigate(`/dashboard/editproject/${id}`);
    }

    const handleDelete = (id) => {
        fetch(`https://fab-lab-server-production.up.railway.app/api/project/projects/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                swal({
                    title: "Good job!",
                    text: `project is successfully deleted`,
                    icon: "success",
                    button: "DONE",
                  });
            });
    }

    return (
        <div>
            <div className="mx-14 flex justify-between mb-10 items-center">
                <input value={searchQuery}
                    onChange={handleSearchChange} className="w-1/2 h-10 rounded-[35px] mt-5 px-5 border border-black" type="text" placeholder="Search" />
                <Link to='/dashboard/addproject'><button className="btn btn-sm bg-[#2e3094] hover:bg-[#2e3094] text-white">Add</button></Link>
            </div>
          
            {loading ? (
                <div className="flex justify-center">
                    <BounceLoader color="#2e3094" />
                </div>
            ) : (
                <div className='my-10 px-10 flex justify-center'>
                    <div className='grid grid-cols-2 gap-5'>
                        {
                            filteredProject.map((item, index) => (
                                <button key={index} className="card w-96 bg-base-100 shadow-xl  border-slate-950 border-spacing-0.5 border">
                                    <figure className="px-10 pt-10">
                                        <img src={item.image} alt="Shoes" className="rounded-xl" />
                                    </figure>
                                    <div className="card-body w-full items-center text-center border-slate-950 border-spacing-0.5 border-t">
                                        <h2 className="card-title">{item.name}</h2>
                                    </div>
                                    <div className=" flex justify-center w-full mb-5">
                                        <div className=" flex gap-5">
                                            <button onClick={() => handleEdit(item._id)} className="btn btn-sm bg-[#2e3094] hover:bg-[#2e3094] text-white">Edit</button>
                                            <button onClick={() => handleDelete(item._id)} className="btn btn-sm bg-[#2e3094] hover:bg-[#2e3094] text-white">Delete</button>
                                        </div>
                                    </div>
                                </button >
                            ))
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashBoardProject;
