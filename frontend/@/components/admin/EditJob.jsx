import React, { useEffect, useState } from 'react'
import NavBar from '../shared/NavBar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import {  job_END_POINT } from '/@/utils/constant'

function EditJob() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [loading, setLoading] = useState(false);

    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        position: ""
    });

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await axios.get(
                    `${ job_END_POINT}/get/${id}`,
                    {
                        withCredentials: true
                    }
                );

                if (res.data.success) {
                    const job = res.data.job;

                    setInput({
                        title: job.title || "",
                        description: job.description || "",
                        requirements: job.requirements || "",
                        salary: job.salary || "",
                        location: job.location || "",
                        jobType: job.jobType || "",
                        position: job.position || ""
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchJob();
    }, [id]);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await axios.put(
                `${job_END_POINT}/update/${id}`,
                input,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <NavBar />

            <div className="max-w-4xl mx-auto my-10">
                <form
                    onSubmit={submitHandler}
                    className="border border-gray-200 rounded-md p-8 shadow-lg"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate("/admin/jobs")}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>

                        <h1 className="font-bold text-xl">
                            Edit Job
                        </h1>
                    </div>

                    <div className="grid grid-cols-2 gap-5">

                        <div>
                            <Label>Title</Label>
                            <Input
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label>Description</Label>
                            <Input
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label>Requirements</Label>
                            <Input
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label>Salary</Label>
                            <Input
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label>Location</Label>
                            <Input
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label>Job Type</Label>
                            <Input
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label>Position</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                            />
                        </div>

                    </div>

                    {
                        loading ? (
                            <Button className="w-full mt-5">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="w-full mt-5"
                            >
                                Update Job
                            </Button>
                        )
                    }
                </form>
            </div>
        </div>
    );
}

export default EditJob;