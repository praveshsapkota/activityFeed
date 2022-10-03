import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import axios from "axios"
import { Api_context } from "../pages/index"
import { useContext } from 'react';

interface props {
    id?: number,
    state: boolean,
    setState: (arg0: boolean) => void,
    textContent?: string,
    image?: string
}

const style = {
    position: 'absolute' as 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const CreateUpdateModal: React.FC<props> = ({ setState, state, textContent, image, id }) => {
    const handleOpen = () => setState(true);
    const handleClose = () => setState(false);
    const api_url = useContext(Api_context)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        console.log(formData.get("textContent"), formData.get("image"));

        if (textContent) {
            const updateRes = axios.post(api_url + `/update/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(() => {
                handleClose()
                window.location.reload()

            }).catch(error => console.log(error))
            console.log(updateRes)
        }
        else {
            const createRes = await axios.postForm(process.env.NEXT_PUBLIC_API_URL + "/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(() => {
                handleClose()
                window.location.reload()
            }).catch(error => console.log(error))
            console.log(createRes)
        }
    };


    return (
        <div>
            <Modal
                open={state}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className='flex flex-row '>
                                <Avatar sizes='40' alt="Remy Sharp" src="images/download.jpeg" />
                                <span className='font-semibold ml-5 font-sans'>Pravesh Sapkota</span>
                            </div>
                            <div className='items-center mt-5 bg-white'>
                                <textarea className='outline-none' defaultValue={textContent || ""} placeholder='What do you want to write' name="textContent" id="text" cols={48} rows={10}></textarea>
                            </div>
                            <div className='flex items-center'>
                                <input type="file" className="custom-file-input" name='image' id="add-image" accept='image/*' />
                                {/* <label htmlFor='add-image'>add image</label> */}
                                <Button type='submit' className='ml-auto bg-green-600 hover:bg-green-600' variant='contained'>
                                    {id ? "Update" : "Post"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </Box >
            </Modal >
        </div >
    )
}