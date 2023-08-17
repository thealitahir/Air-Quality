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

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        throw this.formatApiError(error); // Rethrow the Axios error
      }
    );
  }

  private formatApiError(error: any) {
    const exceptionMessage = error.response ? error.response.data : 'Failed to fetch data from the API';
    return {
      statusCode: error.response ? error.response.status : HttpStatus.BAD_REQUEST,
      message: exceptionMessage,
      error: true,
      timestamp:new Date().toISOString()
    };
  }

  async nearestCityData(body) {
    try {
      const response = await this.api.get(`nearest_city?lat=${body.lat}&lon=${body.lon}&key=${process.env.IQ_AIR_API_KEY}`,{ timeout:10000 });
      return response.data;
    } catch (error) {
      throw this.formatApiError('Failed to fetch data from the API')
    }
  }

}
