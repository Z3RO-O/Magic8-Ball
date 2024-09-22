import { API_URL } from '../config';

export const deleteResponse = async (responseId: number): Promise<string> => {
  try {
    const response = await fetch(`${API_URL}delete-response/${responseId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete response');
    }

    return `Response with ID ${responseId} deleted successfully.`;
  } catch (error) {
    console.error('Error deleting response:', error);
    throw error;
  }
};

export const deleteAllResponses = async (): Promise<string> => {
  try {
    const response = await fetch(`${API_URL}delete-all-responses/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete all responses');
    }

    return 'All responses deleted successfully.';
  } catch (error) {
    console.error('Error deleting all responses:', error);
    throw error;
  }
};
