// import React, { useState } from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import { ThemeProvider } from "@/contexts/theme-context";

// import CustomCursor from './Components/CustomCursor'
// import LoadingScreen from './Sections/LoadingScreen'
// // Layouts and Pages
// import Layout from "@/routes/layout";
// import DashboardPage from "@/routes/dashboard/page";
// import Settings from "@/routes/dashboard/Settings";
// // import VideoLoader from "./Sections/VideoLoader";
// // import SignUp from "./Sections/SignUp";
// // import SignIn from "./Sections/SignIn";
// // import SiteDailyReport from "./dump/SiteDailyReport";
// // import SiteDailyReport from "./routes/dashboard/SiteDailyReport";
// import RawMaterial from "./dump/RawMaterial";
// // import HeroSection from "./Sections/Hero2";
// import HeroSection from "./Sections/HeroSection";
// import { Auth } from "./Sections/auth";
// import { SignIn } from "./Sections/SignIn";
// import Sites from "./routes/dashboard/Sites";
// import DailyReportPage from "./routes/dashboard/SiteDailyReport";
// import RawMaterialsPage from "./routes/dashboard/RawMaterialsPage";
// import { LanguageProvider } from "./contexts/LanguageContext";
// import UploadImagePage from "./routes/dashboard/UploadImagePage";
// import FoundationDashboard from "./routes/dashboard/stages/FoundationDashboard";

// function App() {
//     const [isLoading, setIsLoading] = useState(true);

//     const handleLoadingComplete = () => {
//         setIsLoading(false);
//     };

//     const router = createBrowserRouter([
//         // Landing Website Routes
//         {
//             path: "/",
//             element: <HeroSection />,
//         },
//         {
//             path: "/signup",
//             element: <Auth />,
//         },
//         {
//             path: "/signin",
//             element: <SignIn />,
//         },

//         // {
//         //     path: "/form1",
//         //     element: <SiteDailyReport />,
//         // },
//         {
//             path: "/form2",
//             element: <RawMaterial />,
//         },
//         // Dashboard Routes
//         {
//             path: "/dashboard",
//             element: <Layout />,
//             children: [

//                 { path: "page", index: true, element: <Sites /> },
//                 { path: "analytics", element: <DailyReportPage /> },
//                 { path: "reports", element: <RawMaterialsPage /> },
//                 { path: "upload", element: < UploadImagePage /> },

//                 { path: "page", index: true, element: <DashboardPage /> },
//                 { path: "Sites", element: <Sites /> },
//                 { path: "analytics", element: <DailyReportPage/>  },
//                 { path: "reports", element: <h1 className="title">Reports</h1> },

//                 { path: "customers", element: <h1 className="title">Customers</h1> },
//                 { path: "new-customer", element: <h1 className="title">New Customer</h1> },
//                 { path: "verified-customers", element: <h1 className="title">Verified Customers</h1> },
//                 { path: "products", element: <h1 className="title">Products</h1> },
//                 { path: "new-product", element: <h1 className="title">New Product</h1> },
//                 { path: "inventory", element: <h1 className="title">Inventory</h1> },
//                 { path: "foundation", element:<FoundationDashboard/> },
//                 { path: "settings", element: <Settings /> },
//             ],
//         },
//     ]);

//     return (
//         <LanguageProvider>

//             <main>
//                 <CustomCursor />
//                 <ThemeProvider storageKey="theme">
//                     {isLoading ? (
//                         <LoadingScreen onComplete={handleLoadingComplete} />
//                     ) : (
//                         <RouterProvider router={router} />
//                     )}
//                 </ThemeProvider>
//             </main>
//         </LanguageProvider>
//     );
// }

// export default App;

import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/contexts/theme-context";

import CustomCursor from './Components/CustomCursor'
import LoadingScreen from './Sections/LoadingScreen'
// Layouts and Pages
import Layout from "@/routes/layout";
import DashboardPage from "@/routes/dashboard/page";
import Settings from "@/routes/dashboard/Settings";
import VideoLoader from "./Sections/VideoLoader";
// import SignUp from "./Sections/SignUp";
// import SignIn from "./Sections/SignIn";
// import SiteDailyReport from "./dump/SiteDailyReport";
// import SiteDailyReport from "./routes/dashboard/SiteDailyReport";
import RawMaterial from "./dump/RawMaterial";
// import HeroSection from "./Sections/Hero2";
import HeroSection from "./Sections/HeroSection";
import { Auth } from "./Sections/auth";
import { SignIn } from "./Sections/SignIn";
import Sites from "./routes/dashboard/Sites";
import DailyReportPage from "./routes/dashboard/SiteDailyReport";
import RawMaterialsPage from "./routes/dashboard/RawMaterialsPage";
// import { LanguageProvider } from "./contexts/LanguageContext";
import UploadImagePage from "./routes/dashboard/UploadImagePage";
import FoundationDashboard from "./routes/dashboard/stages/FoundationDashboard";
import SubStructureDashboard from "./routes/dashboard/stages/SubStructureDashboard";
import SuperStructureDashboard from "./routes/dashboard/stages/SuperStructureDashboard";
import PlinthDashboard from "./routes/dashboard/stages/PlinthDahsboard";
import ReportPage from "./routes/dashboard/stages/ReportPage";
function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    const handleLoadingComplete = () => {
        setIsLoading(false);
        setIsVideoPlaying(true); // Show VideoLoader after loading
    };

    const handleVideoComplete = () => {
        setIsVideoPlaying(false); // Transition to the main app after video ends
    };


    const router = createBrowserRouter([
        // Landing Website Routes
        {
            path: "/",
            element: <HeroSection />,
        },
        {
            path: "/signup",
            element: <Auth />,
        },
        {
            path: "/signin",
            element: <SignIn />,
        },

        // {
        //     path: "/form1",
        //     element: <SiteDailyReport />,
        // },
        {
            path: "/form2",
            element: <RawMaterial />,
        },
        {
        
            path: "reportPage",
            element: <ReportPage />
        },

        
// Dashboard Routes
{
    path: "/dashboard",
        element: <Layout />,
            children: [

                { path: "page", index: true, element: <DashboardPage /> },
                { path: "analytics", element: <DailyReportPage /> },
                { path: "reports", element: <RawMaterialsPage /> },
                { path: "upload", element: < UploadImagePage /> },

                { path: "page", index: true, element: <DashboardPage /> },
                { path: "Sites", element: <Sites /> },
                { path: "analytics", element: <DailyReportPage /> },
                { path: "foundation", element: <FoundationDashboard /> },
                { path: "substructure", element: <SubStructureDashboard /> },
                { path: "superstructure", element: <SuperStructureDashboard /> },
                { path: "plinth", element: <PlinthDashboard /> },

                { path: "customers", element: <h1 className="title">Customers</h1> },
                { path: "new-customer", element: <h1 className="title">New Customer</h1> },
                { path: "verified-customers", element: <h1 className="title">Verified Customers</h1> },
                { path: "products", element: <h1 className="title">Products</h1> },
                { path: "new-product", element: <h1 className="title">New Product</h1> },
                { path: "inventory", element: <h1 className="title">Inventory</h1> },
                { path: "settings", element: <Settings /> },
            ],
        },
    ]);

return (


    <main>
        <CustomCursor />
        <ThemeProvider storageKey="theme">
            {isLoading ? (
                <LoadingScreen onComplete={handleLoadingComplete} />
            ) : isVideoPlaying ? (
                <VideoLoader onComplete={handleVideoComplete} />
            ) : (
                <RouterProvider router={router} />
            )}
        </ThemeProvider>
    </main>

);
}

export default App;
