import axios from 'axios';

export default class ApiService {
  constructor() {
    this.query = '';
    this.page = 1;
    this.PER_PAGE = 40;
  }
     

  
  async fetchGallery() {
    const axiosOptions = {
    
      url: 'https://pixabay.com/api/',
      params: {
        key: '37760459-bf670a4af420eae2f9d25b705',
        q: `${this.searchQuery}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: `${this.page}`,
        per_page: `${this.PER_PAGE}`,
      },
    };
   try {
      const response = await axios(axiosOptions);

      const data = response.data;

      this.incrementPageNumber();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  incrementPageNumber() {
    this.page += 1;
  }

  resetPageNumber() {
    this.page = 1;
  }


}