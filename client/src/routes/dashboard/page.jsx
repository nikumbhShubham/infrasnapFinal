import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar, Line, LineChart } from "recharts";
import { useTheme } from "@/hooks/use-theme";
import { overviewData } from "@/constants";
import { Footer } from "@/layouts/footer";
import { Package, DollarSign, TrendingUp } from "lucide-react";
import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { PieChart, Pie, Cell, Legend } from "recharts";

const imagesWithDescriptions = [
    {
        src: "/assets/image1 (4).jpg",
        description: "This is the first image showcasing our site's features.",
    },
    {
        src: "/assets/image1.jpg",
        description: "A glimpse of our site's modern design elements.",
    },
    {
        src: "/assets/image2.jpeg",
        description: "Beautiful visuals reflecting the essence of our services.",
    },
    {
        src: "/assets/image4.jpeg",
        description: "Highlighting the best moments of our community.",
    },
    // {
    //     src: "/assets/review1.png",
    //     description: "Customer reviews and testimonials.",
    // },
];

const pieData = [
    { name: "Completed", value: 72, color: "#4caf50" },
    { name: "Incomplete", value: 28, color: "#f44336" },
];

const barData = [
    { stage: "Foundation", percentage: 25 },
    { stage: "Slab & Columns", percentage: 50 },
    { stage: "Super Structure", percentage: 75 },
    { stage: "Electrical & Plumbing", percentage: 90 },
    { stage: "Interiors & Furnishing", percentage: 60 },
    { stage: "Exteriors", percentage: 80 },
];

const DashboardPage = () => {
    const { theme } = useTheme();

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    return (
        <div className="flex flex-col gap-y-2">
            <header className="text-5xl font-bold mb-8">
            <span className="bg-gradient-to-r from-[#101a32] to-[#0e449b] bg-clip-text text-transparent">
                Dashboard
                </span>
            </header>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="card col-span-1 md:col-span-2 lg:col-span-4">
                    <div className="card-header">
                        <p className="card-title">Site Images</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <Carousel
                            responsive={responsive}
                            infinite={true}
                            autoPlay={true}
                            autoPlaySpeed={3000}
                            showDots={false}
                        >
                           {imagesWithDescriptions.map((item, index) => (
                                <div key={index} className="flex flex-col items-center gap-2">
                                    <div><img
                                        src={item.src}
                                        alt={`Slide ${index + 1}`}
                                        className="w-full h-64 object-cover rounded-lg"
                                    /></div>
                                    <div><p className="text-sm text-gray-700 dark:text-gray-300">
                                        {item.description}
                                    </p></div>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
                <div className="card col-span-1 md:col-span-2 lg:col-span-3">
                    <div className="card-header">
                        <p className="card-title">Site Completion Graph</p>
                    </div>
                    <div className="card-body flex flex-col justify-center items-center bg-slate-100 transition-colors dark:bg-slate-950">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60} // Adding innerRadius to make it a donut
                                    outerRadius={100}
                                    fill="#8884d8"
                                    label
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="mt-4 text-center">
                            <p className="text-lg font-bold">72% Completed</p>
                            <p className="text-sm text-gray-500">28% Incomplete</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
                <div className="card col-span-1">
                    <div className="card-header">
                        <p className="card-title">Site Progress</p>
                    </div>
                    <div className="card-body p-0">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                <XAxis dataKey="stage" stroke={theme === "light" ? "#475569" : "#94a3b8"} />
                                <YAxis stroke={theme === "light" ? "#475569" : "#94a3b8"} />
                                <Tooltip formatter={(value) => `${value}%`} />
                                <Bar dataKey="percentage" fill="#90caf9" />
                                <LineChart>
                                    <Line
                                        type="monotone"
                                        dataKey="percentage"
                                        stroke="#2563eb"
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DashboardPage;