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
}

export default ClassroomService;
