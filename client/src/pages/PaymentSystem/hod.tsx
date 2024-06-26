import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Sidebar from '../../components/SideBar';
import Header from '../../components/HeaderHod';
import DetailsModal from '../../components/DetailsModal';
import CommentModal from '../../components/CommentModal';

const HodPaymentRequest: React.FC = () => {
  const [lecturers, setLecturers] = useState<any[]>([]);
  const [visibleRows, setVisibleRows] = useState(5);
  const tableRef = useRef<HTMLDivElement>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [selectedLecturerId, setSelectedLecturerId] = useState('');
  const storedUserData = localStorage.getItem('token');
  const [selectedLecturerForDetails, setSelectedLecturerForDetails] = useState<any | null>(null);
  var userId = "";

  if (storedUserData) {
    const userData = JSON.parse(storedUserData);
    userId = userData['_id'];
  } else {
    console.error('User data not found in local storage');
  }

  useEffect(() => {
    async function fetchLecturers() {
      try {
        const response = await axios.get(`https://guest-lecturer.vercel.app/lecture/hod/payment-request/${userId}`);
        setLecturers(response.data);
      } catch (error) {
        console.error('Error fetching lectures:', error);
      }
    }

    fetchLecturers();
  }, []);

  const handleScroll = () => {
    const element = tableRef.current;
    if (element) {
      const scrollTop = element.scrollTop;
      const scrollHeight = element.scrollHeight;
      const clientHeight = element.clientHeight;
      const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
      if (scrolledToBottom && visibleRows < lecturers.length) {
        setVisibleRows(prev => Math.min(prev + 5, lecturers.length));
      }
    }
  };

  const handleAccept = async (lecturerId: string) => {
    try {
      await axios.put(`https://guest-lecturer.vercel.app/lecture/hod/paymentaccept/${lecturerId}`);
      window.location.reload(); 
    } catch (error) {
      console.error('Error accepting lecturer:', error);
    }
  };

  const handleComment = async (lecturer: string) => {
    try {
      setSelectedLecturerId(lecturer);
      setIsCommentModalOpen(true);
    } catch (error) {
      console.error('Error commenting on lecturer:', error);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div
          className="overflow-auto mt-5"
          style={{ height: 'calc(100vh - 200px)' }}
          onScroll={handleScroll}
          ref={tableRef}
        >
          <div className="m-3">
            <div className="shadow border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {lecturers.slice(0, visibleRows).map((lecturer, index) => (
                    <tr key={lecturer._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{lecturer.facultyName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{lecturer.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className={`text-green-600 hover:text-green-900 ml-2 p-2 pl-3 pr-3 ${
                            lecturer.paymentapproved.hod ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-green-400 text-white hover:bg-green-500'
                          } rounded-xl m-1`}
                          onClick={() => handleAccept(lecturer._id)}
                          disabled={lecturer.paymentapproved.hod}
                        >
                          {lecturer.paymentapproved.hod ? 'Accepted' : 'Accept'}
                        </button>
                        <button
                          className={`text-blue-600 hover:text-blue-900 ml-2 p-2 pl-3 pr-3 ${
                            lecturer.paymentapproved.hod ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-blue-400 text-white hover:bg-blue-500'
                          } rounded-xl m-1`}
                          onClick={() => handleComment(lecturer._id)}
                          disabled={lecturer.paymentapproved.hod}
                        >
                          {lecturer.paymentapproved.hod ? 'Comment' : 'Comment'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="absolute top-0 right-0 bg-gray-200 w-2 bottom-0" style={{ zIndex: 10 }} />
        </div>
      </div>
      <DetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          lecturer={selectedLecturerForDetails}
        />
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        lecturerId={selectedLecturerId}
      />
    </div>
  );
};

export default HodPaymentRequest;
