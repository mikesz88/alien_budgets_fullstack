/* eslint-disable no-useless-catch */
import axios from 'axios';
import Endpoints from '../common/endpoints';

class ClassCodeService {
  constructor() {
    this.classCodeList = [];
    this.classCode = '';
  }

  setClassCode(classCode) {
    this.classCode = classCode;
  }

  setClassCodeList(classCodeList) {
    this.classCodeList = classCodeList;
  }

  async getAllClassCodes() {
    try {
      const { data: response } = await axios.get(Endpoints.getAllClassCodes);
      this.setClassCodeList(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default ClassCodeService;
