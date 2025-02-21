export const useScoringAnalis = [
    {
        kriteria: "KARAKTER & MANAJEMAN",
        key: 1,
        scoring: [{
            header: "BANK CHECKING",
            nilai: null,
            param: [{
                parameter: "Tokoh Masyarakat setempat, atau dikenal luas di lingkungan sekitar",
                range_min: 91,
                range_max: 100,
                note: false,
            },
                {
                    parameter: "Pernah ada kolek di SID, tapi telah LUNAS dgn alasan yang logis/kembali lancar",
                    range_min: 85,
                    range_max: 90,
                    note: true,
                },
                {
                    parameter: "Pernah kolek di SID dan telah di restrukturisasi",
                    range_min: 79,
                    range_max: 84,
                    note: false,
                },
                {
                    parameter: "Saat ini sedang dalam kondisi NPL di bank lain   * kol 2 - 3",
                    range_min: 73,
                    range_max: 78,
                    note: false,
                },
                {
                    parameter: "Saat ini sedang dalam kondisi MACET (dan atau) HAPUS BUKU di bank lain   *kol 4 - 5",
                    range_min: 0,
                    range_max: 72,
                    note: false,
                },
            ]
        },
            {
                header: "KONDISI KREDIT LAINNYA (di bank lain)",
                nilai: null,
                param: [{
                    parameter: "Tidak ada kredit / angsuran di bank lain",
                    range_min: 91,
                    range_max: 100,
                    note: false,
                },
                    {
                        parameter: "Ada kredit/angsuran di bank lain *kondisi LANCAR",
                        range_min: 85,
                        range_max: 90,
                        note: false,
                    },
                    {
                        parameter: "Pernah menunggak di bawah 1 bln",
                        range_min: 79,
                        range_max: 84,
                        note: false,
                    },
                    {
                        parameter: "Saat ini menunggak 1 - 2 bln",
                        range_min: 73,
                        range_max: 78,
                        note: false,
                    },
                    {
                        parameter: "Saat ini menunggak lebih dari 2 bln",
                        range_min: 0,
                        range_max: 72,
                        note: false,
                    },
                ]
            },
            {
                header: "KARAKTER",
                nilai: null,
                param: [{
                    parameter: "KOMUNIKATIF, TERBUKA, HUBUNGAN PERBANKAN SANGAT MEMUASKAN",
                    range_min: 91,
                    range_max: 100,
                    note: false,
                },
                    {
                        parameter: "CUKUP KOMUNIKATIF DAN TERBUKA",
                        range_min: 85,
                        range_max: 90,
                        note: false,
                    },
                    {
                        parameter: "KURANG KOMUNIKATIF &TERBUKA, NAMUN DATA MINIMAL TERPENUHI",
                        range_min: 79,
                        range_max: 84,
                        note: false,
                    },
                    {
                        parameter: "CUKUP SULIT BERKOMUNIKASI, DATA YANG DIBERIKAN TDK KONSISTEN",
                        range_min: 73,
                        range_max: 78,
                        note: false,
                    },
                    {
                        parameter: "TIDAK KOMUNIKATIF DAN TIDAK KOPERATIF ",
                        range_min: 0,
                        range_max: 72,
                        note: false,
                    },
                ]
            },
            {
                header: "PENGALAMAN USAHA",
                nilai: null,
                param: [{
                    parameter: "> 6 TAHUN",
                    range_min: 91,
                    range_max: 100,
                    note: false,
                },
                    {
                        parameter: "4 - 6 TAHUN",
                        range_min: 85,
                        range_max: 90,
                        note: false,
                    },
                ]
            },
            {
                header: "LEGALITAS USAHA",
                nilai: null,
                param: [{
                    parameter: "IZIN USAHA LENGKAP",
                    range_min: 81,
                    range_max: 100,
                    note: false,
                },
                    {
                        parameter: "IZIN USAHA TIDAK LENGKAP",
                        range_min: 71,
                        range_max: 80,
                        note: false,
                    },
                    {
                        parameter: "IZIN USAHA TIDAK ADA",
                        range_min: 0,
                        range_max: 70,
                        note: false,
                    },
                ]
            },
            {
                header: "MANAGEMEN DAN KONTROL",
                nilai: null,
                param: [{
                    parameter: "Ada catatan kondisi/pembukuan usaha (omzet, kas, stock, hutang piutang)",
                    range_min: 91,
                    range_max: 100,
                    note: false,
                },
                    {
                        parameter: "Ada catatan kondisi/pembukuan usaha (omzet, kas, stock, hutang piutang)",
                        range_min: 85,
                        range_max: 90,
                        note: false,
                    },
                    {
                        parameter: "Pembukuan kondisi usaha sangat minim (kas only)",
                        range_min: 79,
                        range_max: 84,
                        note: false,
                    },
                    {
                        parameter: "Pembukuan kondisi usaha minim dan tidak teratur",
                        range_min: 73,
                        range_max: 78,
                        note: false,
                    },
                    {
                        parameter: "Tidak ada pencatatan pembukuan kondisi usaha",
                        range_min: 0,
                        range_max: 72,
                        note: false,
                    },
                ]
            }
        ]
    },
    {
        kriteria: "KEUANGAN (CASH FLOW)",
        key: 2,
        scoring: [{
            header: "KEMAMPUAN BAYAR ANGSUR DEBITUR",
            nilai: null,
            param: [{
                parameter: "Diatas (>) 3",
                range_min: 91,
                range_max: 100,
                note: false,
            },
                {
                    parameter: "Diatas 2 - 3",
                    range_min: 85,
                    range_max: 90,
                    note: false,
                },
                {
                    parameter: "Antara 1.5 -  < 2",
                    range_min: 61,
                    range_max: 79,
                    note: false,
                },
                {
                    parameter: "Dibawah (<) 1.5",
                    range_min: 0,
                    range_max: 60,
                    note: false,
                }
            ]
        },
            {
                header: "NETT INCOME (sisa kas) setelah kredit disetujui dan berjalan",
                nilai: null,
                param: [{
                    parameter: "Diatas Rp. 5.000.000",
                    range_min: 91,
                    range_max: 100,
                    note: false,
                },
                    {
                        parameter: "Diantara Rp. 4.900.000- Rp.1.000.000",
                        range_min: 70,
                        range_max: 90,
                        note: false,
                    },
                    {
                        parameter: "Dibawah Rp. 1.000.000",
                        range_min: 0,
                        range_max: 69,
                        note: false,
                    },
                ]
            }]
    },
    {
        kriteria: "KONDISI USAHA)",
        key: 3,
        scoring: [{
            header: "PERTUMBUHAN USAHA",
            nilai: null,
            param: [{
                parameter: "TUMBUH SIGNIFIKAN  *volume usaha tumbuh diatas 100% dlm 2thn, buka cabang",
                range_min: 91,
                range_max: 100,
                note: false,
            },
                {
                    parameter: "VOLUME USAHA TUMBUH 50-100% dalam 2 thn",
                    range_min: 85,
                    range_max: 90,
                    note: false,
                },
                {
                    parameter: "VOLUME USAHA TUMBUH 50-100% dalam 2 thn",
                    range_min: 79,
                    range_max: 84,
                    note: false,
                },
                {
                    parameter: "USAHA RELATIF STABIL (stagnan)",
                    range_min: 73,
                    range_max: 78,
                    note: false,
                },
                {
                    parameter: "CENDERUNG MENURUN",
                    range_min: 0,
                    range_max: 72,
                    note: false,
                },
            ]
        },
            {
                header: "PERSAINGAN",
                nilai: null,
                param: [{
                    parameter: "Kurang dari 4 pesaing dalam wilayah pemasarannya ",
                    range_min: 91,
                    range_max: 100,
                    note: false,
                },
                    {
                        parameter: "4 - 10 pesaing dalam wilyah pemasarannya",
                        range_min: 79,
                        range_max: 84,
                        note: false,
                    },
                    {
                        parameter: "Lebih dari 10 pesaing",
                        range_min: 73,
                        range_max: 78,
                        note: false,
                    },
                    {
                        parameter: "Jumlah pesaing banyak dan tidak mempunyai pelanggan tetap",
                        range_min: 0,
                        range_max: 72,
                        note: false,
                    },
                ]
            },
            {
                header: " KUALITAS PRODUK / JASA - home industri",
                nilai: null,
                param: [{
                    parameter: "Sangat baik untuk produk sejenis di wilayah pemasarannya ",
                    range_min: 91,
                    range_max: 100,
                    note: false,
                },
                    {
                        parameter: "Kualitas baik (diatas rata-rata) untuk produk sejenis di wilayah pemasarannya",
                        range_min: 85,
                        range_max: 90,
                        note: false,
                    },
                    {
                        parameter: "Kualitas relatif sama dengan produk sejenis lainnya di wilayah pemasarannya",
                        range_min: 79,
                        range_max: 84,
                        note: false,
                    },
                    {
                        parameter: "Kualitas di bawah rata-rata dengan produk sejenis di wilayah pemasarannya",
                        range_min: 73,
                        range_max: 78,
                        note: false,
                    },
                    {
                        parameter: "Kualitas produk / jasa sangat buruk",
                        range_min: 0,
                        range_max: 72,
                        note: false,
                    },
                ]
            },
            {
                header: " KETERSEDIAAN BAHAN BAKU (stock)",
                nilai: null,
                param: [{
                    parameter: "Tersedia banyak di pasar dan mudah diperoleh ",
                    range_min: 91,
                    range_max: 100,
                    note: false,
                },
                    {
                        parameter: "Tersedia cukup banyak di pasar, dan cukup mudah diperoleh",
                        range_min: 85,
                        range_max: 90,
                        note: false,
                    },
                    {
                        parameter: "Tersedia banyak di pasar,  kadang fluktuatif / musiman",
                        range_min: 79,
                        range_max: 84,
                        note: false,
                    },
                    {
                        parameter: "Tidak banyak tersedia di pasar, sering fluktuatif",
                        range_min: 73,
                        range_max: 78,
                        note: false,
                    },
                    {
                        parameter: "Jenis barang cukup langka, dan sangat fluktuatif (tergantung musim)",
                        range_min: 0,
                        range_max: 72,
                        note: false,
                    },
                ]
            },
            {
                header: " PERKIRAAN KONTINUITAS USAHA  *pertimbangan: persaingan, sosiologis & kondisi lokal",
                nilai: null,
                param: [{
                    parameter: "Usaha tetap berjalan tumbuh dlm waktu lbh dari 3 thn mendatang ",
                    range_min: 91,
                    range_max: 100,
                    note: false,
                },
                    {
                        parameter: "Usaha tetap berjalan dan berkembang dlm waktu minimal 3 thn mendatang",
                        range_min: 85,
                        range_max: 90,
                        note: false,
                    },
                    {
                        parameter: "Usaha tetap berjalan dan cenderung stagnan dlm waktu minimal 2 thn mendatang",
                        range_min: 79,
                        range_max: 84,
                        note: false,
                    },
                    {
                        parameter: "Usaha cenderung menurun",
                        range_min: 73,
                        range_max: 78,
                        note: false,
                    },
                    {
                        parameter: "Usaha tidak dapat diprediksi",
                        range_min: 0,
                        range_max: 72,
                        note: false,
                    },
                ]
            }]
    },
    {
        kriteria: "AGUNAN",
        key: 4,
        scoring: [{
            header: "RATIO NILAI AGUNAN",
            nilai: null,
            param: [{
                parameter: "Diatas 200% | Cash collateral | Logam mulia",
                range_min: 91,
                range_max: 100,
                note: false,
            },
                {
                    parameter: "150 % - 200 %",
                    range_min: 85,
                    range_max: 90,
                    note: false,
                },
                {
                    parameter: "110 % - 150 %",
                    range_min: 79,
                    range_max: 84,
                    note: false,
                },
                {
                    parameter: "100 % - 110 %",
                    range_min: 73,
                    range_max: 78,
                    note: false,
                },
                {
                    parameter: "Dibawah 100%",
                    range_min: 0,
                    range_max: 72,
                    note: false,
                },
            ]
        },
            {
                header: "PENCAIRAN AGUNAN ",
                param: [{
                    parameter: "Perkiraan pencairan agunan kurang dari 3bulan",
                    range_min: 91,
                    range_max: 100,
                    note: false,
                },
                    {
                        parameter: "Perkiraan pencairan agunan 3 - 6 bulan",
                        range_min: 85,
                        range_max: 90,
                        note: false,
                    },
                    {
                        parameter: "Perkiraan pencairan agunan 6 - 9 bulan",
                        range_min: 79,
                        range_max: 84,
                        note: false,
                    },
                    {
                        parameter: "Perkiraan pencairan agunan 9 - 12 bulan",
                        range_min: 73,
                        range_max: 78,
                        note: false,
                    },
                    {
                        parameter: "Perkiraan pencairan agunan lebih dari 12 bulan",
                        range_min: 0,
                        range_max: 72,
                        note: false,
                    },
                ]
            },
            {
                header: "KEPEMILIKAN",
                param: [{
                    parameter: "Milik pemohon (suami/isteri)",
                    range_min: 91,
                    range_max: 100,
                    note: false,
                },
                    {
                        parameter: "Milik orang tua kandung / mertua",
                        range_min: 85,
                        range_max: 90,
                        note: false,
                    },
                    {
                        parameter: "Milik saudara kandung ",
                        range_min: 79,
                        range_max: 84,
                        note: false,
                    },
                    {
                        parameter: "Milik orang lain",
                        range_min: 0,
                        range_max: 72,
                        note: false,
                    },
                ]
            },
            {
                header: "LEGALITAS AGUNAN",
                param: [{
                    parameter: "Dokumen lengkap",
                    range_min: 91,
                    range_max: 100,
                    note: false,
                },
                    {
                        parameter: "Dokumen kurang lengkap, namun tidak prinsipil (resiko tinggi)",
                        range_min: 85,
                        range_max: 90,
                        note: false,
                    },
                    {
                        parameter: "Dokumen tidak lengkap, namun berpengaruh sedikit thd harga jual",
                        range_min: 79,
                        range_max: 84,
                        note: false,
                    },
                    {
                        parameter: "Dokumen tidak lengkap, namun berpengaruh signifikan thd harga jual",
                        range_min: 0,
                        range_max: 78,
                        note: false,
                    },
                ]
            }],
    }];