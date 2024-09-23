import { API_URL } from '../config';

interface Magic8BallResponse {
  id: number;
  question: string;
  response: string;
  flavour?: string;
}

export const getMagic8BallResponse = async (
  question: string,
  flavour = 'Classic'
): Promise<Magic8BallResponse> => {
  try {
    const response = await fetch(`${API_URL}get-response/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ question, flavour }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch response');
    }

    const data: Magic8BallResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Magic 8 Ball response:', error);
    throw error;
  }
};