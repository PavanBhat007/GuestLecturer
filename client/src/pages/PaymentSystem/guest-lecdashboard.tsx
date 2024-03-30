import React from 'react';
import { CgProfile } from 'react-icons/cg';
import Sidebar from '../../components/SideBar';
import Header from '../../components/CommonHeader';

const GuestDash: React.FC = () => {
  const storedUserData = localStorage.getItem('token');
  let lecturerData = null;

  if (storedUserData) {
    lecturerData = JSON.parse(storedUserData);
  } else {
    console.error('User data not found in local storage');
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex flex-col items-center mt-8">
          {lecturerData && (
            <>
              <CgProfile className="text-7xl text-blue-500 mb-4" />
              <h2 className="text-3xl font-bold">{lecturerData.facultyName}</h2>
              <p className="text-lg">Email: {lecturerData.email}</p>
              <p className="text-lg">Phone: {lecturerData.phone}</p>
              <p className="text-lg">Schools/Deanery: {lecturerData.schoolsDeanery}</p>
              <p className="text-lg">Department: {lecturerData.department}</p>
              <p className="text-lg">Subject Name: {lecturerData.subjectName}</p>
              <p className="text-lg">Year and Semester: {lecturerData.yearAndSemester}</p>
              <p className="text-lg">Sections Handled: {lecturerData.sectionsHandled}</p>
              <p className="text-lg">Hours: {lecturerData.hours}</p>
              <p className="text-lg">Start Date: {new Date(lecturerData.startDate).toLocaleDateString()}</p>
              <p className="text-lg">Proposed Rate: {lecturerData.proposedRate}</p>
              <p className="text-lg">Total Amount: {lecturerData.totalAmount}</p>
              <p className="text-lg">PAN Card Number: {lecturerData.panCardNumber}</p>
              <p className="text-lg">Account Number: {lecturerData.accountDetails.accountNumber || 'Update'}</p>
                <p className="text-lg">Account Holder Name: {lecturerData.accountDetails.accountHolderName || 'Update'}</p>
                <p className="text-lg">BankName: {lecturerData.accountDetails.bankName || 'Update'}</p>   
                <p className="text-lg">Bank Branch: {lecturerData.accountDetails.bankBranch || 'Update'}</p> 
             
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuestDash;
