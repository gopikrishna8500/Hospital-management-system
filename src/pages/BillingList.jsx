import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Receipt,
  Plus,
  Trash2,
  RefreshCw,
  IndianRupee,
  User,
  Calendar,
  FileText,
  Loader2,
  AlertCircle,
} from "lucide-react";
import API from "../api";

const BillingList = () => {
  const navigate = useNavigate();

  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState("");

  /* =====================================================
     FETCH BILLS
  ===================================================== */

  const fetchBills = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/billing");

      console.log(
        "Billing records:",
        response.data
      );

      setBills(
        Array.isArray(response.data?.data)
          ? response.data.data
          : []
      );
    } catch (err) {
      console.error(
        "Error fetching billing records:",
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.message ||
        "Failed to load billing records"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     LOAD ON PAGE OPEN
  ===================================================== */

  useEffect(() => {
    fetchBills();
  }, []);

  /* =====================================================
     DELETE BILL
  ===================================================== */

  const deleteBill = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this invoice?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeleting(id);

      await API.delete(`/billing/${id}`);

      // Remove immediately from UI
      setBills((prevBills) =>
        prevBills.filter((bill) => bill.id !== id)
      );

    } catch (err) {
      console.error(
        "Delete billing error:",
        err.response?.data || err.message
      );

      alert(
        err.response?.data?.message ||
        "Failed to delete invoice"
      );
    } finally {
      setDeleting(null);
    }
  };

  /* =====================================================
     FORMAT CURRENCY
  ===================================================== */

  const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;
  };

  /* =====================================================
     FORMAT DATE
  ===================================================== */

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  /* =====================================================
     TOTAL BILLING
  ===================================================== */

  const totalAmount = bills.reduce(
    (total, bill) =>
      total + Number(bill.amount || 0),
    0
  );

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">

        <div className="max-w-7xl mx-auto">

          <div className="bg-white rounded-xl shadow-sm p-10 flex flex-col items-center justify-center">

            <Loader2 className="w-10 h-10 text-teal-600 animate-spin" />

            <p className="mt-4 text-gray-500">
              Loading invoices...
            </p>

          </div>

        </div>
      </div>
    );
  }

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">

      <div className="max-w-7xl mx-auto">

        {/* ================================================
            HEADER
        ================================================= */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

          <div className="flex items-center gap-3">

            <div className="bg-teal-600 p-3 rounded-xl">
              <Receipt className="w-6 h-6 text-white" />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Billing & Invoices
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Manage all patient invoices
              </p>
            </div>

          </div>

          <div className="flex gap-2">

            <button
              onClick={fetchBills}
              className="flex items-center justify-center gap-2 border border-gray-300 bg-white text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>

            <button
              onClick={() => navigate("/billing")}
              className="flex items-center justify-center gap-2 bg-teal-600 text-white px-4 py-2.5 rounded-lg hover:bg-teal-700 transition"
            >
              <Plus className="w-4 h-4" />
              Generate Bill
            </button>

          </div>

        </div>


        {/* ================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3">

            <AlertCircle className="w-5 h-5" />

            <span>{error}</span>

          </div>
        )}


        {/* ================================================
            SUMMARY CARDS
        ================================================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

          {/* TOTAL INVOICES */}

          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Total Invoices
                </p>

                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {bills.length}
                </p>
              </div>

              <div className="bg-teal-100 p-3 rounded-xl">
                <FileText className="w-6 h-6 text-teal-600" />
              </div>

            </div>

          </div>


          {/* TOTAL AMOUNT */}

          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Total Billed
                </p>

                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {formatCurrency(totalAmount)}
                </p>
              </div>

              <div className="bg-green-100 p-3 rounded-xl">
                <IndianRupee className="w-6 h-6 text-green-600" />
              </div>

            </div>

          </div>

        </div>


        {/* ================================================
            BILLING TABLE
        ================================================= */}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

          <div className="px-6 py-5 border-b border-gray-100">

            <h2 className="text-lg font-semibold text-gray-800">
              Invoice List
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              All generated patient invoices appear here.
            </p>

          </div>


          {/* EMPTY STATE */}

          {bills.length === 0 ? (

            <div className="p-12 text-center">

              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">

                <Receipt className="w-8 h-8 text-gray-400" />

              </div>

              <h3 className="text-lg font-semibold text-gray-700 mt-4">
                No invoices found
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Generate your first invoice to see it here.
              </p>

              <button
                onClick={() => navigate("/billing")}
                className="mt-5 inline-flex items-center gap-2 bg-teal-600 text-white px-5 py-2.5 rounded-lg hover:bg-teal-700"
              >
                <Plus className="w-4 h-4" />
                Generate Invoice
              </button>

            </div>

          ) : (

            /* ==============================================
               TABLE
            ============================================== */

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-50">

                  <tr>

                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Invoice ID
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Patient
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Amount
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Date
                    </th>

                    <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-gray-100">

                  {bills.map((bill) => (

                    <tr
                      key={bill.id}
                      className="hover:bg-gray-50 transition"
                    >

                      {/* INVOICE ID */}

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-2">

                          <div className="bg-teal-50 p-2 rounded-lg">
                            <Receipt className="w-4 h-4 text-teal-600" />
                          </div>

                          <span className="font-semibold text-gray-700">
                            INV-{String(bill.id).padStart(5, "0")}
                          </span>

                        </div>

                      </td>


                      {/* PATIENT */}

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-gray-500" />
                          </div>

                          <div>

                            <p className="font-medium text-gray-800">
                              {bill.patient_name}
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* AMOUNT */}

                      <td className="px-6 py-4">

                        <span className="font-semibold text-gray-800">
                          {formatCurrency(bill.amount)}
                        </span>

                      </td>


                      {/* DATE */}

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-2 text-gray-600">

                          <Calendar className="w-4 h-4 text-gray-400" />

                          {formatDate(bill.created_at)}

                        </div>

                      </td>


                      {/* DELETE */}

                      <td className="px-6 py-4 text-right">

                        <button
                          onClick={() => deleteBill(bill.id)}
                          disabled={deleting === bill.id}
                          className="inline-flex items-center gap-2 text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition disabled:opacity-50"
                        >

                          {deleting === bill.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}

                          Delete

                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default BillingList;