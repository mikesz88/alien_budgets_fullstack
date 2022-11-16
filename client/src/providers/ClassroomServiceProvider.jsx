import React, { useState, useContext, createContext } from 'react';
import axios from 'axios';
import Endpoints from '../common/endpoints';

const ClassroomServiceContext = createContext({});

export const ClassroomServiceProvider = ({ children }) => {
  const [classroomCodes, setClassroomCodes] = useState([]);
  const [currentClassUpdated, setCurrentClassUpdated] = useState('');

  const getAllClassrooms = async () => {
    const { data: response } = await axios.get(`${Endpoints.getClassrooms}`);
    const filteredClassroomCodes = response.data.map(
      (classroom) => classroom.classroomCode
    );
    setClassroomCodes(filteredClassroomCodes);
    return filteredClassroomCodes;
  };

  const getAllTeacherClassrooms = async (headers, adultId) => {
    const { data: response } = await axios.get(
      `${Endpoints.getClassrooms}/${adultId}`,
      headers
    );
    return response.data;
  };

  const getSpecificClassroom = async (headers, classId) => {
    const { data: response } = await axios.get(
      `${Endpoints.getSpecificClassroom}/${classId}`,
      headers
    );
    return response.data;
  };

  const getClassroomFromStudent = async (headers, classroomCode) => {
    const { data: response } = await axios.get(
      `${Endpoints.getClassroomFromStudent}/${classroomCode}`,
      headers
    );
    return response.data;
  };

  const updateStudentInClassroom = async (headers, body) => {
    const { data: response } = await axios.put(
      Endpoints.updateStudentInClassroom,
      body,
      headers
    );
    setCurrentClassUpdated(response.data.updatedOn);
    return response.data;
  };

  const createClassroom = async (headers, body) => {
    const { data: response } = await axios.post(
      Endpoints.getClassrooms,
      body,
      headers
    );
    return response.data;
  };

  const addStudentToClassroom = async (body) => {
    const { data: response } = await axios.put(
      Endpoints.addStudentToClassroom,
      body
    );
    return response.data;
  };

  const deleteAllClassroomsByTeacher = async (headers, id) => {
    const { data: response } = await axios.delete(
      `${Endpoints.deleteAllClassroomsByTeacher}/${id}`,
      headers
    );
    return response;
  };

  const deleteStudentFromClass = async (headers, body) => {
    const { data: response } = await axios.put(
      Endpoints.deleteStudentFromClass,
      body,
      headers
    );
    return response;
  };

  const transferStudentToDifferentClass = async (headers, body) => {
    const { data: response } = await axios.put(
      Endpoints.transferStudentToDifferentClass,
      body,
      headers
    );
    return response.data;
  };

  const deleteSingleClassroomByTeacher = async (headers, classId) => {
    const { data: response } = await axios.delete(
      `${Endpoints.deleteSingleClassroomByTeacher}/${classId}`,
      headers
    );
    return response;
  };

  const createNewStudentInClassroom = async (headers, body) => {
    const { data: response } = await axios.put(
      Endpoints.createNewStudentInClassroom,
      body,
      headers
    );
    setCurrentClassUpdated(response.data.updatedOn);
    return response.data;
  };

  const deleteStudent = async (headers, studentId, classroomCode) => {
    const body = {
      studentId,
      classroomCode,
    };
    const { data: response } = await axios.put(
      Endpoints.deleteStudent,
      body,
      headers
    );
    setCurrentClassUpdated(response.data.updatedOn);
    return response.data;
  };

  return (
    <ClassroomServiceContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        classroomCodes,
        currentClassUpdated,
        setCurrentClassUpdated,
        getAllClassrooms,
        getAllTeacherClassrooms,
        getSpecificClassroom,
        getClassroomFromStudent,
        updateStudentInClassroom,
        createClassroom,
        addStudentToClassroom,
        deleteAllClassroomsByTeacher,
        deleteStudentFromClass,
        transferStudentToDifferentClass,
        deleteSingleClassroomByTeacher,
        createNewStudentInClassroom,
        deleteStudent,
      }}
    >
      {children}
    </ClassroomServiceContext.Provider>
  );
};

export const useClassroomServiceProvider = () =>
  useContext(ClassroomServiceContext);
