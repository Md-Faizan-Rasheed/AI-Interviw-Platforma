import React, { useEffect, useState } from "react";
import {
  Search,
  Download,
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  X,
  Eye,
  Calendar,
  Star,
  User,
  Briefcase
} from "lucide-react";

// Add shimmer animation styles
const shimmerStyles = `
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  .animate-shimmer {
    animation: shimmer 2s infinite;
  }
`;

const InterviewDashboard = () => {
  /* ================= STATE ================= */
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  /* ================= FILTERING & SEARCH ================= */
  const filteredInterviews = interviews.filter((interview) => {
    const matchesSearch =
      interview.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.job_name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRating = (() => {
      if (ratingFilter === "all") return true;
      const rating = interview.overall_Rating;
      if (ratingFilter === "excellent") return rating >= 8;
      if (ratingFilter === "good") return rating >= 6 && rating < 8;
      if (ratingFilter === "average") return rating >= 4 && rating < 6;
      if (ratingFilter === "poor") return rating < 4;
      return true;
    })();

    return matchesSearch && matchesRating;
  });

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filteredInterviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInterviews = filteredInterviews.slice(startIndex, endIndex);

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToNextPage = () => setCurrentPage(p => Math.min(p + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage(p => Math.max(p - 1, 1));
  
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  /* ================= DOWNLOAD FUNCTIONALITY ================= */
  const handleDownloadCSV = () => {
    const headers = ["Candidate Name", "Job Title", "Rating", "Date", "Report"];
    const csvData = filteredInterviews.map(i => [
      i.name,
      i.job_name,
      `${i.overall_Rating}/10`,
      new Date(i.created_date).toLocaleDateString(),
      `"${i.report?.replace(/"/g, '""') || 'N/A'}"`
    ]);

    const csv = [
      headers.join(","),
      ...csvData.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `interview_reports_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = () => {
    if (!selectedReport) return;
    
    const content = `
INTERVIEW EVALUATION REPORT
${"=".repeat(50)}

Candidate: ${selectedReport.name}
email:${selectedReport.email}
Job: ${selectedReport.job_name}
Rating: ${selectedReport.overall_Rating}/10
Date: ${new Date(selectedReport.created_date).toLocaleDateString()}

${"=".repeat(50)}

${selectedReport.report}
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedReport.name}_interview_report.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  /* ================= API HELPERS ================= */
  const fetchUserId = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:8080/jobs/api/user-id", {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token })
    });

    const data = await res.json();
    return data.userId;
  };

  const fetchReports = async () => {
    try {
      const companyId = await fetchUserId();
      if (!companyId) return;

      const res = await fetch(
        `http://localhost:8080/api/by-company/${companyId}`,
        {
          headers: {
            authorization: localStorage.getItem("token")
          }
        }
      );

      const json = await res.json();
      if (json.success) {
        setInterviews(json.data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, ratingFilter]);

  /* ================= RATING BADGE ================= */
  const getRatingBadge = (rating) => {
    if (rating >= 8) return "bg-green-100 text-green-800 border-green-200";
    if (rating >= 6) return "bg-blue-100 text-blue-800 border-blue-200";
    if (rating >= 4) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  const getRatingLabel = (rating) => {
    if (rating >= 8) return "Excellent";
    if (rating >= 6) return "Good";
    if (rating >= 4) return "Average";
    return "Needs Improvement";
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Add shimmer animation styles */}
      <style>{shimmerStyles}</style>
      
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <span className="opacity-80">Dashboard</span>
            <span className="opacity-60">›</span>
            <span>Interview Reports</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-sm font-semibold">
              A
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Interview Reports</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Briefcase className="w-4 h-4" />
            <span>{interviews.length} Total Reports</span>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm mb-6 p-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 w-full md:max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by candidate or job..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 w-full md:w-auto">
              <button
                onClick={handleDownloadCSV}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                  className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
                    ratingFilter !== "all"
                      ? "bg-blue-50 border-blue-300 text-blue-700"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">Filter</span>
                  {ratingFilter !== "all" && (
                    <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      1
                    </span>
                  )}
                </button>

                {showFilterMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <div className="p-2">
                      <p className="text-xs font-semibold text-gray-500 uppercase px-3 py-2">Filter by Rating</p>
                      {[
                        { value: "all", label: "All Ratings" },
                        { value: "excellent", label: "Excellent (8-10)" },
                        { value: "good", label: "Good (6-7)" },
                        { value: "average", label: "Average (4-5)" },
                        { value: "poor", label: "Poor (0-3)" }
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setRatingFilter(option.value);
                            setShowFilterMenu(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors ${
                            ratingFilter === option.value ? "bg-blue-50 text-blue-700 font-medium" : ""
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || ratingFilter !== "all") && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
              <span className="text-sm text-gray-600">Active filters:</span>
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  Search: "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm("")}
                    className="hover:text-gray-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {ratingFilter !== "all" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  Rating: {ratingFilter}
                  <button
                    onClick={() => setRatingFilter("all")}
                    className="hover:text-blue-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {loading && (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading reports...</p>
            </div>
          )}

          {!loading && filteredInterviews.length === 0 && (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <Briefcase className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 text-lg font-medium">No interview reports found</p>
              <p className="text-gray-500 text-sm mt-1">
                {searchTerm || ratingFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Reports will appear here once interviews are completed"}
              </p>
            </div>
          )}

          {!loading && filteredInterviews.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Candidate
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider hidden md:table-cell">
                      Job Title
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentInterviews.map((interview, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                            {interview.name?.charAt(0).toUpperCase() || "?"}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {interview.name}
                            </div>
                            <div className="text-xs text-gray-500 md:hidden">
                              {interview.job_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <div className="text-sm text-gray-900">{interview.job_name}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="w-32">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-semibold text-gray-700">
                              {interview.overall_Rating}/10
                            </span>
                            <span className={`text-xs font-medium ${
                              interview.overall_Rating >= 8 ? 'text-green-600' :
                              interview.overall_Rating >= 6 ? 'text-blue-600' :
                              interview.overall_Rating >= 4 ? 'text-yellow-600' :
                              'text-red-600'
                            }`}>
                              {getRatingLabel(interview.overall_Rating)}
                            </span>
                          </div>
                          <div className="relative h-2.5 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                            <div
                              className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ${
                                interview.overall_Rating >= 8 
                                  ? 'bg-gradient-to-r from-green-400 to-green-600' :
                                interview.overall_Rating >= 6 
                                  ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                                interview.overall_Rating >= 4 
                                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                                  'bg-gradient-to-r from-red-400 to-red-600'
                              }`}
                              style={{ width: `${interview.overall_Rating * 10}%` }}
                            >
                              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                            </div>
                            {/* Shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          {new Date(interview.created_date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => {
                            setSelectedReport(interview);
                            setShowReportModal(true);
                          }}
                          className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          <span className="hidden sm:inline">View Report</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredInterviews.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm mt-4 px-4 py-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                <span className="font-medium">{Math.min(endIndex, filteredInterviews.length)}</span> of{" "}
                <span className="font-medium">{filteredInterviews.length}</span> results
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={goToFirstPage}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronsLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="hidden sm:flex items-center gap-1">
                  {getPageNumbers().map((page, index) => (
                    page === '...' ? (
                      <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">...</span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`min-w-[40px] px-3 py-2 rounded-lg font-medium transition-colors ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  ))}
                </div>

                <div className="sm:hidden px-3 py-2 text-sm font-medium text-gray-700">
                  Page {currentPage} of {totalPages}
                </div>

                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={goToLastPage}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronsRight className="w-4 h-4" />
                </button>

                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="ml-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Report Modal */}
      {showReportModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-5 rounded-t-2xl flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Interview Evaluation Report</h2>
                <p className="text-blue-100 text-sm mt-1">Detailed assessment and feedback</p>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1">
              {/* Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-blue-700 mb-2">
                    <User className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase">Candidate</span>
                  </div>
                  <p className="text-gray-900 font-semibold">{selectedReport.name}</p>
                  <p className="text-gray-900 font-semibold ">{selectedReport.email}</p>

                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-purple-700 mb-2">
                    <Briefcase className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase">Position</span>
                  </div>
                  <p className="text-gray-900 font-semibold">{selectedReport.job_name}</p>
                </div>

                <div className={`border rounded-lg p-4 ${getRatingBadge(selectedReport.overall_Rating)}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-xs font-semibold uppercase">Overall Rating</span>
                  </div>
                  
                  {/* Large circular progress */}
                  <div className="flex items-center justify-center my-4">
                    <div className="relative w-32 h-32">
                      {/* Background circle */}
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          className="opacity-20"
                        />
                        {/* Progress circle */}
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 56}`}
                          strokeDashoffset={`${2 * Math.PI * 56 * (1 - selectedReport.overall_Rating / 10)}`}
                          className="transition-all duration-1000 ease-out"
                          strokeLinecap="round"
                        />
                      </svg>
                      {/* Center text */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold">{selectedReport.overall_Rating}</span>
                        <span className="text-sm opacity-75">/10</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-center text-sm font-semibold">{getRatingLabel(selectedReport.overall_Rating)}</p>
                  
                  {/* Linear progress bar */}
                  <div className="mt-3">
                    <div className="relative h-2 bg-current opacity-20 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-current rounded-full transition-all duration-1000"
                        style={{ width: `${selectedReport.overall_Rating * 10}%` }}
                      >
                        <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Report Content */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Detailed Report</h3>
                  <button
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans leading-relaxed">
                    {selectedReport.report}
                  </pre>
                </div>
              </div>

              {/* Date Footer */}
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Interview conducted on {new Date(selectedReport.created_date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewDashboard;

