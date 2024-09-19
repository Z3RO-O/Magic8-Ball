const API_URL = 'http://127.0.0.1:8000/';

interface Magic8BallResponse {
  question: string;
  response: string;
  flavour?: string;
}

export const getMagic8BallResponse = async (
  question: string,
  flavour = 'Classic',
): Promise<Magic8BallResponse> => {
  try {
    const response = await fetch(`${API_URL}get-response/?question=${encodeURIComponent(question)}&flavour=${encodeURIComponent(flavour)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
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
