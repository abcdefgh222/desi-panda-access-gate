
const API_KEY = 'AIzaSyB5Wgld0R6C4LRpy_kgqbMQvXEfcbSC81E';
const SPREADSHEET_ID = '1ZFGQV2H6SdT92irTPcxywTLp3ZygiJiISDZDT_g-_6o';

interface Video {
  id: string;
  title: string;
  image_url: string;
  category: string;
  embed_code: string; // Updated from streaming_link
  download: string;   // Updated from download_link
  added_date: string;
  description: string; // Updated from "descripton"
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
    // Add cache busting to prevent browser caching
    const cacheBuster = new Date().getTime();
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${sheetName}?key=${API_KEY}&cacheBuster=${cacheBuster}`;
    
    console.log(`Fetching sheet: ${sheetName}`);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // Add these options to help with CORS issues
      mode: 'cors',
      credentials: 'omit',
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching Google Sheets data: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`Successfully fetched sheet: ${sheetName}`, data);
    return data.values;
  } catch (error) {
    console.error(`Error fetching Google Sheets data for sheet ${sheetName}:`, error);
    // Return a minimal structure to prevent further errors
    return [];
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
        // Map the old column names to new ones if they exist
        if (header === 'embed_code') {
          video.embed_code = row[index] || '';
        } else if (header === 'download') {
          video.download = row[index] || '';
        } else if (header === 'descripton' || header === 'description') {
          video.description = row[index] || ''; // Normalize to 'description'
        } else {
          video[header] = row[index] || '';
        }
      });
      
      // Backward compatibility for old column names if they exist
      if (headers.includes('streaming_link') && !video.embed_code) {
        const idx = headers.indexOf('streaming_link');
        if (idx >= 0 && row[idx]) video.embed_code = row[idx];
      }
      
      if (headers.includes('download_link') && !video.download) {
        const idx = headers.indexOf('download_link');
        if (idx >= 0 && row[idx]) video.download = row[idx];
      }
      
      return video as Video;
    });
  } catch (error) {
    console.error('Error processing video data:', error);
    return [];
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
        // Map the old column names to new ones if they exist
        if (header === 'embed_code') {
          video.embed_code = row[index] || '';
        } else if (header === 'download') {
          video.download = row[index] || '';
        } else if (header === 'descripton' || header === 'description') {
          video.description = row[index] || ''; // Normalize to 'description'
        } else {
          video[header] = row[index] || '';
        }
      });
      
      // Backward compatibility for old column names
      if (headers.includes('streaming_link') && !video.embed_code) {
        const idx = headers.indexOf('streaming_link');
        if (idx >= 0 && row[idx]) video.embed_code = row[idx];
      }
      
      if (headers.includes('download_link') && !video.download) {
        const idx = headers.indexOf('download_link');
        if (idx >= 0 && row[idx]) video.download = row[idx];
      }
      
      return video as PremiumVideo;
    });
  } catch (error) {
    console.error('Error processing premium video data:', error);
    return [];
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
  const allVideos = await fetchVideos();
  return allVideos.filter(video => video.category === categoryId);
};

export const fetchPremiumVideosBySubcategory = async (subcategoryId: string): Promise<PremiumVideo[]> => {
  const allPremiumVideos = await fetchPremiumVideos();
  return allPremiumVideos.filter(video => video.Premium_sub_id === subcategoryId);
};
