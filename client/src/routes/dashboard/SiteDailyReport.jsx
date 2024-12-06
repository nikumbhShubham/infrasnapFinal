import React, { useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../config/firebase";
import { collection, addDoc, serverTimestamp, query, where, orderBy, } from "firebase/firestore";

const DailyReportPage = () => {
  const user = useSelector((state) => state.user.user);
  const site = useSelector((state) => state.sites.currentSite);

  console.log(site)

  const [dailyReports, setDailyReports] = useState([]);
  const [isReportsVisible, setIsReportsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log(dailyReports)
  const [formState, setFormState] = useState({
    siteName: "",
    numberOfStaff: "",
    siteTasks: [{ taskName: "", workers: "" }],
    contractorName: "",
    typeOfWork: "",
    contractorTasks: [{ taskName: "" }],
    tomorrowsTasks: [{ taskName: "" }],
    comments: "",
    visitors: [{ name: "", occupation: "", contact: "", address: "" }],

  });

  // Generalized Add Handler 
  const handleAdd = (key, newItem) => {
    setFormState((prevState) => ({
      ...prevState,
      [key]: [...prevState[key], newItem],
    }));
  };

  // Generalized Remove Handler 
  const handleRemove = (key, index) => {
    setFormState((prevState) => ({
      ...prevState,
      [key]: prevState[key].filter((_, i) => i !== index),
    }));
  };

  // Function to fetch daily reports for the current site
  const fetchDailyReports = async () => {
    if (!site) {
      alert("Please select a site first");
      return;
    }

    setIsLoading(true);
    try {
      // Create a query to fetch reports for the current site, ordered by date
      const reportsRef = collection(db, "daily reports");
      const q = query(
        reportsRef,
        where("siteId", "==", site.id),
        orderBy("reportDate", "desc")
      );

      const querySnapshot = await getDocs(q);
      const reports = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setDailyReports(reports);
      setIsReportsVisible(true);

      // Scroll to reports section
      setTimeout(() => {
        const reportsSection = document.getElementById('daily-reports-section');
        if (reportsSection) {
          reportsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (error) {
      console.error("Error fetching daily reports:", error);
      alert("Failed to fetch daily reports");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change for controlled components
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare data to be saved
      const reportData = {
        siteName: formState.siteName,
        numberOfStaff: formState.numberOfStaff,
        siteTasks: formState.siteTasks,
        contractorName: formState.contractorName,
        typeOfWork: formState.typeOfWork,
        contractorTasks: formState.contractorTasks,
        tomorrowsTasks: formState.tomorrowsTasks,
        comments: formState.comments,
        visitors: formState.visitors,
        createdAt: serverTimestamp(),// Automatically add a timestamp
        userId: user?.uid || user?.id || 'unknown-user',
        siteId: site?.uid || site?.id || 'unknown-site',

      };

      // Save data to Firestore
      await addDoc(collection(db, "daily reports"), reportData);
      alert("Daily report submitted successfully!");

      // Reset the form state after submission
      setFormState({
        siteName: "",
        numberOfStaff: "",
        siteTasks: [{ taskName: "", workers: "" }],
        contractorName: "",
        typeOfWork: "",
        contractorTasks: [{ taskName: "" }],
        tomorrowsTasks: [{ taskName: "" }],
        comments: "",
        visitors: [{ name: "", occupation: "", contact: "", address: "" }],
      });
    } catch (error) {
      console.error("Error adding document:", error);
      alert("Failed to submit daily report.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-10">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Site Daily Report</h1>
      <div className="container mx-auto px-4">
        {/* Daily Reports Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={fetchDailyReports}
            disabled={isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? "Loading Reports..." : "View Daily Reports"}
          </button>
        </div>

        {isReportsVisible && (
          <div
            id="daily-reports-section"
            className="bg-white shadow-lg rounded-lg overflow-x-auto"
          >
            <h2 className="text-2xl font-bold p-4 border-b">
              Daily Reports for {site?.siteName || 'Selected Site'}
            </h2>

            {dailyReports.length === 0 ? (
              <p className="p-4 text-center text-gray-500">
                No daily reports found for this site.
              </p>
            ) : (
              <div className="overflow-x-auto">
                {dailyReports.map((report) => (
                  <div
                    key={report.id}
                    className="border-b p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold">
                        Daily Report - {new Date(report.createdAt.toDate()).toLocaleDateString()}
                      </h3>
                      <span className="text-sm text-gray-500">
                        Site: {report.siteName}
                      </span>
                    </div>

                    {/* Contractor Details */}
                    <div className="mb-4">
                      <h4 className="font-medium text-lg">Contractor Information</h4>
                      <p>Name: {report.contractorName}</p>
                    </div>

                    {/* Contractor Tasks */}
                    <div className="mb-4">
                      <h4 className="font-medium text-lg">Contractor Tasks</h4>
                      {report.contractorTasks && report.contractorTasks.length > 0 ? (
                        <ul className="list-disc pl-5">
                          {report.contractorTasks.map((task, index) => (
                            <li key={index}>
                              {task.taskName}
                              {task.numberOfStaff && ` - Staff: ${task.numberOfStaff}`}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No contractor tasks reported</p>
                      )}
                    </div>

                    {/* Site Tasks */}
                    <div className="mb-4">
                      <h4 className="font-medium text-lg">Site Tasks</h4>
                      {report.siteTasks && report.siteTasks.length > 0 ? (
                        <ul className="list-disc pl-5">
                          {report.siteTasks.map((task, index) => (
                            <li key={index}>
                              {task.taskName}
                              {task.workers && ` - Workers: ${task.workers}`}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No site tasks reported</p>
                      )}
                    </div>

                    {/* Tomorrow's Tasks */}
                    <div className="mb-4">
                      <h4 className="font-medium text-lg">Tomorrow's Tasks</h4>
                      {report.tomorrowsTasks && report.tomorrowsTasks.length > 0 ? (
                        <ul className="list-disc pl-5">
                          {report.tomorrowsTasks.map((task, index) => (
                            <li key={index}>
                              {task.taskName}
                              {task.typeOfWork && ` - Type: ${task.typeOfWork}`}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No tasks planned for tomorrow</p>
                      )}
                    </div>

                    {/* Visitors */}
                    <div>
                      <h4 className="font-medium text-lg">Visitors</h4>
                      {report.visitors && report.visitors.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-2">
                          {report.visitors.map((visitor, index) => (
                            <div
                              key={index}
                              className="border p-2 rounded bg-gray-50"
                            >
                              <p><strong>Name:</strong> {visitor.name}</p>
                              <p><strong>Contact:</strong> {visitor.contact}</p>
                              <p><strong>Address:</strong> {visitor.address}</p>
                              <p><strong>Occupation:</strong> {visitor.occupation}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p>No visitors reported</p>
                      )}
                    </div>

                    {/* Comments */}
                    {report.comments && (
                      <div className="mt-4 border-t pt-2">
                        <h4 className="font-medium text-lg">Comments</h4>
                        <p>{report.comments}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>


      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-md p-6 space-y-6">

        {/* Site Work Section */}

        <section>

          <h2 className="text-xl font-semibold text-gray-700">Site Work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <input type="text" name="siteName" placeholder="Site Name" value={formState.siteName} onChange={handleChange} className="border border-gray-300 rounded-md p-2 w-full" required />
            <input type="number" name="numberOfStaff" placeholder="Number of Site Staff" value={formState.numberOfStaff} onChange={handleChange} className="border border-gray-300 rounded-md p-2 w-full" required />
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-600">Today's Assigned Tasks</h3>
            {formState.siteTasks.map((task, index) => (
              <div key={index} className="flex items-center gap-4 mt-2">
                <input type="text" placeholder="Task Name" value={task.taskName} onChange={(e) => {
                  const updatedTask = { ...task, taskName: e.target.value };
                  setFormState((prev) => {
                    const updatedTasks = [...prev.siteTasks];
                    updatedTasks[index] = updatedTask;
                    return { ...prev, siteTasks: updatedTasks };
                  });
                }} className="border border-gray-300 rounded-md p-2 w-full" />
                <input type="number" placeholder="Assigned Workers" value={task.workers} onChange={(e) => {
                  const updatedTask = { ...task, workers: e.target.value };
                  setFormState((prev) => {
                    const updatedTasks = [...prev.siteTasks];
                    updatedTasks[index] = updatedTask;
                    return { ...prev, siteTasks: updatedTasks };
                  });
                }} className="border border-gray-300 rounded-md p-2 w-full" />
                <button type="button" onClick={() => handleRemove("siteTasks", index)} className="text-red-500 hover:underline"> Remove </button>
              </div>
            ))}
            <button type="button" onClick={() => handleAdd("siteTasks", { taskName: "", workers: "" })} className="mt-2 text-blue-500 hover:underline"> + Add Task </button>
          </div>
        </section>

        {/* Contractor Work Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700">Contractor Work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <input type="text" name="contractorName" placeholder="Contractor Name" value={formState.contractorName} onChange={handleChange} className="border border-gray-300 rounded-md p-2 w-full" required />
            <input type="text" name="typeOfWork" placeholder="Type of Work" value={formState.typeOfWork} onChange={handleChange} className="border border-gray-300 rounded-md p-2 w-full" required />
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-600">Today's Completed Tasks</h3>
            {formState.contractorTasks.map((task, index) => (
              <div key={index} className="flex items-center gap-4 mt-2">
                <input type="text" placeholder="Task Name" value={task.taskName} onChange={(e) => {
                  const updatedTask = { ...task, taskName: e.target.value };
                  setFormState((prev) => {
                    const updatedTasks = [...prev.contractorTasks];
                    updatedTasks[index] = updatedTask;
                    return { ...prev, contractorTasks: updatedTasks };
                  });
                }} className="border border-gray-300 rounded-md p-2 w-full" />
                <button type="button" onClick={() => handleRemove("contractorTasks", index)} className="text-red-500 hover:underline"> Remove </button>
              </div>
            ))}
            <button type="button" onClick={() => handleAdd("contractorTasks", { taskName: "" })} className="mt-2 text-blue-500 hover:underline"> + Add Task </button>
          </div>

          {/* Tomorrow's Tasks */}
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-600">Tomorrow's Tasks</h3>
            {formState.tomorrowsTasks.map((task, index) => (
              <div key={index} className="flex items-center gap-4 mt-2">
                <input type="text" placeholder="Task Name" value={task.taskName} onChange={(e) => {
                  const updatedTask = { ...task, taskName: e.target.value };
                  setFormState((prev) => {
                    const updatedTasks = [...prev.tomorrowsTasks];
                    updatedTasks[index] = updatedTask;
                    return { ...prev, tomorrowsTasks: updatedTasks };
                  });
                }} className="border border-gray-300 rounded-md p-2 w-full" />
                <button type="button" onClick={() => handleRemove("tomorrowsTasks", index)} className="text-red-500 hover:underline"> Remove </button>
              </div>
            ))}
            <button type="button" onClick={() => handleAdd("tomorrowsTasks", { taskName: "" })} className="mt-2 text-blue-500 hover:underline"> + Add Task </button>
          </div>

          {/* Comments Section */}
          <textarea name="comments" placeholder="Comments" value={formState.comments} onChange={handleChange} className="border border-gray-300 rounded-md p-2 w-full mt-4" rows={3}></textarea>
        </section>

        {/* Visitors Data Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700">Visitors Data</h2>
          <div className="mt-4">
            {formState.visitors.map((visitor, index) => (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-5 gap-4 mt-2 items-center">
                <input type="text" placeholder="Visitor Name" value={visitor.name} onChange={(e) => {
                  const updatedVisitor = { ...visitor, name: e.target.value };
                  setFormState((prev) => {
                    const updatedVisitors = [...prev.visitors];
                    updatedVisitors[index] = updatedVisitor;
                    return { ...prev, visitors: updatedVisitors };
                  });
                }} className="border border-gray-300 rounded-md p-2 w-full" />
                <input type="text" placeholder="Occupation" value={visitor.occupation} onChange={(e) => {
                  const updatedVisitor = { ...visitor, occupation: e.target.value };
                  setFormState((prev) => {
                    const updatedVisitors = [...prev.visitors];
                    updatedVisitors[index] = updatedVisitor;
                    return { ...prev, visitors: updatedVisitors };
                  });
                }} className='border border-gray=300 rounded-md p-2 w-full' />
                <input type='text' placeholder='Contact Details' value={visitor.contact} onChange={(e) => {
                  const updatedVisitor = { ...visitor, contact: e.target.value };
                  setFormState(prev => {
                    const updatedVisitors = [...prev.visitors];
                    updatedVisitors[index] = updatedVisitor;
                    return { ...prev, visitors: updatedVisitors };
                  });
                }} class='border border-gray-300 rounded-md p-2 w-full' />

                {/* Address Input */}
                <input type='text' placeholder='Address' value={visitor.address} onChange={(e) => {
                  const updatedVisitor = { ...visitor, address: e.target.value };
                  setFormState(prev => {
                    const updateVisitors = [...prev.visitors];
                    updateVisitors[index] = updatedVisitor;
                    return { ...prev, visitors: updateVisitors };
                  });
                }} class='border border-gray-300 rounded-md p-2 w-full' />

                {/* Remove Visitor Button */}
                <button type='button' onClick={() => handleRemove('visitors', index)} class='text-red=500 hover=underline'>Remove</button>
              </div>
            ))}

            {/* Add Visitor Button */}
            <button type='button' onClick={() => handleAdd('visitors', { name: '', occupation: '', contact: '', address: '' })}
              class='mt=2 text-blue=500 hover=underline'>+ Add Visitor</button>
          </div>
        </section>

        {/* Submit Button */}

        {/* Submit Report Button */}
        <button type='submit' class='bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600'>Submit Report</button>

      </form>







    </div>
  );
};

export default DailyReportPage;  