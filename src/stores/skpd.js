import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { api } from '../api/axios';

export const useSkpdStore = defineStore('skpd', () => {
  const skpd = reactive([]);

  async function fetchSkpd() {
    try {
      const { data } = await api.get(`/master_data/skpd`);
      data.data?.forEach((el) => {
        skpd.push({
          id: el.id,
          kode_skpd: el.kode_skpd,
          nama_skpd: el.nama_skpd,
          checked: false,
        });
      });
      return Promise.resolve(data.data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  return { skpd, fetchSkpd };
});
