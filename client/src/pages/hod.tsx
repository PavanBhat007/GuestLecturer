import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../components/pagination';
import EditModal from '../components/EditModal';
import axios from 'axios';

const Table: React.FC = () => {
  const [lectures, setLectures] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedLecturer, setSelectedLecturer] = useState<any | null>(null);
  const [selectedLecturerDetails, setSelectedLecturerDetails] = useState<any | null>(null);

  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = lectures.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const storedUserData = localStorage.getItem('token');

  var userId = "";

  if (storedUserData) {
    const userData = JSON.parse(storedUserData);
    userId = userData['_id'];
  } else {
    console.error('User data not found in local storage');
  }

  useEffect(() => {
    async function fetchLectures() {
      try {
        const response = await axios.get(`/lecture/${userId}`);
        setLectures(response.data);
      } catch (error) {
        console.error('Error fetching lectures:', error);
      }
    }

    fetchLectures();
  }, []);

  const handleEdit = (lecturer: any) => {
    setSelectedLecturer(lecturer);
    setSelectedLecturerDetails(lecturer); // Setting selected lecturer details
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (editedLecturer: any) => {
    console.log('Edited lecturer:', editedLecturer);
    setIsEditModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-end">
        <Link to="/logout" className="text-white bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 mr-2 mt-2">Logout</Link>
      </div>

      <div className="fixed bottom-4 right-4 flex items-center justify-end">
        <Link to="/add-lecture" className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Add Lecture
        </Link>
      </div>

      <div className="text-center font-bold text-3xl">Guest Lecture Details</div>
      <div className="flex flex-col mt-4">
        <div className=" m-3 ">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow  border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((lecturer, index) => (
                    <tr key={lecturer._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/details/${lecturer._id}`} className="text-indigo-600 hover:text-indigo-900">
                          {lecturer.facultyName}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/details/${lecturer._id}`} className="text-indigo-600 hover:text-indigo-900">
                          {lecturer.status}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-blue-600 hover:text-blue-900 ml-2 p-2 pl-3 pr-3 bg-blue-400 text-white rounded-xl m-1" onClick={() => handleEdit(lecturer)}>
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination itemsPerPage={itemsPerPage} totalItems={lectures.length} paginate={paginate} />
      </div>
      {selectedLecturerDetails && (
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          lecturer={selectedLecturerDetails}
          onSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
};

export default Table;
