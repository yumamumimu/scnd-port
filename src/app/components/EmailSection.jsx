"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const EmailSection = () => {
  const [formData, setFormData] = useState({
    nama: "",
    message: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [ratings, setRatings] = useState([]); // Menyimpan semua rating yang diberikan
  const [rating, setRating] = useState(0); // Menyimpan rating sementara
  const [messages, setMessages] = useState([]); // Menyimpan pesan yang dikirim
  const [error, setError] = useState(""); // Menyimpan pesan error
  const [showErrorPopup, setShowErrorPopup] = useState(false); // State untuk menampilkan error popup

  // Menghitung rata-rata rating
  const calculateAverageRating = () => {
    if (ratings.length === 0) return 0;
    const total = ratings.reduce((sum, r) => sum + r, 0);
    return (total / ratings.length).toFixed(2);
  };

  // Menghitung jumlah ulasan untuk tiap bintang
  const countRatings = (star) => {
    return ratings.filter((r) => r === star).length;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi form: Pastikan nama, pesan, dan rating sudah diisi
    if (!formData.nama || !formData.message || rating === 0) {
      setError("Nama, pesan, dan rating harus diisi!");
      setShowErrorPopup(true); // Tampilkan popup error
      return;
    }

    // Reset error jika sudah valid
    setError("");
    setShowErrorPopup(false); // Sembunyikan popup error

    setRatings([...ratings, rating]); // Tambah rating baru ke list ratings
    setMessages([...messages, { ...formData, rating }]); // Simpan data form + rating ke messages
    setRating(0); // Reset rating setelah submit
    setShowPopup(true); // Tampilkan popup setelah rating terkirim

    // Kosongkan form setelah submit
    setFormData({ nama: "", message: "" });
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false);
  };

  const handleRatingClick = (value) => {
    setRating(value);
  };

  return (
    <section id="contact" className="grid md:grid-cols-2 my-12 py-24 gap-4 relative">
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900 to-transparent rounded-full h-80 w-80 z-00 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"></div>

      <div className={`z-0 ${showPopup ? "blur-sm" : ""} ${showErrorPopup ? "blur-sm" : ""}`}>
        {/* Judul RATING */}
        <div className="flex items-center mb-4">
          <span className="text-yellow-400 text-2xl mr-2">★</span>
          <h2 className="text-white text-2xl font-bold">RATING</h2>
        </div>

        {/* Tampilan Rating Secara Keseluruhan */}
        <div className="bg-[#2C2F33] text-white p-6 rounded-lg">
          <h2 className="text-3xl font-bold">{calculateAverageRating()} / 5.0</h2>
          <p className="text-[#ADB7BE] mt-1">
            Pengunjung merasa puas dengan Portofolio ini. Dari {ratings.length} ulasan.
          </p>

          {/* Grafik Rating Bintang */}
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center my-1">
              <span className="text-lg mr-2">{star} ★</span>
              <div className="flex-1 bg-gray-500 rounded-full h-2 mx-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{
                    width: `${(countRatings(star) / ratings.length) * 100 || 0}%`,
                  }}
                ></div>
              </div>
              <span className="text-sm">{countRatings(star)}</span>
            </div>
          ))}
        </div>

        {/* Menampilkan Pesan Ulasan */}
        <div className="my-4">
          <h5 className="text-white font-semibold mb-2">Ulasan Terkini:</h5>
          {messages.length === 0 ? (
            <p className="text-[#ADB7BE] italic">Belum ada ulasan yang dikirim.</p>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className="text-[#ADB7BE] mb-2 bg-[#18191E] p-3 rounded-lg">
                <p className="font-semibold text-white">
                  {msg.nama.replace(/.(?=.{3})/g, "*")}
                </p>
                <div className="flex space-x-1 my-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-xl ${star <= msg.rating ? "text-yellow-400" : "text-gray-400"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="italic">{msg.message}</p> {/* Pesan dibuat italic */}
                <p className="text-xs text-gray-500">
                  {new Date().toLocaleDateString("id-ID")}{" "}
                  {new Date().toLocaleTimeString("id-ID")}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      <div>
        {/* Popup ditampilkan */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <p className="text-white-500 text-lg">Ulasan terkirim!</p>
              <button
                onClick={handleClosePopup}
                className="mt-4 border border-primary-500 text-primary-500 font-medium py-2 px-4 rounded hover:bg-transparent"
              >
                Tutup
              </button>
            </div>
          </div>
        )}

        {/* Error Popup */}
        {showErrorPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-[#2C2F33] p-6 rounded-lg shadow-lg text-center">
              <p className="text-white text-lg">{error}</p> {/* Text color changed to white */}
              <button
                onClick={handleCloseErrorPopup}
                className="mt-4 border border-purple-500 text-purple-500 font-medium py-2 px-4 rounded hover:bg-transparent"
              >
                Tutup
              </button>
            </div>
          </div>
        )}

        {/* Form */}
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="nama"
              className="text-white block mb-2 text-sm font-medium"
            >
              Nama
            </label>
            <input
              name="nama"
              type="text"
              id="nama"
              value={formData.nama}
              onChange={handleChange}
              required
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="Nama Anda"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="text-white block text-sm mb-2 font-medium"
            >
              Pesan
            </label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="Ketikan Masukan & Saran anda disini..."
            />
          </div>

          {/* Rating Section */}
          <div className="mb-6">
            <label className="text-white block text-sm mb-2 font-medium">
              Rate Us
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`cursor-pointer text-4xl ${star <= rating ? "text-yellow-400" : "text-gray-400"}`}
                  onClick={() => handleRatingClick(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="border border-primary-500 text-primary-500 font-medium py-2 px-4 rounded hover:bg-transparent"
          >
            Kirim
          </button>
        </form>
      </div>
    </section>
  );
};

export default EmailSection;
