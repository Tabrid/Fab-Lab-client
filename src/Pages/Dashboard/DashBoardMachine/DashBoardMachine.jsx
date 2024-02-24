import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';
import swal from 'sweetalert';

const DashBoardMachine = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        fetch('https://fab-lab-server-production.up.railway.app/api/machine/machineries')
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false); 
            });
    }, []);

    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/dashboard/editmachine/${id}`);
    };

    const handleDelete = (id) => {
        fetch(`https://fab-lab-server-production.up.railway.app/api/machine/machineries/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                swal({
                    title: "Good job!",
                    text: `machine is successfully deleted`,
                    icon: "success",
                    button: "DONE",
                });
            });
    }
    <BounceLoader color="#2e3094" />
    return (
        <div className='my-10 px-10 flex flex-col justify-center'>
            <div className="mx-14 flex justify-between mb-10 items-center">
                <input className="w-1/2 h-10 rounded-[35px] mt-5 px-5 border border-black" type="text" placeholder="Search" />
                <Link to='/dashboard/addmachine'><button className="btn btn-sm bg-[#2e3094] hover:bg-[#2e3094] text-white">Add</button></Link>
            </div>
            {loading ? ( 
                <div className="flex justify-center items-center h-full">
                    <BounceLoader color="#2e3094" />
                </div>
            ) : (
                <div className='grid grid-cols-2 gap-5'>
                    {
                        data.map((item, index) => (
                            <button key={index} className="card w-96 bg-base-100 shadow-xl  border-slate-950 border-spacing-0.5 border">
                                <figure className="px-10 pt-10">
                                    <img src={item.image} alt="Shoes" className="rounded-xl" />
                                </figure>
                                <div className="card-body w-full items-center text-center border-slate-950 border-spacing-0.5 border-t">
                                    <h2 className="card-title">{item.name}</h2>
                                </div>
                                <div className="flex justify-between mb-5 gap-10 ml-10">
                                    <button onClick={() => handleEdit(item._id)} className="btn btn-sm bg-[#2e3094] hover:bg-[#2e3094] text-white">Edit</button>
                                    <button onClick={() => handleDelete(item._id)} className="btn btn-sm bg-[#2e3094] hover:bg-[#2e3094] text-white">Delete</button>
                                </div>
                            </button>
                        ))
                    }
                </div>
            )}
        </div>
    );
};

export default DashBoardMachine;
