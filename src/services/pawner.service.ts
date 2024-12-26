import { ApiService } from './api';
import type { Pawner, PawnerStatus } from '../types/pawn.types';
import type { UpdatePawnerDto } from '../types/pawn.types';

export class PawnerService {
  static async search(
    query?: string,
    status?: PawnerStatus,
    page: number = 1,
    limit: number = 10
  ) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })

    if (query) params.append('search', query)
    if (status) params.append('status', status)

    try {
      console.log('Request URL:', `/admin/pawners?${params}`)
      
      const response = await ApiService.get(`/admin/pawners?${params}`)
      console.log('Raw API Response:', response)
      
      return {
        data: Array.isArray(response) ? response : [],
        total: Array.isArray(response) ? response.length : 0
      }
    } catch (error) {
      console.error('Error in PawnerService.search:', error)
      return {
        data: [],
        total: 0
      }
    }
  }

  static async getById(id: number) {
    try {
      const response = await ApiService.get(`/admin/pawners/${id}`)
      return response
    } catch (error) {
      console.error('Error fetching pawner:', error)
      return null
    }
  }

  static async getPaymentSchedule(id: number) {
    try {
      const pawner = await this.getById(id)
      return pawner?.payments || []
    } catch (error) {
      console.error('Error fetching payment schedule:', error)
      return []
    }
  }

  static async getDueDatePawners() {
    try {
      console.log('Fetching due payments...')
      const response = await ApiService.get('/admin/pawners/due-payments')
      console.log('Raw API Response:', response)
      const result = {
        data: Array.isArray(response) ? response : [],
        total: Array.isArray(response) ? response.length : 0
      }
      console.log('Processed response:', result)
      return result
    } catch (error) {
      console.error('Error details:', error)
      return {
        data: [],
        total: 0
      }
    }
  }

  static async updatePawner(id: number, data: UpdatePawnerDto) {
    try {
      const response = await ApiService.patch(`/admin/pawners/${id}`, data);
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Error updating pawner');
    }
  }

  static async deletePawner(id: number) {
    try {
      const response = await ApiService.delete(`/admin/pawners/${id}`)
      return response
    } catch (error) {
      console.error('Error deleting pawner:', error)
      throw error
    }
  }

  static async downloadPaymentTable(id: number, pawnerName: string) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/pawners/${id}/report/download`, {
        method: 'GET',
      });
      
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `តារាងបង់ប្រាក់-${pawnerName}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading payment table:', error);
      throw error;
    }
  }
}