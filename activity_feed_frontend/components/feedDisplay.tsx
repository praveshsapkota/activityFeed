import { NextPage } from "next";
import React, { FC, useContext, useState } from "react";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import EditSharpIcon from '@mui/icons-material/EditSharp';
import MoreHorizSharpIcon from '@mui/icons-material/MoreHorizSharp';
import { IconButton } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import { Api_context } from "../pages/index"
import { CreateUpdateModal } from "./createUpdateModal"

import axios from "axios"
interface props {
    id: number,
    textContent: string,
    image: string,
    updated_at: string,
}


export const FeedDisplay: NextPage<props> = (props) => {
    const date = new Date(props.updated_at)
    const day = date.toLocaleString()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const api_url = useContext(Api_context)

    const [openState, setopenState] = useState(false)
    const postModelOpener = () => {
        setopenState(true);
    }
    const deletePost = (id: number) => {
        const deleteRes = axios.post(api_url + `/delete/${id}`).catch(e => console.log(e))
        console.log(deleteRes)
    }

    return (
        <>
            <div className="flex flex-col m-5 p-5 bg-white rounded-lg mb-16">
                <div className="flex flex-row items-center pt-2 pb-2 max-w-full">
                    <Avatar alt="Remy Sharp" src="images/download.jpeg" />
                    <div>
                        <span style={{ fontFamily: "sans-serif" }} className="font-sans text-sm font-bold ml-2 pl-1">Pravesh Sapkota</span>
                        <div className="font-extralight ml-2 pl-1 text-xs from-neutral-500">{day}</div>
                    </div>
                    <div className="ml-auto mr-2 font-extralight items-center ">
                        <IconButton onClick={handleClick} >
                            <MoreHorizSharpIcon />
                        </IconButton>
                    </div>
                </div>
                <div className="p-5">
                    <div className=" text-sm pb-2">{props.textContent}</div>
                    {props.image ?
                        <Image unoptimized={true} src={api_url + props.image} height={400} width={500} />
                        : null
                    }
                </div>
            </div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={async () => {
                    handleClose()
                    postModelOpener()
                }}>
                    <div className="flex flex-row  justify-start ">
                        <EditSharpIcon fontSize="small" htmlColor="gray" />
                        <div className="ml-2">
                            <span className="font-thin text-sm">
                                <em >
                                    Edit post
                                </em>
                            </span>
                        </div>
                    </div>
                </MenuItem>
                <MenuItem onClick={() => {
                    handleClose()
                    deletePost(props.id)
                    setTimeout(() => {
                        window.location.reload()
                    }, 500);
                }

                }>
                    <div className="flex flex-row justify-start ">
                        <DeleteSharpIcon fontSize="small" htmlColor="gray" />
                        <div className="ml-2">
                            <span className="font-thin text-sm">
                                Delete post
                            </span>
                        </div>
                    </div>
                </MenuItem>

            </Menu>

            <CreateUpdateModal id={props.id} textContent={props.textContent} image={props.image} setState={setopenState} state={openState} />
        </>
    )
}

