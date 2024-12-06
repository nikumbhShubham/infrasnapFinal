import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function SiteDailyReport() {
  const [staffTasks, setStaffTasks] = useState([]);
  const [contractors, setContractors] = useState([]);
  const [visitorData, setVisitorData] = useState([]);
  const [language, setLanguage] = useState("English");

  // Handlers for staff, contractors, and visitors (same as your current code)
  const handleAddStaffTask = () => {
    setStaffTasks([...staffTasks, { taskName: "", numWorkers: "" }]);
  };

  const handleStaffTaskChange = (index, field, value) => {
    const updatedTasks = staffTasks.map((task, i) =>
      i === index ? { ...task, [field]: value } : task
    );
    setStaffTasks(updatedTasks);
  };

  const handleDeleteStaffTask = (index) => {
    setStaffTasks(staffTasks.filter((_, i) => i !== index));
  };

  const handleAddContractor = () => {
    setContractors([
      ...contractors,
      { name: "", type: "", tasks: [], comment: "", tomorrowTasks: "" },
    ]);
  };

  const handleContractorChange = (index, field, value) => {
    const updatedContractors = contractors.map((contractor, i) =>
      i === index ? { ...contractor, [field]: value } : contractor
    );
    setContractors(updatedContractors);
  };

  const handleDeleteContractor = (index) => {
    setContractors(contractors.filter((_, i) => i !== index));
  };

  const handleAddVisitor = () => {
    setVisitorData([
      ...visitorData,
      { name: "", occupation: "", contact: "", address: "" },
    ]);
  };

  const handleVisitorChange = (index, field, value) => {
    const updatedVisitors = visitorData.map((visitor, i) =>
      i === index ? { ...visitor, [field]: value } : visitor
    );
    setVisitorData(updatedVisitors);
  };

  const handleDeleteVisitor = (index) => {
    setVisitorData(visitorData.filter((_, i) => i !== index));
  };

  const handleLanguageToggle = (lang) => {
    setLanguage(lang);
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        padding: "20px 0",
      }}
    >
      <div className="container p-4">
        <h3 className="text-center mb-4">
          {language === "English" ? "SITE DAILY REPORT" : "दैनिक स्थल रिपोर्ट"}
        </h3>

        <div className="mb-3 text-end">
          <div>{new Date().toLocaleString()}</div>
          <select
            className="form-select w-auto mt-2 d-inline-block"
            onChange={(e) => handleLanguageToggle(e.target.value)}
            value={language}
          >
            <option value="English">English</option>
            <option value="Hindi">हिंदी</option>
          </select>
        </div>

        {/* Staff Work Section */}
        <div
          className="p-4 mb-4 border rounded shadow-sm"
          style={{ backgroundColor: "#e9f7fe" }}
        >
          <h5>{language === "English" ? "Staff Work" : "स्टाफ कार्य"}</h5>
          <div className="mb-3">
            <input
              type="text"
              placeholder={language === "English" ? "Site Name" : "साइट का नाम"}
              className="form-control mb-3"
            />
            <input
              type="number"
              placeholder={
                language === "English"
                  ? "Number of site staff"
                  : "साइट स्टाफ की संख्या"
              }
              className="form-control"
            />
          </div>
          <h6>
            {language === "English"
              ? "Today's Assigned Tasks:"
              : "आज के असाइन किए गए कार्य:"}
          </h6>
          {staffTasks.map((task, index) => (
            <div key={index} className="d-flex align-items-center mb-3">
              <input
                type="text"
                placeholder={
                  language === "English" ? "Task name" : "कार्य का नाम"
                }
                value={task.taskName}
                onChange={(e) =>
                  handleStaffTaskChange(index, "taskName", e.target.value)
                }
                className="form-control me-2"
              />
              <input
                type="number"
                placeholder={
                  language === "English"
                    ? "Assigned number of workers"
                    : "कर्मचारियों की संख्या"
                }
                value={task.numWorkers}
                onChange={(e) =>
                  handleStaffTaskChange(index, "numWorkers", e.target.value)
                }
                className="form-control me-2"
              />
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteStaffTask(index)}
              >
                {language === "English" ? "Delete" : "हटाएं"}
              </button>
            </div>
          ))}
          <button
            className="btn btn-primary"
            onClick={handleAddStaffTask}
          >
            {language === "English" ? "Add Task" : "कार्य जोड़ें"}
          </button>
        </div>

        {/* Contractor Work Section */}
        <div
          className="p-4 mb-4 border rounded shadow-sm"
          style={{ backgroundColor: "#fef4e9" }}
        >
          <h5>{language === "English" ? "Contract Work" : "अनुबंध कार्य"}</h5>
          {contractors.map((contractor, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                placeholder={
                  language === "English" ? "Contractor name" : "ठेकेदार का नाम"
                }
                value={contractor.name}
                onChange={(e) =>
                  handleContractorChange(index, "name", e.target.value)
                }
                className="form-control mb-2"
              />
              <input
                type="text"
                placeholder={
                  language === "English" ? "Type of work" : "कार्य का प्रकार"
                }
                value={contractor.type}
                onChange={(e) =>
                  handleContractorChange(index, "type", e.target.value)
                }
                className="form-control mb-2"
              />
              <textarea
                placeholder={language === "English" ? "Comment" : "टिप्पणी"}
                value={contractor.comment}
                onChange={(e) =>
                  handleContractorChange(index, "comment", e.target.value)
                }
                className="form-control mb-3"
              />
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteContractor(index)}
              >
                {language === "English"
                  ? "Delete Contractor"
                  : "ठेकेदार हटाएं"}
              </button>
            </div>
          ))}
          <button
            className="btn btn-primary"
            onClick={handleAddContractor}
          >
            {language === "English" ? "+ Add Contractor" : "ठेकेदार जोड़ें"}
          </button>
        </div>

        {/* Visitor Data Section */}
        <div
          className="p-4 mb-4 border rounded shadow-sm"
          style={{ backgroundColor: "#f4f9ef" }}
        >
          <h5>{language === "English" ? "Visitor Data" : "आगंतुक डेटा"}</h5>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>{language === "English" ? "Name" : "नाम"}</th>
                <th>{language === "English" ? "Occupation" : "पेशा"}</th>
                <th>{language === "English" ? "Contact" : "संपर्क"}</th>
                <th>{language === "English" ? "Address" : "पता"}</th>
                <th>{language === "English" ? "Action" : "कार्यवाही"}</th>
              </tr>
            </thead>
            <tbody>
              {visitorData.map((visitor, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      placeholder={language === "English" ? "Name" : "नाम"}
                      value={visitor.name}
                      onChange={(e) =>
                        handleVisitorChange(index, "name", e.target.value)
                      }
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder={
                        language === "English" ? "Occupation" : "पेशा"
                      }
                      value={visitor.occupation}
                      onChange={(e) =>
                        handleVisitorChange(index, "occupation", e.target.value)
                      }
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder={
                        language === "English" ? "Contact" : "संपर्क"
                      }
                      value={visitor.contact}
                      onChange={(e) =>
                        handleVisitorChange(index, "contact", e.target.value)
                      }
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder={language === "English" ? "Address" : "पता"}
                      value={visitor.address}
                      onChange={(e) =>
                        handleVisitorChange(index, "address", e.target.value)
                      }
                      className="form-control"
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteVisitor(index)}
                    >
                      {language === "English" ? "Delete" : "हटाएं"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="btn btn-primary"
            onClick={handleAddVisitor}
          >
            {language === "English" ? "+ Add Visitor" : "आगंतुक जोड़ें"}
          </button>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-4">
          <button className="btn btn-success btn-lg">
            {language === "English" ? "Submit" : "जमा करें"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SiteDailyReport;