/**
 * Copyright (c) 2024
 *  @author: izzetseydaoglu
 *  @last-modified: 8.04.2024 01:35
 */


const site = {
    siteKur: {
        target: "site/sitekur",
    }
};

const oturum = {
    oturumAc: {
        target: "oturum/oturumac",
    },
    oturumKapat: {
        target: "oturum/oturumkapat",
    },
    kayit: {
        target: "oturum/kayit",
    },
};


const pilot = {
    uyap: {
        birimEkle: {
            target: "uyap/pilot-birimekle",
        }
    }
};

const dosya = {
    dosyalar: {
        target: "dosyalar/listele",
    },
    sil: {
        target: "dosya/sil",
    },
    detay: {
        target: "dosya/index",
    },
    ekleDuzenle: {
        target: "dosya/ekle-duzenle",
    },

    baglantiEkleSil: {
        target: "dosya/baglanti-ekle-sil",
    },
    durusmaKesif: {
        ekleDuzenle: {
            target: "dosya/durusmakesif/ekle-duzenle",
        },
        sil: {
            target: "dosya/durusmakesif/sil",
        },
        gecikenDurusmalar: {
            target: "dosya/durusmakesif/gecikendurusmalar"
        }
    },
    setStorageKey: {
        target: "dosya/set-storagekey",
    },
    uyap: {
        setUYAPID: {
            target: "dosya/uyap/set-uyapid",
        }
    }
};

const taraf = {
    listele: {
        target: "taraflar/taraf/listele",
    },
    ekleDuzenle: {
        target: "taraflar/taraf/ekle-duzenle",
    },
    detay: {
        target: "taraflar/taraf/detay",
    },
    sil: {
        target: "taraflar/taraf/sil",
    },
    birlestir: {
        target: "taraflar/taraf/birlestir",
    },
    adresEkleDuzenle: {
        target: "taraflar/adres/ekle-duzenle",
    },
    adresAktifGuncelle: {
        target: "taraflar/adres/aktifadres",
    },
    adresSil: {
        target: "taraflar/adres/sil",
    },
    telefonEkleDuzenle: {
        target: "taraflar/telefon/ekle-duzenle",
    },
    telefonAktifGuncelle: {
        target: "taraflar/telefon/aktiftelefon",
    },
    telefonSil: {
        target: "taraflar/telefon/sil",
    },
};

const birim = {
    listeBirimTurleri: {
        target: "birim/liste-birimturleri",
    },
    listeBirimler: {
        target: "birim/liste-birimler",
    },
    ekleDuzenle: {
        target: "birim/ekle-duzenle",
    },
}

const kararTurleri = {
    listeleKararTurleri: {
        target: "kararturleri/liste-kararturleri",
    },
}

const sifatTurleri = {
    listele: {
        target: "sifatturleri/listele",
    },
}

const sehirler = {
    ara: {
        target: "sehirler/ara",
    },
    iller: {
        target: "sehirler/iller",
    },
    ilceler: {
        target: "sehirler/ilceler",
    }
}

const noterler = {
    ara: {
        target: "noterler/ara",
    }
}

const buroadmin = {
    kurulum: {
        target: "buroadmin/kurulum/ilkkurulum"
    },
    google: {
        yetkilendir: {
            target: "buroadmin/google/yetkilendir"
        },
        yetkilendir_kaldir: {
            target: "buroadmin/google/yetkilendir_kaldir"
        },
        takvim: {
            olustur: {
                target: "buroadmin/google/takvim/olustur"
            },
            paylas: {
                target: "buroadmin/google/takvim/paylas"
            }
        }
    },
    klasorYapisi: {
        getir: {
            target: "buroadmin/klasoryapisi/getir"
        }
    },
}

const view = {
    googledrive: {
        viewerlink: {
            target: "view/googledrive/viewerlink"
        }
    }
}

const gorevlendirmeler = {
    listele: {
        target: "gorevlendirmeler/listele"
    },
    ekleDuzenle: {
        target: "gorevlendirmeler/ekle-duzenle"
    },
    personelNotGirisi: {
        target: "gorevlendirmeler/personel-not-girisi"
    }
}

const ajanda = {
    listele: {
        target: "ajanda/listele"
    },
    gunDetay: {
        target: "ajanda/gun-detay"
    }
}
const etiketler = {
    ara: {
        target: "etiketler/ara"
    }
}
export const apiList = {
    site,
    oturum,
    pilot,
    dosya,
    taraf,
    birim,
    kararTurleri,
    sifatTurleri,
    sehirler,
    noterler,
    buroadmin,
    view,
    gorevlendirmeler,
    ajanda,
    etiketler
};
