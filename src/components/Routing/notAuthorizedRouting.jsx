import React from "react";
import {Route, Routes} from "react-router";
import {NotAuthorizedPage} from "../../pages/NotAuthorizedPage/notauthorizedpage";

export const NotAuthorizedRouting = () => {
    return (<>
        <Routes>
            <Route path="*" element={<NotAuthorizedPage/>}/>
        </Routes>
    </>)

}