import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Home from "../Pages/Home";
import SearchPages from "../Pages/SearchPages";
import DetailsPages from "../Pages/DetailsPages";
import ExplorePages from "../Pages/ExplorePages";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path : "",
                element: <Home />
            },
            {
                path : ":explore",
                element: <ExplorePages />
            },
            {
                path : ":explore/:id",
                element: <DetailsPages />
            },
            {
                path : "search",
                element: <SearchPages />
            }
        ]
    }
])

export default router;