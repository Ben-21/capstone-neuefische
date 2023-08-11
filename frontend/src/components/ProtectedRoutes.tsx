import {Outlet, Navigate} from "react-router-dom";

type Props = {
    user?: string
}

export default function ProtectedRoutes({user}: Props) {

    if (user === undefined) return "loading ...";

    const isLoggedIn = user !== "anonymousUser";

    return <>{isLoggedIn ? <Outlet/> : <Navigate to="/login"/>}</>;

}