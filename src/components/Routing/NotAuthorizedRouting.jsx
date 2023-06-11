import React from "react";
import {Route, Routes} from "react-router";
import {NotAuthorizedPage} from "../../pages/NotAuthorizedPage/notauthorizedpage";

export const NotAuthorizedRouting = () => {
    return (<>
        <Routes>
            <Route path="/not-authorized" element={<NotAuthorizedPage/>}/>
            <Route path="*" element={<NotAuthorizedPage/>}/>
        </Routes>
    </>)

}