import { defineStore } from "pinia";
import axios from "axios";
// import Swal from "sweetalert2";

const baseURL = "http://localhost:3000/";
export const usePiniaStore = defineStore("piniaStore", {
  state: () => ({
    isLogin: false,
    dataNotes: [],
    dataStatus: [],
    dateAndTime: {},
    allData: [],
    total: 0,
    done: 0,
    nDone: 0,
    showToast: false,
  }),
  actions: {
    async register(registerForm) {
      try {
        await axios.post(baseURL + `register`, registerForm);
        Swal.fire({
          title: "Pendaftaran berhasil, silahkan Masuk",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        this.router.push("/login");
      } catch (error) {
        Swal.fire({
          background: "rgb(23, 23, 33)",
          color: "white",
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
          footer: "",
        });
        console.log(error);
      }
    },
    async login(loginForm) {
      try {
        let { data } = await axios.post(baseURL + "login", loginForm);
        Swal.fire({
          background: "rgb(23, 23, 33)",
          color: "white",
          position: "top-end",
          icon: "success",
          title: "Berhasil Masuk",
          showConfirmButton: false,
          timer: 1500,
        });
        localStorage.setItem("access_token", data.data.access_token);
        localStorage.setItem("id", data.data.id);
        localStorage.setItem("username", data.data.username);

        this.isLogin = true;
        this.router.push("/");
      } catch (error) {
        Swal.fire({
          background: "rgb(23, 23, 33)",
          color: "white",
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
          footer: "",
        });
        console.log(error);
      }
    },
    timeStamper() {
      const hour = new Date().getHours();
      const welcomeTypes = ["Selamat pagi", "Selamat sore", "Selamat malam"];
      let welcomeText = "";
      if (hour < 12) welcomeText = welcomeTypes[0];
      else if (hour < 18) welcomeText = welcomeTypes[1];
      else welcomeText = welcomeTypes[2];
      this.dateAndTime = welcomeText;
    },
    async countBoard() {
      try {
        let data = await axios.get(baseURL + "notes", {
          headers: { access_token: localStorage.getItem("access_token") },
        });
        this.allData = data.data;
        this.total = data.data.length;
      } catch (error) {
        console.log(error);
      }
    },
    async showNotes() {
      try {
        let forNdone = 0;
        let forDone = 0;
        let { data } = await axios({
          method: "GET",
          url: baseURL + "notes",
          headers: { access_token: localStorage.getItem("access_token") },
        });
        for (let i = 0; i < data.length; i++) {
          console.log(data[i]);
          if (data[i].isDone === true) forDone++;
          else forNdone++;

          this.done = forDone;
          this.nDone = forNdone;
        }
        if (
          this.nDone === 0 &&
          this.nDone !== this.done &&
          this.done === this.total
        ) {
          Swal.fire({
            icon: "success",
            title: "Semua selesai",
            width: 600,
            padding: "3em",
            confirmButtonColor: "#d2b48c",
            color: "",
            background: "",
            backdrop: `
              rgba(210,180,140,0.4)
              left top
              no-repeat
            `,
          });
        }
        this.dataNotes = data;
      } catch (error) {
        console.log(error);
      }
    },
    async addNotes(notesForm) {
      try {
        await axios({
          method: "POST",
          url: baseURL + "notes",
          data: notesForm,
          headers: { access_token: localStorage.getItem("access_token") },
        });
        Swal.fire({
          background: "rgb(23, 23, 33)",
          color: "white",
          position: "top-end",
          icon: "success",
          title: "Catatan ditambah",
          showConfirmButton: false,
          timer: 1500,
        });
        this.showNotes();
        this.countBoard();
      } catch (error) {
        Swal.fire({
          background: "rgb(23, 23, 33)",
          color: "white",
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
          footer: "",
        });
        console.log(error);
      }
    },
    async updateStatus(id, isDone) {
      try {
        const response = await axios.patch(
          baseURL + id,
          { isDone },
          { headers: { access_token: localStorage.getItem("access_token") } }
        );
        this.showNotes();
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteNotes(id) {
      try {
        Swal.fire({
          title: "Yakin ingin dihapus?",
          text: "",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya, hapus!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            Swal.fire("", "Catatan sudah dihapus.", "success");
            await axios.delete(baseURL + id, {
              headers: { access_token: localStorage.getItem("access_token") },
            });
            this.showNotes();
            document.location.href = "/";
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async logout() {
      Swal.fire({
        background: "rgb(23, 23, 33)",
        color: "white",
        title: "Keluar sekarang?",
        text: "",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, keluar!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            background: "white",
            color: "navyblue",
            title: "Sampai jumpa ...",
            showConfirmButton: false,
            timer: 1500,
          });
          localStorage.clear();
          this.isLogin = false;
          document.location.href = "/";
        }
      });
    },
  },
});
