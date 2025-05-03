
const API_KEY = 'AIzaSyB5Wgld0R6C4LRpy_kgqbMQvXEfcbSC81E';
const SPREADSHEET_ID = '1ZFGQV2H6SdT92irTPcxywTLp3ZygiJiISDZDT_g-_6o';

interface Video {
  id: string;
  title: string;
  image_url: string;
  category: string;
  embed_code: string;
  streaming_link?: string; // For backward compatibility
  download: string;
  download_link?: string; // For backward compatibility
  added_date: string;
  description: string;
  descripton?: string; // For backward compatibility (typo)
  duration: string;
  tag: string;
}

interface PremiumVideo extends Video {
  Premium_sub_id: string;
}

interface Category {
  Category: string;
  Category_id: string;
  Poster_url: string;
}

interface PremiumSubcategory {
  Premium_sub_id: string;
  title: string;
  image_url: string;
}

interface Tag {
  tag_name: string;
  tag_id: string;
}

const fetchSheet = async (sheetName: string) => {
  try {
    // Use clean URL without cache busters or extra parameters
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${sheetName}?key=${API_KEY}`;
    
    console.log(`Fetching sheet: ${sheetName}`);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      credentials: 'omit',
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching Google Sheets data: ${response.statusText} (${response.status})`);
    }
    
    const data = await response.json();
    console.log(`Successfully fetched sheet: ${sheetName}`);
    return data.values;
  } catch (error) {
    console.error(`Error fetching Google Sheets data for sheet ${sheetName}:`, error);
    throw error; // Rethrow so React Query can handle it
  }
};

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const values = await fetchSheet('Category_name');
    if (!values || values.length === 0) {
      return [];
    }
    
    const headers = values[0];
    return values.slice(1).map((row: any) => {
      const category: any = {};
      headers.forEach((header: string, index: number) => {
        category[header] = row[index] || '';
      });
      return category as Category;
    });
  } catch (error) {
    console.error('Error processing category data:', error);
    return [];
  }
};

export const fetchPremiumSubcategories = async (): Promise<PremiumSubcategory[]> => {
  try {
    const values = await fetchSheet('Premium_sub_ategory');
    if (!values || values.length === 0) {
      return [];
    }
    
    const headers = values[0];
    return values.slice(1).map((row: any) => {
      const subcategory: any = {};
      headers.forEach((header: string, index: number) => {
        subcategory[header] = row[index] || '';
      });
      return subcategory as PremiumSubcategory;
    });
  } catch (error) {
    console.error('Error processing premium subcategory data:', error);
    return [];
  }
};

export const fetchVideos = async (): Promise<Video[]> => {
  try {
    const values = await fetchSheet('Videos');
    if (!values || values.length === 0) {
      return [];
    }
    
    const headers = values[0];
    return values.slice(1).map((row: any) => {
      const video: any = {};
      headers.forEach((header: string, index: number) => {
        // Handle column name mapping for both old and new column names
        if (header === 'embed_code' || header === 'streaming_link') {
          video.embed_code = row[index] || '';
        } else if (header === 'download' || header === 'download_link') {
          video.download = row[index] || '';
        } else if (header === 'descripton' || header === 'description') {
          video.description = row[index] || '';
        } else {
          video[header] = row[index] || '';
        }
      });
      
      return video as Video;
    });
  } catch (error) {
    console.error('Error processing video data:', error);
    throw error; // Let React Query handle the error
  }
};

export const fetchPremiumVideos = async (): Promise<PremiumVideo[]> => {
  try {
    const values = await fetchSheet('Premium_Videos');
    if (!values || values.length === 0) {
      return [];
    }
    
    const headers = values[0];
    return values.slice(1).map((row: any) => {
      const video: any = {};
      headers.forEach((header: string, index: number) => {
        // Handle column name mapping for both old and new column names
        if (header === 'embed_code' || header === 'streaming_link') {
          video.embed_code = row[index] || '';
        } else if (header === 'download' || header === 'download_link') {
          video.download = row[index] || '';
        } else if (header === 'descripton' || header === 'description') {
          video.description = row[index] || '';
        } else {
          video[header] = row[index] || '';
        }
      });
      
      return video as PremiumVideo;
    });
  } catch (error) {
    console.error('Error processing premium video data:', error);
    throw error; // Let React Query handle the error
  }
};

export const fetchTags = async (): Promise<Tag[]> => {
  try {
    const values = await fetchSheet('tag');
    if (!values || values.length === 0) {
      return [];
    }
    
    const headers = values[0];
    return values.slice(1).map((row: any) => {
      const tag: any = {};
      headers.forEach((header: string, index: number) => {
        tag[header] = row[index] || '';
      });
      return tag as Tag;
    });
  } catch (error) {
    console.error('Error processing tag data:', error);
    return [];
  }
};

export const fetchVideosByCategory = async (categoryId: string): Promise<Video[]> => {
  try {
    const allVideos = await fetchVideos();
    return allVideos.filter(video => video.category === categoryId);
  } catch (error) {
    console.error('Error filtering videos by category:', error);
    throw error;
  }
};

export const fetchPremiumVideosBySubcategory = async (subcategoryId: string): Promise<PremiumVideo[]> => {
  try {
    const allPremiumVideos = await fetchPremiumVideos();
    return allPremiumVideos.filter(video => video.Premium_sub_id === subcategoryId);
  } catch (error) {
    console.error('Error filtering premium videos by subcategory:', error);
    throw error;
  }
};
