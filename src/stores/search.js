import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { api } from '../api/axios';

export const useSearchStore = defineStore('search', () => {
  const results = reactive({
    items: [],
    currentPage: null,
    offset: null,
    perPage: null,
    total: null,
    totalPage: null,
    isLoading: false,
    errors: null,
  });
  const filter = reactive({
    keyword: '',
    limit: 10,
    page: 1,
    urusan: '',
    sort: '',
    order: '',
    kategori: '',
    skpd: '',
  });

  function resetFilter() {
    filter.keyword = '';
    filter.limit = 10;
    filter.page = 1;
    filter.urusan = '';
    filter.sort = '';
    filter.order = '';
    filter.kategori = '';
    filter.skpd = '';
  }

  async function fetchSearch() {
    try {
      results.isLoading = true;
      results.errors = null;
      
      if (filter.order) {
        filter.sort = 'DATA_SET_DIPERBAHARUI'
      } else {
        filter.sort = ''
      }


      const query = [];
      let queryString = '';
      for (const item in filter) {
        if (filter[item]) query.push(`${item}=${filter[item]}`);
      }
      if (query.length) queryString += `?${query.join('&')}`;

      const { data } = await api.get(`/search${queryString}`);
      results.items = data.data?.items;
      results.currentPage = data.data?.current_page;
      results.offset = data.data?.offset;
      results.perPage = data.data?.per_page;
      results.total = data.data?.total;
      results.totalPage = data.data?.total_page;
      results.isLoading = false;
      return Promise.resolve(data.data);
    } catch (err) {
      results.isLoading = false;
      results.errors = err;
      return Promise.reject(err);
    }
  }

  return { results, filter, resetFilter, fetchSearch };
});
