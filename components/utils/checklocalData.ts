import jsonData from '@/data/data.json'
import { UserData } from '@/types';

interface LocalDataCheckResultSuccess {
    success: true;
    parsedData: UserData; 
}
  
interface LocalDataCheckResultError {
    success: false;
    error: string;
}

type LocalDataCheckResult = LocalDataCheckResultSuccess | LocalDataCheckResultError

export const checklocalData = () : LocalDataCheckResult => {
    const data = localStorage.getItem('eqaim')
    if(data != null && data.length != 0) {
      try {
        const parsedData = JSON.parse(data);
        return {
            success: true,
            parsedData
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
        return {
            success: false,
            error: 'Error parsing JSON'
        }
      } 
    } else {
        localStorage.setItem('eqaim', JSON.stringify(jsonData))
        return {
            success: true,
            parsedData: jsonData
        }
    }
}
