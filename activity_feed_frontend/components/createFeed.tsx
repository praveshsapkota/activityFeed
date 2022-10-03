import Avatar from "@mui/material/Avatar";
import React, { FC } from "react";

interface props {
    setState: (arg0: boolean) => void
}

export const CreateFeed: FC<props> = ({ setState }) => {
    const handelOpen = () => setState(true)
    return (
        <div className="bg-white m-auto self-center rounded-3xl p-3 w-12/12">
            <div className="flex flex-row">
                <Avatar alt="Remy Sharp" src="images/download.jpeg" />
                <input onClick={() => {
                    handelOpen()
                }} placeholder="Post any thing you like " type="search" className="ml-5 pl-6 outline-none rounded-3xl w-full max-w-7xl" style={{ backgroundColor: "rgb(220, 215, 215)" }} />
            </div>
        </div>
    )
}
