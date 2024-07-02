import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { api } from '../api/axios';

export const useDasarSektoralStore = defineStore('dasarSektoral', () => {
  const dasarSektoral = reactive([]);

  async function fetchDasarSektoral() {
    try {
      const data = [
        {
          id: 1,
          kode: 'dasar',
          nama: 'Statistik Dasar',
          checked: false,
        },
        {
          id: 2,
          kode: 'sektoral',
          nama: 'Statistik Sektoral',
          checked: false,
        },
      ];
      data.forEach((el) => {
        dasarSektoral.push({
          id: el.id,
          kode: el.kode,
          nama: el.nama,
          checked: false,
        });
      });
      return Promise.resolve(data.data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  return { dasarSektoral, fetchDasarSektoral };
});
