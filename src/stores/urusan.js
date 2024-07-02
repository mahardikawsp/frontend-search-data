import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { api } from '../api/axios';

export const useUrusanStore = defineStore('urusan', () => {
  const urusan = reactive([]);

  async function fetchUrusan() {
    try {
      const { data } = await api.get(`/master_data/urusan`);
      data.data?.forEach((el) => {
        urusan.push({
          id: el.id,
          kode_urusan: el.kode_urusan,
          nama_urusan: el.nama_urusan,
          checked: false,
        });
      });
      return Promise.resolve(data.data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  return { urusan, fetchUrusan };
});
