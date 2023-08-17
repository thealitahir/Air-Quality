import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class IQAirService {
  private api: AxiosInstance;

  constructor() {
    // Initialize the Axios instance with common configurations
    this.api = axios.create({
      baseURL: process.env.IQ_AIR_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async nearestCityData(body) {
    try {
      const response = await this.api.get(`nearest_city?lat=${body.lat}&lon=${body.lon}&key=${process.env.IQ_AIR_API_KEY}`,{ timeout:10000 });
      return response.data;
    } catch (error) {
      throw {message:"Failed to fetch data from the IqAir api"}
    }
  }

}
