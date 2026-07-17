import jsPDF from "jspdf";

export const exportPDF = (data) => {
  const doc = new jsPDF();

  doc.text("Admin Report", 10, 10);

  doc.text(`Users: ${data.users}`, 10, 20);
  doc.text(`Projects: ${data.projects}`, 10, 30);
  doc.text(`Tasks: ${data.tasks}`, 10, 40);
  doc.text(`Completed: ${data.completedTasks}`, 10, 50);
  doc.text(`Pending: ${data.pendingTasks}`, 10, 60);

  doc.save("report.pdf");
};

export const exportCSV = (data) => {
  const rows = [
    ["Metric", "Value"],
    ["Users", data.users],
    ["Projects", data.projects],
    ["Tasks", data.tasks],
    ["Completed", data.completedTasks],
    ["Pending", data.pendingTasks],
  ];

  let csvContent =
    "data:text/csv;charset=utf-8," +
    rows.map((e) => e.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");

  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "report.csv");

  document.body.appendChild(link);
  link.click();
};