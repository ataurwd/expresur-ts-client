import React, { useState, useEffect, useMemo } from "react";

// ------------------ TYPES ------------------
type ShipmentStatus =
  | "pending"
  | "processing"
  | "in_transit"
  | "delivered"
  | "cancelled";

interface Shipment {
  id: string;
  trackingNumber: string;
  sender: string;
  receiver: string;
  weight: number;
  status: ShipmentStatus;
  createdAt: string;
  updatedAt: string;
  origin: string;
  destination: string;
  price: number;
}

// ------------------ COLORS ------------------
// Tailwind classes for badges (custom colors mapped to status)
const statusColors: Record<ShipmentStatus, string> = {
  // text-yellow-800 bg-yellow-100
  pending: "bg-yellow-100 text-yellow-800",
  // text-blue-800 bg-blue-100
  processing: "bg-blue-100 text-blue-800",
  // text-indigo-800 bg-indigo-100
  in_transit: "bg-indigo-100 text-indigo-800",
  // text-green-800 bg-green-100
  delivered: "bg-green-100 text-green-800",
  // text-red-800 bg-red-100
  cancelled: "bg-red-100 text-red-800",
};

// ------------------ MAIN COMPONENT ------------------
const AdminShipments: React.FC = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<ShipmentStatus | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  const [selected, setSelected] = useState<Shipment | null>(null);
  const [updateModal, setUpdateModal] = useState<Shipment | null>(null);
  const [sortField, setSortField] = useState<keyof Shipment>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // -------- Dummy Data (from your previous prompt) --------
  useEffect(() => {
    setShipments([
      {
        id: "24",
        trackingNumber: "PKG-556677",
        sender: "Kevin Brown",
        receiver: "Shimu",
        weight: 4.8,
        status: "processing",
        createdAt: "2025-01-26",
        updatedAt: "2025-01-28",
        origin: "Atlanta Cargo",
        destination: "Sylhet, Bangladesh",
        price: 36,
      },
      {
        id: "244",
        trackingNumber: "PKG-111677",
        sender: "Kevin Brown",
        receiver: "Shimu",
        weight: 4.8,
        status: "processing",
        createdAt: "2025-01-26",
        updatedAt: "2025-01-28",
        origin: "Atlanta Cargo",
        destination: "Sylhet, Bangladesh",
        price: 36,
      },
      {
        id: "25",
        trackingNumber: "PKG-889900",
        sender: "Chloe Davis",
        receiver: "Kamal",
        weight: 0.9,
        status: "in_transit",
        createdAt: "2025-01-20",
        updatedAt: "2025-01-25",
        origin: "Phoenix Depot",
        destination: "Dhaka, Bangladesh",
        price: 17,
      },
      {
        id: "26",
        trackingNumber: "PKG-110022",
        sender: "Ryan Miller",
        receiver: "Laila",
        weight: 16.2,
        status: "delivered",
        createdAt: "2025-01-07",
        updatedAt: "2025-01-14",
        origin: "Denver Sorting Facility",
        destination: "Chattogram",
        price: 72,
      },
      {
        id: "27",
        trackingNumber: "PKG-334455",
        sender: "Grace Smith",
        receiver: "Hasib",
        weight: 2.1,
        status: "cancelled",
        createdAt: "2025-01-18",
        updatedAt: "2025-01-19",
        origin: "Boston Terminal",
        destination: "Rajshahi, Bangladesh",
        price: 26,
      },
      {
        id: "28",
        trackingNumber: "PKG-667788",
        sender: "Henry Williams",
        receiver: "Muna",
        weight: 14.5,
        status: "pending",
        createdAt: "2025-01-28",
        updatedAt: "2025-01-28",
        origin: "Dallas Freight",
        destination: "Barishal, Bangladesh",
        price: 65,
      },
      {
        id: "29",
        trackingNumber: "PKG-991122",
        sender: "Isabella Jones",
        receiver: "Hasan",
        weight: 7.0,
        status: "processing",
        createdAt: "2025-01-25",
        updatedAt: "2025-01-27",
        origin: "San Diego Warehouse",
        destination: "Mymensingh, Bangladesh",
        price: 43,
      },
      {
        id: "30",
        trackingNumber: "PKG-446688",
        sender: "Jack Nguyen",
        receiver: "Afia",
        weight: 5.3,
        status: "in_transit",
        createdAt: "2025-01-15",
        updatedAt: "2025-01-23",
        origin: "Philadelphia Logistics",
        destination: "Rangpur, Bangladesh",
        price: 38,
      },
      {
        id: "31",
        trackingNumber: "PKG-779911",
        sender: "Lily Chen",
        receiver: "Rifat",
        weight: 1.5,
        status: "delivered",
        createdAt: "2025-01-04",
        updatedAt: "2025-01-09",
        origin: "Portland Hub",
        destination: "Khulna, Bangladesh",
        price: 24,
      },
      {
        id: "32",
        trackingNumber: "PKG-223344",
        sender: "Max Walker",
        receiver: "Sumaiya",
        weight: 19.0,
        status: "cancelled",
        createdAt: "2025-01-10",
        updatedAt: "2025-01-11",
        origin: "Orlando Terminal",
        destination: "Dhaka, Bangladesh",
        price: 78,
      },
      {
        id: "33",
        trackingNumber: "PKG-558800",
        sender: "Mia Perez",
        receiver: "Alif",
        weight: 1.1,
        status: "pending",
        createdAt: "2025-01-29",
        updatedAt: "2025-01-29",
        origin: "Detroit Depot",
        destination: "Chattogram",
        price: 21,
      },
      {
        id: "34",
        trackingNumber: "PKG-990033",
        sender: "Noah Baker",
        receiver: "Shaila",
        weight: 8.5,
        status: "processing",
        createdAt: "2025-01-22",
        updatedAt: "2025-01-24",
        origin: "Salt Lake City Warehouse",
        destination: "Sylhet, Bangladesh",
        price: 47,
      },
      {
        id: "35",
        trackingNumber: "PKG-124578",
        sender: "Phoebe Scott",
        receiver: "Naim",
        weight: 2.9,
        status: "in_transit",
        createdAt: "2025-01-16",
        updatedAt: "2025-01-23",
        origin: "Miami Warehouse",
        destination: "Rajshahi, Bangladesh",
        price: 29,
      },
      {
        id: "36",
        trackingNumber: "PKG-346790",
        sender: "Quinn Adams",
        receiver: "Tania",
        weight: 13.0,
        status: "delivered",
        createdAt: "2025-01-02",
        updatedAt: "2025-01-08",
        origin: "New York Warehouse",
        destination: "Barishal, Bangladesh",
        price: 62,
      },
      {
        id: "37",
        trackingNumber: "PKG-568901",
        sender: "Ruby Lopez",
        receiver: "Ashraf",
        weight: 0.7,
        status: "cancelled",
        createdAt: "2025-01-20",
        updatedAt: "2025-01-21",
        origin: "Texas Warehouse",
        destination: "Mymensingh, Bangladesh",
        price: 14,
      },
      {
        id: "38",
        trackingNumber: "PKG-780123",
        sender: "Sam Johnson",
        receiver: "Nazmul",
        weight: 11.0,
        status: "pending",
        createdAt: "2025-01-30",
        updatedAt: "2025-01-30",
        origin: "LA Warehouse",
        destination: "Rangpur, Bangladesh",
        price: 58,
      },
      {
        id: "39",
        trackingNumber: "PKG-902345",
        sender: "Taylor Rodriguez",
        receiver: "Sonia",
        weight: 4.2,
        status: "processing",
        createdAt: "2025-01-23",
        updatedAt: "2025-01-25",
        origin: "Chicago Distribution Center",
        destination: "Dhaka, Bangladesh",
        price: 34,
      },
      {
        id: "40",
        trackingNumber: "PKG-123456",
        sender: "Victor Gomez",
        receiver: "Babu",
        weight: 6.5,
        status: "in_transit",
        createdAt: "2025-01-17",
        updatedAt: "2025-01-24",
        origin: "Seattle Hub",
        destination: "Khulna, Bangladesh",
        price: 41,
      },
      {
        id: "41",
        trackingNumber: "PKG-345678",
        sender: "Willow Hayes",
        receiver: "Jui",
        weight: 17.5,
        status: "delivered",
        createdAt: "2025-01-05",
        updatedAt: "2025-01-12",
        origin: "Atlanta Cargo",
        destination: "Chattogram",
        price: 70,
      },
      {
        id: "42",
        trackingNumber: "PKG-567890",
        sender: "Xavier Reed",
        receiver: "Amin",
        weight: 0.4,
        status: "cancelled",
        createdAt: "2025-01-21",
        updatedAt: "2025-01-22",
        origin: "Phoenix Depot",
        destination: "Sylhet, Bangladesh",
        price: 10,
      },
      {
        id: "43",
        trackingNumber: "PKG-789012",
        sender: "Yara Evans",
        receiver: "Raima",
        weight: 9.8,
        status: "pending",
        createdAt: "2025-01-31",
        updatedAt: "2025-01-31",
        origin: "Denver Sorting Facility",
        destination: "Rajshahi, Bangladesh",
        price: 50,
      },
      {
        id: "44",
        trackingNumber: "PKG-901234",
        sender: "Zane Cooper",
        receiver: "Dipu",
        weight: 3.3,
        status: "processing",
        createdAt: "2025-01-24",
        updatedAt: "2025-01-26",
        origin: "Boston Terminal",
        destination: "Barishal, Bangladesh",
        price: 32,
      },
      {
        id: "45",
        trackingNumber: "PKG-123045",
        sender: "Amy Flores",
        receiver: "Shuvo",
        weight: 15.5,
        status: "in_transit",
        createdAt: "2025-01-18",
        updatedAt: "2025-01-25",
        origin: "Dallas Freight",
        destination: "Mymensingh, Bangladesh",
        price: 67,
      },
      {
        id: "46",
        trackingNumber: "PKG-345067",
        sender: "Ben Carter",
        receiver: "Nitu",
        weight: 5.0,
        status: "delivered",
        createdAt: "2025-01-03",
        updatedAt: "2025-01-10",
        origin: "San Diego Warehouse",
        destination: "Rangpur, Bangladesh",
        price: 37,
      },
      {
        id: "47",
        trackingNumber: "PKG-567089",
        sender: "Cara Bell",
        receiver: "Fardin",
        weight: 1.4,
        status: "cancelled",
        createdAt: "2025-01-25",
        updatedAt: "2025-01-26",
        origin: "Philadelphia Logistics",
        destination: "Khulna, Bangladesh",
        price: 23,
      },
      {
        id: "48",
        trackingNumber: "PKG-789011",
        sender: "Devon King",
        receiver: "Sumon",
        weight: 20.0,
        status: "pending",
        createdAt: "2025-02-01",
        updatedAt: "2025-02-01",
        origin: "Portland Hub",
        destination: "Dhaka, Bangladesh",
        price: 80,
      },
      {
        id: "49",
        trackingNumber: "PKG-901233",
        sender: "Eli Roth",
        receiver: "Jahanara",
        weight: 0.6,
        status: "processing",
        createdAt: "2025-01-27",
        updatedAt: "2025-01-28",
        origin: "Orlando Terminal",
        destination: "Chattogram",
        price: 13,
      },
      {
        id: "50",
        trackingNumber: "PKG-112355",
        sender: "Fiona Lee",
        receiver: "Anika",
        weight: 12.5,
        status: "in_transit",
        createdAt: "2025-01-19",
        updatedAt: "2025-01-26",
        origin: "Detroit Depot",
        destination: "Sylhet, Bangladesh",
        price: 61,
      },
      {
        id: "51",
        trackingNumber: "PKG-334577",
        sender: "Gabe West",
        receiver: "Maruf",
        weight: 8.0,
        status: "delivered",
        createdAt: "2025-01-07",
        updatedAt: "2025-01-13",
        origin: "Salt Lake City Warehouse",
        destination: "Rajshahi, Bangladesh",
        price: 46,
      },
      {
        id: "52",
        trackingNumber: "PKG-556799",
        sender: "Holly Chen",
        receiver: "Labib",
        weight: 2.2,
        status: "cancelled",
        createdAt: "2025-01-22",
        updatedAt: "2025-01-23",
        origin: "Miami Warehouse",
        destination: "Barishal, Bangladesh",
        price: 27,
      },
      {
        id: "53",
        trackingNumber: "PKG-778911",
        sender: "Ian Price",
        receiver: "Nabila",
        weight: 10.5,
        status: "pending",
        createdAt: "2025-02-02",
        updatedAt: "2025-02-02",
        origin: "New York Warehouse",
        destination: "Mymensingh, Bangladesh",
        price: 54,
      },
    ]);
  }, []);

  // -------- Filtering + Sorting --------
  const filtered = useMemo(() => {
    let data = [...shipments];

    // Search: Filter by tracking number
    if (search.trim() !== "") {
      data = data.filter((s) =>
        s.trackingNumber.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Status Filter
    if (filterStatus !== "all") {
      data = data.filter((s) => s.status === filterStatus);
    }

    // Sorting
    data.sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return data;
  }, [shipments, search, filterStatus, sortField, sortOrder]);

  // -------- Pagination --------
  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  // -------- Update Shipment Status --------
  const updateStatus = (id: string, status: ShipmentStatus) => {
    setShipments((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status, updatedAt: new Date().toISOString().slice(0, 10) }
          : s
      )
    );
    setUpdateModal(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">Shipments</h2>

      {/* TOP BAR: Search and Filter */}
      <div className="flex gap-4 mb-6">
        <input
          placeholder="Search tracking number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 w-64 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
        />

        <select
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(e.target.value as ShipmentStatus | "all")
          }
          className="p-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition duration-150 bg-white"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="in_transit">In Transit</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* SHIPMENTS TABLE */}
      <div className="rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <table className="w-full border-collapse bg-white">
          <thead className="bg-green-700 border-b border-gray-200">
            <tr>
              {[
                "Tracking",
                "Sender",
                "Receiver",
                "Weight",
                "Status",
                "Created",
                "Actions",
              ].map((h, index) => (
                <th key={index} className="p-3 font-semibold text-left text-sm text-white uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginated.map((s) => (
              <tr 
                key={s.id} 
                className="border-b border-gray-100 transition duration-150 ease-in-out hover:bg-blue-50"
              >
                <td className="p-3 text-sm font-medium text-gray-900">{s.trackingNumber}</td>
                <td className="p-3 text-sm text-gray-700">{s.sender}</td>
                <td className="p-3 text-sm text-gray-700">{s.receiver}</td>
                <td className="p-3 text-sm text-gray-700">{s.weight} lb</td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColors[s.status]}`}
                  >
                    {s.status.replace("_", " ")}
                  </span>
                </td>

                <td className="p-3 text-sm text-gray-700">{s.createdAt}</td>

                <td className="p-3 whitespace-nowrap">
                  <button 
                    onClick={() => setSelected(s)}
                    className="px-3 py-1 mr-2 text-sm font-medium text-white bg-green-700 rounded-md shadow-sm hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150"
                  >
                    View
                  </button>
                  <button 
                    onClick={() => setUpdateModal(s)}
                    className="px-3 py-1 text-sm font-medium text-white bg-green-700 rounded-md shadow-sm hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="mt-6 flex justify-between items-center">
        <div>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages} ({filtered.length} shipments)
          </span>
        </div>
        <div className="flex gap-2">
          {/* Previous Button */}
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-sm rounded-lg border transition duration-150 ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Previous
          </button>
          
          {/* Page Buttons */}
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition duration-150 ${
                currentPage === i + 1
                  ? "bg-green-700 text-white shadow-md hover:bg-green-800"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
          
          {/* Next Button */}
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-sm rounded-lg border transition duration-150 ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* DETAILS MODAL */}
      {selected && (
        <Modal onClose={() => setSelected(null)}>
          <h3 className="text-xl font-bold mb-4 text-gray-800">Shipment Details</h3>
          <p className="mb-1"><b className="font-semibold text-gray-700">Tracking:</b> {selected.trackingNumber}</p>
          <p className="mb-1"><b className="font-semibold text-gray-700">Status:</b> 
            <span className={`ml-2 px-2 py-0.5 text-xs font-semibold rounded-full ${statusColors[selected.status]}`}>
              {selected.status.replace("_", " ")}
            </span>
          </p>
          <p className="mb-1"><b className="font-semibold text-gray-700">Sender:</b> {selected.sender}</p>
          <p className="mb-1"><b className="font-semibold text-gray-700">Receiver:</b> {selected.receiver}</p>
          <p className="mb-1"><b className="font-semibold text-gray-700">Weight:</b> {selected.weight} lb</p>
          <p className="mb-1"><b className="font-semibold text-gray-700">Origin:</b> {selected.origin}</p>
          <p className="mb-1"><b className="font-semibold text-gray-700">Destination:</b> {selected.destination}</p>
          <p className="mb-1"><b className="font-semibold text-gray-700">Created At:</b> {selected.createdAt}</p>
          <p className="mb-1"><b className="font-semibold text-gray-700">Updated At:</b> {selected.updatedAt}</p>
          <p className="mt-3 text-lg"><b className="font-bold text-gray-700">Shipping Price:</b> <span className="text-green-600 font-extrabold">${selected.price}</span></p>
        </Modal>
      )}

      {/* UPDATE STATUS MODAL */}
      {updateModal && (
        <Modal onClose={() => setUpdateModal(null)}>
          <h3 className="text-xl font-bold mb-4 text-gray-800">Update Status for {updateModal.trackingNumber}</h3>

          <select
            value={updateModal.status}
            onChange={(e) =>
              updateStatus(updateModal.id, e.target.value as ShipmentStatus)
            }
            className="p-3 w-full mt-2 rounded-lg border border-gray-300 bg-white focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="in_transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </Modal>
      )}
    </div>
  );
};

export default AdminShipments;

// ------------------ MODAL COMPONENT (Tailwind) ------------------
const Modal: React.FC<{ onClose: () => void; children: React.ReactNode }> = ({
  onClose,
  children,
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-2xl w-[450px]">
      {children}
      <button 
        className="mt-5 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" 
        onClick={onClose}
      >
        Close
      </button>
    </div>
  </div>
);

// Note: All original inline styles are now removed or placed directly as Tailwind classes.