import React, { useState, useEffect } from 'react';
import Modal from './modal';
import { Lecturer } from './type';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (lecturer: Lecturer) => void;
  lecturer: Lecturer | null;
}

const EditModal: React.FC<Props> = ({ isOpen, onClose, onSubmit, lecturer }) => {
  const [formData, setFormData] = useState<Lecturer | null>(null);

  // Set formData to lecturer when lecturer prop changes
  useEffect(() => {
    setFormData(lecturer);
  }, [lecturer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = () => {
    if (formData) {
      onSubmit(formData);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {formData && (
        <div className='flex'>
          <div className="w-1/3 px-4">
            {/* First Column */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
              <input type="text" name="lecturerName" value={formData.lecturerName} onChange={handleChange} className="border rounded-md p-2 w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
              <input type="text" name="lecturerPhoneNumber" value={formData.lecturerPhoneNumber} onChange={handleChange} className="border rounded-md p-2 w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
              <input type="text" name="lecturerEmail" value={formData.lecturerEmail} onChange={handleChange} className="border rounded-md p-2 w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Qualifications:</label>
              <input type="text" name="lecturerQualifications" value={formData.lecturerQualifications} onChange={handleChange} className="border rounded-md p-2 w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Schools:</label>
              <input type="text" name="lecturerSchools" value={formData.lecturerSchools} onChange={handleChange} className="border rounded-md p-2 w-full" />
            </div>
          </div>
          <div className="w-1/3 px-4">
            {/* Second Column */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Department:</label>
              <input type="text" name="lecturerDept" value={formData.lecturerDept} onChange={handleChange} className="border rounded-md p-2 w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Status:</label>
              <input type="text" name="status" value={formData.status} onChange={handleChange} className="border rounded-md p-2 w-full" />
            </div>
            {/* Add more input fields as needed */}
          </div>
          <div className="w-1/3 px-4">
            {/* Third Column */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Subject:</label>
              <input type="text" name="lecturerSubject" value={formData.lecturerSubject} onChange={handleChange} className="border rounded-md p-2 w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Semester/Year:</label>
              <input type="text" name="lecturerSem_year" value={formData.lecturerSem_year} onChange={handleChange} className="border rounded-md p-2 w-full" />
            </div>
            {/* Add more input fields as needed */}
          </div>
        </div>
      )}
      <div className="flex justify-end">
        {/* Save Changes Button */}
        <button type="button" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Save Changes
        </button>
      </div>
    </Modal>
  );
};

export default EditModal;
