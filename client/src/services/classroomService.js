/* eslint-disable no-useless-catch */
import axios from 'axios';
import Endpoints from '../common/endpoints';

class ClassroomService {
  constructor() {
    this.classroomCodes = [];
    this.currentClassUpdated = '';
  }

  setCurrentClassUpdate(date) {
    this.currentClassUpdated = date;
  }

  setClassroomCodes(list) {
    this.classroomCodes = list;
  }

  async getAllClassrooms(headers) {
    try {
      const { data: response } = await axios.get(
        `${Endpoints.getClassrooms}`,
        headers
      );
      const filteredClassroomCodes = response.data.map(
        (classroom) => classroom.classroomCode
      );
      this.setClassroomCodes(filteredClassroomCodes);

      return filteredClassroomCodes;
    } catch (error) {
      throw error;
    }
  }

  async getAllTeacherClassrooms(headers, adultId) {
    try {
      const { data: response } = await axios.get(
        `${Endpoints.getClassrooms}/${adultId}`,
        headers
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getSpecificClassroom(headers, classId) {
    try {
      const { data: response } = await axios.get(
        `${Endpoints.getSpecificClassroom}/${classId}`,
        headers
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getClassroomFromStudent(headers, classroomCode) {
    try {
      const { data: response } = await axios.get(
        `${Endpoints.getClassroomFromStudent}/${classroomCode}`,
        headers
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateStudentInClassroom(headers, body) {
    try {
      const { data: response } = await axios.put(
        Endpoints.updateStudentInClassroom,
        body,
        headers
      );
      this.setCurrentClassUpdate(response.data.updatedOn);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createClassroom(headers, body) {
    try {
      const { data: response } = await axios.post(
        Endpoints.getClassrooms,
        body,
        headers
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async addStudentToClassroom(body) {
    try {
      const { data: response } = await axios.put(
        Endpoints.addStudentToClassroom,
        body
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteAllClassroomsByTeacher(headers, id) {
    try {
      const { data: response } = await axios.delete(
        `${Endpoints.deleteAllClassroomsByTeacher}/${id}`,
        { headers }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteStudentFromClass(headers, body) {
    try {
      const { data: response } = await axios.put(
        Endpoints.deleteStudentFromClass,
        body,
        headers
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async transferStudentToDifferentClass(headers, body) {
    try {
      const { data: response } = await axios.put(
        Endpoints.transferStudentToDifferentClass,
        body,
        headers
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteSingleClassroomByTeacher(headers, classId) {
    try {
      const { data: response } = await axios.delete(
        `${Endpoints.deleteSingleClassroomByTeacher}/${classId}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async createNewStudentInClassroom(headers, body) {
    try {
      const { data: response } = await axios.put(
        Endpoints.createNewStudentInClassroom,
        body,
        headers
      );
      this.setCurrentClassUpdate(response.data.updatedOn);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteStudent(headers, studentId, classroomCode) {
    const body = {
      studentId,
      classroomCode,
    };
    try {
      const { data: response } = await axios.put(
        Endpoints.deleteStudent,
        body,
        headers
      );
      this.setCurrentClassUpdate(response.data.updatedOn);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default ClassroomService;
