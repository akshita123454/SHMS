import React, { useEffect, useState } from "react";
import { fetchReportStats } from "../../api/admin/reports.api.js";

const Reports = () => {
  const [report, setReport] = useState(null);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const loadReport = async () => {
    try {
      const { data } = await fetchReportStats();
      setReport(data);
    } catch (err) {
      showToast("Failed to load reports");
    }
  };

  useEffect(() => {
    loadReport();
  }, []);

  return (
    <section id="reports" className="section">
      <h2 className="text-xl font-semibold mb-4">Reports Dashboard</h2>

      {toast && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          {toast}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="module-card text-center">
          <h3 className="text-lg font-semibold mb-2">Total Patients</h3>
          <p className="text-3xl">{report?.totalPatients ?? "-"}</p>
        </div>
        <div className="module-card text-center">
          <h3 className="text-lg font-semibold mb-2">Monthly Revenue</h3>
          <p className="text-3xl">
            ₹{report?.monthlyRevenue?.toLocaleString() ?? "-"}
          </p>
        </div>
        <div className="module-card text-center">
          <h3 className="text-lg font-semibold mb-2">Staff Count</h3>
          <p className="text-3xl">{report?.staffCount ?? "-"}</p>
        </div>
      </div>
    </section>
  );
};

export default Reports;
